import RequeteSQL from './RequeteSQL';

const ExecuterSQL = (bdd,q) => {
  let json_select = [
    {
      sql:q
    }
  ]
  document.getElementById("etat-sql").textContent = q;
  
  document.getElementById("etat-sql").textContent = json_select.sql;
  const statut = RequeteSQL(bdd,json_select)
  statut.then(function(result) {
    document.getElementById("etat-sql").textContent = result.length
  }, function(err) {
        // document.getElementById(resultat).textContent =result[0].resultat     
  });
  return document.getElementById("etat-sql").textContent
}
export default ExecuterSQL