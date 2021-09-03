import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

const SearchBar = ({ id, placeholder, onChange }) => {
    return (
        <TextField
            id={id}
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            variant="outlined"
            label={placeholder}
        />
    )
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default SearchBar


