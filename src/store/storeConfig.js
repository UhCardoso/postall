import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import postsReducer from './reducers/posts';

const storeConfig = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            posts: postsReducer
        }
    });
};

export default storeConfig;