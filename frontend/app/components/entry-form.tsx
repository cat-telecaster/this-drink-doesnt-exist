import * as React from 'react';
import DrinkDescInputBoxes from '../components/entry-form-components/input-boxes';
import TypeSelector from './entry-form-components/type-selector';
import SubmitDeleteButtons from '../components/entry-form-components/buttons';
import utilStyles from '../styles/utils.module.css';

export default function EntryForm() {
    return (
        <div className={utilStyles.entryForm}>
            <DrinkDescInputBoxes/>
            <TypeSelector/>
            <SubmitDeleteButtons/>
        </div>
    )
}
