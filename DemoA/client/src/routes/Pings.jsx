import React, { useEffect } from 'react';
import { usePingDataContext } from '../contexts/PingData';

function Pings() {

    const data = usePingDataContext();

    useEffect(() => {
        data.openStatusSocket();
        data.fetch();
    }, []);

    return (
        <div>
            <p>This demonstrates message queueing between this React web application, which publishes <em>command</em> messages to a worker service, and in return subscribes to <em>status</em> messages from it.</p>
            <p>Technology implemented includes:</p>
            <ul>
                <li>React Context API and axios for maintaining state and interacting with the API</li>
                <li>RabbitMQ for the underlying message queue</li>
                <li>.NET Core Web API for handling input from the UI, published as commands messages</li>
                <li>SignalR for emitting status messages received as a subscriber</li>
                <li>A simple console application to simulate a worker service.</li>
            </ul>
            <strong>Additional Setup:</strong>
            <ol>
                <li>Ensure that you can connect to the RabbitMQ host (configured in appsettings.json).</li>
                <li>Configure, build, and run the console app to simulate a worker service: ServiceSimlulator.exe</li>
            </ol>
            <hr />
            {data.isLoading ? (
                <p>Pinging...</p>
            ) : (
                <div>
                    <p>
                        <button onClick={data.send}>Send Command</button>
                    </p>
                    <p>
                        <strong>Status:</strong>
                        <br />
                        {data.status}
                    </p>
                </div>
            )
            }
            <hr />
            <p>errors: {data.errors.length}</p>
            <ul>
            {data.errors.map((error, index) =>
                <li key={index}>{error}</li>
            )}
            </ul>
        </div>
    );
}

export default Pings;