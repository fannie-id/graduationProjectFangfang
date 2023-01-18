import {Box, IconButton} from "@mui/material";
import {UserInfo} from "../model/User";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import {useNavigate} from "react-router-dom";

type ProfileProps = {
    user: UserInfo | undefined
    deleteUser: (user: UserInfo) => Promise<any>
}
export default function Profile(props: ProfileProps) {
    const navigate = useNavigate()

    function toEditPage() {
        navigate("/profile/edit")
    }

    function handleDeleteUser() {
        props.user && props.deleteUser(props.user)
            .then(user => {
                navigate("/login")
            })
    }

    return (<Box
            sx={{pb: 7}}
            margin={"8px"}
            flexDirection={"column"}
            display={"flex"}
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent={"center"}>


            {props.user !== undefined && props.user.username}
            <IconButton onClick={toEditPage} type="submit">
                <FaceRetouchingNaturalIcon color="success" fontSize={"large"}/>
            </IconButton>

            <IconButton onClick={handleDeleteUser} type="submit">
                <FaceRetouchingOffIcon color="success" fontSize={"large"}/>
            </IconButton>

        </Box>
    )
}