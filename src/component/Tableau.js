import React, { Fragment, useEffect, useState } from "react";
import { FaPen, FaTrash,FaCaretRight,FaCaretLeft } from 'react-icons/fa';
import deleteData from './Delete'
import {st_date, toDate} from './ControleDate'
import {debitEgaleCredit} from './JsonSaisie'
import DonneeAvecLib from './DonneeAvecLib'
import { Button, Modal } from 'react-bootstrap'
import ListeDetail from './ListeDetail';
import RequeteSQL from "./RequeteSQL";

const Tableau = ({tab}) => {

    const colonnes=tab.colonnes;
    const data=tab.data;

    const getDetail = async val_etrange =>{
      try{
          const response = await fetch ("http://localhost:5000/affiche-critere/"+
                                          tab.baseTable.bdd+"/"+tab.baseTable.table_detail+
                                          "/char/"+tab.baseTable.etrange_detail+"/"+val_etrange);
          const jsonData = await response.json();
          return jsonData
      } catch(err) {
          console.error(err.message);
      }
    }

    const clickModifMaitre = async id =>{
        document.getElementById('titre-modal-md').textContent='Modification';
        document.getElementById('id_modif_md').textContent=id;
        try{
          const response = await fetch ("http://localhost:5000/affiche-critere/"+tab.baseTable.bdd+"/"+tab.baseTable.table_maitre+"/int/id/"+id);
          const jsonData = await response.json();
          tab.setDonneeMaitre(jsonData);
          UtiliserDetail(jsonData[tab.baseTable.cle_maitre])
        } catch(err) {
          console.error(err.message);
        }
    }

    function UtiliserDetail(cle_maitre){
      const trouvee = getDetail(cle_maitre)
      trouvee.then(function(jsonDetail) {
          let det={
            bdd :tab.baseTable.bdd,
            col_detail : tab.col_detail,
            data_detail :jsonDetail,
            handleChangeDetail: (e) =>{return e.target.value}
          }
          
          //ReactDOM.render(<SaisieDetail det={det}/> , document.getElementById('tab-saisie-detail'));
          for (let i=0;i<20;i++){
            for (let j=0;j<tab.col_detail.length;j++){
              if (i < jsonDetail.length){    
                try{
                  document.getElementById('detail-'+i+'-'+tab.col_detail[j].column_name).value = jsonDetail[i][tab.col_detail[j].column_name]
                }catch(err){
                  console.error(err.message)
                }
              }else{
                try{
                  document.getElementById('detail-'+i+'-'+tab.col_detail[j].column_name).value = ''
                }catch(err){
                  console.error(err.message)
                }
              }
            }
            if (i < jsonDetail.length + 1)
              document.getElementById('detail-tr-'+i).hidden = false
            else
              document.getElementById('detail-tr-'+i).hidden = true    
          }

          if (debitEgaleCredit(jsonDetail))
                document.getElementById('debit-eq-credit').textContent = 'OK'
            else
                document.getElementById('debit-eq-credit').textContent = 'Non'

        }, function(err) {
          console.log("Error: It broke"); // err.message
        }
      );
    }
    
    var jsonQuery = require('json-query')
    
    const clickModif = async id =>{
      document.getElementById('titre_modal').textContent='Modifier';
      document.getElementById('id_modif').textContent = id;
     
      const dataDetailTab = DonneeAvecLib(tab.baseTable.bdd, tab.detailTab0.nomtable,
                                            tab.detailTab0.cle_maitre, id, tab.detailTab0.type_cle)

      console.log(dataDetailTab)

        try{
          colonnes.forEach(element=>{
            let input = document.getElementById('saisie-' + element.column_name);
            if (element.desable_on_modif===true) input.setAttribute('disabled', ''); 
            input.value=''
          })
          }catch{

          }
        console.log('modifier')  
        
        let data3 ={
          ligne:data
        }
        let result = jsonQuery("ligne[*id="+id+"]", {data:data3})
        tab.baseTable.setForm(result.value[0]) 
    }


    const deleteArray = async (typ,col,id) =>{
      deleteData(tab.baseTable.bdd,tab.baseTable.table_name,col,typ,id)
      if (tab.baseTable.table_name==='societe')
        document.getElementById('tr-societe-'+id).hidden=true
    };

  function  FiltreCompte(num_cpt){
    document.getElementById('search-compte-de').value = num_cpt
    document.getElementById('search-compte-a').value = num_cpt
  }

  
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

  const isVide = (onglet)=>{
      if(onglet.nodeName==='BUTTON') {
        var val_id = ''
        setTimeout(valeurId, 100);

        function valeurId(){
          let tab_maitre = document.getElementById('nom-table-maitre').textContent
          val_id = document.getElementById('valeur-id-'+tab_maitre).textContent
          // console.log(val_id)
          let cleEtrange = onglet.getAttribute('alt') 
          let nomTable=onglet.getAttribute('id').substring(7,100)
          let sql="SELECT COUNT(*) AS nombre , '"+nomTable+"' AS nomtable FROM "+ nomTable+" WHERE "+cleEtrange+"="+val_id
          console.log(sql)
          let json_select = [
            {
              sql: sql
            }
          ]
          let result = RequeteSQL(tab.baseTable.bdd, json_select)
          result.then(function(result) {
            if(result[0].nombre > 0)
              document.getElementById('id-btn-'+result[0].nomtable).className = 'btn btn-sm btn-success'
            else
              document.getElementById('id-btn-'+result[0].nomtable).className = 'btn btn-sm btn-secondary'
          }, function(err) {
                // document.getElementById(resultat).textContent =result[0].resultat     
          });

          
        }
        
      }
  }
  
  const ClickTR=(e)=>{
    
    try{
    const indexLigne = e.target.getAttribute('id').indexOf('ligne')
    const indexData = parseInt(e.target.getAttribute('id').substring(indexLigne+6,indexLigne+9))
    // console.log(tab.data[indexData])   
    // let nbDetail = document.getElementById('nombre-table-detail').textContent
    // for (let i=1;i<=nbDetail;i++)
      // console.log(document.getElementById())
    let ongletDetails = document.getElementById('id-onglet-detail').childNodes
    // console.log(ongletDetails)
    ongletDetails.forEach(onglet=>isVide(onglet))
      

    let nod =''
    Object.keys(tab.data[indexData]).forEach(key => {
        nod = 'valeur-'+key+'-'+tab.baseTable.table_name;
        if (document.getElementById(nod)!=undefined)
          document.getElementById(nod).textContent= tab.data[indexData][key];
      });
	}catch(error) {
		console.error(error);
	}
  }

  //'LightPink',,
  const couleur_zebre=['LightYellow','LightGreen']//'LightSalmon',,'LightGrey','LightGoldenrodYellow','LightSteelBlue'
  const col_change = tab.col_change_color//au lieu de col_change='id' 
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
  
  let a_reporter_debit = 0
  let a_reporter_credit = 0
  if (tab.a_reporter !== null && tab.a_reporter !== undefined){
      a_reporter_debit = tab.a_reporter.t_debit
      a_reporter_credit = tab.a_reporter.t_credit
  }

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

  let titre_1_tal = ''
  let is_titre_1 = true
  const insert_titre_1 = (titre_1,change)=>{
    if (titre_1 !== titre_1_tal){
      is_titre_1 = true 
      if (change===true) titre_1_tal = titre_1
    }else
      is_titre_1 =false
    return is_titre_1
  }

  let titre_1_2_tal = ''
  let is_titre_2 = true
  const insert_titre_2 = (titre_1_2, change)=>{
    if (titre_1_2 !== titre_1_2_tal){
      is_titre_2 = true 
      if (change===true) titre_1_2_tal = titre_1_2
    }else
      is_titre_2 =false
    return is_titre_2
  }

  let titre_1_2_3_tal = ''
  let is_titre_3 = true
  const insert_titre_3 = (titre_1_2_3, change)=>{
    if (titre_1_2_3 !== titre_1_2_3_tal){
      is_titre_3 = true 
      if (change===true) titre_1_2_3_tal = titre_1_2_3
    }else
      is_titre_3 =false
    return is_titre_3
  }

    
//===== grand livre =======
  let firstLineGL = true
  const setFirstLineGL_false=()=>{
    let firstLineGL_tal =  firstLineGL
    firstLineGL = false
    return firstLineGL_tal
  }
  
  var tot_debit_compte = 0
  var tot_credit_compte = 0
  var tot_debit_periode = 0
  var tot_credit_periode = 0
  
  function CalculReport(m_debit,m_credit){//
     tot_debit_periode = tot_debit_periode + m_debit
     tot_credit_periode = tot_credit_periode + m_credit
     tot_debit_compte = tot_debit_compte + m_debit
     tot_credit_compte = tot_credit_compte + m_credit
  }
  
  function ecrire_total_periode(retour){
    let d = tot_debit_periode
    let c = tot_credit_periode
    if (retour === 'd'){
      tot_debit_periode = 0
      return numStr(d,'double precision')
    }
    else{ 
      tot_credit_periode = 0
      return numStr(c,'double precision')
    }
  }

  function initialise_cumul(report_debit,report_credit){
    tot_debit_compte = report_debit 
    tot_credit_compte = report_credit
  }

  function solde_cumul(retour){
    let titre=''
    let solde_debiteur = 0
    let solde_crediteur = 0
    if (tot_debit_compte > tot_credit_compte){
      titre = 'Solde debiteur'
      solde_debiteur = tot_debit_compte - tot_credit_compte
      solde_crediteur = null
    }else{
      titre = 'Solde crediteur'
      solde_debiteur = null
      solde_crediteur =  tot_credit_compte - tot_debit_compte
    }
    switch(retour) {
      case  's': return titre;
      case  'd': return numStr(solde_debiteur,'double precision') ; 
      case  'c': return numStr(solde_crediteur,'double precision') ; 
      default :;
    }
  }

// ===== Balance =======
let firstLineBL_titre1 = true
const setFirstLineBL_titre1_false=()=>{
  let firstLineBL_titre1_tal =  firstLineBL_titre1
  firstLineBL_titre1 = false
  return firstLineBL_titre1_tal
}

let firstLineBL_titre2 = true
const setFirstLineBL_titre2_false=()=>{
  let firstLineBL_titre2_tal =  firstLineBL_titre2
  firstLineBL_titre2 = false
  return firstLineBL_titre2_tal
}

let firstLineBL_titre3 = true
const setFirstLineBL_titre3_false=()=>{
  let firstLineBL_titre3_tal =  firstLineBL_titre3
  firstLineBL_titre3 = false
  return firstLineBL_titre3_tal
}

var tot_d_prec_titre1 = 0
var tot_c_prec_titre1 = 0
var tot_d_prec_titre2 = 0
var tot_c_prec_titre2 = 0
var tot_d_prec_titre3 = 0
var tot_c_prec_titre3 = 0

var tot_d_mvt_titre1 = 0
var tot_c_mvt_titre1 = 0
var tot_d_mvt_titre2 = 0
var tot_c_mvt_titre2 = 0
var tot_d_mvt_titre3 = 0
var tot_c_mvt_titre3 = 0

var tot_d_nvsolde_titre1 = 0
var tot_c_nvsolde_titre1 = 0
var tot_d_nvsolde_titre2 = 0
var tot_c_nvsolde_titre2 = 0
var tot_d_nvsolde_titre3 = 0
var tot_c_nvsolde_titre3 = 0

function CalculTotTitre(prec_debit,prec_credit,mvt_debit,mvt_credit,ns_debit,ns_credit){//
  tot_d_prec_titre1 = tot_d_prec_titre1 + prec_debit
  tot_c_prec_titre1 = tot_c_prec_titre1 + prec_credit
  tot_d_prec_titre2 = tot_d_prec_titre2 + prec_debit
  tot_c_prec_titre2 = tot_c_prec_titre2 + prec_credit
  tot_d_prec_titre3 = tot_d_prec_titre3 + prec_debit
  tot_c_prec_titre3 = tot_c_prec_titre3 + prec_credit
  
  tot_d_mvt_titre1 = tot_d_mvt_titre1 + mvt_debit
  tot_c_mvt_titre1 = tot_c_mvt_titre1 + mvt_credit
  tot_d_mvt_titre2 = tot_d_mvt_titre2 + mvt_debit
  tot_c_mvt_titre2 = tot_c_mvt_titre2 + mvt_credit
  tot_d_mvt_titre3 = tot_d_mvt_titre3 + mvt_debit
  tot_c_mvt_titre3 = tot_c_mvt_titre3 + mvt_credit
  
  tot_d_nvsolde_titre1 = tot_d_nvsolde_titre1 + ns_debit
  tot_c_nvsolde_titre1 = tot_c_nvsolde_titre1 + ns_credit
  tot_d_nvsolde_titre2 = tot_d_nvsolde_titre2 + ns_debit
  tot_c_nvsolde_titre2 = tot_c_nvsolde_titre2 + ns_credit
  tot_d_nvsolde_titre3 = tot_d_nvsolde_titre3 + ns_debit
  tot_c_nvsolde_titre3 = tot_c_nvsolde_titre3 + ns_credit
  }

function ecrire_total_titre1(retour){
  let d_prec = tot_d_prec_titre1
  let c_prec = tot_c_prec_titre1
  let d_mvt =  tot_d_mvt_titre1
  let c_mvt =  tot_c_mvt_titre1
  let d_nvsolde = tot_d_nvsolde_titre1
  let c_nvsolde = tot_c_nvsolde_titre1

  switch (retour) {
    case 'd_prec' : tot_d_prec_titre1 = 0
      return numStr(d_prec,'double precision')
    case 'c_prec' : tot_c_prec_titre1 = 0
      return numStr(c_prec,'double precision')
    case 'd_mvt' :  tot_d_mvt_titre1 = 0
      return numStr(d_mvt,'double precision')
    case 'c_mvt' :  tot_c_mvt_titre1 = 0
      return numStr(c_mvt,'double precision')
    case 'd_nvsolde' : tot_d_nvsolde_titre1 = 0
      return numStr(d_nvsolde,'double precision')
    case 'c_nvsolde' : tot_c_nvsolde_titre1 = 0
      return numStr(c_nvsolde,'double precision')
    default :;
    }
  }

  function ecrire_total_titre2(retour){
    let d_prec = tot_d_prec_titre2
    let c_prec = tot_c_prec_titre2
    let d_mvt =  tot_d_mvt_titre2
    let c_mvt =  tot_c_mvt_titre2
    let d_nvsolde = tot_d_nvsolde_titre2
    let c_nvsolde = tot_c_nvsolde_titre2
  
    switch (retour) {
      case 'd_prec' : tot_d_prec_titre2 = 0
        return numStr(d_prec,'double precision')
      case 'c_prec' : tot_c_prec_titre2 = 0
        return numStr(c_prec,'double precision')
      case 'd_mvt' :  tot_d_mvt_titre2 = 0
        return numStr(d_mvt,'double precision')
      case 'c_mvt' :  tot_c_mvt_titre2 = 0
        return numStr(c_mvt,'double precision')
      case 'd_nvsolde' : tot_d_nvsolde_titre2 = 0
        return numStr(d_nvsolde,'double precision')
      case 'c_nvsolde' : tot_c_nvsolde_titre2 = 0
        return numStr(c_nvsolde,'double precision')
      default :;
      }
    }

    function ecrire_total_titre3(retour){
      let d_prec = tot_d_prec_titre3
      let c_prec = tot_c_prec_titre3
      let d_mvt =  tot_d_mvt_titre3
      let c_mvt =  tot_c_mvt_titre3
      let d_nvsolde = tot_d_nvsolde_titre3
      let c_nvsolde = tot_c_nvsolde_titre3
    
      switch (retour) {
        case 'd_prec' : tot_d_prec_titre3 = 0
          return numStr(d_prec,'double precision')
        case 'c_prec' : tot_c_prec_titre3 = 0
          return numStr(c_prec,'double precision')
        case 'd_mvt' :  tot_d_mvt_titre3 = 0
          return numStr(d_mvt,'double precision')
        case 'c_mvt' :  tot_c_mvt_titre3 = 0
          return numStr(c_mvt,'double precision')
        case 'd_nvsolde' : tot_d_nvsolde_titre3 = 0
          return numStr(d_nvsolde,'double precision')
        case 'c_nvsolde' : tot_c_nvsolde_titre3 = 0
          return numStr(c_nvsolde,'double precision')
        default :;
        }
      }
    

function maj_liste_lettrer(e){
  let elt ={
    numero:0,
    montant:0
  }
  elt.numero  = e.target.getAttribute('alt')
  elt.montant  = e.target.getAttribute('placeholder')
   
  if(e.target.checked === true){
    if (!InclusALettrer(elt.numero))
      tab.ALettrer.push(elt)
  }else{
    if (InclusALettrer(elt.numero)){
      let index = tab.ALettrer.indexOf(elt)
      tab.ALettrer.splice(index,1)
    }
  }
  CalculALettrer()
  console.log(tab.ALettrer)
}

function InclusALettrer(num_elt){
  let trouvee = false
  for (let i=0;i<tab.ALettrer.length;i++)
    if (tab.ALettrer[i].numero === num_elt){
      trouvee = true
    }
  return trouvee
}

function CalculALettrer(){
  let total = 0  
  for (let i=0;i<tab.ALettrer.length;i++)
    total = total + parseInt(tab.ALettrer[i].montant)
  document.getElementById('montant-a-lettrer').textContent = numStr(total,'double precision')
  return total
}

function RafaichirPage(){
  let checkboxes = document.querySelectorAll("[type='checkbox']");
  checkboxes.forEach(checkbox => {
    if (InclusALettrer(checkbox.getAttribute('alt')))
      checkbox.checked = true
    else
      checkbox.checked = false
  })
}

setTimeout(RafaichirPage, 250);

  return (
    <div ref={tab.componentRef} style={{width:'100',height: window.innerHeight}}>  
    <table border="2" className="table" 
      style ={{borderSpacing: '0',
      borderCollapse: 'separate',
      borderRadius: '20px',
      border: '1px solid black', margin: '0px 0px 23px 0 '}}
    > 
    {/* className="table table-striped" */}
      <thead className="thead-success">
        {tab.col_debit>''
          ?
            <tr>
              <th></th>
              {colonnes.map((col,i)=>(
                col.affiche_tableau===true
                  ?(col.column_name===tab.col_text_report
                    ?<th>Report</th>
                    :(col.column_name===tab.col_debit
                      ?<th>{tab.report.t_debit}</th>
                      :(col.column_name===tab.col_credit
                        ?<th>{tab.report.t_credit}</th>
                        :<th style ={{background:'black',color:'white'}}></th>
                      )
                    )
                  ):null 
                ))} 
            </tr>
          :null
        }
        {tab.baseTable.table_name ==='grand_livre'
          ? null
          :<Fragment>
            {tab.baseTable.table_name.substring(0, 7) ==='balance'
              ?<tr style={{"text-align":'center'}}>
                <th colspan='3 ' style={{background:'white'}}></th>
                <th colspan='2'>Soldes precedents</th>
                <th colspan='2'>Totaux mouvements</th>
                <th colspan='2'>Nouveaux soldes</th>
              </tr>
              :null
            }
            <tr>
              <th></th>
              {colonnes.map((col,i)=>(
                col.affiche_tableau===true
                  ?<th style={{"text-align":'center',background:'black',color:'white'}}>{col.description}</th>
                  :null 
              ))} 
              </tr>
          </Fragment>
        }
      </thead>
            
      <tbody>
        {data.map((dev,j)=>((
          <Fragment>
            {/* ===================== Total apres donnees =========================*/}
            {/*  Total sous titre 2 grand livre*/}
            {(setFirstLineGL_false()===false)
                &&(insert_titre_2(dev[tab.col_titre_1]+dev[tab.col_titre_2],false)===true)
                && (tab.baseTable.table_name==='grand_livre')
              ?  
              <Fragment>
                <tr>
                  <td></td>
                  <td colspan="5"></td>
                  <td  style={{background:'LightGrey', "text-align":'right'}}>Total periode</td>                
                  <td  style={{background:'LightGrey',"text-align":'right'}}>{ecrire_total_periode('d')}</td>
                  <td  style={{background:'LightGrey',"text-align":'right'}}>{ecrire_total_periode('c')}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colspan="5"></td>
                  <td  style={{background:'LightGrey', "text-align":'right'}}>Total cumul</td>                
                <td  style={{background:'LightGrey',"text-align":'right'}}>{numStr(tot_debit_compte,'double precision')}</td>
                  <td  style={{background:'LightGrey',"text-align":'right'}}>{numStr(tot_credit_compte,'double precision')}</td>
                </tr>
                <tr>
                  <td></td>
                  <td colspan="5"></td>
                  <td  style={{background:'LightGrey', "text-align":'right'}}>{solde_cumul('s')}</td>                
                  <td  style={{background:'LightGrey',"text-align":'right'}}>{solde_cumul('d')}</td>
                  <td  style={{background:'LightGrey',"text-align":'right'}}>{solde_cumul('c')}</td>
                </tr>
              </Fragment>
                 :null
                
            }
          
            {/*  Total sous titre 3 Balance*/}
            {(setFirstLineBL_titre3_false()===false)
                &&(insert_titre_3(dev[tab.col_titre_1]+dev[tab.col_titre_2]+dev[tab.col_titre_3],false)===true)
                && (tab.baseTable.table_name.substring(0, 7) ==='balance')
              ?<Fragment>
                <tr >
                  <td></td>
                  <td></td>
                  <td style={{"text-align":'right'}}>{'Total '+dev[tab.col_titre_3]} </td>                
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre3('d_prec')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre3('c_prec')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre3('d_mvt')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre3('c_mvt')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre3('d_nvsolde')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre3('c_nvsolde')}</td>
                </tr>
              </Fragment>
                :null
            }

            {/*  Total sous titre 2 Balance*/}
            {(setFirstLineBL_titre2_false()===false)
                &&(insert_titre_2(dev[tab.col_titre_1]+dev[tab.col_titre_2],false)===true)
                && (tab.baseTable.table_name.substring(0, 7) ==='balance')
              ?<Fragment>
                <tr >
                  <td></td>
                  <td></td>
                  <td style={{"text-align":'right'}}>{'Total '+dev[tab.col_titre_2]} </td>                
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre2('d_prec')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre2('c_prec')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre2('d_mvt')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre2('c_mvt')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre2('d_nvsolde')}</td>
                  <td style={{background:'LightGrey', "text-align":'right'}}>{ecrire_total_titre2('c_nvsolde')}</td>
                </tr>
              </Fragment>
                :null
            }

            {/*  Total sous titre 1 Balance*/}
            {(setFirstLineBL_titre1_false()===false)
                &&(insert_titre_1(dev[tab.col_titre_1],false)===true)
                && (tab.baseTable.table_name.substring(0, 7) ==='balance')
              ?<Fragment>
                <tr style={{ "text-align":'right'}}>
                  <td></td>
                  <td></td>
                  <td>{'Total'+dev[tab.col_titre_1]}</td>                
                  <td style={{background:'LightGrey'}}>{ecrire_total_titre1('d_prec')}</td>
                  <td style={{background:'LightGrey'}}>{ecrire_total_titre1('c_prec')}</td>
                  <td style={{background:'LightGrey'}}>{ecrire_total_titre1('d_mvt')}</td>
                  <td style={{background:'LightGrey'}}>{ecrire_total_titre1('c_mvt')}</td>
                  <td style={{background:'LightGrey'}}>{ecrire_total_titre1('d_nvsolde')}</td>
                  <td style={{background:'LightGrey'}}>{ecrire_total_titre1('c_nvsolde')}</td>
                </tr>
              </Fragment>
                :null
            }

            {/* ==================== titre avant donnees ========================= */}
          {/* insertion titre 1 principale    */}
          {insert_titre_1(dev[tab.col_titre_1],true)===true && (tab.col_titre_1>'')
            ?<tr style={{background:'LightCoral'}}>
                <td>{initialise_cumul(dev['report_debit'],dev['report_credit'])}</td>
                <td colspan={tab.baseTable.table_name==='grand_livre'?'6':'8'}
                >
                  {dev[tab.col_titre_1]}
                </td>
                {tab.baseTable.table_name==='grand_livre'
                ?<Fragment>
                  <td>{document.getElementById('etat-date-de').value}</td>
                  <td>{document.getElementById('etat-date-a').value}</td>
                </Fragment>
                :null
              }
              </tr>
             :null
          }
          
          {(insert_titre_2(dev[tab.col_titre_1]+dev[tab.col_titre_2],true)===true && tab.col_titre_2>'')
            ?<Fragment>
              {/* insertion sous titre 2 */}
              <tr style={{background:'LightPink'}}>
                <td></td>
                <td colspan="8">{dev[tab.col_titre_2]}</td> 
              </tr>
    
              {/*  Insertion solde */is_titre_1}
              {tab.baseTable.table_name==='grand_livre'
                ? <Fragment>
                    <tr style={{}}>
                      <td></td>
                      <td colspan="5"></td>
                      <td  style={{background:'LightPink', "text-align":'right'}}>{solde_cumul('s')}</td>                
                      <td  style={{background:'LightPink',"text-align":'right'}}>{solde_cumul('d')}</td>
                      <td  style={{background:'LightPink',"text-align":'right'}}>{solde_cumul('c')}</td>
                    </tr> 
          
                    {/* insertion report */}
                    <tr style={{}}>
                      <td colspan="6"> </td>
                      <td style={{background:'LightPink',"text-align":'right'}}>Report</td>                
                      <td style={{background:'LightPink',"text-align":'right'}}>{numStr(tot_debit_compte,'double precision')}</td>
                      <td style={{background:'LightPink',"text-align":'right'}}>{numStr(tot_credit_compte,'double precision')}</td>
                    </tr>
            
                {/* insertion entete des colonnes */}
                <tr style = {{background:'grey', color:'white'}}>
                  <td></td>
                  {colonnes.map((col,i)=>(
                    col.affiche_tableau===true?<th>{col.description}</th>:null 
                  ))}
                </tr>
              </Fragment>
                :null
              }</Fragment>
            :null
          }

          {/* insertion sous titre 3 */}    
          {(insert_titre_3(dev[tab.col_titre_1]+dev[tab.col_titre_2]+dev[tab.col_titre_3],true)===true && tab.col_titre_3>'')
            ? 
            <tr style={{background:'Bisque'}}>
              <td></td>
              <td></td>
              <td colSpan='7'>{dev[tab.col_titre_3]}</td>
            </tr>
            
            :null
          }
          {/* =========== donnees tableau =========*/}
           <tr id={'tr-'+tab.baseTable.table_name+'-'+dev.id} 
               key={dev.id} 
               onMouseEnter={(e)=>EnterTR(e)} 
               onMouseLeave={(e)=>LeaveTR(e)} 
               onClick = {(e)=>ClickTR(e)}
               style={{background:couleur_zebre[coul_zebre(dev[col_change])]}}>
    
              {/* bouton mise-a-jour */}
               <td style={{ color: 'red' }}>
               {tab.baseTable.table_name ==='grand_livre' 
                ?CalculReport(dev['m_debit'],dev['m_credit'])
                :(tab.baseTable.table_name.substring(0, 7) ==='balance'
                  ?CalculTotTitre(dev['report_debit'],dev['report_credit'],dev['m_debit'],
                                  dev['m_debit'],dev['debiteur'],dev['crediteur'])
                  :null)
                }
               <button id={`#id${dev.id}`} alt='btn-tableau' type="button" style={{padding:"0",background: 'rgba(255,255,255,0)'}}
                   className="btn btn" 
                   data-toggle="modal"
                   data-dismiss="modal"
                   data-target={
                     tab.baseTable.is_to_update===true
                      ? (tab.baseTable.table_name==='sel_jour'
                        ?`#id1`
                        :`#id2`
                      )
                      :null} 
                   onClick= {tab.baseTable.is_to_update===true
                               ?(
                                  tab.baseTable.table_name==='sel_jour'
                                    ?()=>clickModifMaitre(dev.id_maitre)
                                    :()=>clickModif(dev.id)
                                )
                                :()=>{}
                            }
                 >
                   {tab.baseTable.is_to_update===true
                    ?<FaPen/> 
                    :<FaCaretRight/>
                   }
                 </button>
               </td>

              {/* affiche donnees tableau */}
              { 
                colonnes.map((col,k)=>(
                  col.affiche_tableau===true
                    ?<Fragment>
                      <td id ={col.column_name+'-ligne-'+j} 
                        style={col.data_type==='double precision'?{'text-align': 'right'}:{ 'text-align': 'left' }}>
                        {
                        (col.masque==='Liste' || col.masque==='DebSel') && col.column_name!=='fokontany'
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
                                      onClick={(e)=>maj_liste_lettrer(e)} 
                                    />
                                    <label>{dev[col.column_name]}</label>                  
                                </Fragment>
                                :numStr(dev[col.column_name],col.data_type)
                            )
                            :<a href="#" 
                              onClick={(e) => {
                                if(col.column_name==='compte')
                                  FiltreCompte(dev[col.column_name])
                                // else  
                                  // ouvrirExercice(e,j)
                              }}
                            >{dev[col.column_name]}</a>
                        }
                      </td>
                    </Fragment>
                    :null
               ))}

              {/* bouton suppression */}
              <td>
                <button className='btn btn' alt='btn-tableau'
                         style={{padding:"0",background: 'rgba(255,255,255,0)'}}
                         onClick={tab.baseTable.is_to_update===true
                            ?()=>deleteArray('id','typ',dev.id)
                            :()=>{}
                           }> 
                    {tab.baseTable.is_to_update===true
                    ?<FaTrash/> 
                    :<FaCaretLeft/>
                   }
                </button>
              </td>
           </tr>
           
           </Fragment>
         )))} 
        {tab.col_debit>''
          ?
            <tr>
              <th>FFGFGF</th>
              {colonnes.map((col,i)=>(
                col.affiche_tableau===true
                  ?(col.column_name===tab.col_text_report
                    ?<th>A reporter</th>
                    :(col.column_name===tab.col_debit
                      ?<th>{a_reporter_debit}</th>
                      :(col.column_name===tab.col_credit
                        ?<th>{a_reporter_credit}</th>
                        :<th></th>
                      )
                    )
                  ):null 
                ))} 
            </tr>
          :null
        }   
      </tbody>
      </table>
      </div>
          
    )}

    export default Tableau;