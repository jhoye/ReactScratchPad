import React from 'react'
import PropTypes from 'prop-types';

function CheckBox(props) {

    const changed = (event) => {
        props.onChange(event.target.checked);
    }

    return (
        <div>
            <label>
                <input type="checkbox" onChange={changed} checked={props.isChecked} />
                <span>{props.labelText}</span>
            </label>
        </div>
    );
}

// PropTypes
CheckBox.propTypes = {
    labelText: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

export default CheckBox;