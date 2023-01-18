import {Box, IconButton} from "@mui/material";
import {UserInfo} from "../model/User";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import {useNavigate} from "react-router-dom";

type ProfileProps = {
    user: UserInfo | undefined
}
export default function Profile(props: ProfileProps) {
    const navigate = useNavigate()

    function toEditPage() {
        navigate("/profile/edit")
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
                <PublishedWithChangesIcon color="success" fontSize={"large"}/>
            </IconButton>

        </Box>
    )
}