import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: null,
    email: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Ação para login do usuário
        userLoggedIn(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        // Ação para logout do usuário
        userLoggedOut(state) {
            state.name = null;
            state.email = null;
        }
    }
});

// Exportando as actions geradas automaticamente
export const { userLoggedIn, userLoggedOut } = userSlice.actions;

// Exportando o reducer
export default userSlice.reducer;
