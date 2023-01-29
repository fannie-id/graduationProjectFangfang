import {Avatar, Box, Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {UserInfo} from "../../model/User";
import {useNavigate} from "react-router-dom";
import {PhotoCamera} from "@mui/icons-material";
import FaceRetouchingOffIcon from "@mui/icons-material/FaceRetouchingOff";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';

type ProfileFormProps = {
    user: UserInfo
    submitUser: (changUser: UserInfo) => Promise<UserInfo>
    deleteUser: (user: UserInfo) => Promise<any>
    uploadImg: (username: string, img: File) => Promise<any>
}

export default function ProfileForm(props: ProfileFormProps) {


    const [changeUser, setChangeUser] = useState<UserInfo>(props.user)

    const [image, setImage] = useState<File | null>(null)

    const navigate = useNavigate()

    if (props.user === undefined) {
        return (<p>loading</p>)
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setChangeUser((prevState) => ({...prevState, [nameOfInput]: inputValue}))
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
            setImage(event.target.files[0])
        }
    }

    function onUploadImg() {

        if (image) {
            props.uploadImg(props.user.username, image).then(data => {
                setChangeUser((prevState) => ({...prevState, img: data.secure_url}))
                props.submitUser(changeUser).then(user => {
                    console.log("added image to user " + changeUser.username)
                })

            })
        }

    }

    function removeImg() {
        setImage(null)
    }

    function handleDeleteUser() {
        props.user && props.deleteUser(props.user)
            .then(user => {
                navigate("/login")
            })
    }

    return (<Box
            flexDirection={"column"}
            display={"flex"}
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent={"center"}>

            <Box mt={"20px"}><h2>edit {changeUser.username}'s profile</h2></Box>

            <form onSubmit={handleSubmit}>
                <Box flexDirection={"column"}
                     display={"flex"}
                     flexWrap={"wrap"}
                     alignItems="center"
                     justifyContent={"center"}>
                    {(!image && props.user && props.user.img) ?
                        <Avatar alt="username"
                                src={props.user.img}
                                sx={{width: 100, height: 100, mt: 3}}/> :
                        !image && <Avatar src="/broken-image.jpg"
                                          sx={{width: 100, height: 100, mt: 3}}/>}

                    {image && (
                        <Box flexDirection={"column"}
                             display={"flex"}
                             flexWrap={"wrap"}
                             alignItems="center"
                             justifyContent={"center"}>
                            <Avatar alt="username"
                                    src={URL.createObjectURL(image)}
                                    sx={{width: 100, height: 100, mt: 3}}/>
                            <Button sx={{mt: 2}} variant="outlined" onClick={removeImg}
                                    startIcon={<NoPhotographyIcon/>}>Remove</Button>
                        </Box>
                    )}
                    {!image && < Button sx={{mt: 2}}
                                        color="success"
                                        variant="contained"
                                        component="label"
                                        startIcon={<PhotoCamera/>}>
                        Upload
                        <input hidden accept="image/*" multiple type="file" onChange={onChangeImg}/>
                    </Button>}

                    {image &&
                        <Button sx={{mt: 2}}
                                onClick={onUploadImg}
                                color="success"
                                variant="contained"
                                component="label"
                                startIcon={<PublishedWithChangesIcon/>}>
                            save as profile foto
                        </Button>}

                </Box>
                <Box sx={{ml: 2, mr: 2, mt: 2}}>


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
                        onChange={handleFormChange}
                    />


                    <TextField
                        margin="normal"
                        fullWidth
                        name={"name"}
                        value={changeUser.name ? changeUser.name : ""}
                        label="Name"
                        placeholder="Name"
                        onChange={handleFormChange}
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


                    <Button sx={{mt: 1}} color="success" variant="contained" type="submit"
                            startIcon={<PublishedWithChangesIcon/>}>
                        save
                    </Button>
                    <Box flexDirection={"column"}
                         display={"flex"}
                         flexWrap={"wrap"}
                         alignItems="left"
                         justifyContent={"left"}>


                        <Button sx={{mt: 4}} variant="outlined" onClick={handleDeleteUser} component="label"
                                startIcon={<FaceRetouchingOffIcon/>}>
                            delete profile
                        </Button>
                    </Box>
                </Box>

            </form>


        </Box>
    )
}