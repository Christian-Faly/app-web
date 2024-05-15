function SituationPeriode() {
  const getSituation = async () =>{
    let exercice = document.getElementById('exercice-en-cours').textContent
    let periode = document.getElementById('search-periode-menu').value
    let journaux = document.getElementById('search-jrnx-menu').value
    periode = periode.substring(0,4) + "_" + periode.substring(5,8)
    try{
      const response = await fetch ("http://localhost:5000/consulter-periode/" +
                                    exercice + "/" + periode + "/" + journaux);
      const jsonData = await response.json();
      return jsonData
    } catch(err) {
        console.error(err.message);
    }
  }
  let situation = getSituation()
  situation.then(function(result){
    if (result.arreter===0) 
       return "Cloturee"
    else if (result.arreter===-1)
      return "Saisie en cours"
    else
      return "Non ouvert"
      
  }, function(err) {
    return "Error: It broke"; 
  })
}

export default SituationPeriode