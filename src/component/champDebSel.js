
import React,{ useState, useEffect } from 'react';

const ChampDebSel = (bdd, tab) =>{
    
  const[champs,setChamps]= useState([])

  let json_select = [
    {
      sql:" SELECT code, ndfliste,lstfield,keyfield,champ_critere_debsel "+
            "FROM pa_dictio_donnee " +
            "WHERE nomtable = '"+tab+"'"+
            "AND masque = 'DebSel'"
    }
  ]

  const getChamps = async () => {
    try{

        let response = await fetch("http://localhost:5000/requete/"+bdd,
        { 
                method : 'POST',
                headers: {'Content-Type' : "application/json"},
                body : JSON.stringify(json_select)
            }
        );
      const jsonData = await response.json();
      setChamps(jsonData);
    } catch(err) {
      console.log(tab);
    }
  }

  useEffect(() =>{
    getChamps();
       
  }, []);
    
  return champs;
}

export default ChampDebSel;