import {Box, IconButton, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import {RegisterUser} from "../model/User";
import useUsers from "../hooks/useUsers";

export default function Register() {
    const emptyUser: RegisterUser = {
        "username": "",
        "email": "",
        "password": ""
    }
    const [registerUser, sRegisterUser] = useState<RegisterUser>(emptyUser)

    const {addUser} = useUsers()


    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        sRegisterUser((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        addUser(registerUser)
    }


    return (<Box>
        <form onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                fullWidth
                name={"username"}
                value={registerUser.username}
                label="Username"
                placeholder="Username"
                onChange={handleFormChange}
            />

            <TextField
                margin="normal"
                fullWidth
                name={"email"}
                value={registerUser.email}
                label="E-Mail"
                placeholder="E-Mail"
                onChange={handleFormChange}
            />
            <TextField
                margin="normal"
                fullWidth
                name={"password"}
                value={registerUser.password}
                label="Password"
                placeholder="Password"
                onChange={handleFormChange}
            />
            <IconButton type="submit">
                <PublishedWithChangesIcon color="success" fontSize={"large"}/>
            </IconButton>

        </form>


    </Box>)

}