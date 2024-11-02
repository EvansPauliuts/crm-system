import { useState } from 'react';
import { fetchAddresses } from '../api/dadata';

const useDadata = () => {
    const [addresses, setAddresses] = useState<string[]>([]);

    const fetchSuggestions = async (query: string) => {
        if (query.length > 3) {
            const results = await fetchAddresses(query);
            setAddresses(results.map((item: any) => item.value));
        } else {
            setAddresses([]);
        }
    };

    return { addresses, fetchSuggestions };
};

export default useDadata;