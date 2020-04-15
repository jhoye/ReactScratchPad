import React, { useState } from 'react';
import axios from 'axios'

const StatisticsDataContext = React.createContext({
    statistics: null,
    errors: null,
    getAll: () => { },
});

export const useStatisticsDataContext = () => {

    const context = React.useContext(StatisticsDataContext);

    if (context === undefined) {
        console.error('useStatisticsDataContext() can only be called by components within a StatisticsDataProvider.');
    }

    return context;
}

function StatisticsDataProvider(props) {

    const baseUri = 'https://localhost:5004/api/statistics';

    const [statistics, setStatistics] = useState(null);

    const [errors, setErrors] = useState([]);

    const getAll = () => {
        axios
            .get(`${baseUri}`)
            .then((response) => {
                setStatistics(response.data);
            })
            .catch((error) => {
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    return <StatisticsDataContext.Provider value={{
        statistics, errors, getAll
    }} {...props} />
}

export default StatisticsDataProvider;