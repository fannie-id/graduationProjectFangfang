import {Box, IconButton, TextField} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {ChangeEvent, FormEvent, useState} from "react";
import {LoginUser} from "../model/User";
import useUser from "../hooks/useUser";

export default function LoginPage() {

    const emptyLoginUser: LoginUser = {
        "username": "",
        "password": ""
    }
    const [loginUser, setLoginUser] = useState<LoginUser>(emptyLoginUser)

    const {getLoginUser} = useUser()


    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setLoginUser((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        getLoginUser(loginUser)
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
                <PersonAddAlt1Icon color="success"/>
            </IconButton>

        </form>

    </Box>)
}