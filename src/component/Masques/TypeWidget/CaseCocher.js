import React from 'react';

const CaseCocher = ({mas}) =>{
    
    return (
        <div>
            {mas.valeur()===''
                ?<input id={ mas.suffix()+'-2'+mas.column_name} className="form-check-input" 
                    type = "checkbox" 
                    name = {mas.column_name}
                />
                :<input id={ mas.suffix()+'-2'+mas.column_name} className="form-check-input" 
                    type = "checkbox" 
                    name = {mas.column_name}
                    value =  {mas.valeur()} 
                    // checked =  {false} 
                    onChange = {e=>mas.f(e)}  
                />
            }
            {mas.valeur()} == {mas.valeur() === 'Oui'? true: false}   
        </div>
    )
}
           
export default CaseCocher;
                    