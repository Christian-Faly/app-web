import React from 'react';

const MemoTab = ({mas, valeur, ligne}) =>{
    
    return (
        <div>
            <textarea id = {'masktab-'+mas.column_name+'-ligne'+ligne} 
                className = "form-control" 
                rows = "7"
                name = {mas.column_name}
                value = { valeur} 
            />
    </div>
    )
}
           
export default MemoTab;