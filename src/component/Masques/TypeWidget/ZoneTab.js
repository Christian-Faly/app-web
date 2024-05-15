import React from 'react';

const ZoneTab = ({mas,valeur, ligne}) =>{
    
    return (
        <div>
            <input id = {'masktab-'+mas.column_name+'-ligne'+ligne}
                type = 'text' 
                className = 'form-control' 
                name = {mas.column_name}
                value = { valeur} 
            />
        </div>
    )
}
           
export default ZoneTab;