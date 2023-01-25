import {Box, Button, TextField} from "@mui/material";
import {Deed} from "../../model/Deed";
import {ChangeEvent, FormEvent, useState} from "react";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import MapAddDeed from "../Map/MapAddDeed";

type DeedFormProps = {
    deed: Deed
    submitDeed: (deed: Deed) => void
}

export default function DeedForm(props: DeedFormProps) {
    const [deed, setDeed] = useState<Deed>(props.deed)


    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setDeed((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }



    function handleFormGeoChange(lng: number, lat: number, address: string) {
        setDeed((prevState) => {
                const newState = {...prevState}
                newState.lng = lng
                newState.lat = lat
                newState.address = address
                return newState
            }
        )
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.submitDeed(deed)
    }

    return (<Box
            sx={{pb: 3}}
            margin={"35px"}
            flexDirection={"column"}
            display={"grid"}
            flexWrap={"wrap"}
            justifyContent={"center"}>
            <h2>add {props.deed.author}'s new Deed</h2>

            <form onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    fullWidth
                    name={"description"}
                    value={deed.description}
                    label="Description"
                    placeholder="Description"
                    onChange={handleFormChange}
                    multiline
                    rows={2}
                />
                <p>Address:</p>
                <TextField
                    margin="normal"
                    fullWidth
                    name={"name"}
                    value={deed.name}
                    label="Name"
                    placeholder="Name"
                    onChange={handleFormChange}

                />

                <MapAddDeed addGeoCode={handleFormGeoChange}/>

                <TextField
                    margin="normal"
                    fullWidth
                    name={"karmaPoints"}
                    value={deed.karmaPoints}
                    label="Karma Points"
                    placeholder="Karma Points"
                    onChange={handleFormChange}
                />
                <Button color="success" variant="contained" type="submit" startIcon={<PublishedWithChangesIcon/>}>
                    save
                </Button>

            </form>
        </Box>
    )
}