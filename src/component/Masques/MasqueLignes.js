import React, { Fragment } from "react";
import WidgetSaisie from './WidgetSaisie';
import LigneVide from '../LigneVide';
import {changeSlave} from "./TypeWidget/Deroulante"

function MasqueLignes ({baseTable}){ //bdd,colonnes,init
    
    const colonnes = LigneVide(baseTable,1);
    
    let cols = colonnes.filter(
        function(value, index, arr){ 
            return value['affiche_masque']===true;
        }
    );
    
    const onChangeLn = (e)=>{
    
        if (e.target.type === 'select-one'){
            changeSlave(e.target);
        }
    }

    const onSubmit = (e) =>{
         console.log('form',baseTable.form)
        e.preventDefault();
    } 
    let nbLignes=5
    let ligne_masque =[]
    for(let i = 0; i < nbLignes; i++){
        ligne_masque[i]=i
    }
    
return(
    <div>
        <header className='App-header'>
            <form onSubmit={onSubmit}>
                <table>
                    <thead>
                        <tr>
                            {cols.map((col,i)=>(
                                <td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                        {col.description}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    {/* <tbody> 
                        {ligne_masque.map((c)=>(
                            <tr>
                                {cols.map((col,l)=>(
                                    <td>
                                        {col['base'] = ()=>baseTable.bdd}
                                        {col['f'] = onChangeLn}
                                        {col['valeur'] = ()=>''}
                                        {col['suffix'] =()=>'ligne'+l}
                                        <WidgetSaisie mas={col}/>
                                    </td>
                                ))}
                            </tr>
                        ))} 
                    </tbody>  */}
                </table>
            </form>
        </header>  
    </div>
)}

export default MasqueLignes