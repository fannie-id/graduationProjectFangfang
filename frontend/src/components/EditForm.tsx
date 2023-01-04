import {Box, TextField} from "@mui/material";
import {Deed, NewDeed} from "../model/Deed";
import {ChangeEvent} from "react";

type EditFormProps = {
    deed: Deed | NewDeed
    handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleFormAddressChange: (event: ChangeEvent<HTMLInputElement>) => void

}

export default function EditForm(props: EditFormProps) {
    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleFormChange(event)
    }

    function handleFormAddressChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleFormAddressChange(event)
    }

    return (<Box>
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
        </Box>
    )
}