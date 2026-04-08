import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entries: []
};

const journalReducer = createSlice({
    name: 'journal',
    initialState: initialState,
    reducers: {
        addEntry: (state, action) => {
            state.entries.push(action.payload);
        },
        deleteEntry: (state, action) => {
            state.entries = state.entries.filter(entry => entry.id !== action.payload);
        }
    }
});

export const { addEntry, deleteEntry } = journalReducer.actions;
export default journalReducer.reducer;