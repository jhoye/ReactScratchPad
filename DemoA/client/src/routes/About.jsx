import React from 'react';

function About() {

    return (
        <div>
            <h2>About the demos</h2>
            <div>
                <h3>Pings</h3>
                <p>This demonstrates message queueing between this React web application, which publishes <em>command</em> messages to a worker service, and in return subscribes to <em>status</em> messages from it.</p>
                <p>Technology implemented includes:</p>
                <ul>
                    <li>React Context API and axios for maintaining state and interacting with the API</li>
                    <li>RabbitMQ for the underlying message queue</li>
                    <li>.NET Core Web API for handling input from the UI, published as commands messages</li>
                    <li>SignalR for emitting status messages received as a subscriber</li>
                    <li>A simple console application to simulate a worker service.</li>
                </ul>
            </div>
            <hr />
            <div>
                <h3>Graphs</h3>
                <p>This demonstrates use of a sophisticated third party library within a React application.</p>
                <p>Technology implemented includes:</p>
                <ul>
                    <li>React Context API and axios for maintaining state and interacting with the API</li>
                    <li>D3 SVG library plots charts</li>
                    <li>.NET Core Web API for serving data for the charts</li>
                    <li>An embedded .csv resource in the .NET Core application provides a static data set (a randomized simulation of "sales" data).</li>
                </ul>
            </div>
            <hr />
            <div>
                <h3>CRUD</h3>
                <p>Technology implemented includes:</p>
                <ul>
                    <li>React Context API and axios for maintaining state and interacting with the API</li>
                    <li>.NET Core Web API for handling the data on the server</li>
                    <li>Entity Framework Core with migrations for database schema setup</li>
                    <li>SQLite as the data store</li>
                </ul>
            </div>
        </div>
    );
}

export default About;