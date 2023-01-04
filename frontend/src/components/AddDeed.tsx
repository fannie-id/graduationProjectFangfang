import {Box, Button} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {NewDeed} from "../model/Deed";
import {Address} from "../model/Address";
import EditForm from "./EditForm";

type AddDeedProps = {
    addDeed: (deedToAdd: NewDeed) => void
}

export default function AddDeed(props: AddDeedProps) {
    const address: Address = {
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
                const newState = {...prevState}
                // @ts-ignore nested object
                newState.address[nameOfInput] = inputValue
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
                <EditForm deed={deed}
                          handleFormChange={handleFormChange}
                          handleFormAddressChange={handleFormAddressChange}/>
                <Button type="submit">
                    Add
                </Button>
            </form>

        </Box>


    )
}