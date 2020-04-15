import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useValueTypeDataContext } from '../../contexts/eav/meta/ValueTypeData';
import DropDownSelector from '../common/DropDownSelector';

function ValueTypeSelector(props) {

    const data = useValueTypeDataContext();

    useEffect(() => {
        if (data.valueTypes.length === 0) {
            data.getAll();
        }
    }, []);

    return (
        <DropDownSelector
            labelText="Value Type"
            data={data.valueTypes}
            dataValueKey="id"
            dataTextKey="name"
            onChange={props.onChange}
            selectedValue={props.selectedValue} />
    );
}

// PropTypes
ValueTypeSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    selectedValue: PropTypes.string
}

export default ValueTypeSelector;