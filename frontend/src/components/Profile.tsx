import {Box} from "@mui/material";
import {UserInfo} from "../model/User";

type ProfileProps = {
    user: UserInfo | undefined
}
export default function Profile(props: ProfileProps) {
    return (<Box
            sx={{pb: 7}}
            margin={"8px"}
            flexDirection={"column"}
            display={"flex"}
            flexWrap={"wrap"}
            alignItems="center"
            justifyContent={"center"}>

            {props.user !== undefined && props.user.username}


        </Box>
    )
}