import React from "react" 
import Deroulante from "./TypeWidget/Deroulante"
import RadioBouton from "./TypeWidget/RadioBouton"

const WidgetRech = ({mas,col}) => {
    if (mas.affiche_masque===true){
        if (mas.masque==='Case cocher') {
            return (
                <div className="form-check form-check-inline">
                    <input className="form-check-input" 
                        id={mas.column_name}
                        type="checkbox" 
                        name={mas.column_name}
                        // value ={ mas.valeur() } 
                        onChange={e=>mas.f(e)}
                    />
                    <label className="form-check-label" for="inlineCheckbox1">1</label>
                </div>
            )
        }else if (mas.masque==='Bouton radio') {
            return (
                <div>
                    <RadioBouton mas={mas}/>
                </div>
            )
        }else if (mas.masque==='Liste') {
            return (
                <Deroulante mas={mas} col={col}/>
            )
        }else if (mas.masque==='Memo'){
            return (
                <div className="form-group">
                    <label for="exampleFormControlTextarea3">Rounded corners</label>
                    <textarea className="form-control" 
                        id={mas.suffix_rech()+'-'+mas.column_name+'-'+col} 
                        rows="7"
                        name={mas.column_name}
                        value ={ mas.valeur() } 
                        onChange={e=>mas.f(e)}
                    ></textarea>
                </div>
            )
        }else {
            return (
                <div className="form-group">
                <input 
                    id={mas.suffix_rech()+'-'+mas.column_name+'-'+col} 
                    type ='text' 
                    className='form-control' 
                    name={mas.column_name}
                    // value ={ mas.valeur() } 
                    // onChange={e=>mas.f(e)}
                />
                </div>
            )
            
        }
    }else{
        return null
    }
}

export default WidgetRech