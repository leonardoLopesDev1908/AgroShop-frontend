import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  categoria: "",
  precoMin: 0,
  precoMax: 5000,
  search: ""
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoria: (state, action) => { state.categoria = action.payload },
    setPrecoMin: (state, action) => { state.precoMin = action.payload },
    setPrecoMax: (state, action) => { state.precoMax = action.payload },
    setSearch: (state, action) => { state.search = action.payload }
  }
})

export const { setCategoria, setPrecoMin, setPrecoMax, setSearch } = filtersSlice.actions
export default filtersSlice.reducer