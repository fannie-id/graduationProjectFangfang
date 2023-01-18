import {Link} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useState} from "react";
import FaceIcon from '@mui/icons-material/Face';

type NavigationBarProps = {
    logout: () => Promise<any>
}
export default function NavigationBar(props: NavigationBarProps) {

    const [path, setPath] = useState<string>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    let naviItems;
    if (isLoggedIn) {
        naviItems = <BottomNavigation
            showLabels
            value={path}
            onChange={(event, newValue) => {
                setPath(newValue);
                if (path !== "/register" && path !== "/login") {
                    setIsLoggedIn(true)
                }
            }}
        >
            <BottomNavigationAction component={Link} label="profile" to={"/profile"} icon={< FaceIcon/>}
                                    value={"/profile"}/>
            <BottomNavigationAction component={Link} onClick={props.logout} label="logout" to={""}
                                    icon={< ExitToAppIcon/>} value={""}/>
            <BottomNavigationAction component={Link} label="overview" to={"/deeds"} icon={< AllInclusiveIcon/>}
                                    value={"/deeds"}/></BottomNavigation>
    } else {
        naviItems = <BottomNavigation
            showLabels
            value={path}
            onChange={(event, newValue) => {
                setPath(newValue);
                if (path !== "/register" && path !== "/login") {
                    setIsLoggedIn(true)
                }
            }}
        >
            <BottomNavigationAction component={Link} label="register" to={"/register"}
                                    icon={< AddReactionIcon/>}
                                    value={"/register"}/>
            <BottomNavigationAction component={Link} label="login" to={"/login"} icon={< FaceIcon/>}
                                    value={"/login"}/></BottomNavigation>

    }


    return (
        <div>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                {naviItems}
            </Paper>
        </div>
    )
}