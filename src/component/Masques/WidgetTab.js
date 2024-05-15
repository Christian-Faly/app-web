import React from "react" 
import DeroulTab from "./TypeWidget/DeroulTab"
import MemoTab from "./TypeWidget/MemoTab"
import ZoneTab from "./TypeWidget/ZoneTab"

const WidgetTab = ({mas,valeur, ligne}) => {
    const changer = (e) => {
        e.target.parentElement.parentElement.parentElement.parentElement.nextSibling.hidden = false
    }
    mas['changer'] = changer

        return(
            <div>
                {(mas.masque==='Liste' || mas.masque==='DebSel'
                    ?<DeroulTab mas={mas} valeur={valeur} ligne={ligne}/>
                    :(mas.masque==='Memo'
                        ?<MemoTab mas={mas} valeur={valeur} ligne={ligne}/>
                        :<ZoneTab mas={mas} valeur={valeur} ligne={ligne}/>
                ))}
            </div>
        )
}

export default WidgetTab;