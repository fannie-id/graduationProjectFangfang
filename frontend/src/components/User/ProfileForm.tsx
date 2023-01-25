import {Avatar, Box, Button, IconButton, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {UserInfo} from "../../model/User";
import {useNavigate} from "react-router-dom";
import {PhotoCamera} from "@mui/icons-material";

type ProfileFormProps = {
    user: UserInfo
    submitUser: (changUser: UserInfo) => Promise<UserInfo>
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
        if (event.target.files !== null) {
            setChangeUser((prevState) => ({...prevState, "img": event.target.files[0]}))
        }
    }

    function removeImg() {
        setChangeUser((prevState) => ({...prevState, "img": undefined}))
    }


    return (<Box
            sx={{pb: 7}}
            margin={"8px"}
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
                <Button variant="contained" component="label" startIcon={<PhotoCamera/>}>
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
                    name={"street"}
                    value={changeUser.address ? changeUser.address.address : ""}
                    label="Street"
                    placeholder="Street"
                    onChange={handleFormAddressChange}
                />


                <TextField
                    margin="normal"
                    fullWidth
                    name={"name"}
                    value={changeUser.address ? changeUser.address.name : ""}
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

                <IconButton type="submit">
                    <PublishedWithChangesIcon color="success" fontSize={"large"}/>
                </IconButton>

            </form>
        </Box>
    )
}