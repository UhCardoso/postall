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
        addNewComment(state, action) {
            state.posts.map(post => {
                if(post.id === action.payload.postId) {
                    if(post.comments) {
                        post.comments = post.comments.concat(
                            action.payload.comment
                        )
                    } else {
                        post.comments = action.payload.comment
                    }
                }
                return post;
            })
        }
    },
});

export const { addNewPost, addNewComment } = postSlice.actions;

export default postSlice.reducer;