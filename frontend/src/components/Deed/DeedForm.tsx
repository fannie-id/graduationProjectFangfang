import {Box, IconButton, TextField} from "@mui/material";
import {Deed} from "../../model/Deed";
import {ChangeEvent, FormEvent, useState} from "react";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

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


    function handleFormAddressChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setDeed((prevState) => {
                const newState = {...prevState}
                // @ts-ignore nested object
                newState.address[nameOfInput] = inputValue
                return newState
            }
        )
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.submitDeed(deed)
    }

    return (<Box
            sx={{pb: 7}}
            margin={"8px"}
            flexDirection={"column"}
            display={"grid"}
            flexWrap={"wrap"}
            justifyContent={"center"}>
            <p>{props.deed.author}</p>

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
                    rows={4}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"address"}
                    value={deed.address.address}
                    label="Address"
                    placeholder="Address"
                    onChange={handleFormAddressChange}
                    multiline
                    rows={4}

                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"karmaPoints"}
                    value={deed.karmaPoints}
                    label="Karma Points"
                    placeholder="Karma Points"
                    onChange={handleFormChange}
                />

                <IconButton type="submit">
                    <PublishedWithChangesIcon color="success" fontSize={"large"}/>
                </IconButton>

            </form>
        </Box>
    )
}