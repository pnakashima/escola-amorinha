import React from 'react'


class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }

        //this.handleChange = this.handleChange.bind(this)
    }

    // handleChange(event) {
    //     this.setState({ value: event.target.value })
    // }

    render() {
        const { id, type, label, value, placeholder, onChange, onEdit, onClick, checked } = this.props
        return (
            <>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={id} value={value} placeholder={placeholder} onChange={onChange} onEdit={onEdit} onClick={onClick} checked={checked} />
                <br />
            </>
        )
    }
}

export default Input
