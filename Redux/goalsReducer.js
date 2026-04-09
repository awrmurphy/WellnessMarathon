import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase.config";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

const getUserRef = (state) =>
  doc(db, "users", state.login.currentUser.username);

export const addGoalToUser = createAsyncThunk(
  "goals/addGoal",
  async (goalText, { getState }) => {
    const userRef = getUserRef(getState());
    const newGoal = {
      id: Date.now().toString(),
      text: goalText,
      completed: false,
    };
    await updateDoc(userRef, { goals: arrayUnion(newGoal) });
    return newGoal;
  },
);

export const deleteGoalFromUser = createAsyncThunk(
  "goals/deleteGoal",
  async (goalObject, { getState }) => {
    const userRef = getUserRef(getState());
    await updateDoc(userRef, { goals: arrayRemove(goalObject) });
    return goalObject.id;
  },
);

export const toggleGoalInUser = createAsyncThunk(
  "goals/toggleGoal",
  async (goalObject, { getState }) => {
    const state = getState();
    const userRef = getUserRef(state);
    const updatedGoals = state.goals.goals.map((g) =>
      g.id === goalObject.id ? { ...g, completed: !g.completed } : g,
    );
    await updateDoc(userRef, { goals: updatedGoals });
    return goalObject.id;
  },
);

export const editGoalInUser = createAsyncThunk(
  "goals/editGoal",
  async ({ goalObject, newText }, { getState }) => {
    const state = getState();
    const userRef = getUserRef(state);
    const updatedGoals = state.goals.goals.map((g) =>
      g.id === goalObject.id ? { ...g, text: newText } : g,
    );
    await updateDoc(userRef, { goals: updatedGoals });
    return { id: goalObject.id, text: newText };
  },
);

const goalsSlice = createSlice({
  name: "goals",
  initialState: { goals: [] },
  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGoalToUser.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(deleteGoalFromUser.fulfilled, (state, action) => {
        state.goals = state.goals.filter((g) => g.id !== action.payload);
      })
      .addCase(toggleGoalInUser.fulfilled, (state, action) => {
        const goal = state.goals.find((g) => g.id === action.payload);
        if (goal) goal.completed = !goal.completed;
      })
      .addCase(editGoalInUser.fulfilled, (state, action) => {
        const goal = state.goals.find((g) => g.id === action.payload.id);
        if (goal) goal.text = action.payload.text;
      });
  },
});

export const { setGoals } = goalsSlice.actions;
export default goalsSlice.reducer;
