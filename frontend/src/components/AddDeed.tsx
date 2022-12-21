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
        "houseNumber": "",
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

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setDeed((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }

    function handleFormAddressChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setDeed((prevState) => {
            const newState = { ...prevState }
                // @ts-ignore nested object
                newState.address[nameOfInput]= inputValue
            return newState
        }
        )
    }


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("deed: ", deed)
        props.addDeed(deed)

    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField
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
                    fullWidth
                    name={"street"}
                    value={deed.address.street}
                    label="Street"
                    placeholder="Street"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    fullWidth

                    name={"houseNumber"}
                    value={deed.address.houseNumber}
                    label="house number"
                    placeholder="house number"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    fullWidth

                    name={"zip"}
                    value={deed.address.zip}
                    label="ZIP"
                    placeholder="ZIP"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    fullWidth

                    name={"city"}
                    value={deed.address.city}
                    label="City"
                    placeholder="City"
                    onChange={handleFormAddressChange}
                />

                <TextField
                    fullWidth

                    name={"name"}
                    value={deed.address.name}
                    label="Name"
                    placeholder="Name"
                    onChange={handleFormAddressChange}
                />

                <TextField
                    fullWidth

                    name={"karmaPoints"}
                    value={deed.karmaPoints}
                    label="Karma Points"
                    placeholder="Karma Points"
                    onChange={handleFormChange}
                />

                <Button type="submit">
                    Add
                </Button>
            </form>

        </Box>


    )
}