import React  from "react";
import CreerDictio from './CreerDictio'
import ReactDOM from 'react-dom';
import Maitre from './Maitre'
import {OuvrirSimpleElement,OuvrirSimpleCritere} from './OuvrirElement'
import Blank1 from "./Blank1";
import Blank2 from "./Blank2";

export function Test() {

    return (
        <div>
            <p></p>
            <p></p>
            <p></p>
            <input id='BDD' type='text' style={{width:'200px',margin:'15px'}} placeholder='base de donnees'/>
            <input id='table' type='text'style={{width:'200px',margin:'5px'}} placeholder='table ou maitre' />
            <button class='btn btn-primary' style={{width:'200px',margin:'5px'}} 
                onClick={e=>{CreerDictio(document.getElementById("BDD").value,
                    document.getElementById("table").value)}}
            >
                Creer Dictio Donnees
            </button>
            <button class='btn btn-primary' style={{width:'75px'}}
                // onClick= {()=>{InsertMaitre(document.getElementById("BDD").value,
                                                // document.getElementById("table").value)}}
            >
                Ouvrir
            </button> 
        </div>
    );
}

export default function InsertMaitre(tabla,critere,gMaitre,preSaisie){
    console.log(preSaisie)
    ReactDOM.render(<Blank1/> , document.getElementById('WorkSpace'));
    
    setTimeout(afficher, 100);
     function afficher() {
        ReactDOM.render(<Blank2/> , document.getElementById('WorkSpace'));
    }
    setTimeout(afficher2, 100);
    function afficher2() {          
        ReactDOM.render(<Maitre tabla={tabla} critere={critere} gMaitre={gMaitre}/> , document.getElementById('Maitre'))
        if (critere===undefined)
            OuvrirSimpleElement(tabla.bdd,tabla.tab,true,tabla.idToSelect,preSaisie) //bdd,tab,true 
        else{
            OuvrirSimpleCritere(tabla.bdd, tabla.tab,true,critere.champ,critere.valeur,tabla.idToSelect,preSaisie)//,
        }

    }    
}
