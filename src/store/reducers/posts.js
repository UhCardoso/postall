import { createSlice } from '@reduxjs/toolkit';
import { addPost, fetchPosts } from '../actions/posts';

const initialState = {
  posts: [],
  isUploading: false,
  postSuccess: false
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    setPostsSlice(state, action) {
      state.posts = action.payload;
    },
    addNewCommentSlice(state, action) {
      const postIndex = state.posts.findIndex(post => post.id === action.payload.postId);
      if (postIndex >= 0) {
        const post = state.posts[postIndex];
        if (post.comments) {
          post.comments = [...post.comments, action.payload.comment];
        } else {
          post.comments = [action.payload.comment];
        }
      }
    },
    resetPostStatus(state) {
      state.postSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    })
    .addCase(addPost.pending, (state) => {
      state.isUploading = true;
      state.postSuccess = false;
    })
    .addCase(addPost.rejected, (state, action) => {
      state.error = action.payload;
      state.isUploading = false;
      state.postSuccess = false;
    })
    // Fetch posts
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.posts = [...state.posts, ...action.payload];
      state.postSuccess = true;
      state.isUploading = false;
    })
    .addCase(fetchPosts.pending, (state) => {
      state.postSuccess = false;
      state.isUploading = true;
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.postSuccess = false;
      state.isUploading = false;
    });
  }
});

export const { setPostsSlice, addNewCommentSlice, resetPostStatus} = postsSlice.actions;

export default postsSlice.reducer;
