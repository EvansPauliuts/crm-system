import React from 'react';
import { VStack, Button, Box, Text } from '@chakra-ui/react';
import OrdersTable from '../components/OrdersTable';
import { Link } from 'react-router-dom';

const OrdersList: React.FC = () => {
    return (
        <VStack spacing={4} align="stretch">
            <Box display="flex" p={4} justifyContent="space-between" alignItems="center">
                <Text fontSize="3xl" as="b" ml={3}>Заказы</Text>
                <Box mr={4}>
                    <Link to="/create-order">
                        <Button colorScheme="blue" mt={2}>
                            Добавить заказ
                        </Button>
                    </Link>
                </Box>
            </Box>
            <OrdersTable />
        </VStack>
    );
};

export default OrdersList;