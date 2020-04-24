import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMetaDataContext } from '../../contexts/MetaData';
import EditEntityTypeName from '../../components/meta/EditEntityTypeName';
import Attributes from '../../components/meta/Attributes';
import AttributeForm from '../../components/meta/AttributeForm';
import BreadcrumbNav from '../../components/common/BreadcrumbNav';
import LinkButton from '../../components/common/LinkButton';
import { Add as AddIcon } from '../../components/common/Icons';


function EntityTypeDetails({ match }) {

    const id = match.params.id;

    const data = useMetaDataContext();

    const [editMode, setEditMode] = useState('');

    const [wasDeleted, setWasDeleted] = useState(false);

    const [attributeToEdit, setAttributeToEdit] = useState(null);

    const clearEditMode = () => {
        setEditMode('');
        setAttributeToEdit(null);
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

    const onEditAttribute = (attribute) => {
        setAttributeToEdit(attribute);
        setEditMode('edit attribute');
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
                    <Attributes
                        attributes={data.entityType.attributes}
                        isDisabled={editMode !== ''}
                        onEdit={onEditAttribute}
                        highlightAttributeId={attributeToEdit !== null ? attributeToEdit.id : null} />
                    <br />
                    {editMode === 'edit attribute' && (
                        <AttributeForm
                            entityTypeId={id}
                            attribute={attributeToEdit}
                            onSaved={clearEditMode}
                            onCancel={clearEditMode}
                            onDeleted={clearEditMode}
                            onError={onError} />
                    )}
                    {editMode === 'add attribute' && (
                        <AttributeForm
                            entityTypeId={id}
                            onSaved={clearEditMode}
                            onCancel={clearEditMode}
                            onError={onError} />
                    )}
                    {editMode !== 'add attribute' && editMode !== 'edit attribute' && (
                        <div>
                            <AddIcon />
                            &nbsp;
                            <LinkButton
                                text={'new attribute'}
                                onClick={setEditMode.bind(this, 'add attribute')}
                                isDisabled={editMode !== ''} />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default EntityTypeDetails;