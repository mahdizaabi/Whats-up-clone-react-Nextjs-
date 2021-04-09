function Message({user, message}) {

    return(
        <div className="message__container">
            <p> {message.message} </p>
        </div>
    )
}

export default Message;