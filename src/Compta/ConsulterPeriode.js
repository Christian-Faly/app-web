import { useState, useEffect } from 'react';

  const ConsulterPeriode = (bdd,periode, journaux) =>{
     let perio = periode.substring(0,4) + "_" + periode.substring(5,8)
    
      // const[situation,setSituation]= useState([])
      const getSituation = async () => {
        try{
          
          const response = await fetch ("http://localhost:5000/consulter-periode/" + bdd + "/"+perio + "/"+journaux);
          const jsonData = await response.json();
          // setSituation(jsonData);
          return jsonData
        } catch(err) {
          console.error(err.message);
        }
    }

    // useEffect(() =>{
    return  getSituation();
       
    // }, []);
    
    // return situation;
}

export default ConsulterPeriode;
