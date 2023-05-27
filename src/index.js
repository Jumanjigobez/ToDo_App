import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

import { MyProvider } from './context';

import './App.css';



const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <MyProvider>
            <App/>
        </MyProvider>
            
    </React.StrictMode>
);


