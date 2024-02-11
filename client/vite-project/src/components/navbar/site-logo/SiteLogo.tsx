import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../helpers/AuthContext';
import { EN_UC_WEBSITE_NAME, NAV_HOME_URL, NAV_LEARN_URL } from '../../../global/Strings';

function SiteLogo() {
    const { authState } = useContext(AuthContext);
    return (
        <>
            {!authState.status ? (
                <>
                    <Link to={NAV_HOME_URL} className="link">
                        <h1 className="nav-logo">{EN_UC_WEBSITE_NAME}</h1>
                    </Link>
                </>
            ) : (
                <>
                    <Link to={NAV_LEARN_URL} className="link">
                        <h1 className="nav-logo">{EN_UC_WEBSITE_NAME}</h1>
                    </Link>
                </>
            )}
        </>
    );
}

export default SiteLogo;
