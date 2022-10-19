import { atom, selector } from 'recoil';
import { StrField, NumField } from "../types/types";

interface InputBoxValuesInterface {
    name: StrField;
    flavour: StrField;
    size: NumField;
    price: NumField;
};

const inputBoxState = atom({
    key: 'inputBoxState',
    default: <InputBoxValuesInterface>{
        name: <StrField>{ val: '', err: true },
        flavour: <StrField>{ val: '', err: true },
        size: <NumField>{ val: 0, err: true },
        price: <NumField>{ val: 0, err: false },
    },
});

const typeSelectorState = atom({
    key: 'typeSelectorState',
    default: ''
});

export { inputBoxState, typeSelectorState }
