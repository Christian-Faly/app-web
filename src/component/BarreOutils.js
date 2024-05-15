import React, { Fragment, useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ObtenirListeChamps from './ObtenirListeChamps';
import ExportExcel from './excelexport' ; 

const BarreOutils = ({fonc})=>{

    const listeChamps = ObtenirListeChamps(fonc.baseTable.bdd,fonc.baseTable.table_name)


    function DateOpChange(e){
        const dt = new Date(e.target.value)
        const jour = dt.getUTCDate()
        let st_jour=''
        if (jour<10) 
            st_jour = '0' + jour
        else 
            st_jour = jour
        const month = dt.getUTCMonth()+1
        let st_month=''
        if (month<10) 
            st_month = '0' + month
        else 
            st_month = month
        let periode = dt.getUTCFullYear() +'/' +st_month
        let daty = dt.getUTCFullYear() +'-' +st_month +'-' + st_jour
        if (e.target.getAttribute('id')==='search-date-de'){ 
            if (e.target.value>''){
                document.getElementById('search-periode').value = periode
                document.getElementById('val-date-a').textContent = daty
            }else
                document.getElementById('search-periode').value = null
            
            document.getElementById('val-date-de').textContent = daty
        }
        if (e.target.getAttribute('id')==='search-date-a')
            document.getElementById('val-date-a').textContent = daty
        filtrerTout()
    }
    function filtrerTout(){
        let filtrer_tout=[]
                filtrer_tout=[
                    {col : document.getElementById('choix-champs').value, val : document.getElementById('saisie-champs').value,typ : 'varchar',op:'='},
                ]
        fonc.filtrer(filtrer_tout)
    }

    function afficherTout(){
        let afficher_tout=[]
        try{ document.getElementById('search-periode').value = '' }catch{}
        try{ document.getElementById('val-date-de').textContent = ''}catch{}
        try{ document.getElementById('val-date-a').textContent = ''}catch{}
        try{ document.getElementById('search-journaux').value =''}catch{}
        try{ document.getElementById('search-compte-de').value = ''}catch{}
        try{ document.getElementById('search-compte-a').value = ''}catch{}
        fonc.filtrer(afficher_tout)
    }
    
    function debutSelection(e){
        if (e.target.textContent === 'Debut selection'){
            e.target.textContent = 'Fin selection'
            document.getElementById("div-selection").style.width = '50%'
            document.getElementById('id_tableau').style.width = '50%'
        }else{
            e.target.textContent = 'Debut selection'
            document.getElementById("div-selection").style.width = '0%'
            document.getElementById('id_tableau').style.width = '100%'
        }
    }

    // console.log(OutilAjouter.includes(fonc.baseTable.table_name))
    return(
        <div>
            <p hidden id= 'titre-tableau' style={{textAlign:'center',margin:'0px 0px 0px 0px',
                                        fontSize:'20px',fontWeight:'bold'}}> {fonc.baseTable.table_name}
            
            </p>
            <div className="form-inline">
                <span>{'Nombre : '+fonc.nb_ligne()}</span>
                <button id='btn-ajouter' type="button" 
                    style={{margin:'5px'}} 
                    className="btn btn-sm btn-primary"
                    data-toggle="modal"
                    data-target={fonc.baseTable.cle_maitre >''?`#id1`:'#id2'}
                    onClick={()=>{fonc.clickAjout()}}
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
                    ))
                    } 
                </select>
    
                <input className="form-control" type='text' 
                style={{ padding: "10px 20px", width:'200px'}}
                    id='saisie-champs'  
                    placeholder='A saisir' 
                    onChange={(e)=>{
                        if (e.target.value.length===7)
                            filtrerTout()
                        }
                    }
                />
                
                {/* date picker de  */}
                <span ></span>               
                {/* <Form.Control hidden id='search-date-de' type="date" name="dob" placeholder="Date of Birth" style={{width:"160px"}}
                    onChange = { 
                        (e)=>{
                            document.getElementById('search-date-a').value=e.target.value
                            DateOpChange(e)
                        }
                    }
                />
                    <span hidden id='val-date-de'>date de</span>                */}
                {/* date picker a  */}
                {/* <Form.Control hidden  id='search-date-a' type="date" name="dob" placeholder="Date of Birth" style={{width:"160px"}}
                    onChange = { 
                        (e)=>{DateOpChange(e)}
                    }
                /> */}
                <span hidden id='val-date-a'>date a</span>
                <span ></span>               
        
               <button id='btm-filtrer-tout' type="button" 
                    style={{margin:'5px'}} 
                    className="btn btn-sm btn-primary"
                    onClick={()=>{filtrerTout()}}
                >
                    <i className="fas fa-search"/>
                </button>
                
                <button id='btm-afficher-tout' type="button" 
                    style={{margin:'5px'}} 
                    className="btn btn-sm btn-primary"
                    onClick={()=>{afficherTout()}}>
                    Tout
                </button> 
                
            
                <button id='btn_recherche' type="button" 
                    style={{margin:'5px'}} 
                    className="btn btn-sm btn-primary float-right"
                    data-toggle="modal"
                    data-target={`#poussee`}
                >
                    <i className="fas fa-search"/>
                    Recherche pousee
                </button> 

                <button 
                    style={{margin:'5px'}} 
                    className="btn btn-sm btn-primary float-right" 
                    onClick = {fonc.handlePrint}
                >
                    Impression
                </button>
        
                {fonc.isDebSel    
                    ?<button id='btn-DebSel' className="btn btn-sm btn-primary float-right" 
                        onClick = {(e)=>debutSelection(e)}
                    >
                        Debut selection
                    </button>
                    :null
                }
				<ExportExcel excelData = { fonc.ExcelExportData } fileName = {"ExcelExport"} />
            </div>    
                       
        </div>
   )
}

export default BarreOutils;