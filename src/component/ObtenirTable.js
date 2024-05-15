import { useState,useEffect } from "react";

const ObtenirTable = (tabl) =>{
  
  const[donnees,setDonnees]= useState([])
    const getDonnees = async () => {
      try{
          const response = await fetch ("http://localhost:5000/affiche_aveclib/"+tabl.bdd+"/"+tabl.table_name, 
            { method : 'POST'}
          );
          const jsonData = await response.json();
          setDonnees(jsonData);
        } catch(err) {
          console.error(err.message);
        }
    }

    useEffect(() =>{
       getDonnees();
         
    }, []);
    return donnees;
}

export default ObtenirTable;