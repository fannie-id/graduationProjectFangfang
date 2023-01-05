import {Box, Button, TextField} from "@mui/material";
import {Deed, NewDeed} from "../model/Deed";
import {ChangeEvent, FormEvent, useState} from "react";

type DeedFormProps = {
    deed: Deed | NewDeed
    submitDeed: (deed: Deed | NewDeed) => void
}

export default function DeedForm(props: DeedFormProps) {
    console.log("props: ", props.deed.address.street)
    const [deed, setDeed] = useState<Deed | NewDeed>(props.deed)

    console.log("editeDeed: ", deed.address.street)

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
                    label="House Number"
                    placeholder="House Number"
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
                    Save
                </Button>
            </form>
        </Box>
    )
}