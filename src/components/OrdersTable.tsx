import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Tag } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../features/ordersSlice';
import { Order } from '../types/orderTypes';

const OrdersTable: React.FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state: { orders: { orders: Order[] } }) => state.orders.orders);

    const handleCancel = (id: number) => {
        dispatch(updateOrderStatus({ id, status: 'Отменен' }));
    };

    const handleComplete = (id: number) => {
        dispatch(updateOrderStatus({ id, status: 'Завершен' }));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Создан':
                return 'blue';
            case 'Завершен':
                return 'green';
            case 'Отменен':
                return 'red';
            default:
                return 'gray';
        }
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>N°</Th>
                    <Th>Клиент</Th>
                    <Th>Номер телефона</Th>
                    <Th>Статус</Th>
                    <Th>Дата доставки</Th>
                    <Th>Адрес доставки</Th>
                    <Th>Кол-во</Th>
                    <Th>Стоимость товаров (rub)</Th>
                    <Th>Стоимость доставки (rub)</Th>
                    <Th>Стоимость итогов (rub)</Th>
                    <Th>Комментарий</Th>
                    <Th>Действия</Th>
                </Tr>
            </Thead>
            <Tbody>
                {orders.map((order, index) => (
                    <Tr key={order.id}>
                        <Td>{index + 1}</Td>
                        <Td>{order.clientId}</Td>
                        <Td>{order.phone}</Td>
                        <Td>
                            <Tag variant="subtle" colorScheme={getStatusColor(order.status)}>
                                {order.status}
                            </Tag>
                        </Td>
                        <Td>{order.deliveryDate}</Td>
                        <Td>{order.address}</Td>
                        <Td>{index + 3}</Td>
                        <Td>{order.deliveryCost}</Td>
                        <Td>{order.deliveryCost}</Td>
                        <Td>{order.deliveryCost}</Td>
                        <Td>{order.comment}</Td>
                        <Td>
                            <Button onClick={() => handleCancel(order.id)} colorScheme="gray" mr={3}>
                                Отменить
                            </Button>
                            <Button onClick={() => handleComplete(order.id)} colorScheme="blue">
                                Завершить
                            </Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default OrdersTable;
