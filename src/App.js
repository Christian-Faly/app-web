import React , { Fragment } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import SiteRano from "./Templates/siteRano/siteRano";
import ShowMessage from "./component/ShowMessage";
import Test from "./component/InsertMaitre";

// 038 59 431 81

function App() {
  return (
    <Fragment>
        <div class="wrapper"> 
          <ShowMessage/>
          <div id='id-header'>
          </div>
          <div id ='MenuGauche'>
              {/* initiallement vide */}
          </div>
          <div id ='WorkSpace'>
            <SiteRano/> 
            {/* <Test/> */}
          </div>
          <div id ='Footer'>
            {/* <Footer/> */}
          </div>
        </div>
    </Fragment>
    );
}

export default App;
