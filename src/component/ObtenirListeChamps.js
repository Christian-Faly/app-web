import React,{useState,useEffect, useRef, Fragment } from 'react';

function  ObtenirListeChamps(bdd,tabla){ 

    const[listeChamps,setListeChamps]= useState([])
    let json_select = [
        { sql: "SELECT column_name  FROM information_schema.columns  WHERE table_name='"+tabla+"'"
        }
    ]
    const getListeChamps = async () => {
        try{

            let response = await fetch("http://localhost:5000/requete/"+bdd,
                { 
                    method : 'POST',
                    headers: {'Content-Type' : "application/json"},
                    body : JSON.stringify(json_select)
                }
        );
        const jsonData = await response.json();
        setListeChamps(jsonData);
        
        } catch(err) {
        console.error(err.message);
        }
    }

    useEffect(() =>{
        getListeChamps();
    
    }, []);


    
    return listeChamps

}

export default ObtenirListeChamps;