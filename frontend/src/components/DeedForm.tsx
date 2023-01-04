import {Box, Button, TextField} from "@mui/material";
import {Deed, NewDeed} from "../model/Deed";
import {ChangeEvent, FormEvent, useState} from "react";

type DeedFormProps = {
    deed: Deed | NewDeed
    submitDeed: (deed: Deed | NewDeed) => void


}

export default function DeedForm(props: DeedFormProps) {
    const [deed, setDeed] = useState<NewDeed>(props.deed)

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

    return (<Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    name={"description"}
                    value={props.deed.description}
                    label="Description"
                    placeholder="Description"
                    onChange={handleFormChange}
                    multiline
                    rows={4}
                />

                <TextField
                    fullWidth
                    name={"street"}
                    value={props.deed.address.street}
                    label="Street"
                    placeholder="Street"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    fullWidth
                    name={"houseNumber"}
                    value={props.deed.address.houseNumber}
                    label="House Number"
                    placeholder="House Number"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    fullWidth
                    name={"zip"}
                    value={props.deed.address.zip}
                    label="ZIP"
                    placeholder="ZIP"
                    onChange={handleFormAddressChange}
                />
                <TextField
                    fullWidth
                    name={"city"}
                    value={props.deed.address.city}
                    label="City"
                    placeholder="City"
                    onChange={handleFormAddressChange}
                />

                <TextField
                    fullWidth
                    name={"name"}
                    value={props.deed.address.name}
                    label="Name"
                    placeholder="Name"
                    onChange={handleFormAddressChange}
                />

                <TextField
                    fullWidth
                    name={"karmaPoints"}
                    value={props.deed.karmaPoints}
                    label="Karma Points"
                    placeholder="Karma Points"
                    onChange={handleFormChange}
                />

                <Button type="submit">
                    Save
                </Button>
            </form>
        </Box>
    )
}