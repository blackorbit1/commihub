import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CustomNavbar from './components/Navbar';
import AccountPage from './components/AccountPage';
import CommissionPage from './components/CommissionPage';
import OrdersPage from './components/OrdersPage';
import ReceivedPage from './components/ReceivedPage';
import Backgrounds from './components/Backgrounds';

function App() {
  return (
    <NextThemesProvider attribute='class' defaultTheme='dark'>
      <NextUIProvider>
        <Provider store={store}>
          <Router>
            <CustomNavbar />
            <Backgrounds />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/account' element={<AccountPage />} />
              <Route path='/commission/:commissionerId' element={<CommissionPage />} />
              <Route path='/orders' element={<OrdersPage />} />
              <Route path='/received' element={<ReceivedPage />} />
            </Routes>
          </Router>
        </Provider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default App;
