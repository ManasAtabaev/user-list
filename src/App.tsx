import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/home/HomePage';
import ChartPage from './pages/chart/ChartPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chart" element={<ChartPage />} />
        </Routes>
    );
}

export default App;
