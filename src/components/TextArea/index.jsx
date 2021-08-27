import React from 'react'


class TextArea extends React.Component {
    
    render() {
        const {id, label, value, placeholder, onChange} = this.props
        return (
            <>
                <label htmlFor={id}>{label}</label>
                <textarea rows='4' id={id} name={id} value={value} placeholder={placeholder} onChange={onChange}/>
                <br/>
            </>
        )
    }
}


export default TextArea