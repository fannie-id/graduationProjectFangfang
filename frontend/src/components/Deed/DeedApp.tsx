import {Box} from "@mui/material";
import {Deed} from "../../model/Deed";
import DeedsList from "./DeedsList";

type DeedAppProps = {
    deeds: Deed[]
    username: string | undefined
}


export default function DeedApp(props: DeedAppProps) {


    return (<Box mt={3}
                 ml={6}
                 flexDirection={"column"}
                 display={"grid"}
                 flexWrap={"wrap"}
                 justifyContent={"center"}>

            <h2>Hallo {props.username !== undefined && props.username}!</h2>

            <DeedsList deeds={props.deeds} username={props.username}/>

        </Box>
    )
}