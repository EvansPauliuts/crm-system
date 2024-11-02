import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './app/store';
import CreateOrder from './pages/CreateOrder';
import OrdersList from './pages/OrdersList';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ChakraProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<OrdersList />} />
                        <Route path="/create-order" element={<CreateOrder />} />
                    </Routes>
                </Router>
            </ChakraProvider>
        </Provider>
    );
};

export default App;