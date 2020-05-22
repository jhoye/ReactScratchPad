import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AttributeList from './AttributeList';
import AttributeTable from './AttributeTable';
import AttributeForm from './AttributeForm';
import LinkButton from '../common/LinkButton';
import { Add as AddIcon } from '../common/Icons';

function Attributes(props) {

    const [attributeToEdit, setAttributeToEdit] = useState(null);

    const clearEditMode = () => {
        props.setEditMode('');
        setAttributeToEdit(null);
    }

    const onEditAttribute = (attribute) => {
        setAttributeToEdit(attribute);
        props.setEditMode('edit attribute');
    }

    const onError = (error) => {
        console.error(error);
    }

    return (
        <>
            <AttributeTable
                attributes={props.attributes}
                isDisabled={props.editMode !== ''}
                onEdit={onEditAttribute}
                highlightAttributeId={attributeToEdit !== null ? attributeToEdit.id : null} />
            <br />
            {props.editMode === 'edit attribute' && (
                <AttributeForm
                    entityTypeId={props.entityTypeId}
                    attribute={attributeToEdit}
                    onSaved={clearEditMode}
                    onCancel={clearEditMode}
                    onDeleted={clearEditMode}
                    onError={onError} />
            )}
            {props.editMode === 'add attribute' && (
                <AttributeForm
                    entityTypeId={props.entityTypeId}
                    onSaved={clearEditMode}
                    onCancel={clearEditMode}
                    onError={onError} />
            )}
            {props.editMode !== 'add attribute' && props.editMode !== 'edit attribute' && (
                <div>
                    <AddIcon />
                    &nbsp;
                    <LinkButton
                        text={'new attribute'}
                        onClick={props.setEditMode.bind(this, 'add attribute')}
                        isDisabled={props.editMode !== ''} />
                </div>
            )}
        </>
    );
}

// PropTypes
Attributes.propTypes = {
    entityTypeId: PropTypes.string.isRequired,
    editMode: PropTypes.string.isRequired,
    setEditMode: PropTypes.func.isRequired,
    attributes: PropTypes.array.isRequired
}

export default Attributes;