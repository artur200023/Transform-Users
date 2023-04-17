import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./redux/slices/usersSlice/usersSlice";

const mainReducer = combineReducers ({
    user:usersReducer
})

const store = configureStore({
    reducer:mainReducer
})

export default store
