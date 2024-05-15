import React,{ Fragment, useState, useEffect } from 'react';

const Deroulante = ({mas, col}) =>{
  //col = 0 saisie; col=1 critere recherche colonne 1; col=2 critere recherche colonne 2,
  let suffix ='' 
  if (col===0) 
    suffix = 'saisie' 
  else 
    suffix = 'recherche'
  const[liste,setListe]= useState([])

  const getListe = async () => {
        try{
          let bdd=''
          if (typeof(mas.bdd)=== 'function')
          // if (mas.bdd===undefined)
            bdd=mas.bdd()
          else if (typeof(mas.bdd)=== 'string')
            bdd=mas.bdd

          //   bdd=mas.bdd()
          // else
          //   bdd=mas.bdd
          
          // console.log("http://localhost:5000/affiche/"+mas.bdd +"/"+mas.ndfliste)
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
        {mas.masque==='Liste'
        ?(mas.valeur()===''
          ?<select  id={suffix+'-'+mas.column_name+'-'+col} 
              className="custom-select custom-select-lg mb-3" 
              alt={mas.codemaitre}
              name={mas.column_name}
              onChange={e=>{mas.f(e)
                changeSlave(e.target)
              }}
          >
              <option id={'default-'+mas.column_name}>--Choisir--</option>
                {liste.map((element)=>(
                  <option 
                    alt={element[mas.ndcmaitre]} value={element[mas.keyfield]}>{element[mas.lstfield]}
                  </option>
                ))}
            </select>
          :<select  id={suffix+'-'+mas.column_name+'-'+col} 
              className="custom-select custom-select-lg mb-3" 
              alt={mas.codemaitre}changeSlave
              name={mas.column_name}
              value ={ mas.valeur() } 
              onChange={e=>{mas.f(e)
                changeSlave(e.target)
              }}>
            <option id={'default-'+mas.column_name}>--Choisir--</option>
            {liste.map((element)=>(
                <option 
                  alt={element[mas.ndcmaitre]} value={element[mas.keyfield]}>{element[mas.lstfield]}
                </option>
            ))}
          </select>
        )
        :<select  id={mas.suffix()+'-'+mas.column_name} 
          className="custom-select custom-select-lg mb-3" 
          name={mas.column_name}
          onChange={e=>{mas.f(e)
            changeSlave(e.target)
          }}
        >
          {/* <option id={'default-'+mas.column_name}>--Chosir---</option> */}
            <option 
              // value={element[mas.keyfield]}
            >
              {/* {element[mas.lstfield]} */}
            </option>
      </select>

      }
    </div>
    )
}

export default Deroulante;

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


export function changeSlave(sel) { 

  var field_name_master = sel.getAttribute('name')
  var opti = getSelectedOption(sel)
  var value_master = opti.getAttribute('value');
  try {
    var elts = document.querySelector("[alt='"+field_name_master+"'").children;
    for (let step = 0; step < elts.length; step++) {
          elts[step].hidden=true;
    }
  } catch{

  }
  var options= document.querySelectorAll("[alt='"+value_master+"']");
  options.forEach((option) => {
      option.hidden = false;
  });

}