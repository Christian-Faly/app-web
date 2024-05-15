import { useState,useEffect } from "react";
const  DonneeJrnx= () =>{
  
    const[dJournaux,setDJournaux]= useState([])
      const getDJournaux = async () => {
        try{
            const response = await fetch ("http://localhost:5000/affiche_aveclib/compta/journaux",
              { method : 'POST'}
            );
            const jsonData = await response.json();
            setDJournaux(jsonData);
          } catch(err) {
            console.error(err.message);
          }
      }
  
      useEffect(() =>{
        getDJournaux();
           
      }, []);
      return dJournaux;
  }
  
  
  export default DonneeJrnx;
  