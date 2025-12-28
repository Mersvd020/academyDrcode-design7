import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import darkmodeReducer from "./darkmode";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'auth', 
    storage,
};

const darkmodePersistConfig = {
    key: 'darkmode',
    storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedDarkmodeReducer = persistReducer(darkmodePersistConfig, darkmodeReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,  
        darkmode: persistedDarkmodeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);