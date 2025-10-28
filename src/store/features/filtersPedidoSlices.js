import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    id: "",
    email: "",
    dataInicio: "",
    dataFim: "",
}

const filterPedidos = createSlice({
    name: "filterPedidos",
    initialState,
    reducers: {
        setId : (state, action) => {state.id = action.payload},
        setEmail : (state, action) => {state.email = action.payload},
        setDataInicio : (state, action) => {state.dataInicio = action.payload},
        setDataFim : (state, action) => {state.dataFim = action.payload}
    }
})

export const {setId, setEmail, setDataInicio, setDataFim} = filterPedidos.actions
export default filterPedidos.reducer