import {configureStore} from "@reduxjs/toolkit"
import filtersReducer from "./features/filtersSlice"
import filtersPedidoReducer from "./features/filtersPedidoSlices"

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        filterPedidos: filtersPedidoReducer
    }
})