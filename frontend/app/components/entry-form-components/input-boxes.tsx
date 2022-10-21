import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { inputBoxState } from '../states';
import { StrField, NumField } from '../../types/types';

interface State {
    name: StrField;
    flavour: StrField;
    size: NumField;
    price: NumField;
}

type CaseObj = {
    [index: string]: Function;
}

const fieldValidation: CaseObj = {
    'outlined-name-adornment': (val: string): StrField => {
        return { val: val, err: (val.length == 0 ? true : false) };
    },
    'outlined-flvr-adornment': (val: string): StrField => {
        return { val: val, err: (val.length == 0 ? true : false) };
    },
    'outlined-size-adornment': (val: string): NumField => {
        let numeric = (isNaN(Number(val)) ? 0 : Number(val));
        return { val: numeric, err: ((numeric <= 0 || numeric == undefined) ? true : false) };
    },
    'outlined-price-adornment': (val: string): NumField => {
        let numeric = (isNaN(Number(val)) ? 0 : Number(val));
        return { val: numeric, err: (numeric < 0 ? true : false) };
    },
}

export default function DrinkDescInputBoxes() {
    const [values, setValues] = useRecoilState(inputBoxState);

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            let componentID = event.target.id;
            let buff: StrField | NumField;
            buff = fieldValidation[componentID](event.target.value);

            //await getSortedDrinksData();

            setValues({ ...values, [prop]: buff });
        };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <TextField
                    error={values.name.err}
                    helperText={values.name.err ? 'Required' : ''}
                    label="Drink Name"
                    id="outlined-name-adornment"
                    sx={{ m: 1, width: '21ch' }}
                    value={values.name.val}
                    onChange={handleChange('name')}
                />
                <TextField
                    error={values.flavour.err}
                    helperText={values.flavour.err ? 'Required' : ''}
                    label="Flavour"
                    id="outlined-flvr-adornment"
                    sx={{ m: 1, width: '21ch' }}
                    value={values.flavour.val}
                    onChange={handleChange('flavour')}
                />
                <TextField
                    error={values.size.err}
                    helperText={values.size.err ? 'Invalid' : ''}
                    label="Size"
                    id="outlined-size-adornment"
                    sx={{ m: 1, width: '21ch' }}
                    value={values.size.val}
                    onChange={handleChange('size')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">mL</InputAdornment>,
                    }}
                />
                <TextField
                    error={values.price.err}
                    helperText={values.price.err ? 'Invalid' : 'Optional'}
                    label="Price"
                    id="outlined-price-adornment"
                    sx={{ m: 1, width: '21ch' }}
                    value={values.price.val}
                    onChange={handleChange('price')}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">￥</InputAdornment>,
                    }}
                />
            </div>
        </Box>
    );
}
