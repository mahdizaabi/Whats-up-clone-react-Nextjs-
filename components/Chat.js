import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import getContactEmail from "../utils/getContactEmail";

function Chat({id, users}){
    const [user] = useAuthState(auth)
    const contactEmail = getContactEmail(users,user)
    return (
        <div className="chat__container">
            <Avatar className="chat__avatar"></Avatar>
            <p> {contactEmail} </p>
        </div>
    )
}

export default Chat;
