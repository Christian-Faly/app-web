const DonneeAvecLib = (bdd, table_name, cle_etrange, valeur_etrange, type_cle) =>{

  let json_critere = [
      {vide :''}
    ]

  if (cle_etrange == null)
    json_critere[0]['vide'] = ''

  else{
    json_critere[0][type_cle+'-'+cle_etrange] = valeur_etrange
  }
  
  const getData = async (bdd,table_name) => {
    
    let statut = [] 
    let l = 0
    
    try{
      let response = await fetch ("http://localhost:5000/affiche_aveclib/"+bdd+"/"+table_name
      ,
        {   
          method : 'POST',
          headers: {'Content-Type' : "application/json"},
          body : JSON.stringify(json_critere)
        }
      );
      
      statut = await response.json()
      l = statut.length;
      const tr0 = document.getElementById('mask-tab-ligne-0')

      let children = tr0.childNodes;
      let champs = []
    // ============= Manova .couleur =============
      for (let i = 0; i < children.length; i++) {
        champs.push(children[i].getAttribute('alt'))
          
      }
      console.log(champs)
      
      for (let i = 0; i < 10; i++){
        if (i < l+1)
          document.getElementById('mask-tab-ligne-'+i).hidden = false
        else 
          document.getElementById('mask-tab-ligne-'+i).hidden = true
      }
      for(let j = 0; j < 10; j++){
        if (j < l){
          // console.log('boucle 1 '+j)
          for (const [key, value] of Object.entries(statut[j])){
            if(key.substring(0, 4) !== 'lib_'){
              // console.log(`${key} : ${value}`)
              // console.log('masktab-'+key+'-ligne'+0)
              try{
                document.getElementById('masktab-'+key+'-ligne'+j).value = value  
              } catch(err){
                console.log(key+' '+err.message);
              }
                     
            }
          }
        } 
        
        else {
          // console.log('boucle 2 '+j)
          champs.forEach(key => {if(key.substring(0, 4) !== 'lib_'){
            // console.log(`${key} : ${value}`)
            // console.log('masktab-'+key+'-ligne'+0)
            try{
              document.getElementById('masktab-'+key+'-ligne'+j).value = null  
            } catch(err){
              console.log(err.message);
            }
                   
          }});

          for (const [key, value] of Object.entries(statut[0])){
            
          }
        }
        
      }
      

    } catch(err) {
      console.log(err.message);
    }

    return l;
  }

  let d = getData(bdd,table_name);


  return d 
}

export default DonneeAvecLib;
