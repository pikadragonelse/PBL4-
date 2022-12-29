import React from 'react';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Router>
                <App />
            </Router>
        </CookiesProvider>
    </React.StrictMode>,
);

reportWebVitals();
