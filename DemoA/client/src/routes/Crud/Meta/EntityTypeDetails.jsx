import React, { useEffect, useState } from 'react';
import { useEntityTypeDataContext } from '../../../contexts/eav/meta/EntityTypeData';
import BreadcrumbNav from '../../../components/common/BreadcrumbNav';
import AddAttributeType from '../../../components/crud/AddAttributeType';
import LinkButton from '../../../components/common/LinkButton';

function EntityTypeDetails({ match }) {

    const id = match.params.id;

    const data = useEntityTypeDataContext();

    const [editMode, setEditMode] = useState("");

    const cancelEditMode = () => {
        setEditMode('');
    }

    useEffect(() => {
        data.getById(id);
    }, []);

    const breadcrumbs = [
        { path: '/crud', text: 'CRUD' },
        { text: 'Meta' },
        { path: '/crud/meta/entity-types', text: 'Entity Types' },
        { text: 'Entity Type Details' }
    ];

    return (
        <>
            <BreadcrumbNav data={breadcrumbs} dataPathKey='path' dataTextKey='text' />
            {data.entityType === null ? (
                <>
                    <h2>Loading details...</h2>
                </>
            ) : (
                <>
                    <h2>{data.entityType.name}</h2>
                    <h3>Attribute Types</h3>
                    {data.entityType.entityTypeAttributes.length === 0 ? (
                        <div>
                            <em>none</em>
                        </div>
                    ) : (
                        <div>
                            <ul>
                            {data.entityType.entityTypeAttributes.map(attribute => {
                                return (
                                    <li key={attribute.id}>
                                        {attribute.name}
                                        (
                                            {attribute.valueTypeId}
                                            {attribute.isNullable && <span>, nullable</span>}
                                            {attribute.isUnique && <span>, unique</span>}
                                        )
                                    </li>
                                );
                            })}
                            </ul>
                        </div>
                    )}
                    <br />
                    {editMode === 'add attribute type' ? (
                        <AddAttributeType entityTypeId={id} onSaved={cancelEditMode} onCancel={cancelEditMode} />
                    ) : (
                        <div>
                            + <LinkButton text={'new attribute type'} onClick={setEditMode.bind(this, 'add attribute type')} />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default EntityTypeDetails;