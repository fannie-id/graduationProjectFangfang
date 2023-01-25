import {Avatar, Box, Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {UserInfo} from "../../model/User";
import {useNavigate} from "react-router-dom";
import {PhotoCamera} from "@mui/icons-material";
import FaceRetouchingOffIcon from "@mui/icons-material/FaceRetouchingOff";

type ProfileFormProps = {
    user: UserInfo
    submitUser: (changUser: UserInfo) => Promise<UserInfo>
    deleteUser: (user: UserInfo) => Promise<any>
}

export default function ProfileForm(props: ProfileFormProps) {


    const [changeUser, setChangeUser] = useState<UserInfo>(props.user)

    const navigate = useNavigate()

    if (props.user === undefined) {
        return (<p>loading</p>)
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setChangeUser((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }


    function handleFormAddressChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setChangeUser((prevState) => {
                const newState = {...prevState}
                // @ts-ignore nested object
                newState.address[nameOfInput] = inputValue
                return newState
            }
        )
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.submitUser(changeUser)
            .then(user => {
                navigate("/profile")
            })
    }

    function onChangeImg(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files !== undefined) {
            setChangeUser((prevState) => ({...prevState, "img": event.target.files[0]}))
        }
    }

    function removeImg() {
        setChangeUser((prevState) => ({...prevState, "img": ""}))
    }

    function handleDeleteUser() {
        props.user && props.deleteUser(props.user)
            .then(user => {
                navigate("/login")
            })
    }

    return (<Box
            sx={{pb: 7}}
            margin={"35px"}
            flexDirection={"column"}
            display={"grid"}
            flexWrap={"wrap"}
            justifyContent={"center"}>
            <h2>Hi, {changeUser.username}</h2>

            <form onSubmit={handleSubmit}>

                {changeUser.img && (
                    <div>
                        <Avatar alt="username" src={URL.createObjectURL(changeUser.img)}
                                sx={{width: 100, height: 100}}/>
                        <Button onClick={removeImg}>Remove</Button>
                    </div>
                )}
                <Button color="success" variant="contained" component="label" startIcon={<PhotoCamera/>}>
                    Upload
                    <input hidden accept="image/*" multiple type="file" onChange={onChangeImg}/>
                </Button>


                <TextField
                    margin="normal"
                    fullWidth
                    name={"email"}
                    value={changeUser.email}
                    label="Email"
                    placeholder="email"
                    onChange={handleFormChange}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"address"}
                    value={changeUser.address ? changeUser.address : ""}
                    label="Address"
                    placeholder="Address"
                    onChange={handleFormAddressChange}
                />


                <TextField
                    margin="normal"
                    fullWidth
                    name={"name"}
                    value={changeUser.name ? changeUser.name : ""}
                    label="Name"
                    placeholder="Name"
                    onChange={handleFormAddressChange}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"karmaPoints"}
                    value={changeUser.karmaPoints}
                    label="Karma Points"
                    placeholder="Karma Points"
                    InputProps={{
                        readOnly: true,
                    }}
                />


                <Button color="success" variant="contained" type="submit" startIcon={<PublishedWithChangesIcon/>}>
                    save
                </Button>

            </form>

            <Button sx={{mt: 4}} variant="outlined" onClick={handleDeleteUser} component="label"
                    startIcon={<FaceRetouchingOffIcon/>}>
                delete profile
            </Button>
        </Box>
    )
}