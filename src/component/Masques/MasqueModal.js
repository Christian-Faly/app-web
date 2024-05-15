import React from 'react';
import MasquePlat from "./MasquePlat";

function MasqueModal ({baseTable, nbCols}){ //bdd,colonnes,init

    return(
        <div>
            <div  id = {`id2`} className="modal fade bd-example-modal-xl">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true" style={{marginTop: '-1,5rem'}}>×</span>
                        </button>

                        <div className="modal-header" style ={{width: '100%'}}>
                            <h4 id='titre_modal' 
                                className="modal-title" 
                                style ={{textAlign: 'center',width: '100%',color:'red',textShadow: '#FC0 1px 0 10px'}}>
                                Ajouter 
                            </h4>
                        </div>
                        <div className="modal-body">
                            <MasquePlat baseTable={baseTable} nbCols={nbCols} is_resume={false}/>
                            {/* <MasquePlat baseTable={baseTable} nbCols={3} is_resume={true}/>  */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <button id='btn-ajouter' type="button" 
                    style={{margin:'5px'}} 
                    className="btn btn-sm btn-primary"
                    data-toggle="modal"
                    data-target={`#id2`}
                    onClick={()=>{clickAjout()}}
                >
                    Ajouter
                </button> */}
        </div>
                
    )
}

export default MasqueModal