import React, { Fragment }  from 'react';
import WidgetRech from './Masques/WidgetRech'

const RecherchePoussee = ({widg, fonc}) => {
    function filtrage() {
          
        // console.log(widg.colonnes)
        let filtres=[]
       widg.colonnes.forEach(element => {
            var typa  = '' 
            let elt1=document.getElementById('recherche-'+element.column_name+'-1')
            let elt2=document.getElementById('recherche-'+element.column_name+'-2')
            if(element.data_type === 'character varying' || element.data_type === 'text')
                typa = 'varchar'
            else 
                typa = 'integer'

            var op = ''
            let elt_op = document.getElementById('operation-'+element.column_name)
            if (elt_op.value === 'Entre')
                op = '>='
            else op = elt_op.value
            if((elt1.value !== undefined) && ((elt1.value !== '') && (elt1.value !== '--Choisir--')))
                filtres = [...filtres,{col :element.column_name, val : elt1.value,typ : typa,op: op}]
            if(elt_op.value === 'Entre')
                filtres = [...filtres,{col :element.column_name, val : elt2.value,typ : typa,op: '<='}]
       }); 

        // console.log(filtres)

        fonc.filtrer(filtres)
    }   
    const operation=['=','>','<','>=','<=','!=','Contient','Entre']    
    return(
        <div>
            <div  id={`poussee`} className="modal fade">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true" style={{marginTop: '-1,5rem'}}>×</span>
                        </button>

                        <div className="modal-header" style ={{width: '100%'}}>
                            <h4 id='titre_modal' 
                                className="modal-title" 
                                style ={{textAlign: 'center',width: '100%',color:'red',textShadow: '#FC0 1px 0 10px'}}>
                                Liste des criteres
                            </h4>
                        </div>

                        <div className="modal-body">
                                <input type="hidden" name="_token" value=""/>
                                <div className="form-group"> 
                                    <table>
                                        <thead>
                                            <th style={{textAlign: 'center'}}>Description</th>
                                            <th>operation</th>
                                            <th style={{textAlign: 'center'}}>De </th>
                                            <th style={{textAlign: 'center'}}>A </th>
                                        </thead>
                                        <tbody> 
                                        {widg.colonnes.map(dev=>(
                                            dev.affiche_masque===true?
                                            <tr>
                                                <td style ={{textAlign: 'right',
                                                                color:'blue',
                                                                textShadow: '#FC0 1px 0 10px'
                                                            }}
                                                >
                                                    {dev.description}
                                                </td>
                                                <td>
                                                    <select id={'operation-'+dev.column_name} 
                                                        className="custom-select custom-select-sm mb-1">
                                                        {operation.map(element => (
                                                            (dev.data_type==='character varying'||dev.data_type==='text') && (element ==='Contient' || element ==='=')
                                                             ?<Fragment>
                                                                    <option>{element}</option>
                                                                </Fragment>
                                                            :((dev.data_type==='integer' || dev.data_type==='date'||dev.data_type==='double precision'|| dev.data_type==='smallint') 
                                                            && (element!=='Contient')&& (dev.masque!=='Liste')
                                                              ?<option>{element}</option>:null)
                                                    ))}
                                                    
                                                   </select>
                                                </td>
                                                <td>
                                                    {dev["bdd"]=()=>widg.tabl.bdd}
                                                    {dev['suffix_rech']=()=>"recherche"}
                                                    {/* {dev['f']=widg.handleChangeAjout}
                                                    {dev['valeur']=()=>(widg.donneeAjout[dev.column_name])} */}
                                                    <WidgetRech mas={dev} col={1} />
                                                </td>
                                                <td>
                                                    {dev["bdd"]=()=>widg.tabl.bdd}
                                                    {dev['suffix_rech']=()=>"recherche"}
                                                    {/* {dev['f']=widg.handleChangeAjout}
                                                    {dev['valeur']=()=>(widg.donneeAjout[dev.column_name])} */}
                                                    {((dev.data_type==='integer'&& dev.masque!=='Liste') || 
                                                     dev.data_type==='date'||
                                                     dev.data_type==='double precision'|| 
                                                     (dev.data_type==='smallint' && dev.masque!=='Liste')) ?<WidgetRech mas={dev} col={2}/>:null}
                                                    
                                                </td>
                                            </tr>
                                            :null
                                        
                                        ))} 
                                        </tbody> 
                                    </table>
                                </div>
                                <div className="form-group" align="justify">
                                    <div>
                                        <button type="button" 
                                            className="btn btn-warning"
                                            data-dismiss="modal"
                                            
                                             onClick={()=>{
                                                filtrage();
                                                
                                            }
                                            } 
                                            
                                            > Chercher
                                        </button>
                                        <span hidden id='id_modif'>1</span>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecherchePoussee