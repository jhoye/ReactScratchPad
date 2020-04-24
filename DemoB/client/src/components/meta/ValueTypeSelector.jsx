import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMetaDataContext } from '../../contexts/MetaData';
import DropDownSelector from '../common/DropDownSelector';

function ValueTypeSelector(props) {

    const data = useMetaDataContext();

    useEffect(() => {
        if (props.selectedValue === "" &&
            data.valueTypes !== null &&
            data.valueTypes.length > 0
        ) {
            props.onChange('' + data.valueTypes[0].id);
        }
    }, [ data.valueTypes ]);

    return data.valueTypes === null ? (
        <span>loading...</span>
    ) : (
        <DropDownSelector
            labelText="Value Type"
            data={data.valueTypes}
            dataValueKey="id"
            dataTextKey="name"
            onChange={props.onChange}
            selectedValue={props.selectedValue}
            isDisabled={props.isDisabled} />
    );
}

// PropTypes
ValueTypeSelector.defaultProps = {
    isDisabled: false
}
ValueTypeSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    selectedValue: PropTypes.string,
    isDisabled: PropTypes.bool
}

export default ValueTypeSelector;