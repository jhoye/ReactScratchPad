import React, { useState } from 'react';
import axios from 'axios'

const StatDataContext = React.createContext({
    stats: null,
    stat: null,
    setStat: () => { },
    getAll: () => { },
    getById: () => { },
    add: () => { },
    update: () => { },
    remove: () => { }
});

export const useStatDataContext = () => {

    const context = React.useContext(StatDataContext);

    if (context === undefined) {
        console.error('useStatDataContext() can only be called by components within a StatDataProvider.');
    }

    return context;
}

function StatDataProvider(props) {

    const baseUri = 'https://localhost:5004/api/stats';

    const [stats, setStats] = useState(null);

    const [stat, setStat] = useState(null);

    const [errors, setErrors] = useState([]);

    const getAll = (statTypeId) => {
        axios
            .get(`${baseUri}?statTypeId=${statTypeId}`)
            .then((response) => {
                setStats(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
            });
    };

    const getById = (id, onSuccess) => {
        axios
            .get(`${baseUri}/${id}`)
            .then((response) => {
                setStat({
                    id: response.data.id,
                    date: response.data.date,
                    value: response.data.value,
                    statType: response.data.statType
                });
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
            });
    };

    const add = (stat, onSuccess, onError) => {
        axios
            .post(`${baseUri}`, stat)
            .then((response) => {
                if (stats !== null) {
                    setStats(oldStats => [...oldStats, response.data]);
                }
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
                onError(error);
            });
    };

    const update = (editedStat, onSuccess, onError) => {
        axios
            .put(`${baseUri}`, editedStat)
            .then(() => {
                setStat(editedStat);
                if (stats !== null) {
                    setStats(oldStats => {
                        oldStats.splice(oldStats.findIndex((u) => u.id === editedStat.id), 1, editedStat)
                        return [...oldStats];
                    });
                }
                onSuccess();
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
                onError(error);
            });
    };

    const remove = (id) => {
        axios
            .delete(`${baseUri}/${id}`)
            .then(() => {
                if (stats !== null) {
                    setStats(stats.filter(stat => stat.id !== id));
                }
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error]);
            });
    };

    return <StatDataContext.Provider value={{
        stats, stat, setStat, errors, getAll, getById, add, update, remove
    }} {...props} />
}

export default StatDataProvider;