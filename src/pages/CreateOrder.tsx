import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import OrderForm from '../components/OrderForm';

const CreateOrder: React.FC = () => {
    return (
        <VStack spacing={4} align="stretch">
            <Text fontSize="3xl" as="b" ml={3}>Создание заказа</Text>
            <OrderForm />
        </VStack>
    );
};

export default CreateOrder;
