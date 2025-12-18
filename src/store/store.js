import {configureStore} from "@reduxjs/toolkit"
import filtersReducer from "../component/search/filtersSlice"
import filtersPedidoReducer from "../component/search/filtersPedidoSlices"

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        filterPedidos: filtersPedidoReducer
    }
})