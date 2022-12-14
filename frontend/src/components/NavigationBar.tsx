import {Link} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps';
import {useState} from "react";

export default function NavigationBar() {

    const [path, setPath] = useState<String>()
    return (
        <div>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>

                <BottomNavigation
                    showLabels
                    value={path}
                    onChange={(event, newValue) => {
                        setPath(newValue);
                    }}
                >
                    <BottomNavigationAction component={Link} label="overview" to={"/deeds"} icon={< AppsIcon/>}
                                            value={"/deeds"}/>
                </BottomNavigation>
            </Paper>
        </div>
    )
}