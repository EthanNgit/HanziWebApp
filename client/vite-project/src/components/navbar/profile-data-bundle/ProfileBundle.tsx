import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircle, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../helpers/AuthContext';
import { useOutsideClickAlert } from '../../../hooks/useOutsideClickAlert';
import { API_CALCULATE_LEVEL_URL, EN_UC_LOGOUT, EN_UC_SETTINGS } from '../../../global/Strings';

interface ProfileBundleProps {
    echoLogout?: () => void;
}

function ProfileBundle({ echoLogout }: ProfileBundleProps) {
    const { authState } = useContext(AuthContext);
    const { visible: profileVisible, setVisible: setProfileVisible, ref: profileRef } = useOutsideClickAlert(false);
    const [userMastery, setUserMastery] = useState<string>('Novice');

    useEffect(() => {
        axios.post(API_CALCULATE_LEVEL_URL, { userId: authState.id }).then((response): void | undefined => {
            if (!response.data.error) {
                setUserMastery(response.data.userMastery || 'Novice');
            }
        });
    }, [authState.id]);

    return (
        <>
            <li className="nav-link-item" onClick={() => setProfileVisible((profileVisible) => !profileVisible)}>
                <span className="fa-layers fa-fw">
                    <FontAwesomeIcon icon={faCircle} className="nav-profile-background" />
                    <FontAwesomeIcon icon={faUser} className="nav-profile-pic" />
                    <p className="nav-profile-text-name"> {authState.email.length > 8 ? `${authState.email.substring(0, 8)}...` : authState.email}</p>
                    <p className="nav-profile-text-level">{userMastery || 'Novice'}</p>
                </span>
            </li>
            {profileVisible && (
                <div className="nav-profile-sub-menu-wrap" ref={profileRef}>
                    <div className="nav-profile-sub-menu">
                        <ul>
                            <Link to="/settings" className="link">
                                <li className="nav-profile-sub-menu-link-item">
                                    <FontAwesomeIcon icon={faGear} className="nav-profile-sub-menu-icon" />
                                    {EN_UC_SETTINGS}
                                </li>
                            </Link>
                            <Link to="/" className="link" onClick={echoLogout}>
                                <li className="nav-profile-sub-menu-link-item">
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="nav-profile-sub-menu-icon" />
                                    {EN_UC_LOGOUT}
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileBundle;
