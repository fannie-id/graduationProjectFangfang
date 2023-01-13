import {Box, IconButton, TextField} from "@mui/material";
import {Deed} from "../model/Deed";
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
                    name={"street"}
                    value={deed.address.street}
                    label="Street"
                    placeholder="Street"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name={"houseNumber"}
                    value={deed.address.houseNumber}
                    label="House Number"
                    placeholder="House Number"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name={"zip"}
                    value={deed.address.zip}
                    label="ZIP"
                    placeholder="ZIP"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name={"city"}
                    value={deed.address.city}
                    label="City"
                    placeholder="City"
                    onChange={handleFormAddressChange}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    name={"name"}
                    value={deed.address.name}
                    label="Name"
                    placeholder="Name"
                    onChange={handleFormAddressChange}
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