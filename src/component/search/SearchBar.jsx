import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { setSearchQuery } from '../../store/features/searchSlice'

const SearchBar =() => {
    const [localSearch, setLocalSearch] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchQuery(localSearch));
    }
    return (
        <div className='search-bar input-group input-group-me'>
            <form onSubmit={handleSearch} className='d-flex w-100'>
                <input 
                    type='text' 
                    className='form-control flex-grow-1' 
                    value={localSearch} 
                    placeholder='Pesquisar produtos...'
                    onChange={(e) => setLocalSearch(e.target.value)}/>
                <button type="submit" className='search-button'>Buscar</button>
            </form>
        </div>
    )
}

export default SearchBar