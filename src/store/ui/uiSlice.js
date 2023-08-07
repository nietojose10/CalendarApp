import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = true;//Este codigo mutante es posible gracias al redux toolkit.
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;//Este codigo mutante es posible gracias al redux toolkit.
        },
    }
    });
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;