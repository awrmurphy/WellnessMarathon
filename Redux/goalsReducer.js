import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    goals: []
}

const goalsReducer = createSlice({
    name: 'goals',
    initialState: initialState,
    reducers: {
        addGoal: (state, action) => {
            state.goals.push(action.payload);
        },
        deleteGoal: (state, action) => {
            state.goals = state.goals.filter(goal => goal.id !== action.payload);
        },
        editGoal: (state, action) => {
            const { id, title, description } = action.payload;
            const goal = state.goals.find(g => g.id === id);
            if (goal) {
                goal.title = title;
                goal.description = description;
            }
        },
        toggleGoalCompletion: (state, action) => {
            const goal = state.goals.find(g => g.id === action.payload);
            if (goal) {
                goal.completed = !goal.completed;
            }
        }

    }
});

export const { addGoal, deleteGoal, editGoal, toggleGoalCompletion } = goalsReducer.actions;
export default goalsReducer.reducer;