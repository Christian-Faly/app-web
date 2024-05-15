import React from 'react';
import ExecuterSQL from '../../component/ExecuterSQL';
import OuvrirElement, {OuvrirSimpleElement} from '../../component/OuvrirElement'
import InsertMaitre from '../../component/InsertMaitre';
import RequeteSQL from '../../component/RequeteSQL';

const Footer =()=> {

  function CreerDictionaire(bdd,tabl){
    let json_select = [
      {
        sql:''
      }
    ]
    let sq = "SELECT * FROM pa_dictio_donnee WHERE nomtable = '"+tabl+"';"
    ExecuterSQL(bdd,tabl,sq)
    
    function AjoutDiction(){
      if (document.getElementById("etat-sql").textContent=='0'){
        json_select[0].sql = "INSERT INTO  pa_dictio_donnee (nomtable, code, description, rang, masque, affiche_tableau, affiche_masque) "+
                              "SELECT columns.table_name, columns.column_name,  columns.column_name AS description,"+
                              " columns.ordinal_position, pa_type_champs.masque_defaut, true AS affiche_tableau,"+
                              " true AS affiche_masque"+
                              " FROM information_schema.columns"+
                              " JOIN pa_type_champs ON pa_type_champs.description::text = columns.data_type"+
                              " WHERE columns.table_name = '"+tabl+"' AND NOT (columns.column_name IN ("+ 
                                  " SELECT 'ncommune' UNION SELECT 'ndistrict' UNION SELECT 'nregion'));"+
                                  "SELECT 'OK' AS resultat"

        const statut = RequeteSQL(bdd,json_select)
        statut.then(function(result) {
          document.getElementById("etat-sql").textContent = result[0].resultat
        }, function(err) {
          // document.getElementById('resultat-cl').textContent='Inserez code journaux "CL"'     
        });
      }
      else 
        document.getElementById("etat-sql").textContent = 'Existe deja';
      OuvrirSimpleElement(bdd,'pa_dictio_donnee',true)
    }
    setTimeout(AjoutDiction, 250);
  }
  
  const ToggleItem=(e)=>{
    const nav_items = document.getElementsByClassName('nav-item menu-open')
    let nav=e.target.parentElement
    if (nav.nodeName==='A')
      nav=nav.parentElement
    const classe=nav.getAttribute('class')
    const alt=nav.getAttribute('alt')
    
    for (let i=0;i<nav_items.length;i++){
      if(nav_items[i].getAttribute('alt')===alt) 
        nav_items[i].setAttribute('class','nav-item')
    }

    if (classe==='nav-item') 
      nav.setAttribute('class','nav-item menu-open')
    else
      nav.setAttribute('class','nav-item')
  }
      
  function AppelJournaux(e,table_name){
      let cible='btn-cible-'+table_name
 
      document.getElementById(cible).textContent = e.target.getAttribute('id');
  }

  return (
    <div style={{ backgroundColor: '#DEE3BB' }} >
      <footer style={{backgroundColor: 'White'}} className="main-footer ">
        <strong>Copyright © 2022 <a href="#">LeeSoTech.mg</a>.</strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer>
      <aside id='menu-etat-gauche' class="control-sidebar control-sidebar-light">
      {/* ==== menu =====*/}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column"  data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> {/* menu-is-opening menu-open*/}
              <a href="#" className="nav-link active">
                <i className="" />
                <p>
                  Parametrage
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}>
                  Nom table
                  <input id='table_nom' class="form-control" desabled type='text'/>
                  <button class='btn btn-sm btn-primary float-right' style={{width:'250px'}} 
                    onClick={e=>{CreerDictionaire('s2102021',document.getElementById("table_nom").value)}}>
                    Dictionnaire de Donnees
                  </button>

                </li>
              </ul>              
            </li>
          
            <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> {/* menu-is-opening menu-open*/}
              <a href="#" className="nav-link active">
                <i className="" />
                <p>
                  Etat de sortie
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item" alt= 'sous-menu'>
                  <a href="#" className="nav-link ">
                      <i className="nav-icon far fa-circle text-warning"  />
                      <p>Projet<i class ='right fas fa-angle-left'></i></p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li class='nav-item'>
                      <a href="#" className="nav-link"
                        onClick={e=>{
                          InsertMaitre(
                            {titre:'Lite CEP', bdd:'ad2m', tab:'e0101_cep', is_etape:false}
                          )}}
                      >
                        <i class='far fa-dot-circle nav-icon'></i>
                        <p>CEP</p>
                      </a>
                    </li>
                    <li class='nav-item'>
                      <a href="#" className="nav-link"
                        onClick={e=>{
                          InsertMaitre(
                            {titre:'Lite CEP', bdd:'ad2m', tab:'e0102_membre_cep', is_etape:false}
                          )}}>
                              <i class='far fa-dot-circle nav-icon'></i>
                              <p>Membres CEP</p>
                          </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" alt= 'sous-menu'>
                  <a href="#" className="nav-link">
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Reboisement<i class ='right fas fa-angle-left'></i></p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li class='nav-item'
                    >
                        <a href="#" className="nav-link">
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>Reboisement individuel</p>
                        </a>
                    </li>
                    <li class='nav-item'>
                        <a href='#' class='nav-link'
                          
                        >
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>Reboisement communautaire</p>

                        </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" alt= 'sous-menu'>
                  <a href="#" className="nav-link">
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Asociation et COGE<i class ='right fas fa-angle-left'></i></p>
                  </a>
                  <ul className="nav nav-treeview">
                      <li class='nav-item'>
                        <a href="#" className="nav-link">
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>AUE</p>
                        </a>
                      </li>
                      <li class='nav-item'>
                        <a href='#' class='nav-link'>
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>AUP</p>
                        </a>
                      </li>
                      <li class='nav-item'>
                        <a href='#' class='nav-link'>
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>COGE PEC</p>
                        </a>
                      </li>
                    </ul>
                </li>    
              </ul>              
            </li>
            
            {/* ----------------------------------- */}

            <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> {/* menu-is-opening menu-open*/}
              <a href="#" className="nav-link active">
                <i className="" />
                <p>
                  CARTES
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item" alt= 'sous-menu'>
                  <a href="#" className="nav-link ">
                      <i className="nav-icon far fa-circle text-warning"  />
                      <p>Zone Intervention<i class ='right fas fa-angle-left'></i></p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li class='nav-item'>
                      <a href="http://localhost/lizmap/lizmap/www/index.php/view/map/?repository=demo&project=region_intervention" 
                        className="nav-link" target="_blank">
                        <i class='far fa-dot-circle nav-icon'></i>
                        <p>Région Intervention</p>
                      </a>
                    </li>
                    <li class='nav-item'>
                      <a href="http://localhost/lizmap/lizmap/www/index.php/view/map/?repository=demo&project=district_intervention" 
                        className="nav-link" target="_blank">
                              <i class='far fa-dot-circle nav-icon'></i>
                              <p>District Intervention</p>
                          </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" alt= 'sous-menu'>
                  <a href="#" className="nav-link">
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Projet<i class ='right fas fa-angle-left'></i></p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li class='nav-item'
                    >
                        <a href="http://localhost/lizmap/lizmap/www/index.php/view/map/?repository=demo&project=nbProjet" 
                          className="nav-link" target="_blank">
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>Nombre projets Région</p>
                        </a>
                    </li>
                    <li class='nav-item'>
                        <a href='http://localhost/lizmap/lizmap/www/index.php/view/map/?repository=demo&project=nbProjet_district' 
                          class='nav-link' target="_blank"
                          
                        >
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>Nombre projets District</p>

                        </a>
                    </li>
                  </ul>
                </li>
                {/* <li className="nav-item" alt= 'sous-menu'>
                  <a href="#" className="nav-link">
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Asociation et COGE<i class ='right fas fa-angle-left'></i></p>
                  </a>
                  <ul className="nav nav-treeview">
                      <li class='nav-item'>
                        <a href="#" className="nav-link">
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>AUE</p>
                        </a>
                      </li>
                      <li class='nav-item'>
                        <a href='#' class='nav-link'>
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>AUP</p>
                        </a>
                      </li>
                      <li class='nav-item'>
                        <a href='#' class='nav-link'>
                            <i class='far fa-dot-circle nav-icon'></i>
                            <p>COGE PEC</p>
                        </a>
                      </li>
                    </ul>
                </li>     */}
              </ul>              
            </li>
          </ul>
          </nav>
        </aside>
      </div>
  );
}

export default Footer;