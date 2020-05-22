import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMetaDataContext } from '../../contexts/MetaData';
import EditEntityTypeName from '../../components/meta/EditEntityTypeName';
//import AttributeList from '../../components/meta/AttributeList';
//import AttributeForm from '../../components/meta/AttributeForm';
import Attributes from '../../components/meta/Attributes';
import BreadcrumbNav from '../../components/common/BreadcrumbNav';
//import LinkButton from '../../components/common/LinkButton';
//import { Add as AddIcon } from '../../components/common/Icons';


function EntityTypeDetails({ match }) {

    const id = match.params.id;

    const data = useMetaDataContext();

    const [editMode, setEditMode] = useState('');

    const [tab, setTab] = useState('attributes');

    const [wasDeleted, setWasDeleted] = useState(false);

    const clearEditMode = () => {
        setEditMode('');
    }

    const onSaveEntityTypeName = (name) => {
        data.updateEntityType(name, clearEditMode, onError);
    }

    const deleteClicked = () => {
        if (window.confirm('This entity type will be permanently deleted.')) {
            setEditMode('deleting')
            data.removeEntityType(id, () => { setWasDeleted(true); }, onError);
        }
    }

    const onError = (error) => {
        console.error(error);
    }

    useEffect(() => {
        if (data.valueTypes === null) {
            data.getValueTypes();
        }
        data.getEntityType(id);
    }, [ id ]);

    const breadcrumbs = [
        { text: 'Meta' },
        { path: '/meta/entity-types', text: 'Entity Types' },
        { text: 'Entity Type Details' }
    ];

    return wasDeleted ? (
        <Redirect to={'/meta/entity-types'} />
    ) : (
        <>
            <BreadcrumbNav data={breadcrumbs} dataPathKey='path' dataTextKey='text' />
            {data.entityType === null ? (
                <>
                    <h2>Entity Type Details</h2>
                    <div>loading...</div>
                </>
            ) : (
                <>
                    <EditEntityTypeName
                        name={data.entityType.name}
                        isDisabled={editMode !== '' && editMode !== 'edit entity type name'}
                        onEdit={setEditMode.bind(this, 'edit entity type name')}
                        onCancel={clearEditMode}
                        onSave={onSaveEntityTypeName} />
                    <div>
                        <button disabled={editMode !== ''} onClick={deleteClicked}>Delete</button>
                        { editMode == 'deleting' && (<span>&nbsp;deleting...</span>) }
                    </div>
                    <br />
                    <header className="tabs">
                        <h3 className={tab === 'attributes' ? 'active' : ''}
                            onClick={setTab.bind(this, 'attributes')}>Attributes</h3>
                        <h3 className={tab === 'relationships' ? 'active' : ''}
                            onClick={setTab.bind(this, 'relationships')}>Relationships</h3>
                    </header>
                    <br />
                    <section>
                        {tab === 'attributes' && (
                            <Attributes
                                entityTypeId={id}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                attributes={data.entityType.attributes} />
                        ) || tab === 'relationships' && (
                            <div>relationships UI...</div>
                        )}
                    </section>
                </>
            )}
        </>
    );
}

export default EntityTypeDetails;