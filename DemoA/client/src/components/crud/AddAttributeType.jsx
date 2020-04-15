import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useEntityTypeAttributeDataContext } from '../../contexts/eav/meta/EntityTypeAttributeData';
import TextBox from '../common/TextBox';
import CheckBox from '../common/CheckBox';
import LinkButton from '../common/LinkButton';
import ValueTypeSelector from '../crud/ValueTypeSelector';

function AddAttributeType(props) {

    const data = useEntityTypeAttributeDataContext();

    const [name, setName] = useState("");
    const [valueTypeId, setValueTypeId] = useState("");
    const [isRequired, setIsRequired] = useState(false);
    const [isUnique, setIsUnique] = useState(false);

    const nameChanged = (value) => {
        setName(value);
    }

    const valueTypeChanged = (id) => {
        setValueTypeId(id);
    }

    const isRequiredChanged = (checked) => {
        setIsRequired(checked);
    }

    const isUniqueChanged = (checked) => {
        setIsUnique(checked);
    }

    const saveClicked = () => {
        console.info('saveClicked...');
        data.add(
            {
                name: name,
                isRequired: isRequired,
                isUnique: isUnique,
                valueTypeId: valueTypeId,
                entityTypeId: props.entityTypeId
            },
            props.onSaved,
            () => {
                console.error(data.errors);
            }
        )
    }

    return (
        <fieldset>
            <legend>
                <span>New Attribute</span>
            </legend>
            <br />
            <TextBox
                labelText="Name"
                value={name}
                onChange={nameChanged} />
            <br />
            <ValueTypeSelector
                onChange={valueTypeChanged}
                selectedValue={valueTypeId} />
                <br />
            <CheckBox
                labelText="Is Required"
                isChecked={isRequired}
                onChange={isRequiredChanged} />
            <br />
            <CheckBox
                labelText="Is Unique"
                isChecked={isUnique}
                onChange={isUniqueChanged} />
            <br />
            <div>
                <button onClick={saveClicked}>Save</button>
                <span>&nbsp;</span>
                <LinkButton text={'cancel'} onClick={props.onCancel} />
            </div>
        </fieldset>
    );
}

// PropTypes
AddAttributeType.propTypes = {
    entityTypeId: PropTypes.string.isRequired,
    onSaved: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

export default AddAttributeType;