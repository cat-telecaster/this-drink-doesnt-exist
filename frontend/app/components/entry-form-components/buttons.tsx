import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import {useRecoilState, useResetRecoilState} from 'recoil';
import { inputBoxState, typeSelectorState } from '../states';

export default function SubmitDeleteButtons() {
    const [inputBoxValues, setInputBoxValues] = useRecoilState(inputBoxState);
    const [typeSelectorValue, setTypeSelectorValue] = useRecoilState(typeSelectorState);

    const inputBoxReset = useResetRecoilState(inputBoxState);
    const typeSelectorReset = useResetRecoilState(typeSelectorState);

    const clearAll = () => {
        inputBoxReset();
        typeSelectorReset();
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
                disabled={(inputBoxValues.name.err || inputBoxValues.flavour.err || inputBoxValues.size.err || inputBoxValues.price.err
                    || !typeSelectorValue)}
                endIcon={<SendIcon />}
            >
                Submit
            </Button>
        </Stack>
    );
}
