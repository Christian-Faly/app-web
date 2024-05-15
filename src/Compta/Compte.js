import LigneVide from '../component/LigneVide';
import ObtenirTable from '../component/ObtenirTable';

const Compte = ({gogo})=>{
  gogo.filtrerTout()
  const tab_jrnx={
      bdd:gogo.bdd,
      table_name:gogo.table_name
  }
  const data = ObtenirTable(tab_jrnx);
  const colonnes = LigneVide(tab_jrnx,1);
  var jsonQuery = require('json-query')
  
  const filtrer = (filtres) =>{
      let data3 ={
        ligne:data
      }
      
      var totFiltre="ligne[*"
      var i=0
      filtres.forEach((filtre)=>{
        if (filtre.val>''){
          if (i>0)
            totFiltre=totFiltre+' & '
          totFiltre=totFiltre + filtre.col+"="+filtre.val
          i=i+1
        }
      })
      
      totFiltre=totFiltre+"]"
      let result = jsonQuery(totFiltre, {data:data3})
      return result.value;
    }

    const filtres=[
      {col :gogo.col_filtre, val : gogo.val_filtre,typ : 'varchar',op:'='},
    ]
    let resultat = filtrer(filtres)

    let color_enter=''
      const EnterTR=(e)=>{
        if (e.target.tagName==='TD'){
            color_enter=e.target.parentElement.style.background
            e.target.parentElement.style.background='PaleTurquoise'
          }
    }
      
    const LeaveTR=(e)=>{
        if (e.target.tagName==='TD'){
          e.target.parentElement.style.background = color_enter
        }
    }
    
    const couleur_zebre=['LightGreen','LightGrey','LightCoral','LightGoldenrodYellow','LightSteelBlue']
    const col_change='id'//au lieu de col_change='id' 
    let val_tal="";
    let iteration_zebre=0;
    const coul_zebre = (val)=>{
      if (val!==val_tal){
          iteration_zebre = iteration_zebre+1 // iteration_zebre=1
          val_tal=val
      }
      return iteration_zebre % couleur_zebre.length
    }

    // ============== Choisir element  ===============
    const Close=(e)=>{
      if (document.getElementById('btn-cible-input').textContent==='btn-compte-de') 
        document.getElementById('search-compte-de').value = e.target.textContent
      document.getElementById('search-compte-a').value=e.target.textContent+'Z'
      let afficher=[
        {col : "num_cpt", val : e.target.textContent,typ : 'varchar',op:'>='},
        {col : "num_cpt", val : e.target.textContent+'Z',typ : 'varchar',op:'<='}
      ]
      // gogo.filtrer(afficher)
      gogo.filtrerTout()
      document.getElementById('modal-plan-compta').attributes['show']=false;
    }
        
    return(
        <div>
            <div class="modal-body">
                <table border="2" class="table table-striped"> 
                    <thead className="thead-success" style ={{background:'black',color:'white'}}>
                        <tr>
                                {colonnes.map((col,i)=>(
                                    col.affiche_tableau===true?<th>{col.description}</th>:null ))} 
                        </tr>
                    </thead>
                    <tbody>
                        {resultat.map((dev,i)=>(
                            <tr id={i} 
                                key={dev.id} 
                                onMouseEnter={(e)=>EnterTR(e)} 
                                onMouseLeave={(e)=>LeaveTR(e)} 
                                style={{background:couleur_zebre[coul_zebre(dev[col_change])]}}
                            >
                            { 
                                colonnes.map((col,i)=>(
                                  col.affiche_tableau===true?<td>{
                                  // col.lien
                                  col.masque==='Liste'?
                                      dev['lib_'+col.column_name]:
                                      (col.lien==null ? dev[col.column_name]:
                                          <button  data-dismiss="modal" onClick={e => Close(e)}>{dev[col.column_name]}</button>)
                                  }</td>:null
                                ))
                            }
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Compte