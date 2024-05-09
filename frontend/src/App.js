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

function App() {
  return (
    <NextThemesProvider attribute='class' defaultTheme='dark'>
      <NextUIProvider>
        <Provider store={store}>
          <Router>
            <CustomNavbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/account' element={<AccountPage />} />
              <Route path='/commission/:commissionerId' element={<CommissionPage />} />
            </Routes>
          </Router>
        </Provider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default App;
