import * as React from 'react';
import DrinkDescInputBoxes from '../components/entry-form-components/input-boxes';
import TypeSelectBox from '../components/entry-form-components/type-selectbox';
import SubmitDeleteButtons from '../components/entry-form-components/buttons';
import utilStyles from '../styles/utils.module.css';

export default function EntryForm() {
    return (
        <div className={utilStyles.entryForm}>
            <DrinkDescInputBoxes/>
            <TypeSelectBox/>
            <SubmitDeleteButtons/>
        </div>
    )
}
