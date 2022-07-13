import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import  ClientsList from './ClientsList'
import  ClientCreateUpdate  from './ClientsCreateUpdate'
import './App.css';

const BaseLayout = () => (
    <div className="container-fluid">
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

      <div className="content">
          <Routes>
            <Route path="/clients" exact element={ <ClientsList/> } />
            <Route path="/clients/client/:pk"  element={ <ClientCreateUpdate/> } />
            <Route path="/clients/client/" exact element={ <ClientCreateUpdate/> } />
          </Routes>

      </div>

    </div>
)

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <BaseLayout/>
        </BrowserRouter>
    );
  }
}

export default App;
