
import { Container, Card, CardBody,Row, Col } from "reactstrap"
import React, { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext"
import {  useHistory } from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Header from './Header';
import DocNav from './DocNav';
import Navbar from "./Navbar"
import docimg from './img/doc.jpeg';
import  "./styles.css";
import  "./docdash.css";

import usersvg from './img/user.svg';

import {DocMailContext} from './App';

export default function DoctorDashboard() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const dbinfo = useRef()
  const history = useHistory()
  const quest = useRef()


  useEffect( () => {
    if (!currentUser) {
      history.push('/login');
      return
    }
    if (currentUser.role !== 'doctor'){
      history.push('/dashboard')
    }
  }, [currentUser, history])

  return (
    <>
    <Header/>
<br/>
    <Container id="doc" className="d-flex align-items-center justify-content-center">
    <Card id="doccard">
                <CardBody >
                <img id="docimg" src={docimg}/>    <br/><br/>

                <p id="posttitle">Post Title</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.</p>
                </CardBody>
                <Row style= {{paddingTop :"22px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "34px", paddingBottom: "4px" }}>

                </Row>
                </Card>
                
    </Container> <br/> <br/>
    
    {/* <Container  className="d-flex align-items-center justify-content-center">
    <div class="card mb-3" >
  <div class="row no-gutters">
    <div class="col-md-4">
      <img id="usersvg" src={usersvg}></img>
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h4 className="card-title" id="docname">Doc {name}</h4>
      <p className="card-text">{degree}</p>
      <p className="card-text">{education}</p> <p>{specialisation}</p><p>{experience}</p>     
      </div>
    </div>
  </div>
</div>
</Container> */}
    <br/><br/>
    </>

  )
}
