import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UserListItem(props) {

    const [isDeleting, setIsDeleting] = useState(false);

    const deleteClick = () => {
        if (window.confirm('This will be deleted forever.')) {
            setIsDeleting(true);
            props.onDelete(props.id);
        }
    };

    return (
        <li>
            {isDeleting ? (
                <span>deleting...</span>
            ) : (
                    <React.Fragment>
                        <Link to={`/old-crud/view/${props.id}`}>{props.name}</Link>
                        &nbsp;
                    <button onClick={deleteClick}>X</button>
                    </React.Fragment>
                )}
        </li>
    );
}

// PropTypes
UserListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default UserListItem;