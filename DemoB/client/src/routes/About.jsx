import React, { useState } from 'react';

function About() {

    const [selectedTab, setSelectedTab] = useState("Tab 1");

    const tabSelected = (labelText) => {
        setSelectedTab(labelText);
    }

    return (
        <div className="about-page">
            <h2>About the demo</h2>
            <div>
                <p>
                    CRUD operations are demonstrated using an <a href="https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model" target="_blank">EAV (entity-attribute-value) data model</a>, also known as an open schema or vertical database.
                    Rather than store data in records that are representations of the data's structure implicitly, data is stored as compactly in as few tables as possible with additional tables containing metadata about its schematic representation.
                </p>
                <p>Technology implemented includes:</p>
                <ul>
                    <li>React context API for maintaining state</li>
                    <li>Axios for XHR with the API</li>
                    <li>.NET Core Web API for handling the data on the server</li>
                    <li>Entity Framework Core for database schema setup, migrations, and ORM</li>
                    <li>SQLite as the data store</li>
                </ul>
            </div>
        </div>
    );
}

export default About;