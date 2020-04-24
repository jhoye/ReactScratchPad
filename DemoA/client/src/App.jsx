import React from 'react';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import StatisticsDataProvider from './contexts/StatisticsData';
import StatTypeDataProvider from './contexts/StatTypeData';
import PingDataProvider from './contexts/PingData';

// / (default = about)
import About from './routes/About';

// /pings
import Pings from './routes/Pings';

// /graphs
import Graphs from './routes/Graphs';

// /old-crud
import ListStatTypes from './routes/ListStatTypes';
import AddStatType from './routes/AddStatType';
import ViewStatType from './routes/ViewStatType';
import EditStatType from './routes/EditStatType';

function App() {
    return (
        <Router>
            <h1>React + .NET Core Demos</h1>
            <header>
                <nav>
                    <NavLink exact activeClassName="active-nav-link" to="/">About</NavLink>
                    <span>&nbsp;|&nbsp;</span>
                    <NavLink exact activeClassName="active-nav-link" to="/pings">Pings</NavLink>
                    <span>&nbsp;|&nbsp;</span>
                    <NavLink exact activeClassName="active-nav-link" to="/graphs">Graphs</NavLink>
                    <span>&nbsp;|&nbsp;</span>
                    (<NavLink activeClassName="active-nav-link" to="/old-crud">Old CRUD</NavLink>)
                </nav>
                <hr />
            </header>
            <Route exact path="/" component={About} />
            <PingDataProvider>
                <Route exact path="/pings" component={Pings} />
            </PingDataProvider>
            <StatisticsDataProvider>
                <Route exact path="/graphs" component={Graphs} />
            </StatisticsDataProvider>
            <StatTypeDataProvider>
                {/* /old-crud */}
                <Route exact path="/old-crud" component={ListStatTypes} />
                <Route exact path="/old-crud/add" component={AddStatType} />
                <Route exact path="/old-crud/view/:id" component={ViewStatType} />
                <Route exact path="/old-crud/edit/:id" component={EditStatType} />
            </StatTypeDataProvider>
        </Router>
    );
}

export default App;
