import React,{ useState, useEffect } from 'react';

const GetDonneeTable = (bdd,table_name) =>{

  const[donneeTable, setDonneeTable] = useState([])
  

  const Requete = () =>{
    const getTrouvee = async () => {
    let response = await fetch ("http://localhost:5000/affiche/"+bdd+"/"+table_name)
      return await response.json();
    }
    const statut = getTrouvee()
    statut.then(function(result) {
      setDonneeTable(result)
    }, function(err) {
      console.log(err.message)
    });
    return donneeTable
  }
  
  useEffect(()=>{
    Requete()
    // setDonneeTable([{code:'a',description:'b'}])
  },[]);
  
  // comsole.log(donneeTable)
  return donneeTable
  //  return [{code:'a',description:'b'}]
}

export default GetDonneeTable;