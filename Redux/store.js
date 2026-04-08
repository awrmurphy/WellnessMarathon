import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import goalsReducer from "./goalsReducer";
import journalReducer from "./journalReducer";

const store = configureStore({
    reducer: {
        login: loginReducer,
        goals: goalsReducer,
        journal: journalReducer
    }
});

export default store;