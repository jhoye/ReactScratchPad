import React, { useState } from 'react';
import axios from 'axios'

const EntityTypeAttributeDataContext = React.createContext({
    errors: null,
    add: () => { },
    update: () => { },
    remove: () => { }
});

export const useEntityTypeAttributeDataContext = () => {

    const context = React.useContext(EntityTypeAttributeDataContext);

    if (context === undefined) {
        console.error('useEntityTypeAttributeDataContext() can only be called by components within a EntityTypeAttributeDataProvider.');
    }

    return context;
}

function EntityTypeAttributeDataProvider(props) {

    const baseUri = 'https://localhost:5004/api/entityTypeAttributes';

    const [errors, setErrors] = useState([]);

    const add = (entityTypeAttribute, onSuccess, onError) => {
        console.info('add...', entityTypeAttribute);
        axios
            .post(`${baseUri}`, entityTypeAttribute)
            .then((response) => {
                console.info('success...', response.data);
                onSuccess(response.data);
            })
            .catch((error) => {
                console.info('error...', error);
                setErrors((oldErrors) => [...oldErrors, error.message]);
                onError();
            });
    };

    const update = (entityTypeAttribute, onSuccess, onError) => {
        axios
            .put(`${baseUri}`, entityTypeAttribute)
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
                onError();
            });
    };

    const remove = (id) => {
        axios
            .delete(`${baseUri}/${id}`)
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    return <EntityTypeAttributeDataContext.Provider value={{
        errors, add, update, remove
    }} {...props} />
}

export default EntityTypeAttributeDataProvider;