import React,{ useState, useEffect } from 'react';

const ListeDetail = (bdd, tab,typa) =>{
  console.log(1)

    
  const[details,setDetails]= useState([])

  let json_select = [
    {
      sql:"SELECT nomtable, "+
      "CASE WHEN nomtable = '"+tab+"' THEN 'Liste des '|| description ELSE description END as  description, "+ 
      "CASE WHEN nomtable = '"+tab+"' THEN 'Parent' ELSE 'Child' END as  position, table_maitre, cle_maitre, type_cle "+ 
      "FROM public.pa_tables "+  
            "WHERE (table_maitre like '"+tab+"' "+
            " OR nomtable = '"+tab+"' AND typa='maitre') and (type_mask_detail='"+typa+"') "+ 
            " order by kaody"
    }
  ]
  console.log(json_select.sql)

  const getDetails = async () => {
    try{

        let response = await fetch("http://localhost:5000/requete/"+bdd,
            { 
                method : 'POST',
                headers: {'Content-Type' : "application/json"},
                body : JSON.stringify(json_select)
            }
        );
      const jsonData = await response.json();
      setDetails(jsonData);
    } catch(err) {
      console.log(tab);
    }
  }

  useEffect(() =>{
    getDetails();
       
  }, []);
    
  return details;
}

export default ListeDetail;