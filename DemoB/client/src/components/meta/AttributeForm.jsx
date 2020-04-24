import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useMetaDataContext } from '../../contexts/MetaData';
import TextBox from '../common/TextBox';
import CheckBox from '../common/CheckBox';
import LinkButton from '../common/LinkButton';
import ValueTypeSelector from './ValueTypeSelector';

function AttributeForm(props) {

    const data = useMetaDataContext();

    const [name, setName] = useState("");

    const [valueTypeId, setValueTypeId] = useState("");

    const [isRequired, setIsRequired] = useState(false);

    const [isUnique, setIsUnique] = useState(false);

    const [isDisabled, setIsDisabled] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const nameChanged = (value) => {
        setName(value);
    }

    const valueTypeChanged = (id) => {
        setValueTypeId("" + id);
    }

    const isRequiredChanged = (checked) => {
        setIsRequired(checked);
    }

    const isUniqueChanged = (checked) => {
        setIsUnique(checked);
    }

    const saveClicked = () => {

        let attribute = {
            name: name,
            isNullable: !isRequired,
            isUnique: isUnique,
            valueTypeId: _.toNumber(valueTypeId),
            entityTypeId: props.entityTypeId
        };

        setIsDisabled(true);
        setIsSaving(true);

        props.attribute === null
            ? data.addAttribute(
                attribute,
                props.onSaved,
                props.onError
            ) : data.updateAttribute(
                { ...attribute, id: props.attribute.id },
                props.onSaved,
                props.onError
            );
    }

    const deleteClicked = () => {
        if (window.confirm('This attribute will be permanently deleted.'))
        {
            setIsDisabled(true);
            setIsDeleting(true);

            data.removeAttribute(props.attribute.id, props.onDeleted, props.onError)
        }
    }

    useEffect(() => {
        if (props.attribute !== null) {
            setName(props.attribute.name);
            setValueTypeId("" + props.attribute.valueTypeId);
            setIsRequired(!props.attribute.isNullable);
            setIsUnique(props.attribute.isUnique);
        }
    }, [ props.attribute ]);

    return (
        <fieldset>
            <legend>
                <span>{props.attribute === null ? 'New' : 'Edit' } Attribute</span>
            </legend>
            <br />
            <TextBox
                labelText="Name"
                value={name}
                onChange={nameChanged}
                isDisabled={isDisabled} />
            <br />
            <ValueTypeSelector
                onChange={valueTypeChanged}
                selectedValue={valueTypeId}
                isDisabled={isDisabled} />
                <br />
            <CheckBox
                labelText="Is Required"
                isChecked={isRequired}
                onChange={isRequiredChanged}
                isDisabled={isDisabled} />
            <br />
            <CheckBox
                labelText="Is Unique"
                isChecked={isUnique}
                onChange={isUniqueChanged}
                isDisabled={isDisabled} />
            <br />
            <div>
                <button
                    onClick={saveClicked}
                    disabled={isDisabled}>Save</button>
                <span>&nbsp;</span>
                {props.attribute !== null && (
                    <>
                        <button
                            onClick={deleteClicked}
                            disabled={isDisabled}>Delete</button>
                        <span>&nbsp;</span>
                    </>
                )}
                <LinkButton
                    text={'cancel'}
                    onClick={props.onCancel}
                    isDisabled={isDisabled} />
                {isSaving && (
                    <span>&nbsp;saving...</span>
                )}
                {isDeleting && (
                    <span>&nbsp;deleting...</span>
                )}
            </div>
        </fieldset>
    );
}

// PropTypes
AttributeForm.defaultProps = {
    attribute: null
}
AttributeForm.propTypes = {
    attribute: PropTypes.object,
    entityTypeId: PropTypes.string.isRequired,
    onSaved: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDeleted: PropTypes.func,
    onError: PropTypes.func.isRequired
}

export default AttributeForm;