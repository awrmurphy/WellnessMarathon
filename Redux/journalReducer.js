import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase.config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const getUserRef = (state) =>
  doc(db, "users", state.login.currentUser.username);

export const addEntryToUser = createAsyncThunk(
  "journal/addEntry",
  async (entryData, { getState }) => {
    const userRef = getUserRef(getState());
    const newEntry = {
      id: Date.now().toString(),
      ...entryData,
      date: new Date().toISOString(),
    };
    await updateDoc(userRef, { journal: arrayUnion(newEntry) });
    return newEntry;
  },
);

export const deleteEntryFromUser = createAsyncThunk(
  "journal/deleteEntry",
  async (entryObject, { getState }) => {
    const userRef = getUserRef(getState());
    await updateDoc(userRef, { journal: arrayRemove(entryObject) });
    return entryObject.id;
  },
);

const journalSlice = createSlice({
  name: "journal",
  initialState: { entries: [] },
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEntryToUser.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })
      .addCase(deleteEntryFromUser.fulfilled, (state, action) => {
        state.entries = state.entries.filter((e) => e.id !== action.payload);
      });
  },
});

export const { setEntries } = journalSlice.actions;
export default journalSlice.reducer;
