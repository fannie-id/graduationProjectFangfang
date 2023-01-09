import {Box, IconButton, TextField} from "@mui/material";
import {Deed, DeedStatus, NewDeed} from "../model/Deed";
import {ChangeEvent, FormEvent, useState} from "react";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

type DeedFormProps = {
    deed: Deed | NewDeed
    submitDeed: (deed: Deed | NewDeed) => void
}

export default function DeedForm(props: DeedFormProps) {
    const [deed, setDeed] = useState<Deed | NewDeed>(props.deed)

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const nameOfInput = event.target.name
        setDeed((prevState) => ({...prevState, [nameOfInput]: inputValue}))
    }


    function handleStatusChange() {
        const castDeed = deed as Deed
        console.log(deed)
        setDeed((prevState) => ({...prevState, [castDeed.deedStatus]: nextStatus(castDeed.deedStatus)}))
    }

    function nextStatus(status: DeedStatus) {
        if (status === null) {
            return DeedStatus.CREATED
        }

        switch (status) {
            case DeedStatus.CREATED:
                return DeedStatus.ASSIGNED
            case DeedStatus.ASSIGNED:
                return DeedStatus.IN_PROGRESS
            case DeedStatus.IN_PROGRESS:
                return DeedStatus.DONE
            case DeedStatus.DONE:
                return DeedStatus.ACCEPTED
            case DeedStatus.ACCEPTED:
                return DeedStatus.ACCEPTED
        }
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
                {deed as Deed &&
                    <Button onClick={handleStatusChange}>
                        next
                    </Button>}


                <IconButton type="submit">
                    <PublishedWithChangesIcon color="success" fontSize={"large"}/>
                </IconButton>

                {(deed as Deed).deedStatus === DeedStatus.ASSIGNED && <p>assigned</p>}
                {(deed as Deed).deedStatus === DeedStatus.CREATED && <p>created</p>}
                {(deed as Deed).deedStatus === DeedStatus.ACCEPTED && <p>accepted</p>}
                {(deed as Deed).deedStatus === DeedStatus.IN_PROGRESS && <p>in progress</p>}
                {(deed as Deed).deedStatus === DeedStatus.DONE && <p>done</p>}
            </form>
        </Box>
    )
}