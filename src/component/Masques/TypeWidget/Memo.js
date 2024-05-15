import React from 'react';

const Memo = ({mas}) =>{
    
    return (
        // <div>
        //     <label for="exampleFormControlTextarea3">Rounded corners</label>
        //     <textarea id={widg.suffix()+'-'+widg.column_name} className="form-control" 
        //         rows="7"
        //         name={widg.column_name}
        //         value ={ widg.valeur() } 
        //         onChange={e=>mas.f(e)}
        //     />
        // </div>
    <div>
        {mas.valeur()===''
            ?<textarea id={mas.suffix()+'-'+mas.column_name} className="form-control" 
                rows="7"
                name={mas.column_name}
            />
            :<textarea id={mas.suffix()+'-'+mas.column_name} className="form-control" 
                rows="7"
                name={mas.column_name}
                value ={ mas.valeur() } 
                onChange={e=>mas.f(e)}
            />
        }
    </div>
    
    )
}
           
export default Memo;