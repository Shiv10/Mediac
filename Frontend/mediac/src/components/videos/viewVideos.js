import React, {  useState, useEffect  } from "react";
import {   Row,   } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
   import  "../blog/blog.css";
 
 import VideoComponent from "./videoComponent"
  import InfiniteScroll from 'react-infinite-scroll-component';
 import Footer from "../footer"
import Header from '../Header'

 
import Navbar from '../Navbar'
 import { useAuth } from "../../contexts/AuthContext"
   
 export default function Home() {
    document.body.style.backgroundColor = "#ededf2";
  const history = useHistory();
    const { login, currentUser } = useAuth();
   const [error, setError] = useState("")
  
  const [loading, setLoading] = useState(false)
 
    const [list, setList] = useState([])

 
  

  useEffect(() => getData(), []);
 

const queryString = window.location.pathname;


 async function  getData() {

 
 
   
       setLoading(true)
          setError("")
try{
console.log(queryString)
 
      var token = null;
      if(currentUser)
      {
        token = await  currentUser.getIdToken(true)
      }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
          body : JSON.stringify({
            type : ""
          })
          };
        let res = await fetch(process.env.REACT_APP_API_URL+'videos', requestOptions);
        res = await res.text();
        res = JSON.parse(res)
        console.log(res)
        if(res.status === "valid")
        {
 
              for(var i =0; i< res.videos.length ; i++)
              {
                res.videos[i].views = nFormatter(res.videos[i].views) 
                res.videos[i].postDate =  res.videos[i].postDate.split("T")[0]
              }

              setList(res.videos)
        }else{
              history.push('/404')
              return;
        }

}
catch(e){
        //history.push('/404')
        return;
}

       setLoading(false)


  }


 


function nFormatter(num) {
  if(!num) return 0;
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
     }
     return num;
}




    return (
    <>
        <div className="Navb" ><Navbar  /></div>

     <section className="breadcrumbs">
      <div className="container">

        <ol>
          <li><a href="/">Home</a></li>
          <li>Videos</li>
        </ol>
                <h2>Videos</h2>

 
      </div>
    </section>

    <section  className="blog">
            <div className = "container"  >

 

   <Row>


  {list.map((data, index) => (
              <VideoComponent title = {data.title} image = {data.thumbnail} 
    publishDate = {data.postDate}     views  = {data.views} videoLink = {"/video/"+data.link} isPrivate = "false" videoId = {data.videoId} >


    </VideoComponent>
          ))}
    
   
    
   </Row>
 
 
 
 
 
            </div>




    </section>
     
    <Footer></Footer>
    </>
  )
}
  
