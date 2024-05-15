import React from 'react';
import InsertMaitre from '../../component/InsertMaitre';
import GetDonneeTable from "../../component/GetDonneeTable";
import MasqueLignes from "../../component/Masques/MasqueLignes"
import ReactDOM from 'react-dom';

const Menu = (p)=> {
  //Fi : 038 59 431 81
  const donneeCDP = GetDonneeTable('ad2m','mp_speculation_mpv')
  const donneeCEP = GetDonneeTable('ad2m','mp_speculation_cep')
  
  //ctrlKey
  
  const ToggleItem=(e)=>{
    const nav_items = document.getElementsByClassName('nav-item menu-open')
    let nav=e.target.parentElement
    if (nav.nodeName==='A')
      nav = nav.parentElement
    const classe=nav.getAttribute('class')
    const alt=nav.getAttribute('alt')
    for (let i=0;i<nav_items.length;i++){
      if(nav_items[i].getAttribute('alt')===alt) 
        nav_items[i].setAttribute('class','nav-item')
    }

    if (alt==='menu'){
      if (classe==='nav-item') 
        nav.setAttribute('class','nav-item menu-open')
      else
        nav.setAttribute('class','nav-item')
    }else{
      switch(classe) {
        case 'nav-item':
          nav.setAttribute('class','menu-is-opening')
        break;
        case 'menu-is-opening':
          nav.setAttribute('class','nav-item menu-open')
          break;
        case 'nav-item menu-open':
          nav.setAttribute('class','nav-item menu-is-opening menu-open')
          break;
        default:
      }
    }
  }

return (
  <div>
     <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column"  data-widget="treeview" role="menu" data-accordion="false">

            <li className="nav-item menu-open" alt='menu' onClick={e=>{ToggleItem(e)}}> {/* menu-is-opening menu-open*/}
              <a  className="nav-link active"
              >
                <i className="" />
                <p>
                  Infrastructure 
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                  <li className="nav-item" alt='sous-menu'>
                      <a href="#" className="nav-link ">
                        <i className="nav-icon far fa-circle text-warning"  />
                        <p>Perimetre<i class ='right fas fa-angle-left'></i></p>
                      </a>
                      <ul class='nav nav-treeview'>
                          <il class='nav-item'>
                            <a href="#" className="nav-link"
                              //  onClick={e=>{InsertMaitre( 'Périmètres irrigués','ad2m','pe_pi_pec','varchar-typa','MPI')}}
                              onClick={e=>{InsertMaitre(
                                {titre:'Périmètres irrigués', bdd:'ad2m', tab:'pe_pi', is_etape:false},
                                undefined,
                                undefined,
                                {tableSaisie:'pe_pi_pec',champPreSaisie:'typa',valeurPreSaisie:'P.I',TypePreSaisie:'varchar'}
                              )}}
                              >
                                <i class='far fa-dot-circle nav-icon'></i>
                                <p>P.I (Barrage)</p>
                            </a>
                          </il>
                          <il class='nav-item'>
                            <a href="#" className="nav-link "
                              onClick={e=>{InsertMaitre( 
                                {titre:'Périmètres irrigués', bdd:'ad2m', tab:'pe_pfe', is_etape:false},
                                undefined,
                                undefined,
                                {tableSaisie:'pe_pi_pec',champPreSaisie:'typa',valeurPreSaisie:'P.F.E',TypePreSaisie:'varchar'}
                            )}}
                            >
                              <i className="far fa-dot-circle nav-icon"  />
                              <p>P.I (Prise file eau)</p>
                            </a>
                          </il>
                          <il class='nav-item'>
                            <a href="#" className="nav-link "
                              onClick={e=>{InsertMaitre( 
                                {titre:'Périmètres ependage des crues', bdd:'ad2m', tab:'pe_pec', is_etape:false},
                                undefined,
                                undefined,
                                {tableSaisie:'pe_pi_pec',champPreSaisie:'typa',valeurPreSaisie:'P.E.C',TypePreSaisie:'varchar'}
                            
                              )}}
                            >
                              <i className="far fa-dot-circle nav-icon"  />
                              <p>P.E.C</p>
                            </a>
                          </il>
                      </ul>
                    </li>

                {/* <li className="nav-item">
                  <a href="#" className="nav-link "
                     onClick={e=>{InsertMaitre( 'Périmètres irrigués','ad2m','pe_perimetre')}}
                  >
                    <i className="nav-icon far fa-circle text-warning"  />
                    <p>perimetre taloha</p>
                  </a>
                </li> */}
                <li className="nav-item">
                  <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Route et piste', bdd:'ad2m', tab:'pi_piste', is_etape:false}
                        // 'Route et piste','ad2m','pi_piste'
                        )
                    }}
                  >
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Route et piste</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link"
                  onClick={e=>{
                    InsertMaitre(
                      {titre:'Bâtiments', bdd:'ad2m', tab:'ba_batiment', is_etape:false}
                      // 'Bâtiments','ad2m','ba_batiment'
                      )
                  }}>
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Bâtiments</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Couloir de vaccination', bdd:'ad2m', tab:'cv_couloirev', is_etape:false}
                        // 'Couloir de vaccination','ad2m','cv_couloirev'
                        )
                    }}
                  >
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Couloir de vaccination</p>
                  </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Marché des bovides', bdd:'ad2m', tab:'ma_marche', is_etape:false}
                        // 'Marché','ad2m','ma_marche'
                        )
                    }}
                    >
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Marché des bovides</p>
                    </a>
                </li>
              </ul>              
            </li>

            <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}
            >
              <a href="#" className="nav-link active"
                >
                  <p>Passation de marche
                  <i className="right fas fa-angle-left" />
                  </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link "
                   onClick={e=>{
                    InsertMaitre(
                      {titre:'Prestataire', bdd:'ad2m', tab:'rm_intervenant', is_etape:false}
                      // 'Prestataire','ad2m','rm_intervenant'
                      )
                  }}
                  >
                    <i className="nav-icon far fa-circle text-warning"  />
                    <p>Prestataire</p>
                  </a>
                </li>
                
                <li className="nav-item">
                  <a href="#" className="nav-link "
                   onClick={e=>{
                    InsertMaitre(
                      {titre:'Registre des marchees (Services)', bdd:'ad2m', tab:'rm_registre_sc', is_etape:true},
                      undefined,
                      undefined,
                      {tableSaisie:'rm_registre',champPreSaisie:'type_marche',valeurPreSaisie:'Service',TypePreSaisie:'varchar'}
                      
                      )
                  }}
                  >
                    <i className="nav-icon far fa-circle text-warning"  />
                    <p>Services</p>
                  </a>
                </li>
                
                <li className="nav-item">
                  <a href="#" className="nav-link "
                   onClick={e=>{
                    InsertMaitre(
                      {titre:'Registre des marchees (Biens)', bdd:'ad2m', tab:'rm_registre_bt', is_etape:true},
                      // 'Registre des marchees (Biens)','ad2m','rm_registre',
                      {champ:'varchar-type_marche',valeur:'Biens'},
                      // 'varchar-type_marche','Biens',true
                      )

                  }}
                  >
                    <i className="nav-icon far fa-circle text-warning"  />
                    <p>Biens</p>
                    </a>
                </li>  
                <li className="nav-item">
                  <a href="#" className="nav-link "
                   onClick={e=>{
                    InsertMaitre(
                      {titre:'Registre des marchees (Travaux)', bdd:'ad2m', tab:'rm_registre_bt', is_etape:true},
                      {champ:'varchar-type_marche',valeur:'Travaux'},
                      // 'Registre des marchees (Travaux)','ad2m','rm_registre',
                      // 'varchar-type_marche','Travaux',true
                    )
                  }}
                  >
                    <i className="nav-icon far fa-circle text-warning"  />
                    <p>Travaux</p>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> {/*  menu-open */}
                <a href="#" className="nav-link active"
                >
                  <i className="" />
                  <p>
                    Projet
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item" alt='sous-menu'>
                      <a href="#" className="nav-link ">
                        <i className="nav-icon far fa-circle text-warning"  />
                        <p>CEP<i class ='right fas fa-angle-left'></i></p>
                      </a>
                      <ul class='nav nav-treeview'>
                
                      {donneeCEP.map((cep,index) => (
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick = {(e)=>{
                                  InsertMaitre(
                                    {titre:'CEP - '+cep.description, bdd:'ad2m', tab:'mo_cep', is_etape:false},
                                    {champ:'varchar-speculation',valeur:e.target.getAttribute('alt')}
                                  )
                                }}        
                              >
                                <i alt ={cep.code} className="far fa-dot-circle nav-icon"/>
                                <p alt ={cep.code}>{cep.description}</p>
                              </a>
                          </il>
                        ))}          
                      </ul>
                    </li>

                    <li className="nav-item" alt='sous-menu'>
                      <a href="#" className="nav-link ">
                        <i className="nav-icon far fa-circle text-warning"  />
                        <p>MPV<i class ='right fas fa-angle-left'></i></p>
                      </a>
                      <ul class='nav nav-treeview'>
                
                      {donneeCDP.map((cdp,index) => (
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick = {(e)=>{
                                  InsertMaitre(
                                    {titre:'MPV - '+cdp.description, bdd:'ad2m', tab:'mo_mpv', is_etape:false},
                                    {champ:'varchar-speculation',valeur:e.target.getAttribute('alt')},
                                  )
                                }}        
                              >
                                <i alt ={cdp.code} className="far fa-dot-circle nav-icon"/>
                                <p alt ={cdp.code}>{cdp.description}</p>
                              </a>
                          </il>
                        ))}          
                      </ul>
                    </li>

                  </ul>
              </li>
              








            
            {/* <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> 
              <a href="#" className="nav-link active"
              >
                <i className="" />
                <p>
                  Champs Ecole Paysan
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                {donneeCEP.map((cep,index) => (
                  <li className="nav-item">
                    <a href="#" className="nav-link"
                        onClick = {(e)=>{
                          InsertMaitre(
                            {titre:'CEP - '+cep.description, bdd:'ad2m', tab:'mo_cep', is_etape:false},
                            {champ:'varchar-speculation',valeur:e.target.getAttribute('alt')}
                          )
                        }}
                    >
                      <i alt ={cep.code} className="nav-icon far fa-circle text-warning"/>
                      <p alt ={cep.code}>{cep.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </li> */}

            {/* <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}>
              <a href="#" className="nav-link active"
               
              >
                <i className="" />
                <p >
                    MPV
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                {donneeCDP.map((cdp,index) => (
                  <li className="nav-item" >
                    <a href="#" className="nav-link"
                      onClick = {(e)=>{
                        InsertMaitre(
                          {titre:'MPV - '+cdp.description, bdd:'ad2m', tab:'mo_mpv', is_etape:false},
                          {champ:'varchar-speculation',valeur:e.target.getAttribute('alt')},
                        )
                      }}
                    >
                      <i alt ={cdp.code} className="nav-icon far fa-circle text-warning"/>
                      <p alt ={cdp.code}>{cdp.description}</p>
                    </a>
                  </li>
                ))} 
               
              </ul>
            </li>             */}
            <li hidden className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> {/*  menu-open */}
              <a href="#" className="nav-link active"
              >
                <i className="" />
                <p>
                  IEC
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li class='nav-item'>
                  <a href="#" className="nav-link"
                    // data-toggle="modal"
                    // data-target='#show-message'
                    onClick={e=>{
                      InsertMaitre('Correspondant ruraux','ad2m','ie_correspruraux')
                    }}
                  >
                    <i class="nav-icon far fa-circle text-warning"></i>
                    <p>Correspondant ruraux</p>
                  </a>
                </li>
                  <li class='nav-item'>
                      <a href='#' class='nav-link'
                        data-toggle="modal"
                        data-target='#cloture-exercice'
                        onClick={e=>{
                          InsertMaitre('Support Papier','ad2m','ie_support_papier')
                        }}
                      >
                          <i class="nav-icon far fa-circle text-warning"></i>
                          <p>Support Papier </p>
                      </a>
                  </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link "
                        onClick={e=>{
                          InsertMaitre('Support Audio','ad2m','ie_support_audio')
                        }}
                                  
                      >
                            <i class="nav-icon far fa-circle text-warning"></i>
                        <p>Support Audio</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link "
                        onClick={e=>{
                          InsertMaitre('Support Video','ad2m','ie_support_video')
                        }}
                      >
                            <i class="nav-icon far fa-circle text-warning"></i>
                        <p>Support Video</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link "
                        onClick={e=>{
                          InsertMaitre('support Habillement','ad2m','ie_support_habillement')
                        }}
                                  
                      >
                            <i class="nav-icon far fa-circle text-warning"></i>
                        <p>support Habillement</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link "
                        onClick={e=>{
                          InsertMaitre('Autres Supports','ad2m','ie_support_autres')
                        }}
                                  
                      >
                            <i class="nav-icon far fa-circle text-warning"></i>
                        <p>Autres Supports</p>
                      </a>
                    </li>
                </ul>
            </li>
                
            {/*  */}


            <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}
            > 
              <a href="#" className="nav-link active">
                <p>
                  Protect. environ.
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link"
                     onClick={e=>{
                      InsertMaitre(
                        {titre:'Reboisement Individuel', bdd:'ad2m', tab:'mo_rbm', is_etape:false},
                        // 'Reboisement','ad2m','mo_rbm'
                      )
                    }}
                 >
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Rbm Individuel</p>
                  </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Reboisement communautaire', bdd:'ad2m', tab:'mo_rbm_com', is_etape:false},
                        // 'Reboisement','ad2m','mo_rbm'
                      )  // InsertMaitre('Sécurisation foncière','ad2m','sf_opci')
                    }}
                    >
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Rbm communautaire</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Protection des ouvrages', bdd:'ad2m', tab:'mo_env', is_etape:false},
                        // 'Reboisement','ad2m','mo_rbm'
                      )  // InsertMaitre('Sécurisation foncière','ad2m','sf_opci')
                    }}
                    >
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Protection des ouvrages</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Foyer amélioré', bdd:'ad2m', tab:'mo_foyer_amel', is_etape:false},
                        // 'Reboisement','ad2m','mo_rbm'
                      )  // InsertMaitre('Sécurisation foncière','ad2m','sf_opci')
                    }}
                    >
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Foyer amélioré</p>
                    </a>
                  </li>
              </ul>
            </li>

            <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}
            > 
              <a href="#" className="nav-link active">
                <p>
                  Association et COGE
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link"
                     onClick={e=>{
                      InsertMaitre(
                        {titre:'Association des usager de l eau', bdd:'ad2m', tab:'mo_aue', is_etape:false},
                      )
                    }}
                 >
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>AUE</p>
                  </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Association de usagers de piste', bdd:'ad2m', tab:'mo_aup', is_etape:false},
                      )
                    }}
                    >
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>AUP</p>
                    </a>
                  </li>
                
                  <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'COGE PEC', bdd:'ad2m', tab:'mo_coge', is_etape:false},
                      )
                    }}
                    >
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>COGE PEC</p>
                    </a>
                  </li>
                  
              </ul>
            </li>

            <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> 
              <a href="#" className="nav-link active">
                <p>
                  Fournisseurs
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link"
                     onClick={e=>{
                      InsertMaitre(
                        {titre:'Pépinière', bdd:'ad2m', tab:'mo_pepiniere', is_etape:false},
                      )
                    }}
                 >
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>Pépineriste</p>
                  </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Paysan semencier', bdd:'ad2m', tab:'mo_paysan_sem', is_etape:false},
                      )
                    }}
                    >
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Paysan semencier</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Fabricant petit matériel agricole', bdd:'ad2m', tab:'mo_pma', is_etape:false},
                      )
                    }}>
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Fabricant PMA</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link"
                    onClick={e=>{
                      InsertMaitre(
                        {titre:'Boutique intrant', bdd:'ad2m', tab:'mo_bi', is_etape:false},
                      )
                    }}>
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Boutique intrant</p>
                    </a>
                  </li>
              </ul>
              </li>

              <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}
              > 
                <a href="#" className="nav-link active">
                  <p>
                    Commercialisation
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link"
                     onClick={e=>{
                      InsertMaitre(
                        {titre:'OP Commerciale', bdd:'ad2m', tab:'mo_op_commerciale', is_etape:false},
                        // 'Reboisement','ad2m','mo_rbm'
                      )
                    }}
                 >
                    <i className="nav-icon far fa-circle text-warning" />
                    <p>OP Commerciale</p>
                  </a>
                </li>
                </ul>
              </li>

              <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> {/*  menu-open */}
                <a href="#" className="nav-link active"
                >
                  <i className="" />
                  <p>
                    Donnees Synthetiques
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item" alt='sous-menu'>
                      <a href="#" className="nav-link ">
                        <i className="nav-icon far fa-circle text-warning"  />
                        <p>Localisation<i class ='right fas fa-angle-left'></i></p>
                      </a>
                      <ul class='nav nav-treeview'>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre(
                                    {titre:'District', bdd:'ad2m', tab:'pa_district', is_etape:false},
                                    // 'Reboisement','ad2m','mo_rbm'
                                  )
                                }}        
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>District</p>
                              </a>
                          </il>
                          <il class='nav-item'>
                            <a href='#' class='nav-link'
                              onClick={e=>{
                                InsertMaitre(
                                  {titre:'Commune', bdd:'ad2m', tab:'pa_commune', is_etape:false},
                                  // 'Reboisement','ad2m','mo_rbm'
                                )
                              }}        
                            >
                                <i class='far fa-dot-circle nav-icon'></i>
                                <p>Commune</p>
                            </a>
                          </il>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre(
                                    {titre:'Fokontany', bdd:'ad2m', tab:'pa_fokontany', is_etape:false},
                                    // 'Reboisement','ad2m','mo_rbm'
                                  )
                                }}
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Fokontany</p>
                              </a>
                          </il>
                      </ul>
                    </li>
                    <li className="nav-item" alt='sous-menu'>
                      <a href="#" className="nav-link ">
                        <i className="nav-icon far fa-circle text-warning"  />
                        <p>Groupement<i class ='right fas fa-angle-left'></i></p>
                      </a>
                      <ul class='nav nav-treeview'>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                  onClick={e=>{
                                    InsertMaitre('Synthese Groupement','ad2m','gr_synth_groupement')
                              }}
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Total</p>
                              </a>
                          </il>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre(
                                    {titre:'CEP', bdd:'ad2m', tab:'mo_cep', is_etape:false},
                                    // 'CEP','ad2m','mo_cep'
                                  )
                                }}
                              >
                                   <i class='far fa-dot-circle nav-icon'></i>
                                  <p>CEP</p>
                              </a>
                          </il>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre(
                                    {titre:'MPV', bdd:'ad2m', tab:'mo_mpv', is_etape:false},
                                    // 'MPV','ad2m','mo_mpv'
                                  )
                                }} 
                              >
                                   <i class='far fa-dot-circle nav-icon'></i>
                                  <p>MPV</p>
                              </a>
                          </il>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre(
                                    {titre:'Reboisement', bdd:'ad2m', tab:'mo_rbm', is_etape:false},
                                    // 'Reboisement','ad2m','mo_rbm'
                                  )
                                }} 
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Reboisement</p>
                              </a>
                          </il>
                      </ul>
                    </li>
                    <li className="nav-item" alt='sous-menu'>
                      <a href="#" className="nav-link ">
                        <i className="nav-icon far fa-circle text-warning"  />
                        <p>Beneficiaire<i class ='right fas fa-angle-left'></i></p>
                      </a>
                      <ul class='nav nav-treeview'>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre('Synthese Beneficiaire','ad2m','gr_synth_beneficiaire')
                                }}
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Total</p>
                              </a>
                          </il>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre(
                                    {titre:'Membres CEP', bdd:'ad2m', tab:'mo_membre_cep', is_etape:false},
                                    undefined,
                                    {titre:'CEP', tab:'mo_cep', id:482},
                                  )
                                }}
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Membres CEP</p>
                              </a>
                          </il>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre(
                                    {titre:'Membres M{V', bdd:'ad2m', tab:'mo_membre_mpv', is_etape:false},
                                    // 'Membres c','ad2m','mo_membre_mpv'
                                  )
                                }}
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Membres MPV</p>
                              </a>
                          </il>
                          <il class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  InsertMaitre(
                                    {titre:'Beneficiaire Reboisement', bdd:'ad2m', tab:'mo_benef_rbm', is_etape:false},
                                    // 'Beneficiaire Reboisement','ad2m','mo_benef_rbm'
                                  )
                                }}
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Beneficiaire Reboisement</p>
                              </a>
                          </il>
                      </ul>
                    </li>
                  </ul>
              </li>
              
              <li className="nav-item" alt='menu' onClick={e=>{ToggleItem(e)}}> {/* menu-is-opening menu-open*/}
                <a href="#" className="nav-link active"
                >
                  <i className="" />
                  <p>
                    Essai
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item" alt= 'sous-menu'>
                      <a href="#" className="nav-link ">
                          <i className="nav-icon far fa-circle text-warning"  />
                          <p>Journal<i class ='right fas fa-angle-left'></i></p>
                      </a>
                      <ul className="nav nav-treeview">
                          <li class='nav-item'
                          >
                              <a href="#" className="nav-link">
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Normal</p>
                              </a>
                          </li>
                      </ul>
                  </li>
                  <li className="nav-item" alt= 'sous-menu'>
                    <a href="#" className="nav-link">
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Sit. Fournisseurs<i class ='right fas fa-angle-left'></i></p>
                    </a>
                    <ul className="nav nav-treeview">
                          <li class='nav-item'
                          >
                              <a href="#" className="nav-link">
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Par rapport MP</p>
                              </a>
                          </li>
                          <li class='nav-item'>
                              <a href='#' class='nav-link'
                                onClick={e=>{
                                  const baseLigne = {
                                    bdd:'ad2m',
                                    table_name:'pe_perimetre',
                                    table_maitre:'',
                                    cle_maitre:'',
                                    table_detail:'',
                                    etrange_detail:'',
                                    type_cle:'',
                                    nbCols:4,
                                    is_to_update:true
                                  }
        
                                  ReactDOM.render(<MasqueLignes baseLigne = {baseLigne}/> , document.getElementById('Detail'));
                                }}
                              >
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Par rapp lettrage</p>
  
                              </a>
                          </li>
                      </ul>
                  </li>
                  <li className="nav-item" alt= 'sous-menu'>
                    <a href="#" className="nav-link">
                      <i className="nav-icon far fa-circle text-warning" />
                      <p>Situation Clients<i class ='right fas fa-angle-left'></i></p>
                    </a>
                    <ul className="nav nav-treeview">
                          <li class='nav-item' 
                          >
                              <a href="#" className="nav-link">
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Par rapport MP</p>
                              </a>
                          </li>
                          <li class='nav-item'>
                              <a href='#' class='nav-link'>
                                  <i class='far fa-dot-circle nav-icon'></i>
                                  <p>Par rapp letrage</p>
                              </a>
                          </li>
                      </ul>
                  </li>
                   
                </ul>              
              </li>

            </ul>
        </nav>
      </div>
    </aside>
  </div>
            
  );
}

export default Menu;