import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    signInModal: true,
    signUpModal:false,
    welcomeModal: false,
    passwordModal: false,
    jobStatusModal: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
        setModal: (state, action) => {
            const { modalName } = action.payload;
            console.log(modalName);
            Object.keys(state).forEach(key => {
                if (key !== 'isModalOpen') {
                    state[key] = false;
                }
            });
            state[modalName] = true;
        },
    }
})

export const { openModal, closeModal ,setModal} = modalSlice.actions;

export const showModalInfo = (state) => state.modal;

export default modalSlice.reducer;
