import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [
        {
            id: Math.random(),
            nickname: 'Werlen.santos',
            email: 'werle@gmail.com',
            image: require('../../../assets/imgs/fence.jpg'),
            comments: [
                {
                    nickname: 'carlos.sousa',
                    comment: 'gostei',
                },
                {
                    nickname: 'ana.sousa',
                    comment: 'podia melhorar',
                },
            ],
        },
        {
            id: Math.random(),
            nickname: 'Werlen.s antos',
            email: 'werle@gmail.com',
            image: require('../../../assets/imgs/bw.jpg'),
            comments: [],
        },
        {
            id: Math.random(),
            nickname: 'Werlen.santos',
            email: 'werle@gmail.com',
            image: require('../../../assets/imgs/fence.jpg'),
            comments: [
                {
                    nickname: 'carlos.sousa',
                    comment: 'gostei',
                },
                {
                    nickname: 'ana.sousa',
                    comment: 'podia melhorar',
                },
            ],
        },
        {
            id: Math.random(),
            nickname: 'Werlen.s antos',
            email: 'werle@gmail.com',
            image: require('../../../assets/imgs/bw.jpg'),
            comments: [],
        },
        
    ],
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addNewPost(state, action) {
            state.posts.push(action.payload);
        },
    },
});

export const { addNewPost } = postSlice.actions;

export default postSlice.reducer;