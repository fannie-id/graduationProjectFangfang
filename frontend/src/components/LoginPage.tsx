import {Box, IconButton, TextField} from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import {ChangeEvent, FormEvent, useState} from "react";
import {LoginUser} from "../model/User";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    getLoginUser: (user: LoginUser) => void
}

export default function LoginPage(props: LoginPageProps) {

    const emptyLoginUser: LoginUser = {
        "username": "",
        "password": ""
    }
    const [loginUser, setLoginUser] = useState<LoginUser>(emptyLoginUser)
    const navigate = useNavigate()

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setLoginUser((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.getLoginUser(loginUser)
        navigate("/deeds")
    }

    return (<Box
        sx={{pb: 7}}
        margin={"8px"}
        flexDirection={"column"}
        display={"flex"}
        flexWrap={"wrap"}
        alignItems="center"
        justifyContent={"center"}>

        <form onSubmit={handleSubmit}>
            <TextField
                required
                name={"username"}
                value={loginUser.username}
                label="Username"
                placeholder="Username"
                onChange={handleFormChange}
            />

            <TextField
                margin="normal"
                required
                name={"password"}
                value={loginUser.password}
                label="Password"
                placeholder="Password"
                onChange={handleFormChange}
            />
            <IconButton type="submit">
                <FaceIcon color="success"/>
            </IconButton>

        </form>

    </Box>)
}