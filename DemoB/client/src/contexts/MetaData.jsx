import React, { useState } from 'react';
import axios from 'axios'

const MetaDataContext = React.createContext({
    errors: null,

    entityTypes: null,
    entityType: null,

    valueTypes: null,

    addEntityType: () => { },
    getEntityTypes: () => { },
    getEntityType: () => { },
    updateEntityType: () => { },
    removeEntityType: () => { },

    getValueTypes: () => { },

    addAttribute: () => { },
    updateAttribute: () => { },
    removeAttribute: () => { }
});

export const useMetaDataContext = () => {

    const context = React.useContext(MetaDataContext);

    if (context === undefined) {
        console.error('useMetaDataContext() can only be called by components within a MetaDataProvider.');
    }

    return context;
}

function MetaDataProvider(props) {

    const baseUri = 'https://localhost:5004/api';

    const [errors, setErrors] = useState([]);

    const [entityTypes, setEntityTypes] = useState(null);

    const [entityType, setEntityType] = useState(null);

    const [valueTypes, setValueTypes] = useState(null);

    const addEntityType = (entityType, onSuccess, onError) => {
        axios
            .post(`${baseUri}/entityTypes`, entityType)
            .then((response) => {
                setEntityTypes(oldEntityTypes => [...oldEntityTypes, response.data]);
                onSuccess(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
                onError();
            });
    };

    const getEntityTypes = () => {
        axios
            .get(`${baseUri}/entityTypes`)
            .then((response) => {
                setEntityTypes(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    const getEntityType = (id) => {
        setEntityType(null);
        axios
            .get(`${baseUri}/entityTypes/${id}`)
            .then((response) => {
                setEntityType(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    const updateEntityType = (name, onSuccess, onError) => {

        var editedEntityType = {
            id: entityType.id,
            name: name
        };

        axios
            .put(`${baseUri}/entityTypes`, editedEntityType)
            .then(() => {
                setEntityType({ ...entityType, name: name });
                if (entityTypes !== null) {
                    setEntityTypes(oldEntityTypes => {
                        oldEntityTypes.splice(oldEntityTypes.findIndex((u) => u.id === entityType.id), 1, editedEntityType)
                        return [...oldEntityTypes];
                    });
                }
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
                onError();
            });
    };

    const removeEntityType = (id, onSuccess, onError) => {
        axios
            .delete(`${baseUri}/entityTypes/${id}`)
            .then(() => {
                if (entityTypes !== null) {
                    setEntityTypes(entityTypes.filter(et => et.id !== id));
                }
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
                onError();
            });
    };

    const getValueTypes = () => {
        axios
            .get(`${baseUri}/valueTypes`)
            .then((response) => {
                setValueTypes(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    const addAttribute = (attribute, onSuccess, onError) => {
        axios
            .post(`${baseUri}/attributes`, attribute)
            .then((response) => {
                setEntityType({ ...entityType, attributes: [...entityType.attributes, response.data] });
                onSuccess(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
                onError();
            });
    };

    const updateAttribute = (attribute, onSuccess, onError) => {
        axios
            .put(`${baseUri}/attributes`, attribute)
            .then((response) => {

                let attrs = entityType.attributes;

                attrs.splice(attrs.findIndex((a) => a.id === response.data.id), 1, response.data);

                setEntityType({ ...entityType, attributes: attrs });
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
                onError();
            });
    };

    const removeAttribute = (id, onSuccess, onError) => {
        axios
            .delete(`${baseUri}/attributes/${id}`)
            .then(() => {

                let attrs = entityType.attributes;

                attrs.splice(attrs.findIndex((a) => a.id === id), 1);

                setEntityType({ ...entityType, attributes: attrs });
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
                onError();
            });
    };

    return <MetaDataContext.Provider value={{
        errors,
        entityTypes, entityType,
        valueTypes,
        addEntityType, getEntityTypes, getEntityType, updateEntityType, removeEntityType,
        getValueTypes,
        addAttribute, updateAttribute, removeAttribute
    }} {...props} />
}

export default MetaDataProvider;