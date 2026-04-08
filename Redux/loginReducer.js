import { createSlice } from '@reduxjs/toolkit';

const intialState = {
    users: [ {user: 'admin', password: 'admin'}],
    isLoggedIn: false,
    currentUser: null
}

const loginReducer = createSlice({
    name: 'login',
    initialState: intialState,
    reducers: {
        login: (state, action) => {
            const { user, password } = action.payload;
            const foundUser = state.users.find(u => u.user === user && u.password === password);
            if (foundUser) {
                state.isLoggedIn = true;
                state.currentUser = user;
            }
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        register: (state, action) => {
            const { user, password } = action.payload;
            const existingUser = state.users.find(u => u.user === user);
            if (!existingUser) {
                state.users.push({ user, password });
            }
        }
    }
});
export const { login, logout, register } = loginReducer.actions;
export default loginReducer.reducer;