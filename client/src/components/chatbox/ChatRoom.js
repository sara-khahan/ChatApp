import React, { useState } from "react";
import { Socket } from "socket.io-client";
import styles from "./chatRoom.module.css";
import Msg from "./Msg";

const ChatRoom = (props) => {




    const {messages} = props;
    console.log("users" , props.users );

    const [inputValue, setInputValue] = useState("")

    const inputHandler = (event) => {
        setInputValue(event.target.value)
    }

    const enterHandler = (event) => {
        if (event.key == "Enter") {
            if (inputValue !== "") {
                sendHandler()
                setInputValue("")
            }
        }
    }

    const sendHandler = async () => {
        if (inputValue !== "") {
            const messageData = {
                userName: props.myName,
                message: inputValue,
                author: props.myName,
                authorId: props.socket.id,
                id: Math.random(),
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }

            await props.socket.emit("send-message", messageData)
            props.setMessages([...messages, messageData])
        }
    }


    return (
        <div className={styles.container} >
            <div className={styles.contactContainer}>
                <div className={styles.myInfo}>
                    my name:  {props.myName}
                </div>
                <div className={styles.contact}>
                    {props.users.map(item => <div key={Math.random()}>{item.userName}</div>)}
                </div>
            </div>
            <div className={styles.chatBox}>
                <div className={styles.messageContainer}>
                    {props.messages?.map(item => <div key={Math.random()}><Msg socket={props.socket} message={item.message} time={item.time} author={item.author} authorId={item.authorId}/></div>)}
                </div>
                <div className={styles.sendMessage}>
                    <input type="text" id="message" name="message" onKeyUp={enterHandler} onChange={inputHandler} value={inputValue}/>
                    <button onClick={sendHandler}>send</button>
                </div>
            </div>



        </div>
    )
}
export default ChatRoom;