import React from 'react';

const ZoneTexte = ({mas}) =>{
    
    return (
        <div>
            
            {
                mas.visible() 
                ?
                    mas.valeur()===''
                        ?<input  id={mas.suffix()+'-'+mas.column_name}
                            type ='text' 
                            className='form-control' 
                            name={mas.column_name}
                        />
                        :<input id={mas.suffix()+'-'+mas.column_name}
                            type ='text' 
                            className='form-control' 
                            name={mas.column_name}
                            value ={ mas.valeur() } 
                            onChange={e=>{mas.f(e)}}
                        />
                :
                mas.valeur()===''
                ?<input hidden id={mas.suffix()+'-'+mas.column_name}
                    type ='text' 
                    className='form-control' 
                    name={mas.column_name}
                />
                :<input hidden id={mas.suffix()+'-'+mas.column_name}
                    type ='text' 
                    className='form-control' 
                    name={mas.column_name}
                    value ={ mas.valeur() } 
                    onChange={e=>{mas.f(e)}}
                />

            }
            
        </div>
    )
}
           
export default ZoneTexte;