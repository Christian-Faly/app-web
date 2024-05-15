import React from 'react';
// import { useContext } from 'react';
    
const ShowMessage = ()=>{
    // const value = useContext(Context);
    return(
        <div  id='show-message' className="modal fade">formulaire
            <label id='etat-sql'>Etat SQL</label>
            <label id='nom-table'>Nom table</label>
            <div id='modal'show={false} className="modal-dialog modal-lg" role="document">
                <div show={false} className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true" style={{marginTop: '-1,5rem',textAlign:'right'}}>×</span>
                        </button>
                        <h2 id= 'titre-message' style={{textAlign:'center'}}>titre</h2>
                        <h3 id= 'contenu-message' style={{textAlign:'center'}}>contenu</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowMessage;