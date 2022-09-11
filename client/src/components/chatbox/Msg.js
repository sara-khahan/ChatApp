import styles from "./msg.module.css"


const Msg =(props)=>{

    let senderStyle= "";
    let containerStyles ="";


    if(props.socket.id == props.authorId){
       senderStyle= styles["me"];
       containerStyles = styles["right"]
    }else{
        senderStyle= styles["another"]
        containerStyles = styles["left"]
    }


return(
    <div className={  `${styles.messageContainer} ${containerStyles}`}>
        <p className={`${senderStyle} ${styles.Message}`} >
        {props.message}
        </p>
        <div>
        <span>{props.time}</span>
        <span>   {props.author}</span>
        </div>


    </div>
)

}

export default Msg