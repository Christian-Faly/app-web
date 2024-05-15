import React,{ useState, useEffect } from 'react';

const DeroulTab = ({mas,valeur,ligne}) =>{
  const[liste,setListe]= useState([])

  const getListe = async () => {
        try{
          let bdd=''
          if (typeof(mas.bdd)=== 'function')
            bdd=mas.bdd()
          else if (typeof(mas.bdd)=== 'string')
            bdd=mas.bdd
          const response = await fetch ("http://localhost:5000/affiche/"+bdd +"/"+mas.ndfliste);
          const jsonData = await response.json();
          setListe(jsonData);
    
        } catch(err) {
          console.error(err.message);
        }
    }

    useEffect(() =>{
        getListe();
       
    }, []);
    // console.log(liste)

    return (
      <div>
          <select  id={'masktab-'+mas.column_name+'-ligne'+ligne} 
              className="custom-select custom-select-lg mb-3" 
              alt={mas.codemaitre+'-ligne'+ligne}
              name={mas.column_name}
              value ={valeur} 
              onChange={
               
                e=>{
                  mas.changer(e)
                  changeSlave(e.target,ligne)
                }
              }
          >
              <option id={'default-'+mas.column_name}>--Chosir--</option>
                {liste.map((element)=>(
                  <option 
                    alt={element[mas.ndcmaitre]+'-ligne'+ligne} value={element[mas.keyfield]}>{element[mas.lstfield]}
                  </option>
                ))}
            </select>
    </div>
    )
}

export default DeroulTab;

function getSelectedOption(sel) {
  var opt;
  for ( var i = 0, len = sel.options.length; i < len; i++ ) {
      opt = sel.options[i];
      if ( opt.selected === true ) {
          break;
      }
  }
  return opt;
}

export function changeSlave(sel,ligne) { 
  var field_name_master = sel.getAttribute('name')
  var opti = getSelectedOption(sel)
  var value_master = opti.getAttribute('value');

  try {
    var elts = document.querySelector("[alt='"+field_name_master+"-ligne"+ligne+"']").children;
    for (let step = 0; step < elts.length; step++) {
          elts[step].hidden=true;
    }
  } catch{

  }

  var options= document.querySelectorAll("[alt='"+value_master+"-ligne"+ligne+"']");
  options.forEach((option) => {
      option.hidden = false;
  });

}