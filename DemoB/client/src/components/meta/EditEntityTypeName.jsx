import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Edit as EditIcon } from '../common/Icons';
import LinkButton from '../common/LinkButton';

function EditEntityTypeName(props) {

    const [name, setName] = useState('');

    const [editMode, setEditMode] = useState('');

    const nameChanged = (event) => {
        setName(event.target.value);
    }

    const editClicked = () => {
        props.onEdit();
        setEditMode('editing');
    }

    const saveClicked = () => {
        setEditMode('saving');
        props.onSave(name);
    }

    const cancelClicked = () => {
        props.onCancel();
        setEditMode('');
    }

    useEffect(() => {
        setName(props.name);
        setEditMode('');
    }, [ props.name ]);

    return props.isDisabled && (
        <h2>{props.name}
            &nbsp;
            <small className="disabled">
                <EditIcon />
            </small>
        </h2>
    ) || editMode === '' && (
        <h2>{props.name}
            &nbsp;
            <small
                title="edit"
                className="clickable"
                onClick={editClicked}>
                <EditIcon />
            </small>
        </h2>
    ) || editMode === 'editing' && (
        <h2>
            <input value={name} onChange={nameChanged} placeholder="entity type name" />
            &nbsp;
            <button onClick={saveClicked}>Save</button>
            &nbsp;
            <small>
                <LinkButton
                    text={'cancel'}
                    onClick={cancelClicked} />
            </small>
        </h2>
    ) || editMode === 'saving' && (
        <h2>{name} <small>saving...</small></h2>
    )
}

// PropTypes
EditEntityTypeName.propTypes = {
    name: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}

export default EditEntityTypeName;