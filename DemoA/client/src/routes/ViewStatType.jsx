import React, { useState, useEffect } from 'react';
import { useStatTypeDataContext } from '../contexts/StatTypeData';
import StatDataProvider from '../contexts/StatData';
import { Redirect, Link } from 'react-router-dom';
import StatsTable from '../components/StatsTable';

function ViewStatType({ match }) {

    const id = match.params.id;

    const data = useStatTypeDataContext();

    const [editMe, setEditMe] = useState(false);

    const [name, setName] = useState(null);

    const editClick = () => {
        setEditMe(true);
    };

    useEffect(() => {
        data.getById(
            id,
            (statType) => {
                setName(statType.name);
            });
    }, [id]);

    return editMe ? (
        <Redirect to={`/old-crud/edit/${id}`} />
    ) : (
            <>
                {name === null ? (
                    <p>loading...</p>
                ) : (
                    <>
                        <h2>
                            <span>{data.statType.name}</span>
                            &nbsp;
                            <small className="link-button" onClick={editClick}>edit...</small>
                        </h2>
                        <StatDataProvider>
                            <StatsTable statType={data.statType} />
                        </StatDataProvider>
                    </>
                )}
                <Link to="/old-crud">return to list...</Link>
            </>
        );
}

export default ViewStatType;
