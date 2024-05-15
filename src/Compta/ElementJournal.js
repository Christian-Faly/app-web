import React from 'react';
import TypeJournaux from './TypeJournaux'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col } from 'react-bootstrap';

const ElementJournal = ({fonc})=>{
    function DateOpChange(e){
        if (e.target.value>''){
            const dt = new Date(e.target.value)
            const jour = dt.getUTCDate()
            let st_jour=''
            if (jour<10) 
                st_jour = '0' + jour
            else 
                st_jour = jour
                
            const month = dt.getUTCMonth()+1
            let st_month=''
            if (month<10) 
                st_month = '0' + month
            else 
                st_month = month
            document.getElementById('search_periode').value = dt.getUTCFullYear() +'/' +st_month
            document.getElementById('search_jour').value = st_jour
        }else{
            document.getElementById('search_periode').value = null
            document.getElementById('search_jour').value = null
        }
        filtrerTout()
    }

    function filtrerTout(){
        const filtres=[
            {col : "periode", val : document.getElementById('search_periode').value,typ : 'varchar',op:'='},
            {col : "jour", val : document.getElementById('search_jour').value,typ : 'varchar',op:'='},
            {col : "codejrnx", val : document.getElementById('input-jrnx').value,typ : 'varchar',op:'='}
        ]
        fonc.filtrer(filtres)
    }

    function afficherTout(){
        const filtres=[
            {col : "periode", val : '',typ : 'varchar',op:'='},
            {col : "jour", val : '',typ : 'varchar',op:'='},
            {col : "codejrnx", val : '',typ : 'varchar',op:'='},
        ]
        fonc.filtrer(filtres)
    }

    const gogo={
        ff:'fdf',
        filtrerTout:filtrerTout.type,
        bdd:'compta',
        table_name:'journaux'
    }
    
    function AppelJournaux(e){
        document.getElementById('btn-cible-jrnx').textContent = e.target.getAttribute('id');
    }
    
    return(
        <div>
            <Form.Group controlId="dob">
                <Row>
                    <Col xs={2}>    
                        <Form.Control type='input' 
                            id='search_periode'  
                            style={{width:'100%'}} 
                            placeholder='Periode' 
                            onChange={(e)=>{
                                if (e.target.value.length===7)
                                    filtrerTout()}
                            }
                        >
                        </Form.Control>
                    </Col>    
                    <Col xs={1}>    
                        <Form.Control type='input' 
                            id='search_jour'  
                            style={{width:'100%'}} 
                            placeholder='Jour...' 
                            onChange={(e)=>{
                                filtrerTout(e)}
                            }
                        >
                        </Form.Control>
                    </Col>    
                    <Col xs={2}>    
                        <Form.Control id='date_op' type="date" name="dob" placeholder="Date of Birth" style={{width:"160px"}}
                            onChange = { (e)=>DateOpChange(e)}
                        />
                    </Col> 
                    <Col xs={1}>    
                        <Form.Control type='input' 
                            id='input-jrnx'  
                            style={{width:'100%'}} 
                            placeholder='journal' 
                            onChange={(e)=>{
                                if (e.target.value.length===2)
                                    filtrerTout()}}
                        >
                        </Form.Control>
                    </Col>    
                    <Col xs={2}>    
                        <button id='btn-jrnx' type="button"  
                        style={{color:'white',margin:'5px',marginLeft:'3px'}}
                                class="btn btn-sm btn-primary"
                                data-toggle="modal"
                                data-target={'#jrnx-journaux'}
                                onClick={e=>AppelJournaux(e)}
                        >
                            ...
                        </button> 
                        <button id='btm_filtre' type="button" 
                            style={{margin:'5px'}} 
                            class="btn btn-sm btn-primary"
                            onClick={()=>{filtrerTout()}}>
                            <i class="fas fa-search"/>
                        </button>
                        <button id='btm_filtre' type="button" 
                            style={{margin:'5px'}} 
                            class="btn btn-sm btn-primary"
                            onClick={()=>{afficherTout()}}>
                            Tout
                        </button>
                                          
                    </Col>    
                    <Col>    
                        <span id='lib_jrnx' >---</span>
                    </Col>    
                    <Col xs={2}>
                        <button id='btn_recherche' type="button" 
                            style={{margin:'5px'}} 
                            class="btn btn-sm btn-primary"
                            data-toggle="modal"
                            data-target={`#poussee`}
                        >
                            <i class="fas fa-search"/>
                            Recherche pousee
                        </button>    
                    </Col>    
                       
                </Row>
            </Form.Group>
            <TypeJournaux gogo={gogo}/>
        </div>
   )
}

export default ElementJournal;