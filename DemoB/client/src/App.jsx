import React from 'react';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MetaDataProvider from './contexts/MetaData';

// / (default = about)
import About from './routes/About';

// /meta
import EntityTypes from './routes/Meta/EntityTypes';
import EntityTypeDetails from './routes/Meta/EntityTypeDetails';
import NewEntityType from './routes/Meta/NewEntityType';

function App() {
    return (
        <Router>
            <h1>EAV Data Demo</h1>
            <header>
                <nav>
                    <NavLink exact activeClassName="active-nav-link" to="/">About</NavLink>
                    <span>&nbsp;|&nbsp;</span>
                    <NavLink activeClassName="active-nav-link" to="/meta/entity-types">Meta</NavLink>
                </nav>
                <hr />
            </header>
            <Route exact path="/" component={About} />
            <MetaDataProvider>
                <Route exact path="/meta/entity-types" component={EntityTypes} />
                <Route exact path="/meta/entity-type-details/:id" component={EntityTypeDetails} />
                <Route exact path="/meta/new-entity-type" component={NewEntityType} />
            </MetaDataProvider>
        </Router>
    );
}

export default App;
