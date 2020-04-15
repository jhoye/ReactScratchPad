import React, { useState } from 'react';
import axios from 'axios'

const StatTypeDataContext = React.createContext({
    statTypes: null,
    statType: null,
    setStatType: () => { },
    getAll: () => { },
    getById: () => { },
    add: () => { },
    update: () => { },
    remove: () => { }
});

export const useStatTypeDataContext = () => {

    const context = React.useContext(StatTypeDataContext);

    if (context === undefined) {
        console.error('useStatTypeDataContext() can only be called by components within a StatTypeDataProvider.');
    }

    return context;
}

function StatTypeDataProvider(props) {

    const baseUri = 'https://localhost:5004/api/statTypes';

    const [statTypes, setStatTypes] = useState(null);

    const [statType, setStatType] = useState(null);

    const [errors, setErrors] = useState([]);

    const getAll = () => {
        axios
            .get(`${baseUri}`)
            .then((response) => {
                setStatTypes(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
            });
    };

    const getById = (id, onSuccess) => {
        axios
            .get(`${baseUri}/${id}`)
            .then((response) => {
                setStatType({
                    id: response.data.id,
                    name: response.data.name,
                    valueType: response.data.valueType
                });
                onSuccess(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
            });
    };

    const add = (statType, onSuccess, onError) => {
        axios
            .post(`${baseUri}`, statType)
            .then((response) => {
                if (statTypes !== null) {
                    setStatTypes(oldStatTypes => [...oldStatTypes, response.data]);
                }
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
                onError();
            });
    };

    const update = (editedStatType, onSuccess, onError) => {
        axios
            .put(`${baseUri}`, editedStatType)
            .then(() => {
                setStatType(editedStatType);
                if (statTypes !== null) {
                    setStatTypes(oldStatTypes => {
                        oldStatTypes.splice(oldStatTypes.findIndex((u) => u.id === editedStatType.id), 1, editedStatType)
                        return [...oldStatTypes];
                    });
                }
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
                onError();
            });
    };

    const remove = (id) => {
        axios
            .delete(`${baseUri}/${id}`)
            .then(() => {
                if (statTypes !== null) {
                    setStatTypes(statTypes.filter(statType => statType.id !== id));
                }
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
            });
    };

    return <StatTypeDataContext.Provider value={{
        statTypes, statType, errors, getAll, getById, add, update, remove
    }} {...props} />
}

export default StatTypeDataProvider;