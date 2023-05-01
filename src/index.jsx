import { createRoot } from 'react-dom/client';
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Contact from './routes/Contact';
import Layout from './routes/Layout';
import Home from './routes/Home';
import {store} from './store';
import {Provider} from 'react-redux'
import Login from './routes/Login';
import './components/input.css'

function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route  index element={<Home/>}/>
                <Route path="contact" element={<Contact/>} />
            </Route>
            <Route className="white" path="/login">
                <Route index element={<Login />}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}


const domNode = document.getElementById('root');
const root = createRoot(domNode);



root.render(
    <Provider store={store}>
       <App/>
    </Provider>
);
