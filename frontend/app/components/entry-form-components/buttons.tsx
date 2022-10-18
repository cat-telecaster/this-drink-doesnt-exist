import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function SubmitDeleteButtons() {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
                Clear
            </Button>
            <Button variant="contained" endIcon={<SendIcon />}>
                Submit
            </Button>
        </Stack>
    );
}
