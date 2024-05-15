import React, { Fragment, useEffect, useState } from "react";
import { MdSend } from 'react-icons/md';
import {st_date, toDate} from './ControleDate'
import LigneVide from './LigneVide';
import ObtenirListeChamps from './ObtenirListeChamps';

const TabSel = ({baseSelection}) => {

  const colonnes = LigneVide(baseSelection,1);

  let col_titre_1 = ''
  let col_titre_2 = ''
  let col_titre_3 = ''
  colonnes.forEach( (value,i) =>{ 
    if (value.rang_titre === 1) col_titre_1 = value.column_name
    if (value.rang_titre === 2) col_titre_2 = value.column_name
    if (value.rang_titre === 3) col_titre_3 = value.column_name
  });

  
  const[data,setData]= useState([])
  const[tout,setTout]= useState([])
  
  let json_critere = [
      {vide :''}
    ]
   console.log(baseSelection.champ_critere_debsel) 
  if (baseSelection.champ_critere_debsel !==null && baseSelection.champ_critere_debsel>''){
    console.log(document.getElementById('nom-table-maitre').textContent)
    let valeur_id = document.getElementById('valeur-id-'+document.getElementById('nom-table-maitre').textContent).textContent
    json_critere[0]['integer-'+baseSelection.champ_critere_debsel]= valeur_id
  } 
  const getData = async (bdd,table_name) => {
      
    try{
      let response = await fetch ("http://localhost:5000/affiche_aveclib/"+bdd+"/"+table_name
      ,
        {   
          method : 'POST',
          headers: {'Content-Type' : "application/json"},
          body : JSON.stringify(json_critere)
        }
      );
      
      let statut = await response.json();
      setData(statut)
      setTout(statut)
      // ============== TSY AZO ESORINA MISY TSY MAZAVA (Promise ?)
      // statut.then(function(result) {
      //   setData(result)
      //   console.log(result) 
      // }, function(err) {
      //   console.log(err.message)
      // });
     
    } catch(err) {
      console.log(err.message);
    }
  }
  
  useEffect(() =>{
    getData(baseSelection.bdd,baseSelection.table_name);
    
  }, []);

  var jsonQuery = require('json-query')

  function filtrage(filtres){
  
    let data3 ={
      ligne:tout
    }
    
    var totFiltre="ligne[*"
    var i=0
    filtres.forEach((filtre)=>{
      if (filtre.val>''){
        if (i>0)
          totFiltre=totFiltre+' & '
        totFiltre = totFiltre + filtre.col + filtre.op + filtre.val
        i=i+1
      }
    })
    totFiltre=totFiltre+"]"
    let result = jsonQuery(totFiltre, {data:data3})
    return result.value;
  }
  
  
  const listeChamps = ObtenirListeChamps(baseSelection.bdd,baseSelection.table_name)

  let color_enter=''
  const EnterTR=(e)=>{
    if (e.target.tagName==='TD'){
        color_enter=e.target.parentElement.style.background
        e.target.parentElement.style.background='PaleTurquoise'
      }
  }
  
  const LeaveTR=(e)=>{
      if (e.target.tagName==='TD'){
        e.target.parentElement.style.background=color_enter
      }
  }
  
  const ClickTR=(e)=>{
   

    // const indexLigne = e.target.getAttribute('id').indexOf('ligne')
    // const indexData = parseInt(e.target.getAttribute('id').substring(indexLigne+6,indexLigne+9))
    // console.log(data[indexData])    
    // 
    // let nod =''
    // Object.keys(data[indexData]).forEach(key => {
    //     nod = 'valeur-'+key+'-'+baseSelection.table_name;
    //     if (document.getElementById(nod)!=undefined)
    //       document.getElementById(nod).textContent= data[indexData][key];
    //   });
  }

  //'LightPink',,
  const couleur_zebre=['LightYellow','LightGreen']//'LightSalmon',,'LightGrey','LightGoldenrodYellow','LightSteelBlue'
  const col_change= 'id' //col_change_color//au lieu de col_change='id' 
  let val_tal="";
  let iteration_zebre=0;

  const coul_zebre = (val)=>{
    if (val!==val_tal){
        iteration_zebre = iteration_zebre+1 // iteration_zebre=1
        val_tal=val
    }
    return iteration_zebre % couleur_zebre.length
  }

  // === Rport par page ====
  
  
  function numStr(a,typ,b) {
    var c = '',
    d = 0;
    if (a===null){
      c=''
    }
    else{
      if (typ==='double precision'){
        
        a = '' + a;
        b = b || ' ';
        while (a.match(/^0[0-9]/)) {
          a = a.substr(1);
        }
        for (var i = a.length-1; i >= 0; i--) {
          c = (d !== 0 && d % 3 === 0) ? a[i] + b + c : a[i] + c;
          d++;
        }
      }
      else
        c = a
    }    
    return c;
  }


const filtrer = (champ,valeur) =>{
  const filtre = [ //baseTable.idToSelect
    {col : champ, val : valeur , typ : 'varchar',op:'='},// document.getElementById('table_nom').value
  ]
  setData(filtrage(filtre))

}

const AfficherTout = () =>{
  const filtre = []
  setData(filtrage(filtre))
}
const ChoisirElement = (e) =>{
  document.getElementById('statut-enregistrement').textContent = ''
  let option = document.getElementById('saisie-'+baseSelection.idDestination).childNodes[0]
  console.log(option)
  // console.log(e.target)
  let elt = e.target;
  let nm = elt.nodeName
  // console.log(nm)
  while (nm !=='TR' ) {
     elt = elt.parentElement
     nm = elt.nodeName
  }

  let tds = elt.childNodes
  for (let i = 0; i < tds.length; i++) {
    if (tds[i].getAttribute('id')!== null){
      let index = tds[i].getAttribute('id').indexOf('-ligne')
      let col = tds[i].getAttribute('id').substr(0, index);
      if (col === baseSelection.idOrigine)
        option.setAttribute("value", tds[i].textContent)
      if (col === baseSelection.description)
        option.textContent = tds[i].textContent
    }
  }
  
  // const indexLigne = e.target.getAttribute('id').indexOf('ligne')
    // const indexData = parseInt(e.target.getAttribute('id').substring(indexLigne+6,indexLigne+9))
    // console.log(data[indexData])    
    // 
    // let nod =''
    // Object.keys(data[indexData]).forEach(key => {
    //     nod = 'valeur-'+key+'-'+baseSelection.table_name;
    //     if (document.getElementById(nod)!=undefined)
    //       document.getElementById(nod).textContent= data[indexData][key];
    //   });

  
  

}

  return (
    <div  style={{width:'100',height: window.innerHeight}}>{/*ref={componentRef}*/}
      <div>
        <div className="form-inline">
          <button id='btn-ajouter' type="button" 
              style={{margin:'5px'}} 
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              // data-target={fonc.baseTable.cle_maitre >''?`#id1`:'#id2'}
              // onClick={()=>{fonc.clickAjout()}}
          >
            Ajouter
          </button>

          <select  id = 'choix-champs' className="custom-select custom-select-lg mb-3" style={{height:'40px',margin:'10px 2px 0px 0px',
                                  fontSize:'15px'}}
              
          >
            <option >--Choisir champs a filtrer---</option>
              {listeChamps.map((element)=>(
                <option 
                    value = {element.column_name}
                >
                    {element.column_name}
                
                </option>
              ))} 
          </select>

          <input id='valeur-filtre' className="form-control" type='text' 
          style={{ padding: "10px 20px",width:'200px'}}
              placeholder='A saisir' 
              // onChange={(e)=>{
              //     if (e.target.value.length===7)
              //         filtrerTout()
              //     }}
          />
          
          
          <button id='btm-filtrer-tout' type="button" 
              style={{margin:'5px'}} 
              className="btn btn-sm btn-primary"
              onClick={()=>{
                filtrer('nom',document.getElementById('valeur-filtre').value)
                console.log('---------------------------'+ document.getElementById('valeur-filtre').value)
            }}
          >
              <i className="fas fa-search"/>
          </button>
                  
          <button id='btm-afficher-tout' type="button" 
              style={{margin:'5px'}} 
              className="btn btn-sm btn-primary"
              onClick={()=>{AfficherTout()}}
          >
              Tout
          </button> 
        </div>    
                        
    </div>

    <table border="2" className="table" 
      style ={{borderSpacing: '0',
      borderCollapse: 'separate',
      borderRadius: '20px',
      border: '1px solid black', margin: '0px 0px 23px 0 '}}
    > 
    {/* className="table table-striped" */}
      <thead className="thead-success">
        <Fragment>
            
            <tr>
              <th></th>
              {colonnes.map((col,i)=>(
                col.affiche_tableau===true
                  ?<th style={{"text-align":'center',background:'black',color:'white'}}>{col.description}</th>
                  :null 
              ))} 
              </tr>
          </Fragment>
      </thead>
            
      <tbody>
        {data.map((dev,j)=>((
          <Fragment>
            
          
          
          {/* insertion sous titre 3 */}    
          {/* =========== donnees tableau =========*/}
           <tr id={'tr-'+baseSelection.table_name+'-'+dev.id} 
               key={dev.id} 
               onMouseEnter={(e)=>EnterTR(e)} 
               onMouseLeave={(e)=>LeaveTR(e)} 
               onClick = {(e)=>ClickTR(e)}
               style={{background:couleur_zebre[coul_zebre(dev[col_change])]}}>
    
              {/* bouton mise-a-jour */}
               <td>
               <button id={`#id${dev.id}`} alt='btn-tableau' type="button" style={{padding:"0",background: 'rgba(255,255,255,0)'}}
                   className="btn btn" 
                   data-toggle="modal"
                   data-dismiss="modal"
                   data-target={`#id2`}
                   onClick = {(e)=>ChoisirElement(e)}
                   >
                  <MdSend/> 
                </button>
              
               {/* data-toggle="modal"
                    data-target={fonc.baseTable.cle_maitre >''?`#id1`:'#id2'}
                    

               < /> */}
               </td>

              {/* affiche donnees tableau */}
              { 
                colonnes.map((col,k)=>(
                  col.affiche_tableau===true
                    ?<Fragment>
                      <td id ={col.column_name+'-ligne-'+j} 
                        style={col.data_type==='double precision'?{'text-align': 'right'}:{ 'text-align': 'left' }}>
                        {
                        col.masque==='Liste'
                          ? dev['lib_'+col.column_name]
                          :col.lien == null 
                            ?(col.masque ==='Date'
                              ? st_date(dev[col.column_name])
                              : col.a_cocher === true
                                ?<Fragment>
                                    <input id ={dev[col.column_name]} className="form-check-input" 
                                      alt={dev[col.column_name]}
                                      placeholder = {dev['debit'] - dev['credit']}
                                      type="checkbox"
                                    />
                                    <label>{dev[col.column_name]}</label>                  
                                </Fragment>
                                :numStr(dev[col.column_name],col.data_type)
                            )
                            :<a href="#" 
                              
                            >{dev[col.column_name]}</a>
                        }
                      </td>
                    </Fragment>
                    :null
               ))}

              {/* bouton suppression */}
              <td>
                
              </td>
           </tr>
           
           </Fragment>
         )))} 
           
      </tbody>
      </table>
      </div>
          
    )}

    export default TabSel;