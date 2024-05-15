
const SaisieDetail = ({det}) => {
    
  // ======================== Detail =======================
  det.col_detail = det.col_detail.filter(
    function(value, index, arr){ 
    return value.affiche_masque===true;
  });
  let tab=[]
  for(let i=0;i<10;i++){
    tab[i]=i
  }
  return (
    <div>
        <table border="2" className="table table-striped"> 
        {/* className="table table-striped" */}
              <thead className="thead-success" style ={{background:'black',color:'white'}}>
                <tr>
                  <th hidden></th>
                  {det.col_detail.map((col,i)=>(
                  col.affiche_masque===true?<th>{col.description}</th>:null ))} 
                </tr>
              </thead>
                
              <tbody>
                {/* {det.data_detail.map((dev,i)=>( dans tr key={dev.id}*/  }
                {tab.map((dev,i)=>(
                  <tr id={'detail-tr-'+i}>
                      { 
                        det.col_detail.map((col,j)=>(
                          col.affiche_masque===true?
                          (
                          <td>      
                            <input id={'detail-'+i+'-'+col.column_name}
                                type ='text' 
                                className='form-control' 
                                name={col.column_name}
                                // value ={ dev[col.column_name] } 
                                // onChange={e=>det.handleChangeDetail(e)}
                            />
                          </td>):null
                        ))
                      }
                    </tr>
                ))} 
              </tbody>
            </table>
        </div>
    )}

    export default SaisieDetail;