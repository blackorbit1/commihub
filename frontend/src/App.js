import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CustomNavbar from "./components/Navbar";

function App() {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Router>
          <CustomNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </Provider>
    </NextUIProvider>
  );
}

export default App;
