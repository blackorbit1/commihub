import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <NextUIProvider>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        </Provider>
      </NextUIProvider>
    </ApolloProvider>
  );
}

export default App;
