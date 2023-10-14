import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import modalReducer from "../features/modal/modalSlice"

export const store=configureStore({
    reducer:{
        user:userReducer,
        modal:modalReducer,
    }
})

