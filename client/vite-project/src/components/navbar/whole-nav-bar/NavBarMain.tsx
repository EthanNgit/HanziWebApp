import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import SiteLogo from '../site-logo/SiteLogo';
import ProfileBundle from '../profile-data-bundle/ProfileBundle';
import { AuthContext } from '../../../helpers/AuthContext';
import { useOutsideClickAlert } from '../../../hooks/useOutsideClickAlert';
import { EN_UC_LEARN, EN_UC_LOGIN_HEADER, EN_UC_PRACTICE, EN_UC_SIGN_UP, EN_UC_WEBSITE_NAME, NAV_LEARN_URL, NAV_LOGIN_URL, NAV_PRACTICE_URL, NAV_REGISTER_URL } from '../../../global/Strings';
import '../whole-nav-bar/nav-bar-main.css';

function NavBarMain() {
    const { authState, setAuthState } = useContext(AuthContext);
    const { visible: mobileVisible, setVisible: setMobileVisible, ref: mobileRef } = useOutsideClickAlert(false);

    const logout = () => {
        // Clear session
        localStorage.removeItem('accessToken');
        setAuthState({ email: '', id: 0, status: false });

        // Make sure to close mobile menu
        if (mobileVisible) {
            setMobileVisible((mobileVisible) => !mobileVisible);
        }
    };

    return (
        <div>
            <nav className="nav-bar">
                <SiteLogo />
                <ul className="nav-links">
                    {!authState.status ? (
                        <>
                            <Link to={NAV_REGISTER_URL}>
                                <li className="nav-link-item">
                                    <button className="nav-btn">{EN_UC_SIGN_UP}</button>
                                </li>
                            </Link>
                            <Link to={NAV_LOGIN_URL}>
                                <li className="nav-link-item">{EN_UC_LOGIN_HEADER}</li>
                            </Link>
                        </>
                    ) : (
                        <div className="nav-logged-in-menu">
                            <Link to={NAV_LEARN_URL}>
                                <li className="nav-link-item">{EN_UC_LEARN}</li>
                            </Link>
                            <Link to={NAV_PRACTICE_URL}>
                                <li className="nav-link-item">{EN_UC_PRACTICE}</li>
                            </Link>

                            <ProfileBundle echoLogout={logout} />
                            <li className="nav-link-item">
                                <FontAwesomeIcon icon={faBell} className="nav-icon" />
                                <Link to="/search">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="nav-icon nav-link-item" />
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
                <button className="mobile-menu-button" onClick={() => setMobileVisible((mobileVisible) => !mobileVisible)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </nav>
            {mobileVisible && (
                <div className="mobile-nav-menu" ref={mobileRef}>
                    <div className="mobile-nav-header-div">
                        {!authState.status ? (
                            <>
                                <Link to="/" className="link mobile-link">
                                    <h1 className="nav-logo nav-mobile-logo">{EN_UC_WEBSITE_NAME}</h1>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="link mobile-link">
                                    <h1 className="nav-logo nav-mobile-logo">{EN_UC_WEBSITE_NAME}</h1>
                                </Link>
                            </>
                        )}
                    </div>
                    <FontAwesomeIcon icon={faBell} className="nav-icon nav-mobile-icon" />

                    <ul className="nav-mobile-ul">
                        <Link to="/learn" className="nav-mobile-link" onClick={() => setMobileVisible((mobileVisible) => !mobileVisible)}>
                            <li>Learn</li>
                        </Link>
                        <Link to="/practice" className="nav-mobile-link" onClick={() => setMobileVisible((mobileVisible) => !mobileVisible)}>
                            <li>Practice</li>
                        </Link>
                        <Link to="/search" className="nav-mobile-link" onClick={() => setMobileVisible((mobileVisible) => !mobileVisible)}>
                            <li>Search</li>
                        </Link>
                        <Link to="/profile" className="nav-mobile-link" onClick={() => setMobileVisible((mobileVisible) => !mobileVisible)}>
                            <li>Profile</li>
                        </Link>
                        <Link to="/settings" className="nav-mobile-link" onClick={() => setMobileVisible((mobileVisible) => !mobileVisible)}>
                            <li>Settings</li>
                        </Link>
                        <Link to="/" className="nav-mobile-link" onClick={logout}>
                            <li>Logout</li>
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NavBarMain;
