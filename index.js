import React from 'react'
import { Suspense } from 'react'
import  { createRoot }  from 'react-dom/client';
import About from './src/About.js'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<Suspense fallback={<div className="center">loading</div>}>
    <About/>
</Suspense>
);