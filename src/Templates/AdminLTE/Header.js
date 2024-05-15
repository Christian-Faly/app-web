import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu from "./Menu";
import Chart from "./Chart";
// import Site from "../site/Site";

class Header extends Component {
  
  seConnecter = () =>{
    const elt= document.getElementById('id_connection')
    if (elt.textContent==='Se connecter'){ 
      ReactDOM.render(<Menu/> , document.getElementById('MenuGauche'));
      ReactDOM.render(<Chart/> , document.getElementById('WorkSpace'));
      elt.textContent='Se deconnecter'
    }else{
      ReactDOM.render(null , document.getElementById('MenuGauche'));
      // ReactDOM.render(<Site/> , document.getElementById('WorkSpace'));
      elt.textContent='Se connecter'
      
    }
  }
    render() {
        return (
          <div>
              <nav id='nav-header' style={{overflow:"hidden"}} 
                className="main-header navbar navbar-expand navbar-white navbar-succes" 
                >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"
                      ><i className="fas fa-bars" /></a>
                  </li>
                  {/* <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">Acceuil</a>
                  </li> */}
                  <li className="nav-item d-none d-sm-inline-block">
                    <a id ='id_connection' href="#" className="nav-link"
                    >  </a>
                  </li>
                </ul>
                <span id='societe-en-cours' 
                  style={{textAlign:'center',fontSize:'30px',color:'red',textShadow: '#FC0 1px 0 10px'}}>
                  Appui au Développement du Menabe et du Melaky phase II
                </span>
                <span id='exercice-en-cours' hidden
                  style={{fontSize:'30px',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                
                </span>
                
                <span hidden id='debut-exercice' 
                  style={{fontSize:'30px',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                  debut
                </span>
                <span  hidden id='fin-exercice' 
                  style={{fontSize:'30px',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                  fin
                </span>
                
                <span id='date-deb-exercice' hidden
                  style={{fontSize:'15px',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                  debut
                </span>
                <span  id='date-fin-exercice' hidden
                  style={{fontSize:'15px',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                  fin
                </span>
                
                    {/* <img src={require('../site/img/MARC.png')}/> */}
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                      <i className="fas fa-search" />
                    </a>
                    <div className="navbar-search-block">
                      <form className="form-inline">
                        <div className="input-group input-group-sm">
                          <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                          <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit" >
                              <i className="fas fa-search" />
                            </button>
                            <button className="btn btn-navbar" type="button" data-widget="navbar-search" style={{pointerEvents: 'none'}}>
                              <i className="fas fa-times" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                      <i className="fas fa-expand-arrows-alt" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                      <i className="fas fa-th-large" />
                    </a>
                  </li>
                  </ul>
              </nav>
          </div>
        );
    }
}


export default Header;