import React from 'react';
import ReactDOM from 'react-dom';
import Header from "../AdminLTE/Header";
import Footer from "../AdminLTE/Footer";
import Menu from "../AdminLTE/Menu";
import Chart from "../../Templates/AdminLTE/Chart";
import Dashboard from "../../Templates/AdminLTE/Dashboard";

// class Site extends Component {
function SiteRano(){  
  
  const seConnecter = () =>{
  
      ReactDOM.render(<Header/> , document.getElementById('id-header'));
      // ReactDOM.render(<Societe/> , document.getElementById('WorkSpace'));
      document.body.classList.add('sidebar-collapse'); 
      document.getElementById('nav-header').style.width = "100%";
      // ReactDOM.render(<Blank/> , document.getElementById('WorkSpace'));
      // ReactDOM.render(<Chart/> , document.getElementById('Detail'));
      ReactDOM.render(<Chart/> , document.getElementById('WorkSpace'));
      ReactDOM.render(<Footer/> , document.getElementById('Footer'));
      document.body.classList.remove('sidebar-collapse'); 
      document.getElementById('nav-header').style.width = "1000";  
      ReactDOM.render(<Menu  p={5555555}/> , document.getElementById('MenuGauche'));
  
  
    // let baseTable={
    //     bdd:'dsociete',
    //     table_name:'societe',
    //     table_maitre:'',
    //     cle_maitre:'',
    //     table_detail:'',
    //     etrange_detail:'',
    //     type_cle:'',
    //     is_to_update:true
    //   }
    //   const Societe = Donnees(baseTable) 
      
    //   ReactDOM.render(<Header/> , document.getElementById('id-header'));
    //   ReactDOM.render(<Societe/> , document.getElementById('WorkSpace'));
    //   document.body.classList.add('sidebar-collapse'); 
    //   document.getElementById('nav-header').style.width = "100%";
  
  
    // const ouvrirExercice = (e,ligne) =>{
    //   const societe=document.getElementById('rs-ligne-'+ligne).textContent
    //   document.getElementById('societe-en-cours').textContent = societe
    //   document.getElementById('exercice-en-cours').textContent = e.target.textContent
    //   const exer_deb=document.getElementById('exer_deb-ligne-'+ligne).textContent
    //   const exer_fin=document.getElementById('exer_fin-ligne-'+ligne).textContent
  
    //   document.getElementById('debut-exercice').textContent = exer_deb
    //   document.getElementById('fin-exercice').textContent = exer_fin
   
    //   let date_deb_exer = toDate(exer_deb)
    //   let date_fin_exer = toDate(exer_fin)
    //   document.getElementById('date-deb-exercice').textContent = date_deb_exer
    //   document.getElementById('date-fin-exercice').textContent = date_fin_exer
    //   const json_select =[
    //     {
    //         sql:"UPDATE param_bdd SET deb_exercice='"+date_deb_exer+"', fin_exercice='"+date_fin_exer+"';"
    //     }
    //   ]
      
    //   RequeteSQL(document.getElementById('exercice-en-cours').textContent,json_select)
      
    //   let baseTable={
    //     bdd:e.target.textContent,
    //     table_name:'sel_jour',
    //     table_maitre:'journal',
    //     cle_maitre:'code',
    //     table_detail:'saisie_eltjrn',
    //     etrange_detail:'journal',
    //     type_cle:'char',
    //     is_to_update:true
    //   }

    //   const Journal = Donnees(baseTable) ;
    //   // const DonneeFooter=Footer(e.target.textContent);
    //   ReactDOM.render(<Journal/> , document.getElementById('WorkSpace'));
    //   ReactDOM.render(<Footer/> , document.getElementById('Footer'));
    //   document.body.classList.remove('sidebar-collapse'); 
    //   document.getElementById('nav-header').style.width = "1000";  
    //   ReactDOM.render(<Menu  p={5555555}/> , document.getElementById('MenuGauche'));
    //   CacherBoutonModif(2500)
      
    // };

  
  
  
  
  
  }
  
  // render() {
  return(
    <div>
      <video id="background-video" 
              style={{ height: '100vh',
                  width: '100vw',
                  objectFit: 'cover',
                  position: 'fixed',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  zIndex: -1
                  }}
                autoPlay loop muted 
        >
          {/* "https://assets.codepen.io/6093409/river.mp4 */}
        <source src={require("./video.mp4")} type="video/mp4" />
      </video>
      {/* Start Two Column Section */}
      <div className="content">
        <h1 style = {{    
              color: 'white',
              fontFamily: 'Trebuchet MS',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '6rem',
              marginTop: '30vh'
            }} 
        >GESTION DES ACTIVITES AD2M</h1>
        <p style = {{    
              color: 'white',
              fontFamily: 'Trebuchet MS',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1rem'
            }}
          >La technologie a la vitesse de vos idees - copyright LeeSoTech - Tout droit reserve </p>
      </div>
      <div className="container "style = {{padding: '2rem 0rem'}}>
        <div className="row"> 
          <div className="col text-center"> 
          <button type="button" class="btn btn-info btn-round" data-toggle="modal" data-target="#loginModal"
              
          > 
            Commencer
          </button> 
          </div> 
        </div> 
      </div>

    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style = {{marginLeft:'600px', maxWidth: '600px'}} role="document">
        <div class="modal-content" style={{padding: '1rem'}}>
          <div class="modal-header border-bottom-0">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" style ={{marginTop: '-1.5rem'}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-title text-center" style = {{margin: '-2rem 0rem 2rem'}}>
              <h4>Login</h4>
            </div>
            <div class="d-flex flex-column text-center">
              <form>
                <div class="form-group">
                  <input type="email" class="form-control" id="email1"placeholder="Your email address..."/>
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" id="password1" placeholder="Your password..."/>
                </div>
                <button type="button" 
                        class="btn btn-info btn-block btn-round" 
                        data-dismiss="modal" 
                        data-widget="fullscreen"
                        style = {{ borderRadius: '3rem'}}
                  onClick= {()=>seConnecter()} 
                >
                  Login
                </button>
              </form>
              
              <div class="text-center text-muted delimiter" style = {{ padding: '1rem'}}>or use a social network</div>
              <div class="d-flex justify-content-center social-buttons" style ={{margin: '0 0.5rem 1rem'}}>
                <button type="button" 
                        class="btn btn-secondary btn-round" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Twitter"
                        style={{backgroundColor:'blue',
                                borderRadius:'40px',
                                width:'40px',
                                height:'40px'
                          }}>
                  <i class="fab fa-twitter"></i>
                </button>
                <button type="button" 
                        class="btn btn-secondary btn-round" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Facebook"
                        style={{backgroundColor:'blue',
                                borderRadius:'40px',
                                width:'40px',
                                height:'40px',
                                marginLeft:'20px' ,
                                marginRight: '20px'}}>

                        
                  <i class="fab fa-facebook"></i>
                </button>
                <button type="button" class="btn btn-secondary btn-round" data-toggle="tooltip" 
                        data-placement="top" 
                        title="Linkedin"
                        style={{backgroundColor:'blue',
                                borderRadius:'40px',
                                width:'40px',
                                height:'40px'}}>
                  <i class="fab fa-linkedin"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
          <div class="modal-footer d-flex justify-content-center">
            <div class="signup-section" style ={{padding: '0.3rem 0rem'}}>Not a member yet? <a href="#a" class="text-info"> Sign Up</a>.</div>
          </div>
      </div>
    </div>
    </div>

            );
    // }
}

export default SiteRano;