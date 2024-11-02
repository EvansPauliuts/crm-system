import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;

export const fetchAddresses = async (query: string) => {
    const response = await axios.post(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        { query, count: 5 },
        { headers: { Authorization: `Token ${API_KEY}` } }
    );
    return response.data.suggestions;
};
