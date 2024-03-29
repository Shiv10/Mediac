import React, {  useState, useEffect  } from "react";
import {   Row,   } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
 
   import  "../blog/blog.css";
 import {reactLocalStorage} from 'reactjs-localstorage';

 import VideoComponent from "../blog/blogCardSmall"
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

  const [isMine, setMine] = useState(false);

  
   useEffect( () => {
     onlyOnce();
  }, [] )

async function onlyOnce()  {
  if(!currentUser) return;
  var role =  reactLocalStorage.get('role') 
 
  if(role === undefined) role  = "";
 
  
  if(role ==="patient"){
       return history.replace('/dashboard');
    }
  }
  useEffect(() => getData(), []);
 

const queryString = window.location.pathname;


 async function  getData() {

 
 
   
       setLoading(true)
          setError("")
try{
console.log(queryString)
if(queryString === "my-videos")
{
  setMine(true);
}
      var token = null;
      if(currentUser)
      {
        token = await  currentUser.getIdToken(true)
      }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','token': token },
         
          };
        let res = await fetch(process.env.REACT_APP_API_URL+'myvideos', requestOptions);
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
    console.log(e)
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


 const removeFromList = (e) => {
          list.splice(e, 1);
         console.log(list)
         setList(list)

  
  };
 



    return (
    <>
 <Header></Header>
   <br></br>

   <br></br>
<br></br>
    <section  className="blog">
            <div className = "container"  >

 

   <Row>


  {list.map((data, index) => (
              <VideoComponent title = {data.title} image = {data.thumbnail} 
    publishDate = {data.postDate}   removeFromList = {() => removeFromList(index)} type = "video"  id = {data._id}  views  = {data.views} videoLink = {"/video/"+data.link} isPrivate = "true" videoId = {data.videoId} >


    </VideoComponent>
          ))}
    
   
    
   </Row>
 
 
 
 
 
            </div>




    </section>
     
     </>
  )
}
  
