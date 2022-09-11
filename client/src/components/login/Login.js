import React, { useState } from "react";
import styles from "./login.module.css"

const Login = (props) => {
    const [nameChange , setNameChange] = useState("")

    const changeInputHandler =(event)=>{
        setNameChange(event.target.value)
        
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        props.setLoginTag(false);
        props.setMyName(nameChange)
        props.socket.emit("join" , nameChange);
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submitHandler} >
                <label htmlFor="name" >name:</label>
                <input type="text" id="name" name="name" onChange={changeInputHandler}/>

                <button type="submit">Log in</button>
            </form>
        </div>
    )
}
export default Login;