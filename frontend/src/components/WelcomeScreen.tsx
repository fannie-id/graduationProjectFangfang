import './WelcomeScreen.css';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {IconButton} from "@mui/material";

export default function WelcomeScreen() {


    return (<div>
            <IconButton type="submit">
                <PersonAddAlt1Icon color="success"/>
            </IconButton>

        </div>
    )
}