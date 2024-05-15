
function CacherBoutonModif(mill_seconde){
    setTimeout(cacher, mill_seconde);
        setTimeout(cacher, 5000);
        setTimeout(cacher, 7500);
        function cacher() {
           
            let nodeList = document.querySelectorAll("[alt='btn-tableau']")
            for (let i = 0; i < nodeList.length; i++) {
                  nodeList[i].hidden = true;
            document.getElementById('btn-ajouter').hidden = true 
          }    
      }

}
export default CacherBoutonModif