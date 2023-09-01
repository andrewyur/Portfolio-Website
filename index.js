import React from 'react'
import { Suspense } from 'react'
import  { createRoot }  from 'react-dom/client';
import App from './src/App.js'
import './public/index.css'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<Suspense fallback={<div className="center">loading</div>}>
    <App/>
</Suspense>
);