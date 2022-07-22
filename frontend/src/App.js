//import React, { Component } from 'react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { Route, Routes, Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import MenuAppBar from './components/muitoolbar';

import  ClientsList from './ClientsList';
import  ClientCreateUpdate  from './ClientsCreateUpdate';
import  RefCreateUpdate  from './RefCreateUpdate';
import ProductTable from './components/productlist';

import Box from "@mui/material/Box";

import './App.css';

const BaseLayout = () => (

    <>
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                bgcolor: "background.default",
                color: "text.primary",
                borderRadius: 1,
                p: 1,
                flexGrow: 1
            }}
        >

            <MenuAppBar/>
            {/*
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Insurance ERP Demo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/clients">CLIENTS</a>
                    <a className="nav-item nav-link" href="/clients/client">CREATE CLIENT</a>

                </div>
            </div>
        </nav>
*/}
        </Box>
        {/*<div className="content">*/}
        <Routes>
            <Route path="/" element={<ClientsList/>}/>
            <Route path="/clients" exact element={<ClientsList/>}/>
            <Route path="/clients/client/:pk" element={<ClientCreateUpdate/>}/>
            <Route path="/clients/client" exact element={<ClientCreateUpdate/>}/>
            <Route path="/products" exact element={<ProductTable />}/>
            <Route path="/products/pr" exact element={<RefCreateUpdate ref={'pr'}/>}/>
        </Routes>

        {/*</div>*/}
    </>

)

// class App extends Component {
const App = () => {
    // require('react-dom');
    // window.React2 = require('react');
    // console.log('App component: Is this one object react:')
    // console.log(window.React1 === window.React2);

    return (

            <BrowserRouter>
                <BaseLayout/>
            </BrowserRouter>
           );
}

export default App;
