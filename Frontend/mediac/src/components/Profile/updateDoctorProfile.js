import React, { useRef,useEffect, useState } from "react"
import { Form, Button,Row,Container,Col,  Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {CardMain} from "../../css/Card";
import useWindowDimensions from "../../functions/windowDimensions"
 import {Texts} from "../../css/Texts";
import Navbar from "../Header"
import {reactLocalStorage} from 'reactjs-localstorage';
import {stopfile} from '../utility/alertUploadFile'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
    const nameRef = useRef()
  const phoneRef = useRef()
  const genderRef = useRef()
  const dobRef = useRef()
  const degreeRef = useRef()
  const eduRef = useRef()
  const graduationRef = useRef()
  const usernameRef = useRef()
  const awardsRef = useRef()
  const aboutMeRef = useRef()
  const facebookRef = useRef()
  const linkedinRef = useRef()
  const twitterRef = useRef()
  const medicalNumberRef = useRef()
  const clinicNameRef = useRef()
  const expertiseRef = useRef()
  const researchRef = useRef()

const pastExpRef = useRef()
const specializatoinRef = useRef()
  const [medicalNumber, setMedicalNumber] = useState("") 
  const [clinicName, setClinicName] = useState("") 
  const [expertise, setExpertise] = useState("") 
  const [research, setResearch] = useState("") 

  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
    const [success, setSuccess] = useState("") 

  const [loading, setLoading] = useState(false)
  const history = useHistory()
const [file, setFile] = useState("");
  const [picture, setPicture] = useState(null);
  const { height, width } = useWindowDimensions();

   const [coverPicture, setCoverPicture] = useState(null);

const [coverFile, setCoverFile] = useState("");

 
 const [name, setName] = useState("")

 const [gender, setGender] = useState("")
 const [dob, setDob] = useState("")
 const [phone, setPhone] = useState("") 
  const [degree, setDegree] = useState("") 
 const [education, setEducation] = useState("") 
 const [special, setSpecial] = useState("") 
 const [graduation, setGraduation] = useState("") 
  const [username, setUsername] = useState("") 
  const [pastExp, setPastExp] = useState("") 
  const [awards, setawards] = useState("") 
    const [about, setAbout] = useState("") 
    const [facebook, setFacebook] = useState("") 
    const [linkedin, setLinkedin] = useState("") 
    const [twitter, setTwitter] = useState("") 
    const [profile, setProfile] = useState("") 

   useEffect( () => {
    
        document.body.style.backgroundColor = "#ededf2";

    getProfiles();
  }, [ ]);

  useEffect( () => {
     onlyOnce();
  }, [] )

async function onlyOnce()  {
  if(!currentUser) return;
  var role =  reactLocalStorage.get('role') 
 
  if(role === undefined) role  = "";
 
   if (role === "patient" )
   { 
    return history.replace('/update-profile')
     }
  
  }
 async function getProfiles() {


       if (currentUser) {
        const token = await  currentUser.getIdToken(true)
         const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
          body : JSON.stringify({patientUid: currentUser.uid})

          };
        let res = await fetch(process.env.REACT_APP_API_URL+'my-profile', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
         if(res.isError)
        {
          return
        }
       var resp = res.data
        if(resp.dob)
        {

          setDob(resp.dob.split("T")[0])
        }
        setName(resp.name)
        setGender(resp.gender)
        setPhone(resp.phone)
        setGraduation(resp.graduationYear)
        setDegree(resp.degree)
        setEducation(resp.education)
        if(resp.pastExperience)
        setPastExp(resp.pastExperience)
        if(resp.awards)
        setawards(resp.awards)
        setFacebook(resp.fb)
        setLinkedin(resp.linkedin)
        setTwitter(resp.twitter)
setProfile(resp.profileImage)
        setSpecial(resp.specialisation)
        setUsername(resp.username)
        if(resp.about)
        setAbout(resp.about)
        setCoverPicture(resp.coverImage)
        setMedicalNumber(resp.medicalNumber)
        setClinicName(resp.clinicName)
        setExpertise(resp.expertise)
        setResearch(resp.research)

        console.log(resp)
       }

    }
   const onChangePicture = e => {
    if (e.target.files && e.target.files[0]){
      if(stopfile(e.target.files[0])){
        return
      }
           setPicture(URL.createObjectURL(e.target.files[0]) );
      setFile(e.target.files[0])
updateProfileImage(e.target.files[0]);

     


    }
  
    
};   const onChangeCoverPicture = e => {
    if (e.target.files && e.target.files[0]){
           setCoverPicture(URL.createObjectURL(e.target.files[0]) );
      setCoverFile(e.target.files[0])
updateCoverImage(e.target.files[0]);

     


    }
  
    
};
async function updateCoverImage(target){



try{

          setLoading(true)
          setError("")
          setSuccess("")
          const token = await currentUser.getIdToken()
console.log("----",target, "FILE 173")
   
          var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
                body : JSON.stringify({

fileName :   target["name"],
prefix : "cover",
type : "cover"

          })
         };

          let res = await fetch(process.env.REACT_APP_API_URL+'get-profile-upload-url', requestOptions);
         res = await res.text();
           res = JSON.parse(res)
  if(res.url == null )

 {
setLoading ( false)
setError("Some error occured")
   return ;
 }
 let r = await fetch(res.url, {
    method: "PUT",
    body: target,
    headers: {
      "Content-Type": "image/jpeg",
      "x-amz-acl": "public",
   
     },
  });

if(r.status !== 200)
{
   setLoading ( false)
setError("Some error occured")
   return ;
}
 setLoading (false)
requestOptions.body = JSON.stringify({profileImage: res.fileName, type : "cover"})

          let resp = await fetch(process.env.REACT_APP_API_URL+'save-doctor-profile-image', requestOptions);

if(resp.isError)
{
  setLoading ( false)
setError("Some error occured")
   return ;
}
setSuccess("Profile picture changed successfully")



}catch(e){
setLoading (false)
setError("Some error occured")



}




}
async function updateProfileImage(target){



try{

          setLoading(true)
          setError("")
          const token = await currentUser.getIdToken()
console.log(target)
   
          var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
                body : JSON.stringify({

fileName :   target["name"]

          })
         };

          let res = await fetch(process.env.REACT_APP_API_URL+'get-profile-upload-url', requestOptions);
         res = await res.text();
           res = JSON.parse(res)
  if(res.url == null )

 {
setLoading ( false)
setError("Some error occured")
   return ;
 }
 let r = await fetch(res.url, {
    method: "PUT",
    body: target,
    headers: {
      "Content-Type": "image/jpeg",
      "x-amz-acl": "public",
   
     },
  });

if(r.status !== 200)
{
   setLoading ( false)
setError("Some error occured")
   return ;
}
 setLoading (false)
requestOptions.body = JSON.stringify({profileImage: res.fileName})

          let resp = await fetch(process.env.REACT_APP_API_URL+'save-doctor-profile-image', requestOptions);

if(resp.isError)
{
  setLoading ( false)
setError("Some error occured")
   return ;
}
setSuccess("Profile picture changed successfully")



}catch(e){
setLoading (false)
setError("Some error occured")



}




}

 async function handleSubmit(e) {
    e.preventDefault()
   setError("")
 setSuccess("")


     setLoading(true)
  
    

try{
     if(currentUser)
      {
          setError("")
          setLoading(true)

          const token = await  currentUser.getIdToken()
   
          var d={  
           name : nameRef.current.value,
           gender : genderRef.current.value,
           dob : dobRef.current.value,
           phone : phoneRef.current.value,
           graduationYear : graduationRef.current.value,
           degree : degreeRef.current.value,
           education : eduRef.current.value,
           pastExperience : pastExpRef.current.value,
           awards : awardsRef.current.value,
           specialisation : specializatoinRef.current.value,
           username : usernameRef.current.value,
           about : aboutMeRef.current.value,
           fb : facebookRef.current.value,
           linkedin : linkedinRef.current.value,
           twitter : twitterRef.current.value,
           clinicName : clinicNameRef.current.value,
           medicalNumber:medicalNumberRef.current.value,
           expertise:expertiseRef.current.value,
           research:researchRef.current.value


            };

 console.log(d)

          var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'token': token },
          body:JSON.stringify(d)
        };

          let res = await fetch(process.env.REACT_APP_API_URL+'update-doctor-profile', requestOptions);
   res = await res.text();
          res = JSON.parse(res)

 
          if(res.isError)
          {

            
               setError("Error while updating profile")  

          }else{


            setSuccess("Profile updated successfully")
          }

     setLoading(false)
















      }

}catch(e)
{
         setLoading(false)

}


     setLoading(false)




  
  }
    const hiddenFileInput = React.useRef(null);

   const handleClick = event => {
         hiddenFileInput.current.click();

  };

      const hiddenCoverFileInput = React.useRef(null);

   const handleCoverClick = event => {
         hiddenCoverFileInput.current.click();

  };
  return (
    <>
<Navbar selected = "edit" />
<br></br>
<br></br>
          <div>
<br></br>

<Container  style={{    paddingTop: '20px', }}>


 <Card style = {CardMain} >

   <Card.Title>
     
   </Card.Title>
        <Card.Body>

 

          <h5 className="text-left mb-4" style={{letterSpacing : "0"}}>Update Profile</h5>

 
          <hr></hr>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}


          
          <Form onSubmit={handleSubmit}>

            <Row  style ={{paddingLeft : "22px" , flexDirection: 'row',  display: "flex", alignItems : "center",   }}>
  <img  width="400" height="140" src={coverPicture == null ?  coverFile == null ? null : coverFile : coverPicture  } alt="" style = {{objectFit : "cover" }} /> 
 
 <div style ={{width : "20px"}}></div>
 
          <Button disabled={loading} variant="link" style = {{padding: "0px", height : "30px"}} onClick={handleCoverClick}>Change Cover Image</Button>

 <input type="file"  name="coverImg" style={{display:'none'}} ref={hiddenCoverFileInput} onChange={onChangeCoverPicture}/>

</Row>
 <br></br>

            <Row >

<Col sm>
<Row  style ={{paddingLeft : "22px" , flexDirection: 'row',  display: "flex", alignItems : "center",   }}>
  <img  width="90" height="90" src={picture == null ?  profile == null ? null : profile : picture  } alt="" style = {{borderRadius : "50%", objectFit : "cover" }} /> 
 
 <div style ={{width : "20px"}}></div>
 
          <Button disabled={loading} variant="link" style = {{padding: "0px", height : "30px"}} onClick={handleClick}>Change Image</Button>

 <input type="file"  name="myImage" style={{display:'none'}} ref={hiddenFileInput} onChange={onChangePicture}/>


</Row>
 

</Col>

<Col sm>

<Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                required
                defaultValue={name}
              />
            </Form.Group>

</Col>





            </Row>


            <hr style = {{}}></hr>
 

 <Row>

<Col sm>    <Form.Group id="email">
              <Form.Label style = {Texts.FormLabel}>Email Address</Form.Label>
              <Form.Control
                type="email"
                                defaultValue={currentUser.email}
disabled = "true"
                ref={emailRef}
              />
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="phone-number">
              <Form.Label style = {Texts.FormLabel}>Phone number</Form.Label>
              <Form.Control
                type="text"
                ref={phoneRef}
                defaultValue={phone}
              />
            </Form.Group></Col>

 </Row>




 <Row>

<Col sm>    <Form.Group id="gender">
              <Form.Label style = {Texts.FormLabel}>Gender</Form.Label>
                  <select name="Gender" ref={genderRef} id="dropdown-basic">
                                         <option style={{display:"none"}}>  </option>
{gender === "male" ? <option value="male" selected >Male</option> :  <option value="male"  >Male</option>}
                       
                       {gender === "female" ?  <option value="female" selected>Female</option>:  <option value="female">Female</option>}

 {gender === "rather not say" ?                                             <option value="rather not say" selected>Rather not say</option>
:
                                            <option value="rather not say">Rather not say</option>
}                       
  
                        
                </select>
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="dob">
              <Form.Label style = {Texts.FormLabel}>Date of birth</Form.Label>
              <Form.Control
                type="date"
                ref={dobRef}
                                defaultValue={dob}

                placeholder="Leave blank to keep the same"
              />
            </Form.Group></Col>

 </Row>


            <hr style = {{}}></hr>


 <Row>

<Col sm>    <Form.Group id="degree">
              <Form.Label style = {Texts.FormLabel}>Degree</Form.Label>
                 <Form.Control
                type="text"
                ref={degreeRef}
                                defaultValue={degree}

               />
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="education">
              <Form.Label style = {Texts.FormLabel}>Education</Form.Label>
              <Form.Control
                type="text"
                ref={eduRef}
                                defaultValue={education}

               />
            </Form.Group></Col>

 </Row>

 <Row>

<Col sm>    <Form.Group id="graduationYear">
              <Form.Label style = {Texts.FormLabel}>Years of experience</Form.Label>
                 <Form.Control
                type="text"
                ref={graduationRef}
                defaultValue = {graduation}
               />
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="username">
              <Form.Label style = {Texts.FormLabel}>Specialisation</Form.Label>
              <Form.Control
                              ref={specializatoinRef}
defaultValue = {special}
                type="text"
                />
            </Form.Group></Col>

 </Row>

 <Row>

<Col sm>    <Form.Group id="clinicName">
              <Form.Label style = {Texts.FormLabel}>Clinic Name</Form.Label>
                 <Form.Control
                type="text"
                ref={clinicNameRef}
                defaultValue = {clinicName}
               />
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="medicalNo">
              <Form.Label style = {Texts.FormLabel}>Mdedical Licence Number</Form.Label>
              <Form.Control
                              ref={medicalNumberRef}
defaultValue = {medicalNumber}
                type="text"
                />
            </Form.Group></Col>

 </Row>


 <Row>

 

<Col sm>   
 <Form.Group id="username">
              <Form.Label style = {Texts.FormLabel}>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue = {username}
                                ref={usernameRef}

                />
            </Form.Group></Col>

 </Row>
<hr></hr>


 <Row>

<Col sm>    <Form.Group id="facebook">
              <Form.Label style = {Texts.FormLabel}>Facebook Profile Link</Form.Label>
                 <Form.Control
                type="text"
                ref={facebookRef}
                defaultValue = {facebook}
               />
            </Form.Group></Col>

<Col sm>   
 <Form.Group id="linkedin">
              <Form.Label style = {Texts.FormLabel}>Linkedin Profile Link</Form.Label>
              <Form.Control
                              ref={linkedinRef}
defaultValue = {linkedin}
                type="text"
                />
            </Form.Group></Col>

 </Row>

 <Row>
<Col sm>   

 
 <Form.Group id="username">
              <Form.Label style = {Texts.FormLabel}>Twitter Profile Link</Form.Label>
              <Form.Control
                              ref={twitterRef}
defaultValue = {twitter}
                type="text"
                />
            </Form.Group></Col>

 </Row>


<hr></hr>

 <Row>

<Col sm>    <Form.Group id="about">
              <Form.Label style = {Texts.FormLabel}>About Me</Form.Label>
                 <textarea   
                 defaultValue = {about}  
                 ref = {aboutMeRef}
                         className="form-control"
 name="comments" style={{width: '100%', 
  
  }} rows="3"></textarea>

            </Form.Group></Col>

 
 

 </Row>
 <Row>

<Col sm>    <Form.Group id="expp">
              <Form.Label style = {Texts.FormLabel}>Past Experience</Form.Label>
                 <textarea             className="form-control"
              defaultValue = {pastExp}
                 ref = {pastExpRef}
 name="comments" style={{width: '100%', 
  
  }} rows="3"></textarea>

            </Form.Group></Col>

 
 

 </Row>
<Row>

<Col sm>    <Form.Group id="graduationYear">
              <Form.Label style = {Texts.FormLabel}>Awards</Form.Label>
                 <textarea   
                 defaultValue = {awards}          
                 ref = {awardsRef}
                 className="form-control"
 name="comments" style={{width: '100%', 
 
  }} rows="3"></textarea>

            </Form.Group></Col>

 
 

 </Row>

 <Row>

<Col sm>    <Form.Group id="expertise">
              <Form.Label style = {Texts.FormLabel}>Expertise</Form.Label>
                 <textarea   
                 defaultValue = {expertise}  
                 ref = {expertiseRef}
                         className="form-control"
 name="comments" style={{width: '100%', 
  
  }} rows="3"></textarea>

            </Form.Group></Col>

 
 

 </Row>


 <Row>

<Col sm>    <Form.Group id="research">
              <Form.Label style = {Texts.FormLabel}>Research</Form.Label>
                 <textarea   
                 defaultValue = {research}  
                 ref = {researchRef}
                         className="form-control"
 name="comments" style={{width: '100%', 
  
  }} rows="3"></textarea>

            </Form.Group></Col>

 
 

 </Row>






          <br></br>
                {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}


          </Form>
        </Card.Body>
      </Card>
      
     
      
      <Row style= {{paddingTop :"30px", flexDirection: 'row', justifyContent: 'flex-end',paddingRight: "15px" }}>
           
      

<Button disabled={loading}   className = "secondaryButton" onClick= {() =>        history.push('/')} >
Cancel            </Button>

<div style = {{width : "10px", height : "10px"}}></div>


   <Button disabled={loading} style={{height : "42px" }}  type="submit" className = "primaryButton" onClick= {handleSubmit}>
Update            </Button>
          </Row>



</Container>

<br></br>
<br></br>

          </div>
     
    </>
  )
}
