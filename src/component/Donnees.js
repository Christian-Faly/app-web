import React,{useState,useEffect, useRef, Fragment } from 'react';
import ReactDOM from 'react-dom';
import LigneVide from './LigneVide';
import RequeteSQL from './RequeteSQL';
import deleteData from './Delete'

import {changeSlave} from "./Masques/TypeWidget/Deroulante"
import Tableau from './Tableau' 
import MasqueModal from "./Masques/MasqueModal";
import SaisieMaitre from './SaisieMaitre'
import RecherchePoussee from './RecherchePoussee'

import BarreOutils from './BarreOutils'
import {useReactToPrint} from 'react-to-print';
import MasquePlat from "./Masques/MasquePlat";
import TabSel from './TabSel'
import ChampDebSel from './champDebSel'
import ListeDetail from './ListeDetail';



function Donnees(baseTable){
   console.log(baseTable)
  const Array = () => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onAfterPrint: () => alert('Print success')
    })

    const champs = ChampDebSel(baseTable.bdd,baseTable.table_name)
    // console.log(champs)
    
    const isDebSel = (champs.length ===1)
    let baseSelection = {}
    if (isDebSel) {
      baseSelection = {
        bdd:baseTable.bdd,
        table_name:champs[0].ndfliste,
        idDestination:champs[0].code,
        description:champs[0].lstfield,
        idOrigine:champs[0].keyfield,
        champ_critere_debsel:champs[0].champ_critere_debsel
      }
    }
    baseTable['codeDebSel'] =''
    if (isDebSel) 
      baseTable['codeDebSel'] = champs[0].code
//===============================

const[data,setData]= useState([])
const nb_ligne = data.length

let json_critere = [
    {vide :''}
  ]

  if (baseTable.etrange_detail==null)
    json_critere[0]['vide'] = ''
  else{
    json_critere[0][baseTable.etrange_detail] = baseTable.valeur_detail
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
  
      let jsonData = await response.json();
      setData(jsonData);
    } catch(err) {
      console.error(err.message);
    }
  }
  
  useEffect(() =>{
    getData(baseTable.bdd,baseTable.table_name);
  
  }, []);
  

//===================== masque tableau =================

//   baseMaskTab['colonnes'] = LigneVide(baseMaskTab,1);

const detailTab = ListeDetail(baseTable.bdd,baseTable.table_name,'Tableau')


const existMaskTab = detailTab.length>0

let detailTab0 = {}

if (existMaskTab===true){
  detailTab0 = detailTab[0]
}

baseTable['detailTab0'] = detailTab0
baseTable['existMaskTab'] = existMaskTab;

function filtrage(filtres){
  
  let data3 ={
    ligne:data
  }
  var totFiltre="ligne[*"
  var i=0
  let op = ''
  filtres.forEach((filtre)=>{
    if (filtre.val>''){
      if (i>0)
        totFiltre=totFiltre+' & '
      if (filtre.op==='Contient')
        op = ' ^= '
      else 
        op = filtre.op
      totFiltre = totFiltre + filtre.col + op + filtre.val
      i=i+1
    }
  })
  totFiltre=totFiltre+"]"
  
  
  let result = jsonQuery(totFiltre, {data:data3})
  return result.value;
}

//=======================================
    var  result_value = data
    const nb_elt_tableau = data.length
    const filtrer = async (filtres) =>{
      result_value = filtrage(filtres);
      calculPage(true)
    }

    // ========= Ajout et modification =================
    const colonnes = LigneVide(baseTable,1);
    
    let col_change_color = 'id'
    let col_debit = ''
    let col_credit = ''
    let col_text_report = ''
    let col_titre_1 = ''
    let col_titre_2 = ''
    let col_titre_3 = ''
    let ajout = {};
    colonnes.forEach( (value,i) =>{ 
      ajout[value.column_name] = null;
      if (value.change_color === true) col_change_color = value.column_name 
      if (value.is_col_debit === true) col_debit = value.column_name
      if (value.is_col_credit === true) col_credit = value.column_name
      if (value.is_text_report === true) col_text_report = value.column_name
      if (value.rang_titre === 1) col_titre_1 = value.column_name
      if (value.rang_titre === 2) col_titre_2 = value.column_name
      if (value.rang_titre === 3) col_titre_3 = value.column_name
    });

    const [donneeAjout, setDonneeAjout] = useState(ajout);//
    const [donneeChange, setDonneeChange] = useState({});//
    const handleChangeAjout = (e) =>{

    const target = e.target;
    
      let value = target.type === 'checkbox' ? target.checked : target.value;

      if (target.type === 'select-one'){
        changeSlave(e.target);
      }
    
      if (target.type === 'checkbox')
        value = !value;
      
      const name = target.name;
      const clone = {...donneeAjout,...{[name]: value}};
      setDonneeAjout(clone);
      setDonneeChange({...donneeChange,...{[name]: value}});
    }
    
    const clickAjout = async e =>{
      console.log('ClickAjoutDonnee')
      document.getElementById('titre_modal').textContent='Ajouter';
      document.getElementById('statut-enregistrement').textContent='';
      setForm(ajout)// vider la masque de saisie
      colonnes.forEach(element=>{
        let input = document.getElementById('saisie-' + element.column_name);
        // console.log(input.type)
        try {
          
          if (input.type === 'select-one')
            input.value = document.getElementById('default-' + element.column_name).value
          else
            input.value = ''  
        } catch (error) {
          console.log(error.message,element.column_name)  
        }
        if (element.desable_on_modif === true) input.removeAttribute("disabled");
      })
    }

    const submitAjout = async e =>{
        if (document.getElementById('titre_modal').textContent==='Ajouter') {
          // ======= Gerer saisie obligatoire champs not null
          // let chemin = donneeAjout['chemin'];
          // if (chemin ===undefined){
          //   alert('saisie chemin obligatoire')
          // }else{
           
            // try {
            //       fetch("http://localhost:5000/creerbdd/"+chemin,{
            //       method : 'POST'
            //   }); 
            // } catch (err) {
            //     console.error(err.message);
            // }
            
            try {
              const body = donneeAjout;
                  fetch("http://localhost:5000/ajout/"+baseTable.bdd+"/"+baseTable.table_name,{
                  method : 'POST',
                  headers : {'Content-Type' : "application/json"},
                  body : JSON.stringify(donneeAjout)
              }); 
              // window.location = '/';
              e.preventDefault();
        
              insertLine ({...ajout,...donneeAjout})        
            } catch (err) {
              console.error(err.message);
            }
             
          // }
        }else{
          try {
            let id = document.getElementById('id_modif').textContent;
            fetch("http://localhost:5000/modif/"+baseTable.bdd+"/"+baseTable.table_name+"/"+id,{
                 method : 'PUT',
                 headers : {'Content-Type' : "application/json"},
                 body : JSON.stringify(donneeChange)
             }); 
            // window.location = '/';
          } catch (err) {
            console.error(err.message); 
          }
        }
    }

    //============================== Maitre Detail =========================
    // const col_maitre={}
    
    const col_maitre = LigneVide(baseTable,2);
    const col_detail = LigneVide(baseTable,3);
    
    let donneeVide={};
    col_maitre.forEach( value =>{ 
        donneeVide[value.column_name]=null;
    })
    
    const [donneeMaitre, setDonneeMaitre] = useState({});//
    const [MaitreChange, setMaitreChange] = useState({});//
    
    const handleChangeMaitre = (e) =>{
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;//

      if (target.type === 'select-one'){
        changeSlave(e.target);
      }
   
      const name = target.name;
      setDonneeMaitre({...donneeMaitre,...{[name]: value}});
      setMaitreChange({...MaitreChange,...{[name]: value}});
    }

    const clickAjoutMaitre = () =>{
      document.getElementById('titre-modal-md').textContent='Ajout Journal';
      // document.getElementById('id_modif_md').textContent=0;
      //console.log('1')
      
      EffacerMD()
      
      //console.log('2')
      
      let ajout_maitre={};
      col_maitre.forEach( value =>{ 
          ajout_maitre[value.column_name]=null;
      });

      //console.log('3')
      let saisie_encours = document.getElementById('saisie-en-cours').textContent
      let periode = saisie_encours.substring(0,7)
      let codejrnx = saisie_encours.substring(8,10)  
      //console.log('4')
      
      const json_select = [
        {
            sql:"SELECT MAX(code) as resultat FROM journal WHERE periode = '" + periode + "' AND codejrnx='" + codejrnx + "'"
              // "SELECT 'OK' AS resultat"
        }
      ]
      const statut = RequeteSQL(document.getElementById('exercice-en-cours').textContent,json_select,'Oui')
      //console.log('5')
      statut.then(function(result) {
        setDonneeMaitre({...ajout_maitre,...{code: result[0].resultat}})
        // document.getElementById('maitre-code').value = result[0].resultat
      }, function(err) {
          console.log(err.message)
            // document.getElementById('resultat-cl').textContent='Inserez code journaux "CL"'     
      });
    
      //console.log('6')
      ajout_maitre = {...ajout_maitre,...{periode: periode}}
      ajout_maitre = {...ajout_maitre,...{codejrnx: codejrnx}}
      //console.log(ajout_maitre)
      
      setDonneeMaitre(ajout_maitre);//ajout
      
      setMaitreChange(ajout_maitre);//ajout
    }

    function EffacerMD(){
      // Effacer Maitre
    
      // let saisie_encours = document.getElementById('saisie-en-cours').textContent
      // let periode = saisie_encours.substring(0,7)
      // let codejrnx = saisie_encours.substring(8,10)  
      try{
        // col_maitre.forEach(element=>{
        //   if (element.column_name==='codejrnx')
        //     document.getElementById('maitre-' + element.column_name).value = codejrnx
        //   else if (element.column_name==='periode')
        //     document.getElementById('maitre-' + element.column_name).value = periode
        //   else
        //     document.getElementById('maitre-' + element.column_name).value=''
        
        
      }catch(err){
        console.error(err.message)
      }

      
      // Effacer Detail
      for (let i=0;i<20;i++){
        col_detail.forEach(element=>{
          try{
            document.getElementById('detail-'+i+'-'+element.column_name).value=''
          }catch(err){
            console.error(err.message)
          }
          if (i>0) document.getElementById('detail-tr-'+i).hidden=true
        })
      }
    }
    
    let fonc={
      baseTable:baseTable,
      clickAjoutMaitre:clickAjoutMaitre,
      isDebSel: isDebSel,
      colonnes:colonnes,
	  ExcelExportData : result_value
    
    }
    
    // function jsonMaitre(){
    //   let js={}
    //   col_maitre.forEach(element=>{
    //     try{
    //       let value=document.getElementById('maitre-' + element.column_name).value
    //       let name = document.getElementById('maitre-' + element.column_name).name
    //       js={...js,[name]: value}
    //     }catch(err){
    //       console.error(err.message)
    //     }
    //   })
    //   return js
    // }
  
    function NormaliserJSON(jsonDetail){
      if (baseTable.table_detail==='saisie_eltjrn'){
        for(let i=0;i<jsonDetail.length;i++){
          if (jsonDetail[i].m_debit>0){
            jsonDetail[i]['D']='D'
            jsonDetail[i]['montant'] = jsonDetail[i].m_debit
          }else{
            jsonDetail[i]['D']='C'
            jsonDetail[i]['montant'] = jsonDetail[i].m_credit
          } 
          jsonDetail[i]['journal'] = MaitreChange.code
        }
      }
      return jsonDetail
    }

    const PosterMaitre = async (id) => {
      let response
      if (document.getElementById('titre-modal-md').textContent==='Ajout Journal') {
          console.log('mandalo 1 '+ "http://localhost:5000/ajout/"+baseTable.bdd+"/"+baseTable.table_maitre)
          try {
              response = await fetch("http://localhost:5000/ajout/"+baseTable.bdd+"/"+baseTable.table_maitre,{
                      method : 'POST',
                      headers : {'Content-Type' : "application/json"},
                      body : JSON.stringify(MaitreChange)
                  }
              ); 
              //console.log('mandalo 2')
          } catch (err) {
              console.error(err.message); 
          }
      }else{
        //console.log('mandalo 3')
        try {
          response = await fetch("http://localhost:5000/modif/"+baseTable.bdd+"/"+baseTable.table_maitre+"/"+id,{
              method : 'PUT',
              headers : {'Content-Type' : "application/json"},
              body : JSON.stringify(MaitreChange)
          }); 
        } catch (err) {
          console.error(err.message); 
        }
      }
      return await response.json();
    }

    const submitMaitre = async (e,id,Detail) =>{
      // console.log(MaitreChange)
      const jsonDetail = NormaliserJSON(Detail)
      //console.log('mandalo 4')
      deleteData(baseTable.bdd, baseTable.table_detail, baseTable.cle_maitre,
                 baseTable.typ_cle, MaitreChange[tab.baseTable.cle_maitre])
      // Ajout
      //console.log('mandalo 5')
      let table_d = ''
      if (baseTable.table_detail==='saisie_eltjrn')
        table_d = 'elt_jrn'
      else 
        table_d = baseTable.table_detail
      
      const response = PosterMaitre(id)
      response.then(function(result) {
        //console.log(jsonDetail)
        // if (result[0].resultat==='OK' ){
          for(let i = 0 ; i < jsonDetail.length ; i++ ){
            try {
              fetch("http://localhost:5000/ajout/"+baseTable.bdd+"/" + table_d,{
                  method : 'POST',
                  headers : {'Content-Type' : "application/json"},
                  body : JSON.stringify(jsonDetail[i])
              }); 
            } catch (err) {
              console.error(err.message); 
            }
          }  
        // }
      }, function(err) {
        console.log(err.message)     
      }); 
    }
    
    let md={
      baseTable:baseTable,
      donneeMaitre:donneeMaitre,
      MaitreChange:MaitreChange,
      handleChangeMaitre:handleChangeMaitre,
      submitMaitre:submitMaitre,
      col_maitre:col_maitre
    }
    // ============== fin maitre et detail =================

    // passage variable widget
    let mas={
      tabl:baseTable,
      donneeAjout:donneeAjout,
      donneeChange:donneeChange,
      handleChangeAjout:handleChangeAjout,
      submitAjout:submitAjout,
      Trouve:Trouve,
      colonnes:colonnes
    }

    // ======== fin ajout ===

    //=== filtre et pagination =======
    var jsonQuery = require('json-query')
    
    const nbParPage=16;
    
    var nbPage = Math.floor(data.length/nbParPage);
    if ((data.length % nbParPage)>0){
      nbPage=nbPage+1;
    };
    let nbPageActuelle=nbPage
    
    function AReporter(nbPageActuelle){
      let reps=[
        {
          t_debit:0,
          t_credit:0
        }
      ]
      if (col_debit>''){
        for (let step = 1; step <= nbPageActuelle; step++) {
          let report={
            t_debit:0,
            t_credit:0
          }
          result_value.slice((step-1)*nbParPage+1,step*nbParPage).forEach((element)=>{
            report.t_debit = report.t_debit + element[col_debit]
            report.t_credit = report.t_credit + element[col_credit]
          })
          reps[step]=report
        }
      }
      return reps
    }
    
    let reports= AReporter(nbPageActuelle)
    
    let tabPage =[];
    for (let step = 1; step < nbPage; step++) {
      tabPage.push(step);
    }                              
        
    
    const clickPage = (x)=>{
      tab.report=reports[x-1];
      tab.a_reporter=reports[x];
      tab.data=result_value.slice((x-1)*nbParPage,(x-1)*nbParPage+nbParPage)
      // console.log(tab.data[0])
	  if ( document.getElementById('id_tableau'))
       ReactDOM.render( <Tableau tab={tab}/>, document.getElementById('id_tableau'))
      // =======nAfficher maitre=============
      // console.log('clickPage 1')
      if (tab.data.length>0)
        afficheSelected(tab.data[0])
      // console.log('clickPage 2')
    }

    const insertLine =(line)=>{
      tab.data.unshift(line)
      ReactDOM.render( <Tableau tab={tab}/>, document.getElementById('id_tableau'))
    }

    baseTable['insertLine'] = insertLine

    const tout = async e =>{
      result_value = data;
      calculPage(false)
    }

    //================== zzzz ==================

    function TrouveID(id){
      console.log('3')
        // if (baseTable.idToSelect!=undefined){
        const filtre = [ //baseTable.idToSelect
          {col : "id", val : id , typ : 'integer',op:'='},// document.getElementById('table_nom').value
        ]
        console.log(filtre)
        let dataID = filtrage(filtre)
        console.log(dataID)
        if (tab.dataID.length>0)
          afficheSelected(dataID[0])
        
      // }
    }


  function afficheSelected(ligne){
    
    let nod =''
    Object.keys(ligne).forEach(key => {
      nod = 'valeur-'+key+'-'+tab.baseTable.table_name;
      try{
        let element =document.getElementById(nod)
        if (element!==undefined)
        element.textContent = ligne[key]
      }catch{

      }
    });
  }

  function calculPage(debut){
    // console.log('calcule page 1')
    let nbPage_filtre = Math.floor(result_value.length/nbParPage)+1;
    if ((result_value.length % nbParPage)>0){
      nbPage_filtre = nbPage_filtre+1;
    };
    // let reports=[]
    reports= AReporter(nbPage_filtre)
    // console.log('calcule page 2')
    clickPage(1)
    // console.log('calcule page 3')
    // ====================== zzzzz ============
    // console.log(baseTable.idToSelect)
    if (baseTable.idToSelect!==undefined){
      TrouveID(baseTable.idToSelect)
    }
    // console.log('ici')
    if (debut === false){
      for (let step = 1; step < nbPage; step++) {
        try {
          if (step < nbPage_filtre){ 
            document.getElementById('page'+step).hidden = false;
          }else{  
            document.getElementById('page'+step).hidden = true;
          }
        }catch(err){
          console.error('page'+step,err.message)
        }
      }
    }
    
  }

    // ================= Recherche poussee =================
    function Trouve(){
      // const trouvee = RequeteSQL(baseTable)
      // trouvee.then(function(result) {
      //   result_value =result;
      //   calculPage(false)//clickPage(1)
      // }, function(err) {
      //   console.error(err.message); // Error: "It broke"
      // });
      
    }
    let ALettrer = []
    
    let tab={

      colonnes:colonnes,
      col_detail:col_detail,
      col_change_color:col_change_color,
      data :result_value.slice(1,1+nbParPage),
      baseTable:baseTable,
      report:reports[0],
      a_reporter:reports[1],
      col_debit:col_debit,
      col_credit:col_credit,
      col_text_report:col_text_report,
      col_titre_1:col_titre_1,
      col_titre_2:col_titre_2,
      col_titre_3:col_titre_3,
      setDonneeAjout:setDonneeAjout,
      setDonneeMaitre:setDonneeMaitre,
      ALettrer:ALettrer,
      componentRef:componentRef ,
      handlePrint:handlePrint,
      existMaskTab:existMaskTab,
      detailTab0:detailTab0
    }

    function Lettrer(){
      let requete = 'INSERT INTO lettrage (numelt,lettre)'+
                  'VALUES'
      const lettre = document.getElementById('dernier-lettre').textContent;
      let values =  "("+ALettrer[0].numero+",'" +lettre+"')"
      for (let i = 1;i < ALettrer.length; i++){
        values = values + ",("+ALettrer[i].numero+",'" +lettre+"')" 
      }
      requete = requete + values

      const json_select =[
        {
            sql: requete +";"+ "SELECT 'OK' AS resultat"
        }
      ]
      const statut = RequeteSQL(document.getElementById('exercice-en-cours').textContent,json_select)
      
      statut.then(function(result) {
          if (result[0].resultat==='OK') {
            document.getElementById('titre-message').textContent = 'Lettrage '+lettre     
            document.getElementById('contenu-message').textContent = 'Tache accomplie'     
          }
      }, function(err) {
          console.error(err.message); // Error: "It broke"
      });
    }
    // console.log(document.getElementById("nom-table").textContent)
    if (baseTable.table_name === 'pa_dictio_donnee'){
      const filtre = [
        {col : "nomtable", val : document.getElementById("nom-table").textContent , typ : 'varchar',op:'='},// document.getElementById('table_nom').value
      ]
      filtrer(filtre)
    }
    else{
      const filtre = [
      ]
      filtrer(filtre)
    }

    // console.log(ajout)
    const [form, setForm] = useState(ajout)
    function initForm(){
      setForm(ajout)
    } 
    baseTable['setForm'] = setForm
    baseTable['colonnes'] = colonnes
    baseTable['form'] = form
    baseTable['init'] = initForm

    if (nb_elt_tableau === 1)
      setTimeout(affiche1, 500);
       
    function affiche1() {
      // alert('eto')
        setForm(result_value[0])
    }

    return (
      <div>
          {/* <div id='id-menu-detail'>
            | */}
          {/* </div> */}
        {nb_elt_tableau >= 0
        ?
        <div> {/*className="content-wrapper"*/}
          <div className="input-option" >
            <div className="form-outline">
                { fonc['filtrer'] = filtrer}
                { fonc['tout'] = tout}
                { fonc['clickAjout'] = clickAjout}
                { fonc['Lettrer'] = Lettrer}
                { fonc['handlePrint'] = handlePrint} 
                { fonc['nb_ligne'] = ()=>nb_ligne} 
                
                { mas['bdd'] = ()=>baseTable.bdd} 
                { <BarreOutils fonc={fonc}/>}
                {baseTable.table_name==='sel_jour'
                  ?<SaisieMaitre md={md}/>
                  :<MasqueModal baseTable={baseTable} nbCols={4}/>
                }
              
                <RecherchePoussee widg={mas} fonc={fonc} /> 
            </div> 
          </div>
          <div style={{width:'100%',overflow:'hidden'}}>
            { isDebSel
              ?<div id= "div-selection" style={{height:'500',background:'yellow', float:'left',width:"0%",overflow:'auto'}}>
                <TabSel baseSelection={baseSelection}/>
              </div>
              :null
            }
            <div id='id_tableau'  style={{height:'500',float:'right', width:"100%", 
              border:'solid 4px white',overflow:'auto'}}>
              { tab['filtrer'] = filtrer} {/* overflow:'scroll,overflow-x:hidden',overflowY:'scroll' */}
              
              <Tableau tab={tab}/>
              
              {/* {tabPage.length} */}
              {tabPage.map((page,index) => (
                <button id={"page"+(index+1)} type="button" 
                  className="btn btn-sm btn-light float-left"
                  style={{margin: '5px',
                  background: '#FFE4C4'}}          
                  onClick={()=>clickPage(page)}
                  >{page}</button>
              ))}
            </div>
          </div>
          {/* <br></br>
          <br></br> */}
        </div >
        :
        <div>
          <div className="modal-header" style ={{width: '100%'}}>
            <h4 id='titre_modal' 
              className="modal-title" 
              style ={{textAlign: 'center',width: '100%',color:'red',textShadow: '#FC0 1px 0 10px'}}>
              Ajouter 
            </h4>
          </div>
          <div className="modal-header" style ={{width: '100%'}}>
            <MasquePlat baseTable={baseTable} nbCols={4} is_resume={false}/>
            </div>
        </div>
      }
      </div >
      );
  };
  return (Array);
}

export default Donnees;
