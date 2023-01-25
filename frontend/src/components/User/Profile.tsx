import {Avatar, Box, Button} from "@mui/material";
import {UserInfo} from "../../model/User";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import {useNavigate} from "react-router-dom";
import {Deed} from "../../model/Deed";
import DeedSpots from "../Deed/DeedSpots";

type ProfileProps = {
    user: UserInfo | undefined
    deeds: Deed[]
}
export default function Profile(props: ProfileProps) {
    const navigate = useNavigate()

    function toEditPage() {
        navigate("/profile/edit")

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
            <Avatar src="/broken-image.jpg" sx={{width: 100, height: 100}}/>
            {/*{changeUser.img ? <Avatar alt="username" src={URL.createObjectURL(props.user.img)}
                                      sx={{width: 100, height: 100}}/> : <Avatar>{props.user.name.charAt(0).toUpperCase()}</Avatar>}
*/}
            <Button color="success" onClick={toEditPage} variant="contained"
                    component="label" startIcon={<FaceRetouchingNaturalIcon/>} sx={{m: 2}}>
                edit Profile
            </Button>

            <Box boxShadow={1} sx={{p: 4}}>
                {madeDeeds.length > 0 && <h4>nice thing other help me:</h4>}
                {madeDeeds}
                {takenDeeds.length > 0 && <h4>nice thing i made:</h4>}
                {takenDeeds}
            </Box>


        </Box>
    )
}