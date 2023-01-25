import {Box, Button, TextField} from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import {ChangeEvent, FormEvent, useState} from "react";
import {UserInfo, UserLogin} from "../../model/User";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    getLoginUser: (user: UserLogin) => Promise<UserInfo>
    user: UserInfo
}

export default function LoginPage(props: LoginPageProps) {

    const emptyLoginUser: UserLogin = {
        "username": "",
        "password": ""
    }
    const [loginUser, setLoginUser] = useState<UserLogin>(emptyLoginUser)
    const navigate = useNavigate()

    if (!!props.user && props.user.username !== "anonymousUser") {
        navigate(-1)
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setLoginUser((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.getLoginUser(loginUser).then(
            user => {
                navigate("/deeds")
            }
        )
    }

    return (<Box
        sx={{pb: 7}}
        margin={"35px"}
        flexDirection={"column"}
        display={"flex"}
        flexWrap={"wrap"}
        alignItems="center"
        justifyContent={"center"}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                required
                name={"username"}
                value={loginUser.username}
                label="Username"
                placeholder="Username"
                onChange={handleFormChange}
            />

            <TextField
                fullWidth
                margin="normal"
                required
                name={"password"}
                value={loginUser.password}
                label="Password"
                placeholder="Password"
                onChange={handleFormChange}
            />

            <Button sx={{mt: 4, left: "30%",}}
                    variant="contained"
                    type="submit"
                    color="success"
                    size="large"
                    startIcon={<FaceIcon sx={{width: 30, height: 30}}/>}>
                login
            </Button>
        </form>

    </Box>)
}