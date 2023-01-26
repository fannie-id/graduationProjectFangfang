import {Deed, DeedStatus} from "../../model/Deed";
import MapDeeds from "../Map/MapDeeds";
import {AddCircle} from "@mui/icons-material";
import {Box, IconButton, Tab} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeedSpots from "./DeedSpots";

type DeedsListProps = {
    deeds: Deed[]
    username: string | undefined

}
export default function DeedsList(props: DeedsListProps) {
    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/add")
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const aktiveDeeds = props.deeds.filter((deed: Deed) => deed.deedStatus !== DeedStatus.ACCEPTED)

    const madeDeeds = aktiveDeeds.filter((deed: Deed) => deed.author === (!!props.username && props.username)).map(deed =>
        <DeedSpots key={deed.id} deed={deed}/>)

    const takenDeeds = aktiveDeeds.filter((deed: Deed) => deed.maker === (!!props.username && props.username)).map(deed =>
        <DeedSpots key={deed.id} deed={deed}/>)

    const otherDeeds = aktiveDeeds.filter((deed: Deed) => deed.author !== (!!props.username && props.username)).filter((deed: Deed) => deed.deedStatus === DeedStatus.CREATED).map(deed =>
        <DeedSpots key={deed.id} deed={deed}/>)

    return (<>

            <Box sx={{width: '50%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Map" value="1"/>
                            <Tab label="List" value="2"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Box ml={-6}>
                            <MapDeeds deeds={aktiveDeeds} username={props.username} width={"380px"}
                                      height={"700px"}/></Box></TabPanel>
                    <TabPanel value="2">
                        <div><h4>taken:</h4><Box>{takenDeeds}</Box><Box><h4>available: </h4>{otherDeeds}</Box><Box>
                            <h4>myDeeds:</h4>{madeDeeds}</Box></div>
                    </TabPanel>
                </TabContext>
            </Box>

            <IconButton onClick={handleDeedDetail} type={"submit"}
                        style={{position: "absolute", bottom: "80px", left: "43%"}}>
                <AddCircle color="success" sx={{fontSize: 50}}/>
            </IconButton>
        </>

    )
}