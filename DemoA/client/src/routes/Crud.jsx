import React from 'react';
import { Link } from 'react-router-dom';

function Crud() {

    return (
        <>
            <nav>
                <h3>Meta</h3>
                <Link to="/crud/meta/entity-types">Entity Types</Link>
            </nav>
        </>
    );
}

export default Crud;