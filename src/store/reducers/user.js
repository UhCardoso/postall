import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../actions/user';

const initialState = {
    name: null,
    email: null,
    loadingUser: false,
    userLogged: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Ação para logout do usuário
        userLoggedOut(state) {
            state.name = null;
            state.email = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.fulfilled, (state, action) => {
          state.name = action.payload.name;
          state.loadingUser = false;
          state.userLogged.userLogged = true;
        })
        .addCase(loginUser.pending, (state) => {
          state.loadingUser = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isUploading = false;
          state.postSuccess = false;
        })
      }
});

// Exportando as actions geradas automaticamente
export const { userLoggedIn, userLoggedOut } = userSlice.actions;

// Exportando o reducer
export default userSlice.reducer;
