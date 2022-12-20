import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {NewDeed} from "../model/Deed";
import {Address} from "../model/Address";
type AddDeedProps = {
    addDeed: (deedToAdd: NewDeed) => void
}

export default function AddDeed(props: AddDeedProps) {
    const address:Address ={
        "street": "",
        "id": "",
        "zip": "",
        "city": "",
        "name": "",
    }
    const emptyDeed: NewDeed = {
        "description": "",
        "address": address,
        "karmaPoints": 0
    }
    const [deed, setDeed] = useState<NewDeed>(emptyDeed)

    function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setDeed((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }

    function handleTextChangeAddress(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setDeed((prevState) => {
            const newState = { ...prevState }
            // @ts-ignore
                newState.address[nameOfInput]= inputValue
            return newState
        }
        )
    }


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.addDeed(deed)

    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required={true}
                    name={"description"}
                    value={deed.description}
                    label="Description"
                    placeholder="Description"
                    onChange={handleTextChange}
                    multiline
                    rows={4}
                />


                <TextField
                    fullWidth
                    required={true}
                    name={"street"}
                    value={deed.address.street}
                    label="Street"
                    placeholder="Street"
                    onChange={handleTextChangeAddress}
                />
                <TextField
                    fullWidth
                    required={true}
                    name={"id"}
                    value={deed.address.id}
                    label="ID"
                    placeholder="ID"
                    onChange={handleTextChangeAddress}
                />
                <TextField
                    fullWidth
                    required={true}
                    name={"zip"}
                    value={deed.address.zip}
                    label="ZIP"
                    placeholder="ZIP"
                    onChange={handleTextChangeAddress}
                />
                <TextField
                    fullWidth
                    required={true}
                    name={"city"}
                    value={deed.address.city}
                    label="City"
                    placeholder="City"
                    onChange={handleTextChangeAddress}
                />

                <TextField
                    fullWidth
                    required={true}
                    name={"name"}
                    value={deed.address.name}
                    label="Name"
                    placeholder="Name"
                    onChange={handleTextChangeAddress}
                />

                <TextField
                    fullWidth
                    required={true}
                    name={"karmaPoints"}
                    value={deed.karmaPoints}
                    label="Karma Points"
                    placeholder="Karma Points"
                    onChange={handleTextChange}
                />

                <Button type="submit">
                    Add
                </Button>
            </form>

        </Box>


    )
}