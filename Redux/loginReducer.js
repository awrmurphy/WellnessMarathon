import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setGoals } from "./goalsReducer";
import { setEntries } from "./journalReducer";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().password === password) {
        const userData = userSnap.data();
        dispatch(setGoals(userData.goals || []));
        dispatch(setEntries(userData.journal || []));
        return username;
      }
      return rejectWithValue("Invalid credentials");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "login/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) return rejectWithValue("Username taken");

      const newUser = { password, goals: [], journal: [] };
      await setDoc(userRef, newUser);
      return username;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
