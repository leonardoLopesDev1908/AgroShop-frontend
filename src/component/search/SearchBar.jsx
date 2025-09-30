import React from 'react'

const SearchBar =() => {
    return (
        <div className='search-bar input-group input-group-sm'>
            <select className='form-control-sm'>
                <option value='all'>Todos</option>
                <option value='all'>Rações</option>
                <option value='all'>Acessórios</option>
            </select>
            <input type='text' className='form-control' placeholder='Pesquisar produtos...'/>
            <button className='search-button'>Limpar filtro</button>
        </div>
    )
}

export default SearchBar