import {Box} from "@mui/material";
import {Deed} from "../../model/Deed";
import DeedsList from "./DeedsList";

type DeedAppProps = {
    deeds: Deed[]
    username: string | undefined
}


export default function DeedApp(props: DeedAppProps) {


    return (<Box mt={3}
                 flexDirection={"column"}
                 display={"flex"}
                 flexWrap={"wrap"}
                 justifyContent={"center"}>
            <Box ml={6}>
                <h2>Hallo {props.username !== undefined && props.username}!</h2></Box>

            <DeedsList deeds={props.deeds} username={props.username}/>

        </Box>
    )
}