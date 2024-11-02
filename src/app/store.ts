import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from '../features/ordersSlice';
import clientsReducer from '../features/clientsSlice';

const store = configureStore({
    reducer: {
        orders: ordersReducer,
        clients: clientsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
