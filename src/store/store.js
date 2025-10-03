import {configureStore} from "@reduxjs/toolkit"
// import {searchReducer} from "./features/searchSlice"
import filtersReducer from "./features/filtersSlice"

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        // search: searchReducer,
    }
})