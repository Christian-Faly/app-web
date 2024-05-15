import React , { Fragment } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {useState} from 'react'
import LigneVide from './LigneVide';
import { FcAdvance } from 'react-icons/fc';
import { FaArrowLeft} from 'react-icons/fa';

import InfoTable from "./InfoTable";
import {OuvrirSimpleElement,OuvrirSimpleCritere} from './OuvrirElement'
import ListeDetail from './ListeDetail';
import InsertMaitre from "./InsertMaitre";

function Maitre({tabla,critere,gMaitre}) { //bdd,tab,titre,is_etape
  let baseTable = {
    bdd:tabla.bdd,
    table_name:tabla.tab,
    table_maitre:tabla.tab,
    cle_maitre:'',
    table_detail:'',
    etrange_detail:'',
    type_cle:'',
    nbCols:4,
    is_to_update:true
  }
  let ajout = {};
  
  const colonnes = LigneVide(baseTable,1);

  colonnes.forEach( (value,i) =>{ 
    ajout[value.column_name] = (value.data_type ==='boolean'?false:null);
  });

  const [form, setForm] = useState(ajout)
  
  baseTable['setForm'] = setForm
  baseTable['colonnes'] = colonnes
  baseTable['form'] = form

  const details = ListeDetail(baseTable.bdd,baseTable.table_name,'Onglet')
  // console.log(details)
  const clickPageDetail =(e,index) =>{
  
    let children = document.getElementById('id-onglet-detail').childNodes;
    // ============= Manova .couleur =============
    for (let i = 0; i < children.length; i++) {
      if (children[i].type ==='button')
          children[i].setAttribute('class',"btn btn-sm btn-secondary")
      document.getElementById('id-btn-'+details[0].nomtable).setAttribute('class',"btn btn-sm btn-secondary")
    }
    e.target.setAttribute('class',"btn btn-sm btn-warning")
    //====================
    
    if (index===0){
      OuvrirSimpleElement(baseTable.bdd, e.target.getAttribute('name'),true)
    }
    else{
      let cle_maitre = ''
      let typa = ''
      if (details[0].cle_maitre===null){
        cle_maitre = 'id'
        typa = 'integer'
      }else{
        cle_maitre = details[0].cle_maitre
        typa = details[0].table_maitre  
      }  
      if (!e.ctrlKey){
        OuvrirSimpleCritere(
          baseTable.bdd, 
          e.target.getAttribute('name'),
          true,
          typa+'-'+e.target.getAttribute('alt'),
          document.getElementById('valeur-id-'+baseTable.table_name).textContent
        )
      }
      else{
        const t={
          titre:e.target.textContent, 
          bdd:baseTable.bdd, 
          tab:e.target.getAttribute('name'), 
          // idToSelect:document.getElementById('valeur-id-'+details[0].nomtable).textContent,
          is_etape:false
        }
        const c={
          champ:typa+'-'+e.target.getAttribute('alt'),
          valeur:document.getElementById('valeur-'+ cle_maitre+'-'+baseTable.table_name).textContent
        }
        let champ = ''
        let valeur = ''
        try{
          champ = document.getElementById('champ-critere').textContent
          valeur = document.getElementById('valeur-critere').textContent

        }catch(err){
          champ = undefined
          valeur = undefined
        }
        
        const m ={
          titre:tabla.titre, 
          tab:tabla.tab, 
          id:document.getElementById('valeur-id-'+details[0].nomtable).textContent,
          champCritere: champ,
          valeurCritere: valeur,
        
        }
        InsertMaitre(t,c,m)
      }

    }
  }
  
  return ( 
    <div>  
      <div id ='Masque-plat'>
        <div className="container-fluid">
        {critere===undefined
          ?null
          :
          <Fragment>
            <span hidden id='champ-critere' 
              style={{textAlign:'center',fontSize:'20px',color:'blue',textShadow: '#FC0 1px 0 10px', width:'100%'}}>
              {critere.champ}
            </span>
            <span hidden  id='valeur-critere' 
              style={{textAlign:'center',fontSize:'20px',color:'blue',textShadow: '#FC0 1px 0 10px', width:'100%'}}>
              {critere.valeur}
            </span>
          </Fragment>
        }
                
        {gMaitre===undefined
          ?null
          :
          <button id={'id-btn-to-'+gMaitre.id} type="button" name={'RRR'} alt ={'SSSS'}
                style={{margin:'1px'}} 
                className="btn btn-sm btn-warning"
          
                onClick={e=>{
                  let champC = undefined
                  let valeurC = undefined
                  
                  if (gMaitre.champCritere === undefined){
                    champC = gMaitre.champCritere  
                    valeurC = gMaitre.valeurCritere  
                  }
                  InsertMaitre(
                    {
                      titre: gMaitre.titre, 
                      bdd:tabla.bdd, 
                      tab:gMaitre.tab, 
                      idToSelect:gMaitre.id,
                      is_etape:false
                    },
                    {champ:champC,valeur:valeurC},
                  )
                }}
          >
            <FaArrowLeft/> 
          </button>
          }
          <span id='titre-tableau'
            style={{textAlign:'center',fontSize:'20px',color:'blue',textShadow: '#FC0 1px 0 10px', width:'100%'}}>
              {tabla.titre}
          </span>
          {details[0] === undefined
            ?null
            :<Fragment>
              <span hidden id='nom-table-maitre'>{details[0].nomtable}</span>
              <span hidden id='nombre-table-detail'>{details.length}</span>
              <button id={'id-btn-'+details[0].nomtable} type="button" name={details[0].nomtable}
                  style={{margin:'1px'}} 
                  className="btn btn-sm btn-warning"
                  onClick={(e)=>{clickPageDetail(e,0)}}
              >
                {details[0].description}
              </button>
            </Fragment>
          }
        </div>
        <InfoTable baseTable={baseTable} nbCols={6} is_resume={true}/>
      </div>

      <div id ='id-onglet-detail'>
            
        {details.map((detail,i)=>(
          <Fragment>
            {i===0
              ? null
              
            :
            <Fragment>
              <button id={'id-btn-'+detail.nomtable} type="button" name={detail.nomtable} alt={detail.cle_maitre}
                style={{margin:'1px'}} 
                className="btn btn-sm btn-secondary"
                onClick={(e)=>{clickPageDetail(e,i)}}
              >
                {detail.description}
              </button>
              {tabla.is_etape
              ?<span style={{ color: 'red' }}>
                <FcAdvance/>
              </span>
              :null
              }
            </Fragment>
        }
          </Fragment>     
        ))}
      </div>
    </div>
    
  );
}
export default Maitre;
