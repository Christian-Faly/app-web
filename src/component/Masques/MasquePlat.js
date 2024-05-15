import React, { Fragment } from "react";
import WidgetSaisie from './WidgetSaisie';
import {changeSlave} from "./TypeWidget/Deroulante"
import LigneVide from "../LigneVide"
import MasqueTab from './MasqueTab'
import RequeteSQL from "../RequeteSQL";

function MasquePlat ({baseTable,nbCols, is_resume}){ //bdd,colonnes,init
    
    let champFiltre=''
    if (is_resume===true)
        champFiltre='is_resume'
    else
        champFiltre='affiche_masque'

    let cols = baseTable.colonnes.filter(
        function(value, index, arr){ 
            return value[champFiltre]===true;
        }
    );


    let etrange_detail = baseTable.etrange_detail.substr(8,100)
    
    const onChange = (e)=>{
        const {name, value, type, checked } = e.target
  
        if (e.target.type === 'select-one'){
            changeSlave(e.target);
            baseTable.setForm((state)=>({
                ...state,['lib_'+name]: e.target.textContent
            }))
     
 
        }
        // console.log(name, value, type, checked)
  
        baseTable.setForm((state)=>({
            ...state,[name]: type ==='checkbox'? (checked===true ?'Oui':'Non') : value
        }))
    }

    const effacerMasque = (e)=>{
    
        baseTable.colonnes.forEach(element=>{
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
        })

    }

    let colsTab = []
    if (baseTable.existMaskTab===true){
        const baseMaskTab = {
            bdd : baseTable.bdd,
            table_name : baseTable.detailTab0.nomtable,
            table_detail : '',
            table_maitre : '',
        }

    colsTab = LigneVide(baseMaskTab, 1);

    }


    const enregistrerDetail = (id) =>{
        console.log(baseTable.detailTab0)
        let q
        for(q = 0; q < 10; q++){
            if(document.getElementById('mask-tab-ligne-'+q).hidden === true){
                // console.log(document.getElementById('mask-tab-ligne-'+q).hidden)
                break
            }    
        }

        if (q===1)
            return
        
        let sql = "DELETE FROM "+baseTable.detailTab0.nomtable+" WHERE "+baseTable.detailTab0.cle_maitre+"="+id+"; "
        console.log(sql)

        let colsMasque = colsTab.filter(
            function(value, index, arr){ 
                // console.log(value)
                return value.affiche_masque === true;
                
            }
        )
        
        sql = sql + "INSERT INTO "+baseTable.detailTab0.nomtable+" ("+baseTable.detailTab0.cle_maitre
        for(let p = 0; p < colsMasque.length; p++){
            sql = sql +" ,"+colsMasque[p].column_name
        }
        sql = sql + ")"

        

        sql = sql + " VALUES "
        q--

        for(let r = 0; r < q; r++){
            sql = sql + "("+id+","
            for(let s = 0; s < colsMasque.length; s++){
                try{
                    const numericType =['smallint','integer','bigint','decimal','numeric','real','double precision','smallserial','serial','bigserial'];
                    if(!numericType.includes(colsMasque[s].data_type)){
                        sql = sql + "'"+document.getElementById('masktab-'+colsMasque[s].column_name+'-ligne'+r).value+"'"
                    }
                     else
                        sql = sql + document.getElementById('masktab-'+colsMasque[s].column_name+'-ligne'+r).value  
                    
                    if(s < colsMasque.length - 1)
                        sql = sql + ","
                  } catch(err){
                    console.log(err.message);
                  }
            }
            sql = sql + ")"
            if(r < q - 1)
                sql = sql + ","
        }

        let json_select = [
            {
              sql: sql
            }
          ]
        
        

        const statut = RequeteSQL(baseTable.bdd,json_select)
        statut.then(function(result) {
        console.log(result)
        // document.getElementById("etat-sql").textContent = result[0].resultat
        }, function(err) {
        // document.getElementById('etat-sql').textContent='Erreur'     
        });

        console.log(sql)
    }

    function initMasqueDetail(){
        const tr0 = document.getElementById('mask-tab-ligne-0')
        let children = tr0.childNodes;
        let champs = []
      
        for (let i = 0; i < children.length; i++) {
          champs.push(children[i].getAttribute('alt'))
            
        }

        for(let j = 0; j < 10; j++){
            if(j===0)
                document.getElementById('mask-tab-ligne-'+j).hidden = false
            else
                document.getElementById('mask-tab-ligne-'+j).hidden = true
            champs.forEach(key => {
                if(key.substring(0, 4) !== 'lib_'){
                // console.log(`${key} : ${value}`)
                // console.log('masktab-'+key+'-ligne'+0)
                try{
                document.getElementById('masktab-'+key+'-ligne'+j).value = null  
                } catch(err){
                console.log(err.message);
                }
                    
            }});

        }
    }


    const onSubmit = (e) =>{
        console.log('onSubmitMasquePlat')
        
        if (baseTable.codeDebSel!==''){ 
            let select = document.getElementById('saisie-'+baseTable.codeDebSel)
            let valeur = select.value
            baseTable.form[baseTable.codeDebSel] = valeur
            baseTable.form['lib_'+baseTable.codeDebSel] = select.textContent
        }
        console.log(baseTable.preSaisie)
        if (baseTable.etrange_detail!==undefined){
            let champ = baseTable.etrange_detail.substr(8,100)
            baseTable.form[champ] = baseTable.valeur_detail
        }
        let tableSaisie = baseTable.table_name
        if (baseTable.preSaisie!==undefined){
            let champ = baseTable.preSaisie.champPreSaisie
            baseTable.form[champ] = baseTable.preSaisie.valeurPreSaisie
            tableSaisie = baseTable.preSaisie.tableSaisie
        }

        console.log(baseTable.form)
        document.querySelector("[alt='DebSel']");
        if (document.getElementById('titre_modal').textContent==='Ajouter') {
            
            try {
            
            const enregistrerAjout  = async () => {
            
                const response = await fetch("http://localhost:5000/ajout/"+baseTable.bdd+"/"+tableSaisie,{
                  method : 'POST',
                  headers : {'Content-Type' : "application/json"},
                  body : JSON.stringify(baseTable.form)//donneeAjout (baseTable.form
                });
                
                return await response.json();
            }
            const statut = enregistrerAjout()
            statut.then(function(result) {
                console.log(result)
                if (result > 0){
                    enregistrerDetail(result)
                    document.getElementById('statut-enregistrement').textContent='Donnees inserer avec success'
                }
 
                else
                  document.getElementById('statut-enregistrement').textContent='Erreur inconnu:'+result
                effacerMasque()
                initMasqueDetail()
                
                setTimeout(cacher, 3000);
                function cacher() {
                    document.getElementById('statut-enregistrement').textContent=''
                   
                } 
                console.log(('3'))
                baseTable.insertLine(baseTable.form)

            }, function(err) {
                console.log(err.message)
            });
            
              e.preventDefault();
            } catch (err) {
              console.error(err.message);
            }
             
        }else{
          try {
            let id = document.getElementById('id_modif').textContent;
            fetch("http://localhost:5000/modif/"+baseTable.bdd+"/"+tableSaisie+"/"+id,{
                 method : 'PUT',
                 headers : {'Content-Type' : "application/json"},
                 body : JSON.stringify(baseTable.form) //donneeChange
             }); 
            // window.location = '/';
            
            enregistrerDetail(id)
          } catch (err) {
            console.error(err.message); 
          }
        }
        // baseTable.initForm()    
    } 
    
    let col_masque =[]
    for(let i = 0; i < nbCols; i++){
        col_masque[i]=i
    } 


return(
    <div>
        <header className='App-header'>
            <div 
            // onSubmit={onSubmit}
            >
                <table>
                    <tbody> 
                        {cols.map((col,i,array)=>(
                            i % nbCols === 0?
                                <tr>
                                    {col_masque.map((c)=>(
                                        i+c >= cols.length?null:
                                        <Fragment>
                                        <td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                            {array[i+c].column_name !== etrange_detail 
                                                ?array[i+c].description
                                                :''
                                            }
                                        </td>
                                        <td>
                                            {/* {array[i+c]['bdd'] = ()=>baseTable.bdd}  */}
                                            {array[i+c]['f'] = onChange} 
                                            {array[i+c].column_name !== etrange_detail
                                                ?array[i+c]['valeur'] = ()=>baseTable.form[array[i+c].column_name]
                                                :array[i+c]['valeur'] = ()=>baseTable.valeur_detail
                                            }
                                            {array[i+c].column_name !== etrange_detail
                                                ?array[i+c]['visible'] = ()=> true
                                                :array[i+c]['visible'] = ()=> false
                                            }
                                            {array[i+c]['suffix'] =()=>'saisie'}
                                            <WidgetSaisie mas={array[i+c]}/>
                                        </td>
                                    </Fragment>
                                    ))}
                               </tr>
                                :<span></span>
                            ))} 
                        {is_resume===true
                            ?null
                            :<Fragment>
                               <tr>
                                   <td>
                                        <button id='btm-filtrer-tout' type='submit' 
                                            style={{margin:'5px'}} 
                                            className="btn btn-success"
                                            onClick={onSubmit}
                                            
                                        >
                                            Enregistrer 
                                        </button>
                                
                                    </td>
                                <td>
                                <span id = 'statut-enregistrement'> Donnees enregistrees avec success</span>       
                                </td>
                                </tr>
                               
                            </Fragment>
                        }
                    </tbody> 
                </table>
            </div>
        </header>  
        <div id="masque-ligne">
        {baseTable.existMaskTab===true
            ?<MasqueTab cols={colsTab} bdd={baseTable.bdd}/>
            :null
        }
            {/* <MasqueLignes baseTable = {baseTable}/> */}
        </div>
    </div>
)}

export default MasquePlat