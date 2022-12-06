import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { MessengerPage } from './page/messenger-page';
import { LoginPage } from './page/login-page';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/messenger-page/:id" element={<MessengerPage />} />
        </Routes>
    );
};

export default App;
