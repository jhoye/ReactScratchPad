import React from 'react';
import { Link } from 'react-router-dom';
import StatTypesList from '../components/StatTypesList';

function ListStatTypes() {
    return (
        <>
            <h2>Stats</h2>
            <StatTypesList />
            <div>
                <Link to="/old-crud/add">add new type of stat...</Link>
            </div>
        </>
    );
}

export default ListStatTypes;