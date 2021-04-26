import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card,Row, Col, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
 
 import Modal from 'react-bootstrap/Modal'
import {Texts} from "../../css/Texts";
import ChipInput from "material-ui-chip-input";
import back from "../img/back.svg"
import AsyncSelect from "react-select/async"
 
 export default function BlogCard(prop) {

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)
  const { currentUser,  } = useAuth()

   const patientRef = useRef()
  const passwordRef = useRef()
  const examinationRef = useRef()
    const refQuantity = useRef()
const refDosage = useRef()
  const historyRef = useRef()
  const suggestionRef = useRef()
  const refDays = useRef()
  const refFrequency = useRef()
  const refDuration = useRef()
  const refInstructions = useRef()
 
const [isAfternoon, setAfternoon] = useState(false)
const [isNight, setNight] = useState(false)

const [isMorning, setMorning] = useState(false)
   const [isMedOpen, setIsMedOpen] = useState(false)
  const [chips , setChips] = useState([])
    const [medicine , setMedicine] = useState({})
const [medError, setMedError]  = useState("")
const [meals, setMeals] = useState(0)
const [medicineName, setMedicineName] = useState("")

  function openMed(){
    setIsMedOpen(true)
  }
 
  function hideMed(){
    setIsMedOpen(false)
  }

async function finalSubmit(e){
  e.preventDefault()
  var message = ""
  var name = patientRef.current.value
  var history = historyRef.current.value
  var diagnosis = examinationRef.current.value
  var  suggestion = suggestionRef.current.value

  if(!name)     message = 'Patient name not set\n'
  if(!diagnosis) message = message +  "Patient diagnosis not set\n"
  if(!suggestion) message = message + "Suggestion to patient not set"
  
  setError(message)
  if(message)
  {
    return;
  }


    try {
      setError("")
      setLoading(true)
 
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token :  await currentUser.getIdToken() },
        body: JSON.stringify({
         patientName: name, history, diagnosis, suggestion, medicines : medicine, names : Object.keys(medicine)

        })
      }; 
      let res = await fetch('http://localhost:5000/add-prescription', requestOptions)
      res = await res.text()
      res = JSON.parse(res)
      console.log(res);
      setLoading(false)
      if (res['status'] === 'saved_successfuly') { 
        return;
      }else{

        alert("Prescription Not sent")

      }
      

      setLoading(false)
      
      } catch(e) {
    
        alert("Prescription Not sent")

        setLoading(false)
    }
} 


 const resetMedForm = () =>{

setMedicineName("")
  refDosage.current.value = ""
   setMorning(false) 
   setAfternoon(false)
   setNight(false)
   setMeals(0)
   refQuantity.current.value = ""
  refFrequency.current.value = ""
   refDuration.current.value = ""
    refDays.current.value = ""
  refInstructions.current.value = ""
 }
  // Add Chips
const handleAddChip = (chip) => {
  var dosage = refDosage.current.value
   var quantity = refQuantity.current.value
  var freq = refFrequency.current.value
  var durat = refDuration.current.value
  var nodays = refDays.current.value
  var instructions = refInstructions.current.value 
console.log(nodays)
  var errorMessage = ""
  setMedError("")
  if(!chip) errorMessage = "Medicine name not set\n"
  if(!dosage) errorMessage = errorMessage + "Medicine dosage not set\n"
  if(!durat) errorMessage = errorMessage  + "Duration not set\n"
  if(!nodays) errorMessage = errorMessage  + "Number of days medicine is to be taken not set\n"
   if(!(isMorning || isAfternoon || isNight || freq))
  {
    errorMessage = errorMessage  + "Frequency of medicine not set"
  }

  if(errorMessage)
  {
    setMedError(errorMessage)
    return
  }
  if(!medicine[chip])
  {
    medicine[chip] = {
      name : chip,
      dosage : dosage + " " + quantity,
      isMorning,
      isAfternoon,
      isNight, 
      frequency : freq,
      duration : durat + " " + nodays,
       instructions,
      meal : meals 

    }
    setMedicine(medicine)
  }else{
     setMedError("This medicine is already added to the prescription")
    return
  }
    


    setChips( Object.keys(medicine));
        hideMed()
        resetMedForm()

    
  }



 


const loadOptions = async (name) => {

    try{
       const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token :  await currentUser.getIdToken() },
        body: JSON.stringify({
          name : name
        })
      }; 
      let res = await fetch('http://localhost:5000/search-med', requestOptions)
      if(!res['isError'])
      {
        var r = []
        r.push({
          label : name,
          value : name
        })
        for(var i=0;i<res.meds.length; i++)
        {
          r.push({
            label : res.meds[i].name,
            value : res.meds[i].name
          })
        }
        return r
      }

    }catch(e)
    {
      return [{
          label : name,
          value : name
        }]
    }

 
 };

// Delete Chips
const handleDeleteChip = (chip, index) => {
   delete medicine[chip];

    setChips( Object.keys(medicine));
  }
  
      return (
    <>
 
        <Modal show={prop.show} onHide={() => {
          hideMed()
          prop.onHide();
        }} style = {{padding : "10px", }}>
        <Modal.Header  closeButton style = {{  borderBottom: "none"
}}>
          <Modal.Title>    
            
          Add Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             {!isMedOpen ? 
             <>
              <Form >
            <Form.Group id="name" style={{paddingTop: 10 }}>
              <Form.Label style = {Texts.FormLabel}>Patient Name</Form.Label>
              <Form.Control type="text" ref={patientRef} value = {prop.patientName} required />
            </Form.Group>

            <Form.Group id="history"  style={{paddingBottom: 15, paddingTop: 10,}}>
              <Form.Label  style = {Texts.FormLabel}>Patient History</Form.Label>
              <Form.Control type="text" ref={historyRef} required />
            </Form.Group>

          
            <Form.Group id="findings"  style={{paddingBottom: 16}}>
              <Form.Label  style = {Texts.FormLabel}>Diagnosis/Lab Findings</Form.Label>
              <Form.Control type="text" ref={examinationRef} required />
            </Form.Group>
    
            <Form.Group id="investigation"  style={{paddingBottom: 22}}>
              <Form.Label  style = {Texts.FormLabel}>Suggestion</Form.Label>
              <Form.Control type="text" ref={suggestionRef} required />
            </Form.Group>

          
             <ChipInput
    label="Medicines"
    readOnly = {chips.length >0 ?false : true} 
    value={chips}
    onAdd={(chip) => handleAddChip(chip)}
    onDelete={(chip, index) => handleDeleteChip(chip, index)}
/>
<br></br>
<br></br>
 {error && <Alert variant="danger" style= {{marginTop : "7px", marginBottom : "13px", whiteSpace: "pre-line"}}>{error}</Alert>}

          <Button variant="primary" onClick={openMed}>
            Add Medicine
          </Button>
          
          </Form>



             
             </>
             :


             <>
                 <Form >
            <Form.Group id="medname" style={{paddingTop: 10}}>
              <Form.Label style = {Texts.FormLabel}>Medicine Name</Form.Label>
                  <AsyncSelect
        loadOptions={loadOptions}
        onInputChange={(value) => setMedicineName(value)}
        onChange={(value) => {setMedicineName(value); console.log(medicine)}}
      > </AsyncSelect>
              
 
              {/* <Form.Control type="text" ref={medNameRef}  required /> */}
            </Form.Group>
        
 <Row>

<Col sm>   
 <Form.Group id="dob">
              <Form.Label style = {Texts.FormLabel}>Dosage</Form.Label>
              <Form.Control
                type="text"
                ref={refDosage}
 
               />
            </Form.Group></Col>

<Col sm>    <Form.Group id="gender">
              <Form.Label style = {Texts.FormLabel}> &nbsp;</Form.Label>
                  <select name="Gender" ref={refQuantity} id="dropdown-basic">
                                         <option style={{display:"none"}}>  </option>
  <option value="mg" selected >mg</option> 
   <option value="ml"   >ml</option> 
    <option value="gm"   >gm</option> 
     <option value="tablet"  >Tablet(s)</option> 
  
                        
                </select>
            </Form.Group></Col>

 </Row>

         Frequency
         <br>
         </br>
          
          <div key="checkbox" className="mb-3">
      <Form.Check inline label="Morning" checked = {isMorning} type="checkbox" id={`inline-${"checkbox"}-1`}             onChange={()=>{setMorning(!isMorning) }} />
      <Form.Check inline label="Afternoon" checked = {isAfternoon} type={"checkbox"} id={`inline-${"checkbox"}-2` }     onChange={()=>{setAfternoon(!isAfternoon) }} />
      <Form.Check inline label="Night" type={"checkbox"} checked = {isNight} id={`inline-${"checkbox"}-3`}     onChange={()=>{ setNight(!isNight)}}      />
    </div>  
<Row>
 <p style = {{paddingTop : "35px", paddingLeft : "20px", }}>or</p>
  
   <Form.Group id="medname" style = {{paddingLeft : "20px"}} >
              <Form.Label style = {Texts.FormLabel}>Frequency</Form.Label>
              <Form.Control type="text" ref={refFrequency} placeholder = "eg: Every 2 hours" />
            </Form.Group>
  </Row>            
           
           


            <Row>

<Col sm>   
 <Form.Group id="Duration">
              <Form.Label style = {Texts.FormLabel}>Duration</Form.Label>
              <Form.Control
                type="text"
                ref={refDuration}
 
               />
            </Form.Group></Col>

<Col sm>    <Form.Group id="gender">
              <Form.Label style = {Texts.FormLabel}> &nbsp;</Form.Label>
                  <select name="Gender" ref={refDays} id="dropdown-basic">
                                         <option style={{display:"none"}}>  </option>
  <option value="Days" selected >Days</option> 
   <option value="Weeks"   >Weeks</option> 
    <option value="Months"   >Months</option> 
      
                        
                </select>
            </Form.Group></Col>

 </Row>
           <div key={`inline-${"radio"}`} className="mb-3">
      <Form.Check inline label="Before Meal &nbsp;" checked = {meals === 1 ? true : false} type={"radio"} id={`inline-${"radio"}-1`} onChange = {()=>{setMeals(1)}}/>
      <Form.Check inline label="After Meal &nbsp;" type={"radio"} checked = {meals === 2 ? true : false} id={`inline-${"radio"}-2`}  onChange = {()=>{setMeals(2)}} />

      <Form.Check inline label="Doesn't matter" type={"radio"} id={`inline-${"radio"}-2`}   checked = {meals === 0 ? true : false}  onChange = {()=>{setMeals(0)}}/>

     </div>
          <Form.Group id="Instructions">
              <Form.Label style = {Texts.FormLabel}>Instructions</Form.Label>
              <Form.Control
                type="text"
                ref={refInstructions}
 
               />
            </Form.Group>
          
          </Form>

          
          
          <Row>
<Col>
      {medError && <Alert variant="danger" style= {{marginTop : "7px", marginBottom : "13px", whiteSpace: "pre-line"}}>{medError}</Alert>}

            <Button disabled={loading}   className="secondaryButton" onClick = {() => {
          hideMed()
         }} >
              Back
            </Button>
            &nbsp; &nbsp;
          <Button disabled={loading}   className="primaryButton" onClick = {() => {
          handleAddChip(medicineName)
         }} >
              Add Medicine
            </Button>

</Col>
 
 
          </Row>
          
          



             </>
             
             }


        </Modal.Body>
   {isMedOpen ? <br></br> 
   
   :     <Modal.Footer>
          
          <Button variant="primary" onClick = {()=>{
            finalSubmit()
          }} disabled = {isMedOpen || loading}  >
            Submit
          </Button>
        </Modal.Footer>
   
   }
      </Modal>
 
    </>
  )
}
  