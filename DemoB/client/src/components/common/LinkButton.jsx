import React from 'react'
import PropTypes from 'prop-types';

function LinkButton(props) {
    return props.isDisabled ? (
        <span className="link-button-disabled">{props.text}</span>
    ) : (
        <span className="link-button" onClick={props.onClick}>{props.text}</span>
    );
}

// PropTypes
LinkButton.defaultProps = {
    isDisabled: false
}
LinkButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool
}

export default LinkButton;