import { atom, selector } from 'recoil';
import { StrField, NumField } from "../types/types";
import { UpsertDrinkMutationVariables } from "../types/generated/graphql";

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

const newDrinkState = selector({
    key: 'newDrinkState',
    get: ({get}) => {
        const inputBoxData = get(inputBoxState);
        const typeData = get(typeSelectorState);

        return <UpsertDrinkMutationVariables>{
            name: inputBoxData.name.val,
            flavour: inputBoxData.flavour.val,
            type: typeData,
            mL: inputBoxData.size.val,
            price: inputBoxData.price.val,
        }
    }
})

export { inputBoxState, typeSelectorState, newDrinkState };

