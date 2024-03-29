import React, { useRef, useState } from "react"
import { Form, Alert, Button, Container,  Card } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import {Texts} from "../css/Texts";
import  "./styles.css";
import app from '../firebase'

import close from './img/close.svg'


export default function OtherPersonForm(props) {

   const onameRef = useRef()
  const ogenRef = useRef()
  const odobRef = useRef()
 
  const relRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
 try{

    if (currentUser) {
        setLoading(true);
        setError('')
        const token = await app.auth().currentUser.getIdToken(true)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body: JSON.stringify({name: onameRef.current.value, gender: ogenRef.current.value, relation : relRef.current.value, age : odobRef.current.value })
        };

        let res = await fetch(process.env.REACT_APP_API_URL+'addNewProfile', requestOptions);
        res = await res.text()
        res = JSON.parse(res)
        if (res['status'] === 'saved_successfuly') {
          props.setProfile(res['id'], res['name'], res['relation'], res['gender'], res['age']);
          props.addNewProfile(res['id'],res['name'], res['relation'], res['gender'], res['age']);
          props.close();
        } else {
          // display error!
          setError('Error adding profile.');
        }
        setLoading(false);
    }
 }catch(e){
   setError("Connection Error")
 }
  }

    return (
        <>
<Card id="loginpopup">
        <Card.Title>

 <div style = {{float: "right", marginLeft : "auto", marginRight : "20px", marginTop : "30px"}}>
        <img src = {close} className = "icon-button" alt="" onClick = {props.close}></img>


 </div>

        </Card.Title>

<Card.Body>

 <div id="">
           <h3 style={Texts.Heading} >Consult for someone else</h3>
 <br></br>
               {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group  id="oname">
                  <Form.Label style={Texts.FormLabel}>Name</Form.Label>
                  <Form.Control type="text" ref={onameRef} required />
                </Form.Group>
                <Form.Group id="user-relation">
                  <Form.Label style={Texts.FormLabel}>Relation</Form.Label>
  <select name="Relation" ref={relRef} id="dropdown-basic">
        <option style={{display:"none"}}>  </option>

                      <option value="daughter">Daughter</option>
                        <option value="son">Son</option>
                        <option value="mother">Mother</option>
                                                <option value="female">Father</option>
                        <option value="grandmother">Grandmother</option>
                        <option value="grandfather">Grandfather</option>
                        <option value="sister">Sister</option>
                        <option value="brother">Brother</option>
                        <option value="aunt">Aunt</option>
                        <option value="uncle">Uncle</option>
                                                <option value="female">Wife</option>
                        <option value="husband">Husband</option>
                        <option value="cousin">Cousin</option>

                        <option value="friend">Friend</option>

                        
                </select>                </Form.Group>
                <Form.Group id="odob">
                <Form.Label style={Texts.FormLabel}>Age</Form.Label>
              <Form.Control type="number" ref={odobRef} required />
                </Form.Group>
                <Form.Group id="ogen">
                  <Form.Label style={Texts.FormLabel}>Gender</Form.Label>
                      <select name="Gender" ref={ogenRef} id="dropdown-basic">
                                <option style={{display:"none"}}>  </option>

                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                                              <option value="Rather not say">Rather not say</option>

                        
                </select>
                </Form.Group>
                <br></br>
         
                <Button disabled={loading} className="submitbtn" type="submit">
                  Add Profile
                </Button>

<div style = {{height : "30px"}}></div>

                {/*<h2 className  style={Texts.Heading} >Details about Consultation</h2>
                <Form.Group id="odetails">
                  <Form.Label style={Texts.FormLabel}>Other Details (Additional Information):</Form.Label>
                  <Form.Control type="text" ref={odetailsRef} required /> </Form.Group>*/}
              </Form>
              </div>
         

</Card.Body>


        </Card>
        </>
      )

}