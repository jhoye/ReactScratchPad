import React from 'react';
import PropTypes from 'prop-types';
import { useMetaDataContext } from '../../contexts/MetaData';
import { Check as CheckIcon, Edit as EditIcon } from '../common/Icons';

function AttributeTable(props) {

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

    const tableRow = (attribute) => {
        return (
            <tr key={attribute.id}
                className={attribute.id === props.highlightAttributeId ? 'highlight' : ''}>
                <td>{attribute.name}</td>
                <td>{valueType(attribute.valueTypeId)}</td>
                <td>{!attribute.isNullable && <CheckIcon />}</td>
                <td>{attribute.isUnique && <CheckIcon />}</td>
                <td>{editButton(attribute)}</td>
            </tr>
        );
    }

    return (
        <div>
            {props.attributes.length === 0 ? (
                <em>none</em>
            ) : (
                <table className="attributes">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Value Type</td>
                            <td>Is Required</td>
                            <td>Is Unique</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.attributes.map(tableRow)}
                    </tbody>
                </table>
            )}
        </div>
    );
}

// PropTypes
AttributeTable.defaultProps = {
    highlightAttributeId: null
}
AttributeTable.propTypes = {
    attributes: PropTypes.array.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    highlightAttributeId: PropTypes.string
}

export default AttributeTable;