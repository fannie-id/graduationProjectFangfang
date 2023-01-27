import {Deed} from "../../model/Deed";
import {Box, Button, Paper, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";

type DeedSpotsProps = {
    deed: Deed
}

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    width: '80%',
    backgroundColor: '#e6eee6'
}));
export default function DeedSpots(props: DeedSpotsProps) {
    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/" + props.deed.id)
    }

    return (
        <Box margin={"2px"}
             flexDirection={"row"}
             display={"grid"}
             flexWrap={"wrap"}>


            <Item sx={{width: "100%", m: 1}}>
                <Button onClick={handleDeedDetail}>
                    {props.deed.description} {props.deed.karmaPoints}
                </Button>

            </Item>


        </Box>
    )


}