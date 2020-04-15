import React from 'react'
import PropTypes from 'prop-types';

function DropDownSelector(props) {

    const changed = (event) => {
        props.onChange(event.target.value);
    }

    return (
        <div>
            <label>
                <div>{props.labelText}</div>
                {props.data.length == 0 ? (
                    <span>loading...</span>
                ) : (
                    <select onChange={changed} value={props.selectedValue}>
                        {props.data.map(dataItem => {
                            return (
                                <option
                                    key={dataItem[props.dataValueKey]}
                                    value={dataItem[props.dataValueKey]}>
                                    {dataItem[props.dataTextKey]}
                                </option>
                            )
                        })}
                    </select>
                )}
            </label>
        </div>
    );
}

// PropTypes
DropDownSelector.propTypes = {
    labelText: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    dataValueKey: PropTypes.string.isRequired,
    dataTextKey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    selectedValue: PropTypes.string
}

export default DropDownSelector;