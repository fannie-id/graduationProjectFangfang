import {Box, IconButton} from "@mui/material";
import {UserInfo} from "../../model/User";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import {useNavigate} from "react-router-dom";
import {Deed} from "../../model/Deed";
import DeedSpots from "../Deed/DeedSpots";

type ProfileProps = {
    user: UserInfo | undefined
    deleteUser: (user: UserInfo) => Promise<any>
    deeds: Deed[]
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

    const madeDeeds = props.deeds.filter((deed: Deed) => deed.author === (!!props.user && props.user.username)).map(deed =>
        <DeedSpots key={deed.id} deed={deed}/>)

    const takenDeeds = props.deeds.filter((deed: Deed) => deed.maker === (!!props.user && props.user.username)).map(deed =>
        <DeedSpots key={deed.id} deed={deed}/>)
    return (<Box
            sx={{pb: 7}}
            margin={"8px"}
            flexDirection={"column"}
            display={"flex"}
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent={"center"}>


            <h2>{props.user !== undefined && props.user.username} 's Profile</h2>
            {madeDeeds.length > 0 && <p>nice thing other help me:</p>}
            {madeDeeds}
            {takenDeeds.length > 0 && <p>nice thing i made:</p>}
            {takenDeeds}

            <IconButton onClick={toEditPage} type="submit">
                <FaceRetouchingNaturalIcon color="success" fontSize={"large"}/>
            </IconButton>

            <IconButton onClick={handleDeleteUser} type="submit">
                <FaceRetouchingOffIcon color="success" fontSize={"large"}/>
            </IconButton>

        </Box>
    )
}