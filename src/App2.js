import React , { Fragment } from "react";
import ShowMessage from "./component/ShowMessage";
import LigneVide from './component/LigneVide'
import MasqueTab from "./component/Masques/MasqueTab";

function App() { 
  let baseMaskTab = {
    bdd:'ad2m',
    table_name:'mo_offert_membre_cep',
    cle_etrange:'id_membre',
    valeur_etrange:9892,
    type_cle:'integer',
  }
  const colonnes = LigneVide(baseMaskTab,1);
  baseMaskTab['colonnes'] = colonnes
  return ( 
    <Fragment>
        <div class="wrapper">  
          <ShowMessage/>
          <div id='id-header'>
          </div>
          <div id='Acceuil'>
            {/* <AcceuilAD2M/> */}
          </div>
          <div id ='MenuGauche'>
              {/* <Menu/> */}
          </div>
          <div id ='Test'>
            <MasqueTab baseMaskTab={baseMaskTab}/>
          </div>
          <div id ='Maitre'>

          </div>
          <div id ='WorkSpace'>

          </div>
          <div id ='Footer'>
            {/* <Footer/> */}
          </div>
        </div>
    </Fragment>
    );
}
export default App;
