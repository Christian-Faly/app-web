// import React,{ Fragment, useState, useEffect } from 'react';

const RequeteSQL = (bdd,json_sql) =>{
    const getTrouvee = async () => {
        let response = await fetch("http://localhost:5000/requete/"+bdd,
            { 
                method : 'POST',
                headers: {'Content-Type' : "application/json"},
                body : JSON.stringify(json_sql)
            }
        );
        return await response.json();
    }
    return getTrouvee()
}

export default RequeteSQL;