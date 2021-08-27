import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'

// const SearchBar = () => {
//     return <input type="search" placeholder="Search for an employee"/>
// }

class SearchBar extends React.Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired
    }
    
    render() {
        const { id, placeholder, onChange } = this.props

        return (
            <Input
                id={id}
                type="text"
                onChange={onChange}
                placeholder={placeholder}
            />
        )
    }
}

export default SearchBar


