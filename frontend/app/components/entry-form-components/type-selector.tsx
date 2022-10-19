import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { typeSelectorState } from '../states';

export default function TypeSelector() {
    const [type, setType] = useRecoilState(typeSelectorState);

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="select-type-label">Type</InputLabel>
                <Select
                    labelId="select-type-label"
                    id="select-type-label"
                    value={type}
                    label="Type"
                    onChange={handleChange}
                >
                    <MenuItem value={"Bottle"}>Bottle</MenuItem>
                    <MenuItem value={"Can"}>Can</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
