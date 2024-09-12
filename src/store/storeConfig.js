import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import postsReducer from './reducers/posts';

const storeConfig = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            posts: postsReducer,
        },
        // Caso queira adicionar middlewares customizados, pode fazer assim:
        //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
    });
};

export default storeConfig;