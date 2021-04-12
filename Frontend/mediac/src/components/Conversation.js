import React, { useEffect, useState, useContext,useCallback } from "react";
import { ListGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import {CurrentChatContext} from './App';
import io from 'socket.io-client';
import "./styles.css";

function Conversation() {
  const [chats, setChats] = useState([]);
  const [active, setActive] = useState();
  const { currentUser } = useAuth();
  const [socket, setSocket] = useState();
  const [lastMsg, setLastMsg] = useState({});
  const history = useHistory();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  function handleOpenChat(id,email){
  setCurrentChat(id);
  setActive(email)
  
}
const handleNewMessage =useCallback((msgData) =>{
// chats[0]["messages"].push(msgData);
setLastMsg(msgData)
})
  
  useEffect(() => {

    async function getChats() {

      if (!currentUser) {
        history.push("/login");
      }
      const token = await app.auth().currentUser.getIdToken(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
      };
      let res = await fetch(
        "http://localhost:5000/getChatData",
        requestOptions
      );

      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      await setChats(res["chats"]);
      if (currentChat === "") return;
      const newSocket = io('http://localhost:5000/', { query: { currentChat } });
      setSocket(newSocket);
      // console.log(socket)
      console.log(chats);
      return () => newSocket.close();
    }

    getChats();
    if(!socket) return
    socket.on('new-message', handleNewMessage); 
  }, []);

  return (
    <div>
      <div className="container">
        <div>
          <div className="top w-100">
            <br />
          </div>

          {chats.map((chat) => (
            <>
            {chat.archieved?(<></>):(
              <div
              className="bottom overflow-auto "
              style={{ height: "350px", fontSize: "13px" }}
              onClick={() => {
                let email= currentUser.email == chat.doctorEmail? chat.patientEmail: chat.doctorEmail
                handleOpenChat(chat.chatId,email);
                
              }}
            >
              <div className={`d-flex justify-content-between align-items-center conv ${active===(currentUser.email == chat.doctorEmail? chat.patientEmail: chat.doctorEmail)? 'convactive':''}`} >
                <div className="d-flex flex-row align-items-center conv w-100">
                  <div className="image">
                    {" "}
                    <img
                      src="https://i.imgur.com/jhsYqVT.png"
                      width="50"
                    />{" "}
                    <span className="type"></span>{" "}
                  </div>
                  <div className={`d-flex flex-column line-height ml-2 `}>
                    {" "}
                    <span className="font-weight-bold">
                      {currentUser.email == chat.doctorEmail
                        ? chat.patientUsername
                        : chat.doctorUsername}
                    </span>{" "}
                    <span>
                      {/* {chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1].text
                        : "Start Conversation"} */}
                      {lastMsg.text !=undefined
                        ? lastMsg.text
                        : "Start Conversation"}
                    </span>{" "}
                    <span className="d-flex flex-row align-items-center s-now">
                      <small className="live">
                        {/* {chat.messages.length > 0
                          ? chat.messages[chat.messages.length - 1].time + ", "+ chat.messages[chat.messages.length - 1].date
                          : ""} */}
                          {lastMsg.text !=undefined
                          ? lastMsg.time + ", "+ lastMsg.date
                          : ""}
                      </small>
                    </span>{" "}
                  </div>
                </div>{" "}
                <span className="dots"> </span>
              </div>
              <hr />
              <br />
            </div>
            )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Conversation;
