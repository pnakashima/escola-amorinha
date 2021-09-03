import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

// export default function Checkboxes() {
//     const [checked, setChecked] = React.useState(true);

//     const handleChange = (event) => {
//         setChecked(event.target.checked);
//     };


const InputCheckbox = ({ id, label, onChange, checked }) => {
    return (
        <div>
            <label htmlFor={id}>
                <Checkbox
                    id={id}
                    checked={checked}
                    onChange={onChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                {label}</label>
        </div>
    )
}

export default InputCheckbox