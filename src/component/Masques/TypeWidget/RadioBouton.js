import React,{ Fragment, useState, useEffect } from 'react';

const RadioBouton = ({mas}) =>{

    const[liste,setListe]= useState([])
    const getListe = async () => {
        try{
          const response = await fetch ("http://localhost:5000/affiche/"+mas.bdd() +"/"+mas.ndfliste);
          const jsonData = await response.json();
          setListe(jsonData);
    
        } catch(err) {
          console.error(err.message);
        }
    }

    useEffect(() =>{
        getListe();
       
    }, []);
    
    return (
        <div>
         {liste.map((element)=>(
            <Fragment>
                {mas.valeur()===''
                    ?<input alt={mas.suffix()+'-'+mas.column_name} type ='radio' 
                        name= {mas.column_name} 
                    /> 
                    :<input alt={mas.suffix()+'-'+mas.column_name} type ='radio' 
                        name= {mas.column_name} 
                        value ={ element[mas.keyfield]} 
                        ckecked = {element[mas.keyfield]=== mas.valeur()} onChange={e=>mas.f(e)}
                    /> 
                }
                <label>
                    {element[mas.lstfield]}
                </label>
            </Fragment>
           ))}
        </div>
    )
}

           
export default RadioBouton;
