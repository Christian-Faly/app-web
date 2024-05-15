import React from 'react';
import ObtenirTable from '../component/ObtenirTable';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Compte from './Compte';
    
const ClasseCompte = ({gogo})=>{
    const tab_classe={
      bdd:gogo.bdd,
      table_name:'classe_compte'
    }
    const data_classe = ObtenirTable(tab_classe);
    
    const tab_categ={
      bdd:gogo.bdd,
      table_name:'categ_compte'
    }
    const data_categ = ObtenirTable(tab_categ);
    
    const tab_group={
      bdd:gogo.bdd,
      table_name:'group_compte'
    }
    const data_groupe = ObtenirTable(tab_group);
    
    const tab_categ_tiers={
      bdd:gogo.bdd,
      table_name:'categ_compte_tiers'
    }
    const data_categ_tiers = ObtenirTable(tab_categ_tiers);
    
    const tab_group_tiers={
      bdd:gogo.bdd,
      table_name:'group_compte_tiers'
    }
    const data_groupe_tiers = ObtenirTable(tab_group_tiers);
    
    const tab_sgroup_tiers={
      bdd:gogo.bdd,
      table_name:'sgroup_compte_tiers'
    }
    const data_sgroupe_tiers = ObtenirTable(tab_sgroup_tiers);
    
    function clickGroupe(groupe,isTiers,i){
      gogo['val_filtre']=groupe
      if (isTiers===true){
        gogo['col_filtre']='sgroupe'
        gogo.table_name='plan_compta_tiers'
      }else{
        gogo['col_filtre']='groupe'
        gogo.table_name='plan_compta'
      }
      gogo.filtrerTout() 
      ReactDOM.render( <Compte gogo={gogo}/>, document.getElementById('Compte'+i))
    }
    

      return(
            <div  id={`plan_compta`} class="modal fade">
                <div id='modal-plan-compta'show={false} class="modal-dialog modal-xl" role="document">
                    <div show={false} class="modal-content">
                        {/* bouton Fermet en haut de page */}
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true" style={{marginTop: '-1,5rem',textAlign:'right'}}>×</span>
                        </button>
                        <p id='btn-cible-input'>eto no apetrake ny cible</p>
                            {/* ====== ON */}
                        <div style={{ display: 'block', width: '100%', padding: 30 }}>
                        <div id="clqsse-en-cours"> Choisir categorie </div>
                          <div id="categorie-en-cour"> Choisir categorie </div>
                                
                          {/* onglet  active  "Tab0" */}

                          <Tabs defaultActiveKey="Tab0">
                            {data_classe.map((classe,i)=>(
                              <Tab eventKey={"Tab"+i} title={classe['intitule']}>
                                {classe['num_cpt']==='4'?
                                <Tabs defaultActiveKey="Tab20">
                                  {/*                                   
                                  <Tab eventKey="first" title="Dashboard">
                                     Hii, I am 1st tab content
                                   </Tab>
                                   <Tab eventKey="second" title="Setting">
                                     Hii, I am 2nd tab content
                                   </Tab>
                                   <Tab eventKey="third" title="Aboutus">
                                     Hii, I am 3rd tab content
                                  </Tab> 
                                  */}
                                  
                                  {data_categ_tiers.map((categ,j)=>(
                                    categ.classe==='4'?
                                    <Tab eventKey={"Tab2"+j} title={categ['abreviation']}>
                                        {categ['intitule']}  
                                          <div className="row">
                                            <div className="col-1">
                                            <div className="nav flex-column nav-pills" id={"v-pills-tab"+categ['num_cpt']} role="tablist" aria-orientation="vertical">
                                                {data_groupe_tiers.map((groupe,k)=>(
                                                  groupe.categ===categ.num_cpt?
                                                    <a className="nav-link" id={"v-pills-profile-tab"+groupe['num_cpt']} data-toggle="pill" href={"#v-pills-profile"+groupe['num_cpt']} role="tab" aria-controls="v-pills-profile" aria-selected="false">{groupe['num_cpt']}</a>
                                                  :null
                                                ))}
                                                </div>
                                            </div>
                                          
                                            <div className="col-1">
                                              <div className="tab-content" id="v-pills-tabContent">
                                                {data_groupe.map((groupe,k)=>(
                                                  groupe.categ===categ.num_cpt?
                                                    <div className="tab-pane fade" id={"v-pills-profile"+groupe['num_cpt']} role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                      {groupe['intitule']}
                                             
                                             
                                                      {data_sgroupe_tiers.map((sgroupe,l)=>(
                                                        <ul>
                                                          {sgroupe.groupe===groupe.num_cpt?
                                                            <li>
                                                              <a href='#' onClick={()=>clickGroupe(sgroupe.num_cpt,true,'-tiers'+j)}>
                                                                {sgroupe.num_cpt}
                                                              </a>
                                                            </li> :null
                                                          }
                                                        </ul>
                                                      ))}
                                                    </div>
                                                  :null
                                                ))}
                                              </div>
                                            </div>
                                            <div id={"Compte-tiers"+j} className="col-10">
                                            {"Compte-tiers"+j}
                                            </div>
                                           
                                        </div>
                                       
                                    </Tab>:null
                                  ))}
                                </Tabs>
                                :
                                <div className="row">
                                  <div className="col-1">
                                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                      {data_categ.map((categ,j)=>(
                                        categ.classe===classe.num_cpt?
                                          (j===0?<a className="nav-link active" id={"v-pills-"+categ.num_cpt+"-tab"} data-toggle="pill" href={"#v-pills-"+categ.num_cpt} role="tab" aria-controls={"v-pills-"+categ.num_cpt+""} aria-selected="true">{categ.num_cpt}</a>
                                            :<a className="nav-link" id={"v-pills-"+categ.num_cpt+"-tab"} data-toggle="pill" href={"#v-pills-"+categ.num_cpt} role="tab" aria-controls={"v-pills-"+categ.num_cpt+""} aria-selected="true">{categ.num_cpt}</a>
                                          ):null
                                      ))} 
                                    </div>
                                  </div>
                                  <div className="col-1">
                                    <div className="tab-content" id="v-pills-tabContent">
                                    {data_categ.map((categ,j)=>(
                                      categ.classe===classe.num_cpt?
                                          <div className={"tab-pane fade show active"} id={"v-pills-"+categ.num_cpt} role="tabpanel" aria-labelledby={"v-pills-"+categ.num_cpt+"-tab"}>
                                              {data_groupe.map((groupe,j)=>(
                                                <ul>
                                                  {groupe.categ===categ.num_cpt?
                                                    <li>
                                                      <a href='#' onClick={()=>clickGroupe(groupe.num_cpt,false,i)}>
                                                        {groupe.num_cpt}
                                                      </a>
                                                    </li> :null
                                                  }
                                                </ul>
                                              ))} 
                                          </div>
                                        :null
                                      ))} 
                                      </div>
                                  </div>
                                  <div id={"Compte"+i} className="col-10">

                                  </div>
                                </div>
                                } 
                              </Tab>
                            ))}
                          </Tabs>
                        </div>
                    </div>
                </div>
              </div>
    )
}

export default ClasseCompte;