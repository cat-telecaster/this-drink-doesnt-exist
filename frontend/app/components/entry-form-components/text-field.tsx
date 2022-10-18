import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface State {
    name: string;
    flavour: string;
    size?: number;
    price?: number;
}

export default function InputAdornments() {
    const [values, setValues] = React.useState<State>({
        name: "",
        flavour: "",
        size: undefined,
        price: undefined,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <TextField
                    label="Drink Name"
                    id="outlined-name-adornment"
                    sx={{ m: 1, width: '21ch' }}
                    value={values.name}
                    onChange={handleChange('name')}
                />
                <TextField
                    label="Flavour"
                    id="outlined-flvr-adornment"
                    sx={{ m: 1, width: '21ch' }}
                    value={values.flavour}
                    onChange={handleChange('flavour')}
                />
                <TextField
                    label="Size"
                    id="outlined-size-adornment"
                    sx={{ m: 1, width: '21ch' }}
                    value={values.size}
                    onChange={handleChange('size')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mL</InputAdornment>,
                    }}
                />
                <TextField
                    label="Price"
                    helperText="Optional"
                    id="outlined-adornment-price"
                    sx={{ m: 1, width: '21ch' }}
                    value={values.price}
                    onChange={handleChange('price')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">￥</InputAdornment>,
                    }}
                />
            </div>
        </Box>
    );
}
