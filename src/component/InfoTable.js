import React, { Fragment } from "react";

function InfoTable ({baseTable,nbCols, is_resume}){ //bdd,colonnes,init

    let champFiltre=''
    if (is_resume===true)
        champFiltre='is_resume'
    else
        champFiltre='affiche_masque'

    let cols = baseTable.colonnes.filter(
        function(value, index, arr){ 
            return value[champFiltre]===true;
        }
    );

    cols.forEach(function callback(value, index) {
        Object.keys(cols[index]).forEach(key => {
            //console.log(cols[index]['masque'].substring(0, 4))
            if (cols[index]['masque']==='Liste' && cols[index]['column_name'].substring(0, 4)!='lib_')
                cols[index]['column_name']='lib_'+cols[index]['column_name'];
        });
    });

    let col_masque =[]
    for(let i = 0; i < nbCols; i++){
        col_masque[i]=i
    } 
    
return(
    <div>
        <header className='App-header'>
            <form>
                <table border="2" className="table" 
                    style ={{borderSpacing: '0',
                        borderCollapse: 'separate',
                        borderRadius: '15px',
                        border: '1px solid black', margin: '0px 0px 23px 0 '}}>
                
                    <tbody> 
                        {cols.map((col,i,array)=>(
                            i % nbCols === 0?
                                <tr>
                                    {col_masque.map((c)=>(
                                        i+c >= cols.length?null:
                                        <Fragment>
                                        <td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                            {array[i+c].description+' : '}
                                        </td>
                                        <td id={"valeur-"+array[i+c].column_name+'-'+baseTable.table_name}
                                            style ={{textAlign: 'right',color:'red',fontWeight:'bold',margin:'5px'}}
                                        >
                                            valeur
                                        </td>
                                    </Fragment>
                                    ))}
                                    <Fragment>
                                        <td style ={{textAlign: 'right',color:'blue',textShadow: '#FC0 1px 0 10px'}}>
                                            {'ID : '}
                                        </td>
                                        <td id={"valeur-id"+'-'+baseTable.table_name}
                                            style ={{textAlign: 'right',color:'red',fontWeight:'bold',margin:'5px',border:'3px solid'}}
                                        >
                                            valeur
                                        </td>
                                    </Fragment>
                               </tr>
                                :<span></span>
                            ))} 
                        {is_resume===true
                            ?null
                            :<button type='submit'>Submit</button>
                        }
                    </tbody> 
                </table>
            </form>
        </header>  
    </div>
)}

export default InfoTable