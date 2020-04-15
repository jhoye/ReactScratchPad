import React from 'react'
import PropTypes from 'prop-types';

function LinkButton(props) {
    return (
        <span className="link-button" onClick={props.onClick}>{props.text}</span>
    );
}

// PropTypes
LinkButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default LinkButton;