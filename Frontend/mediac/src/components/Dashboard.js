import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Accordion from "./Accordion";
// import ReactDOM from "react-dom";
// import bgimg from './img/image1.png';
import "./styles.css";
import ConsultancyCard from "./ConsultancyCard";
// import ScriptTag from 'react-script-tag';
import ellipse from "./img/ellipse.png";
import bgimg from "./img/image1.png";
import { Texts } from "../css/Texts";
import Navbar from "./Navbar";
import HomeBottom from "./AboutPage/HomeBottom";
import bg1 from "./img/b1.jpg";
import bg2 from "./img/b2.jpg";
import bg3 from "./img/b3.jpg";
import plus from './img/plus.svg'
import call from './img/call.svg'
import telephone from './img/telephone.png'

import { reactLocalStorage } from "reactjs-localstorage";

const colors = [`url(${bg1})`, `url(${bg2})`, `url(${bg3})`];
const delay = 2500;
// const colors = ["#0088FE", "#00C49F", "#FFBB28"];
function Dashboard() {
 
  const { currentUser } = useAuth();
   const history = useHistory();
  const quest = useRef();
  useEffect(() => {
    onlyOnce();
  }, []);

  async function onlyOnce()  {
    if(!currentUser) return;
    var role =  reactLocalStorage.get('role') 
   
    if(role === undefined) role  = "";
   
    
    if(role ==="doctor"){
         return history.replace('/doctordashboard');
      }
    }
  

  function onClick() {
    history.push("/consult/?ques=" + quest.current.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
    <div style = {{backgroundColor:"white"}}>
      <div className="Navb">
          <Navbar type="trans" />
        </div>
    <div className="wrapper" style={{overflow: 'hidden', }}>
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)`}}
      >
        {colors.map((bg) => (
          <div className="slide" style={{ backgroundImage: `${bg}`  ,  animationDuration:"1s"}}>
          </div>
        ))}
      </div>
      <div className="overlapping-text">
        <div id="hometxt">
          <h2 id="bigtxt">
            
                 <br></br>Call Now <br />
              +91 782 7556 162
          </h2>
          <p id="smalltxt">Ask us a question </p>
        </div>
        <Form autocomplete="off" onSubmit={handleSubmit}>
          <Form.Group id="ocity">
            <input
              type="text"
              ref={quest}
              id="dbques"
              style={{ borderRadius: "8px" }}
              placeholder="Tell us your symptoms or health problem"
            />
          </Form.Group>
        </Form>
        <Button onClick={onClick} id="bookbtn">
                                      <img  id="ellipsebtn" src = {plus} height="55px" ></img>

   &nbsp; Start Consultaion
        </Button>
 
    <Button onClick={()=>{
window.open('tel:917827556162');

    }} id="bookbtn2">
                                                 <img  id="ellipsebtn" src = {telephone} height="55px" ></img>
       &nbsp;    Call (7827556162)
        </Button>

      </div>
    </div>
   
    <HomeBottom />
    </div>
  </>);
}

export default Dashboard;
