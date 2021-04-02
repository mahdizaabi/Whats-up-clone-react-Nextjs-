import { Button } from "@material-ui/core";
import Head from "next/head";
import { auth, provider } from "../firebase";

function Login({isSignedIn, laoding}) {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    if(isSignedIn || laoding){
        return null;
    }
  return (
    <div className="login__container">
      <Head>
        <title>Login</title>
      </Head>
      <div className="login__logoContainer">
        <img className="login__logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        <Button variant="outlined" onClick={signIn}>Sign in with google</Button>
      </div>
    </div>
  );
}

export default Login;

