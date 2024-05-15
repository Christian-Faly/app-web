import React from 'react';
import ReactDOM from 'react-dom';
import Donnees from '../component/Donnees'

const OuvrirElement = (bdd,table_name,table_maitre,cle_maitre,
    table_detail,etrange_detail,type_cle,is_to_update,valeur_detail,idToSelect,preSaisie) =>{
    let baseTable = {
        bdd:bdd,
        table_name:table_name,
        table_maitre:table_maitre,
        cle_maitre:cle_maitre,
        table_detail:table_detail,
        etrange_detail:etrange_detail,
        type_cle:type_cle,
        is_to_update:is_to_update,
        valeur_detail:valeur_detail,
        idToSelect : idToSelect,
        preSaisie:preSaisie // id selectionner dans le tableau
    
    }
    
    const SaisieElement = Donnees(baseTable) ;
    ReactDOM.render(<SaisieElement/> , document.getElementById('Detail'));
};

const OuvrirSimpleElement = (bdd,table_name,is_to_update,idToSelect,preSaisie) => {
    OuvrirElement(bdd,table_name,'','',"",'','',is_to_update,undefined,idToSelect,preSaisie) 
    // console.log(idToSelect)
}

const OuvrirSimpleCritere = (bdd,table_name,is_to_update,etrange_detail,valeur_detail,idToSelect,preSaisie) => {
    OuvrirElement(bdd,table_name,'','',"",etrange_detail,'',is_to_update,valeur_detail,idToSelect,preSaisie) 
    // console.log(idToSelect)
}


export default OuvrirElement
export {OuvrirSimpleElement, OuvrirSimpleCritere}