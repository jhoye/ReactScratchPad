import React, { useState } from 'react';
import { useMetaDataContext } from '../../contexts/MetaData';
import { Link, Redirect } from 'react-router-dom';
import BreadcrumbNav from '../../components/common/BreadcrumbNav';
import TextBox from '../../components/common/TextBox';

function NewEntityType() {

    const data = useMetaDataContext();

    const [name, setName] = useState("");

    const [isSaving, setIsSaving] = useState(false);

    const [entityTypeId, setEntityTypeId] = useState(null);

    const breadcrumbs = [
        { text: 'Meta' },
        { path: '/meta/entity-types', text: 'Entity Types' },
        { text: 'New Entity Type' }
    ];

    const nameChanged = (value) => {
        setName(value);
    }

    const saveClicked = () => {
        setIsSaving(true);
        data.addEntityType(
            {
                name: name
            },
            (entityType) => {
                setEntityTypeId(entityType.id);
            },
            () => {
                console.error(data.errors);
            }
        )
    }

    return entityTypeId === null ? (
        <>
            <BreadcrumbNav data={breadcrumbs} dataPathKey='path' dataTextKey='text' />
            <h2>New Entity Type</h2>
            <TextBox
                labelText="Name"
                value={name}
                isDisabled={isSaving}
                onChange={nameChanged} />
            <br />
            <div>
                <button
                    disabled={isSaving}
                    onClick={saveClicked}>Save</button>
                <span>&nbsp;</span>
                {isSaving ? (
                    <span>saving...</span>
                ) : (
                    <Link to={'/meta/entity-types'}>cancel</Link>
                )}
            </div>
        </>
    ) : (
        <Redirect to={`/meta/entity-type-details/${entityTypeId}`} />
    );
}

export default NewEntityType;