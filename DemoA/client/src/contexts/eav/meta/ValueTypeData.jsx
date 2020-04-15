import React, { useState } from 'react';
import axios from 'axios'

const ValueTypeDataContext = React.createContext({
    errors: null,
    valueTypes: null,
    getAll: () => { }
});

export const useValueTypeDataContext = () => {

    const context = React.useContext(ValueTypeDataContext);

    if (context === undefined) {
        console.error('useValueTypeDataContext() can only be called by components within a ValueTypeDataProvider.');
    }

    return context;
}

function ValueTypeDataProvider(props) {

    const baseUri = 'https://localhost:5004/api/valueTypes';

    const [valueTypes, setValueTypes] = useState([]);

    const [errors, setErrors] = useState([]);

    const getAll = () => {
        axios
            .get(baseUri)
            .then((response) => {
                setValueTypes(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    return <ValueTypeDataContext.Provider value={{
        valueTypes, errors, getAll
    }} {...props} />
}

export default ValueTypeDataProvider;