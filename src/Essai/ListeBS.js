import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
function Listebs(){ 

    const clickListe =(e) =>{
    
        let children = document.getElementById('pere').childNodes;
        // console.log(children)
        for (let i = 0; i < children.length; i++) {
              children[i].setAttribute('class',"list-group-item list-group-item-action")
        }
        e.target.setAttribute('class','list-group-item list-group-item-action active')
      }
    
    return(

        <div id ='pere' className="list-group">
        <a href="#" className="list-group-item list-group-item-action active" aria-current="true"
          onClick={(e)=>{clickListe(e) }}
          >
            The current link item
        </a>
        <a href="#" className="list-group-item list-group-item-action"
          onClick={(e)=>{clickListe(e) }}
        >A second link item</a>
        <a href="#" className="list-group-item list-group-item-action"
          onClick={(e)=>{clickListe(e) }}
          >A third link item</a>
        <a href="#" className="list-group-item list-group-item-action"
          onClick={(e)=>{clickListe(e) }}
          >A fourth link item</a>
        <a href="#" className="list-group-item list-group-item-action disabled" tabIndex={-1} aria-disabled="true">A disabled link item</a>
        </div>


)
}
            
export default Listebs