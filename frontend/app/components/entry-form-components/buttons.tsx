import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { inputBoxState, typeSelectorState, newDrinkState } from '../states';
import { upsertNewPost } from "../../lib/posts";

export default function SubmitDeleteButtons() {
    const [inputBoxValues, setInputBoxValues] = useRecoilState(inputBoxState);
    const [typeSelectorValue, setTypeSelectorValue] = useRecoilState(typeSelectorState);
    const upsertValue = useRecoilValue(newDrinkState);

    const inputBoxReset = useResetRecoilState(inputBoxState);
    const typeSelectorReset = useResetRecoilState(typeSelectorState);

    const clearAll = () => {
        inputBoxReset();
        typeSelectorReset();
    }

    const submitNewDrink = async () => {
        try {
            await upsertNewPost(upsertValue);
        } catch (e) {
            alert(e);
        }
        location.reload();
    }

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="outlined"
                onClick={clearAll}
                startIcon={<DeleteIcon />}
            >
                Clear
            </Button>
            <Button
                variant="contained"
                onClick={submitNewDrink}
                disabled={(inputBoxValues.name.err || inputBoxValues.flavour.err || inputBoxValues.size.err || inputBoxValues.price.err
                    || !typeSelectorValue)}
                endIcon={<SendIcon />}
            >
                Submit
            </Button>
        </Stack>
    );
}
