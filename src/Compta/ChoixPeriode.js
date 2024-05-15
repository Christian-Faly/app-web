import React from 'react';
    
const ChoixPeriode = ()=>{
    return(
        <div  id={'choix-periode'} class="modal fade">
            <div id='modal'show={false} class="modal-dialog modal-lg" role="document">
                <div show={false} class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style={{marginTop: '-1,5rem',textAlign:'right'}}>×</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChoixPeriode;