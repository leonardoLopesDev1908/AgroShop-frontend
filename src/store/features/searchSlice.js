import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
  name: "search",
  initialState:{
    searchQuery: '',
    categoria: '',
    marca: '',
    precoMin: '',
    precoMax: ''
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; 
    },
    setFilters: (state, action) => {
      return {...state, ...action.payload}; 
    },
    clearFilters: (state) => {
      state.searchQuery = "";
      state.categoria= "",
      state.marca="",
      state.precoMax="",
      state.precoMin="" 
    }
  }
});

export const { setSearchQuery, setFilters, clearFilters } = searchSlice.actions;
export default searchSlice.reducer;
