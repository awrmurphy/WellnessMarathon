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
        return {
          username: username,
          email: userData.email || `${username}@example.com`,
          preferences: userData.preferences || {
          theme: "Light",
          notifications: false,
          },
        };
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

      const newUser = {
          password,
          goals: [],
          journal: [],
          name: "",
          email: "",
          preferences: { theme: "Light", notifications: false },
        };
      await setDoc(userRef, newUser);
      return {
        username: username,
        name: "", 
        email: `${username}@example.com`,
        preferences: { theme: "Light", notifications: false },
      };
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
    isNewUser: false,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    onBoard: (state, action) => {
      state.isNewUser = false;
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
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
        state.isNewUser = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, onBoard } = loginSlice.actions;
export default loginSlice.reducer;
