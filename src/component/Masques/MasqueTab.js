import React, {useState,useEffect} from "react";
import WidgetTab from './WidgetTab';
// import MasqueLignes from "./MasqueLignes"

function MasqueTab ({cols,bdd}){ //bdd,colonnes,init
    
    // let cols = baseMaskTab.colonnes
    
    // const [data, setData] = useState([])   
    
    // let json_critere = [
    //     {vide :''}
    //   ]
    

    //   if (baseMaskTab.cle_etrange===null)
    //     json_critere[0]['vide'] = ''
    //   else{
    //     json_critere[0][baseMaskTab.type_cle+'-'+baseMaskTab.cle_etrange] = baseMaskTab.valeur_etrange
    //   }

    // //   console.log(json_critere[0])
    
    
    //   const getData = async (bdd,table_name) => {
      
    //     try{
    //       let response = await fetch ("http://localhost:5000/affiche_aveclib/"+bdd+"/"+table_name
    //       ,
    //         {   
    //           method : 'POST',
    //           headers: {'Content-Type' : "application/json"},
    //           body : JSON.stringify(json_critere)
    //         }
    //       );
      
    //       let jsonData = await response.json();
    //       setData(jsonData);
    //     } catch(err) {
    //       console.error(err.message);
    //     }
    //   }
      
    //   useEffect(() =>{
    //     getData(baseMaskTab.bdd,baseMaskTab.table_name);
      
    //   }, []);
    
    // console.log(data)



    const effacerMasque = (e)=>{
    
        // baseMaskTab.colonnes.forEach(element=>{
        //     let input = document.getElementById('saisie-' + element.column_name);
        //     // console.log(input.type)
        //     try {
            
        //     if (input.type === 'select-one')
        //         input.value = document.getElementById('default-' + element.column_name).value
        //     else
        //         input.value = ''  
        //     } catch (error) {
        //         console.log(error.message,element.column_name)  
        //     }
        // })

    }

    const onSubmit = (e) =>{
        
        // if (baseMaskTab.codeDebSel!==''){ 
        //     let select = document.getElementById('saisie-'+baseMaskTab.codeDebSel)
        //     let valeur = select.value
        //     baseMaskTab.form[baseMaskTab.codeDebSel] = valeur
        //     baseMaskTab.form['lib_'+baseMaskTab.codeDebSel] = select.textContent
        // }

        // if (baseMaskTab.etrange_detail!==undefined){
        //     let champ = baseMaskTab.etrange_detail.substr(8,100)
        //     baseMaskTab.form[champ] = baseMaskTab.valeur_detail
        // }

        // console.log(baseMaskTab.form)

        // document.querySelector("[alt='DebSel']");
        // if (document.getElementById('titre_modal').textContent==='Ajouter') {
            
        //     try {
            
        //     const enregistrerAjout  = async () => {
            
        //         const response = await fetch("http://localhost:5000/ajout/"+baseMaskTab.bdd+"/"+baseMaskTab.table_name,{
        //           method : 'POST',
        //           headers : {'Content-Type' : "application/json"},
        //           body : JSON.stringify(baseMaskTab.form)//donneeAjout (baseMaskTab.form
        //         });
                
        //         return await response.json();
        //     }
        //     console.log(('1'))
        //     const statut = enregistrerAjout()
        //     console.log(('2'))
        //     statut.then(function(result) {
        //         if (result===1)
        //            document.getElementById('statut-enregistrement').textContent='Donnees inserer avec success'
        //         else
        //           document.getElementById('statut-enregistrement').textContent='Erreur inconnu:'+result
        //         effacerMasque()
                
        //         setTimeout(cacher, 3000);
        //         function cacher() {
        //             document.getElementById('statut-enregistrement').textContent=''
                   
        //         } 
        //         console.log(('3'))
        //         baseMaskTab.insertLine(baseMaskTab.form)

        //     }, function(err) {
        //         console.log(err.message)
                
        //     });
            
        //       e.preventDefault();
        //     } catch (err) {
        //       console.error(err.message);
        //     }
             
        // }else{
        //   try {
        //     let id = document.getElementById('id_modif').textContent;
        //     fetch("http://localhost:5000/modif/"+baseMaskTab.bdd+"/"+baseMaskTab.table_name+"/"+id,{
        //          method : 'PUT',
        //          headers : {'Content-Type' : "application/json"},
        //          body : JSON.stringify(baseMaskTab.form) //donneeChange
        //      }); 
        //     // window.location = '/';
        //   } catch (err) {
        //     console.error(err.message); 
        //   }
        // }    
    } 
    
    // let col_masque =[]
    // for(let i = 0; i < nbCols; i++){
    //     col_masque[i]=i
    // } 
    
    // const submitAjout = async e =>{
    //     if (document.getElementById('titre_modal').textContent==='Ajouter') {
            
    //         try {
    //           const body = donneeAjout;
    //               fetch("http://localhost:5000/ajout/"+baseMaskTab.bdd+"/"+baseMaskTab.table_name,{
    //               method : 'POST',
    //               headers : {'Content-Type' : "application/json"},
    //               body : JSON.stringify(donneeAjout)
    //           }); 
    //           // window.location = '/';
    //           e.preventDefault();
        
    //           insertLine ({...ajout,...donneeAjout})        
    //         } catch (err) {
    //           console.error(err.message);
    //         }
             
    //     }else{
    //       try {
    //         let id = document.getElementById('id_modif').textContent;
    //         fetch("http://localhost:5000/modif/"+baseMaskTab.bdd+"/"+baseMaskTab.table_name+"/"+id,{
    //              method : 'PUT',
    //              headers : {'Content-Type' : "application/json"},
    //              body : JSON.stringify(donneeChange)
    //          }); 
    //         // window.location = '/';
    //       } catch (err) {
    //         console.error(err.message); 
    //       }
    //     }
    // }

    // let nbLignes = data.length
    // let ligne_masque =[]
    // for(let i = 0; i < nbLignes; i++){
    //     ligne_masque[i]=i
    // }


let nbLignes = 10
    let ligne_masque =[]
    for(let i = 0; i < nbLignes; i++){
        ligne_masque[i]=i
    }

return(
    <div>
        <header className='App-header'>
            <form onSubmit={onSubmit}>
                <table>
                    <thead>
                        <tr>
                            {cols.map((col,i)=>(
                                col.affiche_masque===true
                                ?<td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                        {col.description}
                                </td>
                                :null
                            ))}
                        </tr>
                    </thead>
                    <tbody> 
                        {/* {ligne_masque.map((c)=>(
                            <tr >
                                {cols.map((col,i)=>(
                                    <td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                        {col['bdd']=()=>baseMaskTab.bdd}
                                        <WidgetTab mas={col} valeur ={data[c][col.column_name]} ligne={c}/>
                                    </td>
                                ))}
                            </tr>
                        ))} */}
                        
                        {ligne_masque.map((c)=>(
                            <tr hidden={c!==0} id= {'mask-tab-ligne-'+c}>
                                {cols.map((col,i)=>(
                                    col.affiche_masque===true
                                    ?<td alt={col.column_name} style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                        {col['bdd']=()=>bdd}
                                        <WidgetTab mas={col} valeur ={null} ligne={c}/>
                                    </td>
                                    :null
                                ))}
                            </tr>
                        ))}
                        
                    </tbody> 
                </table>
            </form>
        </header>  
        
    </div>
)}

export default MasqueTab