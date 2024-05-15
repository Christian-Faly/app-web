import React,{ useEffect, useState } from "react"
import WidgetSaisie from './Masques/WidgetSaisie'
import LigneVide from './LigneVide'
import {RecupJSonDetail,debitEgaleCredit} from './JsonSaisie'

const SaisieMaitre = ({md}) => {
    md.col_maitre = md.col_maitre.filter(
            function(value, index, arr){ 
        return value.affiche_masque===true;
    });

    // ======================== Detail =======================
    
    const col_detail = LigneVide(md.baseTable,3);
    let tab=[]
    for(let i=0;i<20;i++){
      tab[i]=i
    }

    function SubmitSaisie(e){
        if (document.getElementById('debit-eq-credit').textContent === 'OK'){
            let jsonDetail = RecupJSonDetail(col_detail)
            md.submitMaitre(e,0,jsonDetail)
        }
    } 

    function AfficherLigneSuivant(e){
        const st = e.target.getAttribute('id') 
        const i = st.lastIndexOf('-')
        const j = st.indexOf('-')
        let k = parseInt(st.substring(j+1, i)) + 1
        document.getElementById('detail-tr-'+ k).hidden = false
        if ((e.target.getAttribute('name') === 'm_debit') || (e.target.getAttribute('name') === 'm_credit') ){
            
            let jsonDetaill = RecupJSonDetail(col_detail)
            if (debitEgaleCredit(jsonDetaill))
                document.getElementById('debit-eq-credit').textContent = 'OK'
            else
                document.getElementById('debit-eq-credit').textContent = 'Non'
        }
    }
    // const getDetail = async codejrnx =>{
    //     try{
    //         const response = await fetch ("http://localhost:5000/affiche-critere/"+md.baseTable.bdd+"/"+md.baseTable.table_detail+"/char/codejrnx/"+codejrnx);
    //         const jsonData = await response.json();
    //         return jsonData
    //     } catch(err) {
    //         console.error(err.message);
    //     }
      
    // }
   
    // let trouvee=getDetail(md.donneeMaitre['code'])
    // trouvee.then(function(result) {
    //     console.log(result);
    //   }, function(err) {
    //     console.log(err.message); // Error: "It broke"
    //   }
    // );
   
    // console.log(trouvee)
    // let donneeDetail=getDetail  

    

    return(
        <div>
            <div  id={`id1`} className="modal fade">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" 
                    style={{width:'90vw'}}
                    role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true" style={{marginTop: '-1,5rem'}}>×</span>
                        </button>

                        <div className="modal-header" style ={{width: '100%'}}>
                            <h4 id='titre-modal-md' 
                                className="modal-title" 
                                style ={{textAlign: 'center',width: '100%',color:'red',textShadow: '#FC0 1px 0 10px'}}>
                                {/* {titre} */}
                            </h4>
                        </div>
                        <div className="modal-body">
                            <form role="form" method="POST" action="">
                                <input type="hidden" name="_token" value=""/>
                                <div className="form-group"> 
                                    <table>
                                        <tbody> 
                                            {md.col_maitre.map((dev,i,array)=>(
                                                i % 3===0?
                                                <tr>
                                                    <td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                                        {dev.description}
                                                    </td>
                                                    <td>
                                                        {dev["bdd"]=()=>md.baseTable.bdd}
                                                        {dev['f']=md.handleChangeMaitre}
                                                        {dev['valeur']=()=>(md.donneeMaitre[dev.column_name])}
                                                        {dev['suffix']=()=>'maitre'}
                                                        <WidgetSaisie mas={dev}/>
                                                    </td>
                                                    {/* <td>
                                                        <button id='btm_filtre' type="button" 
                                                            style={{margin:'5px'}} 
                                                            className="btn btn-sm btn-primary"
                                                            // onClick={()=>{filtrerTout()}}
                                                            >
                                                            <i className="fas fa-search"/>
                                                        </button>
                                                    </td> */}
                                                    
                                                    {i+1===md.col_maitre.length?null:
                                                    <td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                                        {array[i+1].description}
                                                    </td>
                                                    }
                                                    
                                                    {i+1===md.col_maitre.length?null:
                                                    <td >
                                                        {array[i+1]["bdd"]=()=>md.baseTable.bdd}
                                                        {array[i+1]['f']=md.handleChangeMaitre}
                                                        {array[i+1]['valeur']=()=>(md.donneeMaitre[array[i+1].column_name])}
                                                        {array[i+1]['suffix']=()=>'maitre'}
                                                        <WidgetSaisie mas={array[i+1]}/>
                                                        </td>
                                                    }
                                                    
                                                    {/* {i+1===md.col_maitre.length?null:
                                                    <td >
                                                        <button id='btm_filtre' type="button" 
                                                            style={{margin:'5px'}} 
                                                            className="btn btn-sm btn-primary"
                                                            // onClick={()=>{filtrerTout()}}
                                                            >
                                                            <i className="fas fa-search"/>
                                                        </button>
                                                    </td>
                                                    } */}
                                    
                                                    {i+2===md.col_maitre.length?null:
                                                    <td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                                        {array[i+2].description}
                                                    </td>
                                                    }

                                                    {i+2===md.col_maitre.length?null:
                                                    <td >
                                                        {array[i+2]["bdd"]=()=>md.baseTable.bdd}
                                                        {array[i+2]['f']=md.handleChangeMaitre}
                                                        {array[i+2]['valeur']=()=>(md.donneeMaitre[array[i+2].column_name])}
                                                        {array[i+2]['suffix']=()=>'maitre'}
                                                        <WidgetSaisie mas={array[i+2]}/>
                                                    </td>
                                                    }

                                                    {/* {i+1===md.col_maitre.length?null:
                                                    <td >
                                                        <button id='btm_filtre' type="button" 
                                                            style={{margin:'5px'}} 
                                                            className="btn btn-sm btn-primary"
                                                            // onClick={()=>{filtrerTout()}}
                                                            >
                                                            <i className="fas fa-search"/>
                                                        </button>
                                                    </td>
                                                    } */}
                                                </tr>
                                                :<span></span> 
                                            ))} 
                                        </tbody> 
                                    </table> 
                                </div>
                                <div id='tab-saisie-detail' style={{overflowX: 'auto',overflowY: 'hidden'}}>                                
                                    <table border="2" className="table table-striped" style ={{width:'4000px'}}> 
                                        <thead className="thead-success" style ={{background:'black',color:'white'}}>
                                            <tr>
                                            <th hidden></th>
                                            {col_detail.map((col,i)=>(
                                            col.affiche_masque===true?
                                                (col.description==='Libelle'?<th style={{width:'300px'}}>{col.description}</th>:<th>{col.description}</th>)
                                            :null ))} 
                                            </tr>
                                        </thead>
                                            
                                        <tbody>
                                            {tab.map((dev,i)=>(
                                            <tr id={'detail-tr-'+i}>
                                                { 
                                                    col_detail.map((col,j)=>(
                                                    col.affiche_masque===true?
                                                    (
                                                    <td>      
                                                        <input id={'detail-'+i+'-'+col.column_name}
                                                            type ='text' 
                                                            className='form-control' 
                                                            name={col.column_name}
                                                            // value ={ dev[col.column_name] } 
                                                            onChange={e=>{AfficherLigneSuivant(e)}}
                                                        />
                                                    </td>):null
                                                    ))
                                                }
                                                </tr>
                                                
                                            ))} 
                                        </tbody>
                                    </table>
                                </div>
                                <div className="form-group" align="justify">
                                    <div>
                                        <label>total debit :</label>
                                        <label id='tot-debit-saisie'>debit :</label>
                                        <label style ={{marginLeft:'20px'}}>total credit :</label> 
                                        <label id='tot-credit-saisie'>credit :</label>
                                        
                                        <label style ={{marginLeft:'20px'}}>debit = credit :</label> 
                                        <label id='debit-eq-credit'> OK </label>
                                        
                                        <button type ="button" style = {{marginLeft:'20px'}}
                                            className="btn btn-warning"
                                            data-dismiss="modal"
                                            onClick={(e)=>SubmitSaisie(e)} 
                                        > Enregistrer
                                        </button>
                                        <span hidden id='id_modif_md'>0</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaisieMaitre