import React from "react"

const deleteData = async (bdd,table_name,col,typ,id) =>{
    try{
      //const deleteList = await fetch(`http://localhost:5000/suppr/${bdd}/${table_name}/${col}/${typ}/${id}`,{
      const deleteList = await fetch(`http://loca:5000/suppr/${bdd}/${table_name}/${col}/${typ}/${id}`,{
          method: "DELETE"
      });
      // tab.setData(tab.data.false);
  
    } catch (err){
      console.error(err.message);
    }
  };
export default deleteData;