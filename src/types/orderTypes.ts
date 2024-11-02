export interface OrderItem {
    id: number;
    name: string;
    article: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    phone: string;
    status: 'Создан' | 'Завершен' | 'Отменен';
    deliveryDate: string;
    address: string;
    items: OrderItem[];
    comment?: string;
    deliveryCost?: number;
    clientId?: number | null;
}

export interface Client {
    id: number;
    name: string;
    address: string;
    phone: string;
    items: OrderItem[];
}
