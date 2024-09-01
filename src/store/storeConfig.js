import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';

const storeConfig = () => {
    return configureStore({
        reducer: {
            user: userReducer
        }
    });
};

export default storeConfig;