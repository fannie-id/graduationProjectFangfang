import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {UserRegister} from "../../model/User";
import {useNavigate} from "react-router-dom";

type RegisterProps = {
    addUser: (user: UserRegister) => Promise<any>
}

export default function Register(props: RegisterProps) {
    const emptyUser: UserRegister = {
        "username": "",
        "email": "",
        "password": ""
    }
    const [registerUser, setRegisterUser] = useState<UserRegister>(emptyUser)


    const navigate = useNavigate()

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setRegisterUser((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.addUser(registerUser).then(status => {
            navigate("/login")
        })
    }


    return (<Box
        sx={{pb: 7}}
        margin={"35px"}
        flexDirection={"column"}
        display={"flex"}
        flexWrap={"wrap"}
        alignItems="center"
        justifyContent={"center"}>
        <h2>Register</h2>
        <Box sx={{m: 4}} textAlign='center'>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required
                    name={"username"}
                    value={registerUser.username}
                    label="Username"
                    placeholder="Username"
                    onChange={handleFormChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    required
                    name={"email"}
                    value={registerUser.email}
                    label="E-Mail"
                    placeholder="E-Mail"
                    onChange={handleFormChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    name={"password"}
                    type="password"
                    value={registerUser.password}
                    label="Password"
                    placeholder="Password"
                    onChange={handleFormChange}
                />
                <Button sx={{mt: 4}}
                        variant="contained"
                        type="submit"
                        color="success"
                        size="large"
                        startIcon={<PersonAddAlt1Icon sx={{width: 30, height: 30}}/>}>
                    register
                </Button>

            </form>
        </Box>

    </Box>)

}