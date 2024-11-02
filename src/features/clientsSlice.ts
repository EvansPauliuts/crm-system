import { createSlice } from '@reduxjs/toolkit';
import { Client } from '../types/orderTypes';
import clientsData from '../data/clients.json';

const initialState: Client[] = clientsData as Client[];

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
});

export default clientsSlice.reducer;