import { useState,useEffect } from "react";
const  DonneeCompte= () =>{
  
    const[dCompte,setDCompte]= useState([])
      const getDCompte = async () => {
        try{
            const response = await fetch ("http://localhost:5000/affiche_aveclib/compta/journaux",
              { method : 'POST'}
            );
            const jsonData = await response.json();
            setDCompte(jsonData);
          } catch(err) {
            console.error(err.message);
          }
      }
  
      useEffect(() =>{
        getDCompte();
      }, []);
      return dCompte;
  }
  
  
  export default DonneeCompte;
  