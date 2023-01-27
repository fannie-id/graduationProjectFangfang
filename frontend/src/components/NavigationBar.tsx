import {Link} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Box, Paper} from "@mui/material";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useEffect, useState} from "react";
import FaceIcon from '@mui/icons-material/Face';
import {UserInfo} from "../model/User";

type NavigationBarProps = {
    logout: () => Promise<any>
    user: UserInfo | undefined
}
export default function NavigationBar(props: NavigationBarProps) {

    const [path, setPath] = useState<string>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    useEffect(() => {
        if (props.user?.username !== "anonymousUser") {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }, [props.user])


    return (

        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <Box>
                <BottomNavigation
                    showLabels
                    value={path}
                    onChange={(event, newValue) => {
                        setPath(newValue);
                    }}
                >
                    {isLoggedIn &&
                        <BottomNavigationAction component={Link} label="profile" to={"/profile"} icon={< FaceIcon/>}
                                                value={"/profile"}/>}
                    {isLoggedIn &&
                        <BottomNavigationAction component={Link} onClick={props.logout} label="logout" to={""}
                                                icon={< ExitToAppIcon/>} value={""}/>}
                    {isLoggedIn && <BottomNavigationAction component={Link} label="overview" to={"/deeds"}
                                                           icon={< AllInclusiveIcon/>}
                                                           value={"/deeds"}/>}
                    {!isLoggedIn && <BottomNavigationAction component={Link} label="register" to={"/register"}
                                                            icon={< AddReactionIcon/>}
                                                            value={"/register"}/>}
                    {!isLoggedIn &&
                        <BottomNavigationAction component={Link} label="login" to={"/login"} icon={< FaceIcon/>}
                                                value={"/login"}/>}
                </BottomNavigation>
            </Box>
            </Paper>

    )
}