import React from 'react';
import { Link } from 'react-router-dom';
import '../page-404/page-not-found.css';
import { EN_UC_PNC_DESCRIPTION, EN_UC_PNC_HEADER, EN_UC_PNC_RETURN } from '../../../global/Strings';

function PageNotFound() {
    return (
        <div className="page-not-found-content">
            <h1 className="page-not-found-header">{EN_UC_PNC_HEADER}</h1>
            <p className="page-not-found-description">{EN_UC_PNC_DESCRIPTION}</p>
            <Link to="/" className="page-not-found-link">
                {EN_UC_PNC_RETURN}
            </Link>
        </div>
    );
}

export default PageNotFound;
