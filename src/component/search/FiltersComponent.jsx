import {React, useState} from 'react'
import {Form, Button} from "react-bootstrap"
import {useDispatch} from 'react-redux'
import { setCategoria, setPrecoMin, setPrecoMax } from '../../store/features/filtersSlice'

const FiltersComponent = () => {
    const [localCategoria, setLocalCategoria] = useState('')
    const [localPrecoMin, setLocalPrecoMin] = useState('')
    const [localPrecoMax, setLocalPrecoMax] = useState('')
    const dispatch = useDispatch();

    const handleFilters = (e) => {
        e.preventDefault();
        dispatch(setCategoria(localCategoria))
        dispatch(setPrecoMin(Number(localPrecoMin) || 0))
        dispatch(setPrecoMax(Number(localPrecoMax) || 5000))
    }

    return (
        <Form onSubmit={handleFilters}>
            <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
                value={localCategoria}
                onChange={(e) => setLocalCategoria(e.target.value)}>
                <option value="">Todos</option>
                <option value="Racoes">Rações</option>
                <option value="Petiscos">Petiscos</option>
                <option value="Transporte">Transporte</option>
                <option value="Roupas">Roupas</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Preço Mínimo</Form.Label>
            <Form.Control 
                type="number" 
                placeholder="0"
                value={localPrecoMin}
                onChange={(e) => setLocalPrecoMin(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Preço Máximo</Form.Label>
            <Form.Control 
                type="number" 
                placeholder="1000"
                value={localPrecoMax} 
                onChange={(e) => setLocalPrecoMax(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" className="w-100" type="submit"
                    style={{
                        backgroundColor: "#c38212",
                        borderColor: "#c38212"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#a16c11';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#c38212'
                    }}> 
                Aplicar filtros
            </Button>
        </Form>
    )
}

export default FiltersComponent