import React from 'react'
import PropTypes from 'prop-types';

function TextBox(props) {

    const changed = (event) => {
        props.onChange(event.target.value);
    }

    return (
        <div>
            <label>
                <div>{props.labelText}</div>
                <input value={props.value} onChange={changed} />
            </label>
        </div>
    );
}

// PropTypes
TextBox.propTypes = {
    labelText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TextBox;