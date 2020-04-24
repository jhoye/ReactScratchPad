import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BreadcrumbNav(params) {

    return (
        <nav>
            {params.data.map((breadcrumb, index) => {
                return (
                    <span key={index}>
                        {index > 0 && (
                            <span>&nbsp;&raquo;&nbsp;</span>
                        )}
                        {typeof breadcrumb[params.dataPathKey] === 'string' ? (
                            <Link to={breadcrumb[params.dataPathKey]}>{breadcrumb[params.dataTextKey]}</Link>
                        ) : (
                            <span>{breadcrumb[params.dataTextKey]}</span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

// PropTypes
BreadcrumbNav.propTypes = {
    data: PropTypes.array.isRequired,
    dataPathKey: PropTypes.string.isRequired,
    dataTextKey: PropTypes.string.isRequired
}

export default BreadcrumbNav;