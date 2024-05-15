import React from "react" 
import Deroulante from "./TypeWidget/Deroulante"
import RadioBouton from "./TypeWidget/RadioBouton"
import Memo from "./TypeWidget/Memo"
import ZoneTexte from "./TypeWidget/ZoneTexte"
import CaseCocher from "./TypeWidget/CaseCocher"

const WidgetSaisie = ({mas}) => {

    if (mas.affiche_masque===true)
        return(
            <div>
                
                {mas.masque==='Case cocher'
                    ?<CaseCocher mas={mas}/>
                    :(mas.masque==='Bouton radio'
                        ?<RadioBouton mas={mas}/>
                        :(mas.masque==='Liste' || mas.masque==='DebSel'
                            ?<Deroulante mas={mas}/>
                            :(mas.masque==='Memo'
                                ?<Memo mas={mas}/>
                                :<ZoneTexte mas={mas}/>
                            )
                        )
                    )
                }
            </div>
        )
    else
        return null
}

export default WidgetSaisie;