import { Circle } from "better-react-spinkit"
import LinearProgress from '@material-ui/core/LinearProgress';

function Loading({isLaoding}){
    if(isLaoding){
    return (
        <div className="loadingBar">
            <div className="loaderBox">
                <img
                className="loading__img"
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                alt=""
                height={200}
                ></img>
            <Circle></Circle>
            </div>
        </div>
    )
}

else {
    return null;
}
}


export default Loading;