import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Input,
    Button,
    FormControl,
    FormLabel,
    Textarea,
    Box,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Heading,
    Alert,
    AlertIcon,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { addOrder } from '../features/ordersSlice';
import { Client, Order, OrderItem } from '../types/orderTypes';

const OrderForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clients = useSelector((state: { clients: Client[] }) => state.clients);

    const [clientId, setClientId] = useState<number | ''>('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [address, setAddress] = useState('');
    const [deliveryCost, setDeliveryCost] = useState('');
    const [deliveryOption, setDeliveryOption] = useState<string>('');
    const [, setError] = useState<string | null>(null);
    const [selectedClientItems, setSelectedClientItems] = useState<OrderItem[]>([]);

    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [deliveryOptionError, setDeliveryOptionError] = useState<string | null>(null);

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClientId = Number(e.target.value);
        setClientId(selectedClientId);

        const selectedClient = clients.find(client => client.id === selectedClientId);

        if (selectedClient) {
            setPhone(selectedClient.phone);
            setAddress(selectedClient.address);
            setSelectedClientItems(selectedClient.items || []);
        } else {
            setPhone('');
            setAddress('');
            setSelectedClientItems([]);
        }
    };


    const validateOrderFields = () => {
        let valid = true;
        setPhoneError(null);
        setAddressError(null);
        setDeliveryOptionError(null);

        if (!phone) {
            setPhoneError('Введите номер телефона');
            valid = false;
        }

        if (!address) {
            setAddressError('Введите адрес');
            valid = false;
        }

        if (!deliveryOption) {
            setDeliveryOptionError('Выберите дату доставки');
            valid = false;
        }

        return valid;
    };


    const handleSubmit = () => {
        if (!validateOrderFields()) return;

        let deliveryDate = '';
        if (deliveryOption === 'today') {
            deliveryDate = new Date().toISOString().split('T')[0];
        } else if (deliveryOption === 'tomorrow') {
            deliveryDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        } else if (deliveryOption === 'dayAfterTomorrow') {
            deliveryDate = new Date(Date.now() + 172800000).toISOString().split('T')[0];
        }

        const newOrder: Order = {
            id: Date.now(),
            phone,
            status: 'Создан',
            deliveryDate,
            address,
            comment,
            deliveryCost: parseFloat(deliveryCost) || 0,
            items: selectedClientItems,
            clientId: clientId || null,
        };

        dispatch(addOrder(newOrder));
        navigate('/');
    };

    const resetForm = () => {
        setClientId('');
        setPhone('');
        setComment('');
        setAddress('');
        setDeliveryCost('');
        setDeliveryOption('');
        setError(null);
        setSelectedClientItems([]);
    };

    const totalCost = selectedClientItems.reduce((total, item) => total + item.price * item.quantity, 0) + (parseFloat(deliveryCost) || 0);

    return (
        <Box display="flex" p={4}>
            <Box flex="1" mr={4}>
                <Heading size="md">Данные заказа</Heading>
                {phoneError && (
                    <Alert status="error" mb={4}>
                        <AlertIcon />
                        {phoneError}
                    </Alert>
                )}
                {addressError && (
                    <Alert status="error" mb={4}>
                        <AlertIcon />
                        {addressError}
                    </Alert>
                )}
                {deliveryOptionError && (
                    <Alert status="error" mb={4}>
                        <AlertIcon />
                        {deliveryOptionError}
                    </Alert>
                )}
                <FormControl mt={4}>
                    <FormLabel>Постоянный клиент</FormLabel>
                    <Select
                        value={clientId}
                        onChange={handleClientChange}
                        placeholder="Выберите клиента"
                    >
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Номер телефона</FormLabel>
                    <PhoneInput
                        country={'ru'}
                        value={phone}
                        onChange={setPhone}
                        placeholder="+7 (___) ___-__-__"
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Комментарий</FormLabel>
                    <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Введите комментарий"
                    />
                </FormControl>

                <Heading size="md" mt={8}>Доставка</Heading>
                <FormControl mt={4}>
                    <FormLabel>Адрес</FormLabel>
                    <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Введите адрес"
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Стоимость доставки (RUB)</FormLabel>
                    <Input
                        type="number"
                        value={deliveryCost}
                        onChange={(e) => setDeliveryCost(e.target.value)}
                    />
                </FormControl>
                <FormLabel mt={4}>Выберите дату доставки:</FormLabel>
                <RadioGroup onChange={setDeliveryOption} value={deliveryOption}>
                    <Radio value="today">Сегодня</Radio>
                    <Radio value="tomorrow">Завтра</Radio>
                    <Radio value="dayAfterTomorrow">Послезавтра</Radio>
                </RadioGroup>
            </Box>

            <Box flex="1" ml={4}>
                <Heading size="md">Товары к заказу</Heading>
                <Table variant="simple" mt={4}>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Название</Th>
                            <Th>Артикул</Th>
                            <Th>Количество</Th>
                            <Th>Цена (RUB)</Th>
                            <Th>Сумма (RUB)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {selectedClientItems.length > 0 ? (
                            selectedClientItems.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.id}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.article}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>{item.price}</Td>
                                    <Td>{(item.price * item.quantity).toFixed(2)}</Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={6} textAlign="center">
                                    Нет товаров для выбранного клиента
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>

                <Box mt={4}>
                    <Heading size="md">Сумма: {totalCost.toFixed(2)} RUB</Heading>
                    <Heading size="md">Сумма с доставкой: {(totalCost + (parseFloat(deliveryCost) || 0)).toFixed(2)} RUB</Heading>
                    <Button colorScheme="gray" onClick={resetForm} mt={2}>
                        Отменить
                    </Button>
                    <Button colorScheme="blue" onClick={handleSubmit} mt={2} ml={2}>
                        Заказать
                    </Button>
                </Box>
            </Box>

        </Box>
    );
};

export default OrderForm;
