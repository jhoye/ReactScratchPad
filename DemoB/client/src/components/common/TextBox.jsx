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
                <input
                    value={props.value}
                    disabled={props.isDisabled}
                    onChange={changed} />
            </label>
        </div>
    );
}

// PropTypes
TextBox.defaultProps = {
    isDisabled: false
}
TextBox.propTypes = {
    labelText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired
}

export default TextBox;