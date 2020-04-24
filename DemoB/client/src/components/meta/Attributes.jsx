import React from 'react';
import PropTypes from 'prop-types';
import { useMetaDataContext } from '../../contexts/MetaData';
import { Edit as EditIcon } from '../../components/common/Icons';

function Attributes(props) {

    const data = useMetaDataContext();

    const valueType = (id) => {
        return data.valueTypes === null ? (
            <span>-</span>
        ) : (
            <span>{data.valueTypes.find(valueType => valueType.id === id).name}</span>
        );
    }

    const editButton = (attribute) => {
        return props.isDisabled ? (
            <span className={'disabled'}>
                <EditIcon />
            </span>
        ) : (
            <span className={'clickable'}
                title="edit"
                onClick={props.onEdit.bind(this, attribute)}>
                <EditIcon />
            </span>
        );
    }

    const listItem = (attribute) => {
        return (
            <li key={attribute.id}>
                <span className={attribute.id === props.highlightAttributeId ? 'highlight' : ''}>
                    <span>{attribute.name}</span>
                    &nbsp;
                    <span>(
                        {valueType(attribute.valueTypeId)}
                        {!attribute.isNullable && <span>, required</span>}
                        {attribute.isUnique && <span>, unique</span>}
                    )</span>
                    &nbsp;
                    {editButton(attribute)}
                </span>
            </li>
        );
    }

    return (
        <>
            <h3>Attributes</h3>
            <div>
            {props.attributes.length === 0 ? (
                <em>none</em>
            ) : (
                <ul>{props.attributes.map(listItem)}</ul>
            )}
            </div>
        </>
    );
}

// PropTypes
Attributes.defaultProps = {
    highlightAttributeId: null
}
Attributes.propTypes = {
    attributes: PropTypes.array.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    highlightAttributeId: PropTypes.string
}

export default Attributes;