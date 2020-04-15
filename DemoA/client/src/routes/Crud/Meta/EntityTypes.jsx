import React, { useEffect, useState } from 'react';
import { useEntityTypeDataContext } from '../../../contexts/eav/meta/EntityTypeData';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '../../../components/common/BreadcrumbNav';

function EntityTypes() {

    const data = useEntityTypeDataContext();

    const breadcrumbs = [
        { path: '/crud', text: 'CRUD' },
        { text: 'Meta' },
        { text: 'Entity Types' }
    ];

    useEffect(() => {
        if (data.entityTypes.length === 0) {
            data.getAll();
        }
    }, []);


    return (
        <>
            <BreadcrumbNav data={breadcrumbs} dataPathKey='path' dataTextKey='text' />
            <h2>Entity Types</h2>
            {data.entityTypes.length === 0 ? (
                <div>loading...</div>
            ) : (
                <ul>
                    {data.entityTypes.map(entityType => {
                        return (
                            <li key={entityType.id}>
                                <Link to={`/crud/meta/entity-type-details/${entityType.id}`}>{entityType.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}

export default EntityTypes;