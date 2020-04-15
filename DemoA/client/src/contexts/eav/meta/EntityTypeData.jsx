import React, { useState } from 'react';
import axios from 'axios'

const EntityTypeDataContext = React.createContext({
    errors: null,
    entityTypes: null,
    entityType: null,
    getAll: () => { },
    getById: () => { }
});

export const useEntityTypeDataContext = () => {

    const context = React.useContext(EntityTypeDataContext);

    if (context === undefined) {
        console.error('useEntityTypeDataContext() can only be called by components within a EntityTypeDataProvider.');
    }

    return context;
}

function EntityTypeDataProvider(props) {

    const baseUri = 'https://localhost:5004/api/entityTypes';

    const [entityTypes, setEntityTypes] = useState([]);

    const [entityType, setEntityType] = useState(null);

    const [errors, setErrors] = useState([]);

    const getAll = () => {
        axios
            .get(baseUri)
            .then((response) => {
                setEntityTypes(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    const getById = (id) => {
        axios
            .get(`${baseUri}/${id}`)
            .then((response) => {
                setEntityType(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    return <EntityTypeDataContext.Provider value={{
        entityTypes, entityType, errors, getAll, getById
    }} {...props} />
}

export default EntityTypeDataProvider;