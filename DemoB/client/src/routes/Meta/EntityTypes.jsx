import React, { useEffect, useState } from 'react';
import { useMetaDataContext } from '../../contexts/MetaData';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '../../components/common/BreadcrumbNav';
import { Add as AddIcon } from '../../components/common/Icons';

function EntityTypes() {

    const data = useMetaDataContext();

    const breadcrumbs = [
        { text: 'Meta' },
        { text: 'Entity Types' }
    ];

    useEffect(() => {
        if (data.entityTypes === null) {
            data.getEntityTypes();
        }
    }, []);


    return (
        <>
            <BreadcrumbNav data={breadcrumbs} dataPathKey='path' dataTextKey='text' />
            <h2>Entity Types</h2>
            {data.entityTypes === null ? (
                <div>loading...</div>
            ) : data.entityTypes.length === 0 ? (
                <div>
                    <em>none</em>
                </div>
            ) : (
                <ul>
                    {data.entityTypes.map(entityType => {
                        return (
                            <li key={entityType.id}>
                                <Link to={`/meta/entity-type-details/${entityType.id}`}>{entityType.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            )}
            <br />
            <AddIcon />
            &nbsp;
            <Link to={'/meta/new-entity-type'}>new entity type</Link>
        </>
    );
}

export default EntityTypes;