import { atom, selector } from 'recoil';
import { StrField, NumField } from "../types/types";

interface InputBoxValuesInterface {
    name: StrField;
    flavour: StrField;
    size: NumField;
    price: NumField;
};

// interface AllPostDataInterface {
//     id: string;
//     name: string;
//     flavour: string;
//     price: number;
//     type: string;
//     mL: number;
//     date?: string;
//     // title: string;
// }
//
// const allPostDataState = atom({
//     key: 'allPostDataState',
//     default: <AllPostDataInterface[]>[],
// })


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
