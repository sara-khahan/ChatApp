
import { useState } from 'react';
import './App.css';
import ChatRoom from './components/chatbox/ChatRoom';
import Login from './components/login/Login';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");


function App() {

  const [users, setUsers] = useState([]);
  const [loginTag, setLoginTag] = useState(true);
  const [messages, setMessages] = useState([])
  const [myName, setMyName] = useState("");



  socket.on("get-contact", (allUsers) => {
    let newArr = allUsers.filter(item => item.id !== socket.id)
    setUsers([...users, ...allUsers])
  })

  socket.on("join-massage", (user) => {
    let notif = {
      userName: user.userName,
      message: `${user.userName} join the room`,
      author: null,
      authorId: null,
      id: Math.random(),
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

    }
    setUsers([...users, { userName: user.userName, id: user.id }])
    setMessages([...messages, notif])

  })

  socket.on("get-message", (data) => {
    setMessages([...messages, data])
  })



  return (
    <div className="App">
      {loginTag ? <Login setLoginTag={setLoginTag} socket={socket} setMyName={setMyName} /> : <ChatRoom users={users} myName={myName} messages={messages} setMessages={setMessages} socket={socket} />}
    </div>
  );
}

export default App;
