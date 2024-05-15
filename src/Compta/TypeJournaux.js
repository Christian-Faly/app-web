import React from 'react';
import ObtenirTable from '../component/ObtenirTable';
import LigneVide from '../component/LigneVide';
import { FaLock,FaFolderOpen,FaFolder } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import Donnees from '../component/Donnees'
import RequeteSQL from '../component/RequeteSQL';
    
const TypeJournaux = ({gogo})=>{
    // console.log(gogo)
    const tab_jrnx={
        bdd:gogo.bdd,
        table_name:gogo.table_name
    }

    const colonnes = LigneVide(tab_jrnx,1);
    // console.log(tab_jrnx)
    const data = ObtenirTable(tab_jrnx) //DonneeJrnx();
    
    const Close=(e)=>{
        let id_etat='btn-cible-'+gogo.table_name;
        let is_open = true
        // Appel depuis menu
        if (document.getElementById(id_etat).textContent === 'btn-journaux-menu'){
            document.getElementById('search-jrnx-menu').value=e.target.textContent
            document.getElementById('situation-periode').textContent = "Cliquez-moi pour la situation"
        }
        // Appel depuis barre outil
        if (document.getElementById(id_etat).textContent === 'btn-journaux'){
            document.getElementById('search-journaux').value = e.target.textContent
            gogo.filtrerTout()
        }
        
        if (document.getElementById(id_etat).textContent === 'btn-auxi'){
             document.getElementById('search-compte-de').value=e.target.textContent
             document.getElementById('search-compte-a').value=e.target.textContent+'Z'
             gogo.filtrerTout()
        }
        let val=''
        if (id_etat==='btn-cible-situation_periode'){
            try{
                if (e.target.tagName === 'path')
                    val = e.target.parentElement.getAttribute('alt')
                else
                    val = e.target.getAttribute('alt')
            }catch{
                val=e.target.getAttribute('alt')
            }
        }

        if (document.getElementById(id_etat).textContent === 'menu-choix-periode'){
            let situation = val.substring(11,19)
            if (situation === '') situation = 'non ouvert' 
                document.getElementById('situation-periode').textContent = situation
            document.getElementById('search-jrnx-menu').value = val.substring(8,10)
            document.getElementById('search-periode-menu').value = val.substring(0,7)
        }
        if (document.getElementById(id_etat).textContent === 'btn-choix-periode'){
            document.getElementById('saisie-en-cours').textContent = val

            let afficher=[
                {col : "periode", val : val.substring(0,7),typ : 'varchar',op:'='},
                {col : "codejrnx", val : val.substring(8,10),typ : 'varchar',op:'='}
            ]
            gogo.filtrer(afficher)
            if (val.substring(11,18)==='ouvert')
                document.getElementById('btn-ajouter').hidden=false
            else{
                document.getElementById('btn-ajouter').hidden=true
                is_open = false
                    
            }
        }
        document.getElementById('modal').attributes['show']=false;
        //gogo.filtrerTout()
        if (document.getElementById(id_etat).textContent === 'balance-auxiliaire'){
            const json_select =[
                {
                    sql:"CREATE OR REPLACE VIEW balance_param AS SELECT '"+ 
                    document.getElementById('etat-date-de').value + "' AS date_de, '" +
                    document.getElementById('etat-date-a').value +"' AS date_a,'"+
                    e.target.textContent + "' AS compte_de, '"+e.target.textContent + "Z' AS compte_a;"+
                    "SELECT 'OK' AS resultat"
                }
            ]
            const statut = RequeteSQL(document.getElementById('exercice-en-cours').textContent,json_select)
            
            statut.then(function(result) {
                if (result[0].resultat==='OK') ouvrirBalanceAuxiliaire()
            }, function(err) {
                console.error(err.message); // Error: "It broke"
            });
      
        }
        if (is_open===false){
            setTimeout(cacher, 100);
            function cacher() {
                let nodeList = document.querySelectorAll("[alt='btn-tableau']")
                for (let i = 0; i < nodeList.length; i++) {
                        nodeList[i].hidden = true;
                }    
            }
            
        }
    }

    const ouvrirBalanceAuxiliaire = () =>{
        let baseTable={
          bdd:document.getElementById('exercice-en-cours').textContent,
          table_name:'balance_auxiliaire',
          table_maitre:'',
          cle_maitre:'',
          table_detail:'',
          etrange_detail:'',
          type_cle:'',
          is_to_update:false
        }

        const SaisieElement = Donnees(baseTable) ;
        ReactDOM.render(<SaisieElement/> , document.getElementById('WorkSpace'));
        document.getElementById('menu-etat-gauche').setAttribute('style',"display: none;")
    };


    
    let color_enter=''
      const EnterTR=(e)=>{
        if (e.target.tagName === 'TD'){
            color_enter=e.target.parentElement.style.background
            e.target.parentElement.style.background='PaleTurquoise'
          }
    }
      
    const LeaveTR=(e)=>{
        if (e.target.tagName==='TD'){
          e.target.parentElement.style.background = color_enter
        }
    }
    
    const couleur_zebre=['LightGreen','LightGrey','LightCoral','LightGoldenrodYellow','LightSteelBlue']
    let col_change='id'//au lieu de col_change='id' 

    colonnes.forEach(colonne=>{
        if (colonne.change_color===true)
        col_change=colonne.column_name
    })
    
    let val_tal="";
    let iteration_zebre=0;
    const coul_zebre = (val)=>{
      if (val!==val_tal){
          iteration_zebre = iteration_zebre+1 // iteration_zebre=1
          val_tal=val
      }
      return iteration_zebre % couleur_zebre.length
    }
    
    return(
        <div  id={'jrnx-'+gogo.table_name} class="modal fade">
            <div id='modal'show={false} class="modal-dialog modal-xl" role="document">
                <div show={false} class="modal-content">
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style={{marginTop: '-1,5rem',textAlign:'right'}}>×</span>
                    </button>
                <p id={'btn-cible-'+gogo.table_name}>eto no apetrake ny cible</p>
                    <div class="modal-body">
                        <table border="2" class="table table-striped"> 
                            <thead className="thead-success" style ={{background:'black',color:'white'}}>
                                <tr>
                                        {colonnes.map((col,i)=>(
                                            col.affiche_tableau===true?<th>{col.description}</th>:null ))} 
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((dev,i)=>(
                                    <tr id={i} 
                                        key={dev.id} 
                                        onMouseEnter={(e)=>EnterTR(e)} 
                                        onMouseLeave={(e)=>LeaveTR(e)} 
                                        style={{background:couleur_zebre[coul_zebre(dev[col_change])]}}
                                    >
                                    { 
                                        colonnes.map((col,i)=>(
                                            col.affiche_tableau===true?<td>{
                                            // col.lien
                                            col.masque==='Liste'?
                                                dev['lib_'+col.column_name]:
                                                (col.lien==null ? dev[col.column_name]:
                                                    (<button  alt={dev[col.column_name]} 
                                                        data-dismiss="modal" 
                                                    // class="btn btn"    
                                                    // style={{padding:"0",background: 'rgba(255,255,255,0)'}}
                                                        onClick={e => Close(e)}>
                                                        {gogo.table_name==='situation_periode'
                                                        ?dev[col.column_name].length<=12
                                                            ?<FaLock alt={dev[col.column_name]}/>
                                                            :dev[col.column_name].substring(11, 17)==='ouvert'
                                                                ?<FaFolderOpen alt={dev[col.column_name]}/>
                                                                :<FaFolder alt={dev[col.column_name]}/>
                                                        :dev[col.column_name]}
                                                        
                                                    </button>))
                                            }</td>:null
                                        ))
                                    }
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TypeJournaux;