import DeedsList from "./DeedsList";
import {Box} from "@mui/material";
import {Deed} from "../../model/Deed";

type DeedAppProps = {
    deeds: Deed[]
    username: string | undefined
}


export default function DeedApp(props: DeedAppProps) {


    return (<Box margin={"5px"}
                 flexDirection={"column"}
                 display={"grid"}
                 flexWrap={"wrap"}
                 justifyContent={"center"}>

            <h2>Hallo {props.username !== undefined && props.username}!</h2>

            <DeedsList deeds={props.deeds}/>




        </Box>
    )
}