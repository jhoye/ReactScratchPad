import React, { useState } from 'react';
import axios from 'axios'
import * as signalR from '@aspnet/signalr'

const PingDataContext = React.createContext({
    status: null,
    isLoading: false,
    send: () => {},
    fetch: () => {},
    openStatusSocket: () => {}
});

export const usePingDataContext = () => {

    const context = React.useContext(PingDataContext);

    if (context === undefined) {
        console.error('usePingDataContext() can only be called by components within a PingDataProvider.');
    }

    return context;
}

function PingDataProvider(props) {

    const baseUri = 'https://localhost:5004/api/pings';

    const [status, setStatus] = useState(null);

    const [isLoading, setLoading] = useState(false);

    const [errors, setErrors] = useState([]);

    const [hubConnection, setHubConnection] = useState(null);

    const send = () => {
        setLoading(true);
        axios.post(`${baseUri}`)
            .then((response) => {
                setLoading(false);
                setStatus(response.data);
            })
            .catch((error) => {
                setLoading(false);
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    const fetch = () => {
        setLoading(true);
        axios.get(`${baseUri}`)
            .then((response) => {
                setLoading(false);
                setStatus(response.data);
            })
            .catch((error) => {
                setLoading(false);
                setErrors((oldErrors) => [...oldErrors, error.message]);
            });
    };

    const openStatusSocket = () => {

        if (hubConnection === null) {

            const connection = new signalR.HubConnectionBuilder()
                .withUrl('/statusHub')
                .build();

            connection.on('ReceiveMessage', setStatus);

            connection.start()
                .then(() => console.info('SignalR connected and started.'))
                .catch((err) => console.error('Failure to start SignalR', err));

            setHubConnection(connection);
        }
    };

    return <PingDataContext.Provider value={{
        status, isLoading, errors, send, fetch, openStatusSocket
    }} {...props} />
}

export default PingDataProvider;