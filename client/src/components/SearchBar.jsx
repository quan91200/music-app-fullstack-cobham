import React from 'react'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import Input from './Input'

const SearchBar = () => {
    const [{ searchTerm }, dispatch] = useStateValue()

    const setSearchTerm = (value) => {
        dispatch({
            type: actionType.SET_SEARCH_TERM,
            searchTerm: value
        })
    }

    return (
        <Input
            type="text"
            value={searchTerm}
            placeholder="Search here ...."
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}

export default SearchBar