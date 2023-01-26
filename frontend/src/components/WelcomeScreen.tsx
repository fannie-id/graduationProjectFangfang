import './WelcomeScreen.css';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {Box, Button} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

export default function WelcomeScreen() {


    return (<div>
            <div className="context">
                <Box sx={{pb: 7}}
                     mt={"6"}
                     margin={"35px"}
                     flexDirection={"column"}
                     display={"flex"}
                     flexWrap={"wrap"}
                     alignItems="center"
                     justifyContent={"center"}>


                    <h2>welcome!</h2>
                    <Button sx={{mt: 2}}
                            variant="contained"
                            type="submit"
                            color="success"
                            size="large"
                            href="/login"
                            startIcon={<FaceIcon sx={{width: 30, height: 30}}/>}>
                        login
                    </Button>

                    <Button sx={{mt: 4, frontSize: "20px"}}
                            variant="contained"
                            type="submit"
                            color="success"
                            size="large"
                            href="/register"
                            startIcon={<PersonAddAlt1Icon sx={{width: 30, height: 30}}/>}>
                        register
                    </Button>
                </Box>
            </div>

            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>


    )
}