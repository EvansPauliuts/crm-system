import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types/orderTypes';

interface OrdersState {
    orders: Order[];
    nextId: number;
}

const initialState: OrdersState = {
    orders: JSON.parse(localStorage.getItem('orders') || '[]'),
    nextId: JSON.parse(localStorage.getItem('nextId') || '1'),
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push({ ...action.payload, id: state.nextId });
            state.nextId += 1;

            localStorage.setItem('orders', JSON.stringify(state.orders));
            localStorage.setItem('nextId', JSON.stringify(state.nextId));
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: number; status: string }>) => {
            const order = state.orders.find(o => o.id === action.payload.id);
            if (order) {
                order.status = action.payload.status as 'Создан' | 'Завершен' | 'Отменен';
                localStorage.setItem('orders', JSON.stringify(state.orders));
            }
        },
    },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
