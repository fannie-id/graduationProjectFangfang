import './WelcomeScreen.css';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {Box, Fab} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import {useNavigate} from "react-router-dom";
import React from "react";

export default function WelcomeScreen() {
    const navigate = useNavigate()

    function login() {
        navigate("/login")
        console.log("login")
    }

    function register() {
        navigate("/register")
    }


    return (<div>
            <div className="context">
                <Box
                    flexDirection={"column"}
                    display={"flex"}
                    flexWrap={"wrap"}
                    alignItems="center"
                    justifyContent={"center"}>


                    <h2>welcome!</h2>


                    <Fab color="success"
                         style={{position: "absolute", top: 80}}
                         aria-label="add"
                         onClick={login}
                         variant="extended">
                        <FaceIcon/>
                        login
                    </Fab>

                    <Fab color="success"
                         style={{position: "absolute", top: 160}}
                         aria-label="add"
                         onClick={register}
                         variant="extended">
                        <PersonAddAlt1Icon/>
                        register
                    </Fab>


                </Box>
            </div>

            <div className="area">
                <ul className="bubble">
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