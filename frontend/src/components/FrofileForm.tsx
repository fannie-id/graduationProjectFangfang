import {Box, IconButton, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {UserInfo} from "../model/User";
import {useNavigate} from "react-router-dom";

type ProfileFormProps = {
    user: UserInfo | undefined
    submitUser: (changUser: UserInfo) => Promise<UserInfo>
}

export default function ProfileForm(props: ProfileFormProps) {
    if (!props.user) {
        return (<p>loading</p>)
    }
    const [ChangeUser, setChangeUser] = useState<UserInfo>(props.user)

    const navigate = useNavigate()

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
        props.submitUser(ChangeUser)
            .then(() => {
                navigate("/profile")
            })
    }


    return (<Box
            sx={{pb: 7}}
            margin={"8px"}
            flexDirection={"column"}
            display={"grid"}
            flexWrap={"wrap"}
            justifyContent={"center"}>

            <form onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    fullWidth
                    name={"description"}
                    value={ChangeUser.username}
                    label="Description"
                    placeholder="Description"
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"email"}
                    value={ChangeUser.email}
                    label="Description"
                    placeholder="Description"
                    onChange={handleFormChange}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"street"}
                    value={ChangeUser.address.street}
                    label="Street"
                    placeholder="Street"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name={"houseNumber"}
                    value={ChangeUser.address.houseNumber}
                    label="House Number"
                    placeholder="House Number"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name={"zip"}
                    value={ChangeUser.address.zip}
                    label="ZIP"
                    placeholder="ZIP"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name={"city"}
                    value={ChangeUser.address.city}
                    label="City"
                    placeholder="City"
                    onChange={handleFormAddressChange}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"name"}
                    value={ChangeUser.address.name}
                    label="Name"
                    placeholder="Name"
                    onChange={handleFormAddressChange}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"karmaPoints"}
                    value={ChangeUser.karmaPoints}
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