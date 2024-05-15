import React,{ useState, useEffect } from 'react';

const LigneVide = (tabl,typ) =>{
  let table_name=''
  switch (typ) {
    case 3 : table_name = tabl.table_detail
      break;
    case 2 : table_name = tabl.table_maitre
      break;
    case 1 : table_name = tabl.table_name
      break;
    default: table_name = tabl.table_name;
  }
  
  const[colonnes,setColonnes]= useState([])

  const getColonnes = async () => {
    try{
      let response
      if (table_name>'')        //http://localhost:5000/colonnes/ad2m/pe_perimetre
        response = await fetch ("http://localhost:5000/colonnes/"+tabl.bdd+"/"+table_name)
      else
        response = await fetch ("http://localhost:5000/colonnes/"+tabl.bdd+"/"+tabl.table_name)
      const jsonData = await response.json();
      setColonnes(jsonData);
    } catch(err) {
      console.log(tabl);
    }
  }

  useEffect(() =>{
    getColonnes();
      
  return colonnes;
  }, []);
  // console.log(colonnes)  
  return colonnes;
}

export default LigneVide;
