import ExecuterSQL from '../component/ExecuterSQL';
import {OuvrirSimpleElement} from './OuvrirElement'
import RequeteSQL from '../component/RequeteSQL';

export default function CreerDictio(bdd,tabl){
    document.getElementById("nom-table").textContent = tabl
    console.log(tabl)
    let json_select = [
      {
        sql:''
      }
    ]
    let sq = "SELECT * FROM pa_dictio_donnee WHERE nomtable = '"+tabl+"';"
    ExecuterSQL(bdd,sq)
    console.log('1')
    
    function AjoutDictio(){
        console.log('2')
        if (document.getElementById("etat-sql").textContent ==='0'){
            json_select[0].sql = "INSERT INTO  pa_dictio_donnee (nomtable, code, description, rang, masque, affiche_tableau, affiche_masque) "+
                              "SELECT columns.table_name, columns.column_name,  columns.column_name AS description,"+
                              " columns.ordinal_position, pa_type_champs.masque_defaut, true AS affiche_tableau,"+
                              " true AS affiche_masque"+
                              " FROM information_schema.columns"+
                              " JOIN pa_type_champs ON pa_type_champs.description::text = columns.data_type"+
                              " WHERE columns.table_name = '"+tabl+"' AND NOT (columns.column_name IN ("+ 
                                  " SELECT 'ncommune' UNION SELECT 'ndistrict' UNION SELECT 'nregion'));"+
                                  "SELECT 'OK' AS resultat"

            const statut = RequeteSQL(bdd,json_select)
            statut.then(function(result) {
                console.log(result)
                document.getElementById("etat-sql").textContent = result[0].resultat
            }, function(err) {
                document.getElementById('etat-sql').textContent='Erreur'     
            });
        } 
        else 
            document.getElementById("etat-sql").textContent = 'Existe deja';
        OuvrirSimpleElement(bdd,'pa_dictio_donnee',true)
    }
    setTimeout(AjoutDictio, 250);
  }