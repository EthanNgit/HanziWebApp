import React, { useContext, useEffect, useState } from 'react';
import '../../styles/NavBar/NavBarMain.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../helpers/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { useOutsideClickAlert } from '../../../hooks/outsideClickAlert';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import axios from 'axios';
import { API_CALCULATE_LEVEL_URL } from '../../../global/Ts/Strings';


function NavBarMain() {
    const { authState, setAuthState } = useContext(AuthContext);
    const { visible: profileVisible, setVisible: setProfileVisible, ref: profileRef } = useOutsideClickAlert(false);
    const { visible: mobileVisible, setVisible: setMobileVisible, ref: mobileRef } = useOutsideClickAlert(false);
    const [userMastery, setUserMastery] = useState<string>("Novice");

    const logout = () => {
        localStorage.removeItem('accessToken');
        setAuthState({email: "", id: 0, status: false});

        if (profileVisible) {
            setProfileVisible(profileVisible => !profileVisible);
        }

        if (mobileVisible) {
            setMobileVisible(mobileVisible => !mobileVisible);
        }
    }

    useEffect(() => {
        axios.post(API_CALCULATE_LEVEL_URL, { userId: authState.id }).then((response): void | undefined => {
            if (response.data.error) {
              //alert(response.data.error);
            } else {
                setUserMastery(response.data.userMastery || "Novice");
            }
          });
    }, [authState.id]);

    return (
        <div>
<nav className='nav-bar'>
            { !authState.status ? (
                <>
                    <Link to="/" className='link'><h1 className='nav-logo'>Hanzi Hub</h1></Link>
                </>
            ) : (
                <>
                    <Link to="/dashboard" className='link'><h1 className='nav-logo'>Hanzi Hub</h1></Link>
                </>
            )}
            <ul className='nav-links'>
                { !authState.status ? (
                    <>
                        <Link to="/register"><li className='nav-link-item'><button className='nav-btn'>Sign up</button></li></Link>
                        <Link to="/login"><li className='nav-link-item'>Login</li></Link>
                    </>
                ) : (
                    <div className='nav-logged-in-menu'>   
                        <Link to="/learn"><li className='nav-link-item'>Learn</li></Link>
                        <Link to="/practice"><li className='nav-link-item'>Practice</li></Link>

                        <li className='nav-link-item' onClick={() => setProfileVisible(profileVisible => !profileVisible)}><span className="fa-layers fa-fw">
                            <FontAwesomeIcon icon={faCircle} className='nav-profile-background'/>
                            <FontAwesomeIcon icon={faUser} className='nav-profile-pic'/>
                            <p className='nav-profile-text-name'> {authState.email.length > 8 ?
                                `${authState.email.substring(0, 8)}...` : authState.email
                            }</p>
                            <p className='nav-profile-text-level'>{userMastery || "Novice"}</p>
                        </span></li>
                        <li className='nav-link-item'> 
                            <FontAwesomeIcon icon={faBell} className='nav-icon'/>
                            <Link to="/search"><FontAwesomeIcon icon={faMagnifyingGlass} className='nav-icon nav-link-item'/></Link>
                            
                        </li>
                    </div>
                )}
            </ul>
            <button className='mobile-menu-button' onClick={() => setMobileVisible(mobileVisible => !mobileVisible)}><FontAwesomeIcon icon={faBars} /></button>
            
            
            {
            profileVisible && (
            <div className="nav-profile-sub-menu-wrap" ref={profileRef}>
                <div className="nav-profile-sub-menu">
                    <ul>
                        <Link to="/profile" className='link'><li className='nav-profile-sub-menu-link-item'>
                            <FontAwesomeIcon icon={faUser} className='nav-profile-sub-menu-icon'/>
                            Profile
                            </li>
                        </Link>
                        <Link to="/settings" className='link'><li className='nav-profile-sub-menu-link-item'>
                            <FontAwesomeIcon icon={faGear} className='nav-profile-sub-menu-icon'/>
                            Settings
                            </li>
                        </Link>
                        <Link to="/" className='link' onClick={logout}><li className='nav-profile-sub-menu-link-item'>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className='nav-profile-sub-menu-icon'/>
                            Logout
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>)
            }
            
        </nav>
        {
        mobileVisible && (
            <div className='mobile-nav-menu' ref={mobileRef}>
                <div className='mobile-nav-header-div'>
                    { !authState.status ? (
                        <>
                            <Link to="/" className='link mobile-link'><h1 className='nav-logo nav-mobile-logo'>Hanzi Hub</h1></Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className='link mobile-link'><h1 className='nav-logo nav-mobile-logo'>Hanzi Hub</h1></Link>
                        </>
                    )}
                </div>
                <FontAwesomeIcon icon={faBell} className='nav-icon nav-mobile-icon'/>

                <ul className='nav-mobile-ul'>
                <Link to="/learn" className='nav-mobile-link' onClick={() => setMobileVisible(mobileVisible => !mobileVisible)}><li>Learn</li></Link>
                <Link to="/practice" className='nav-mobile-link' onClick={() => setMobileVisible(mobileVisible => !mobileVisible)}><li>Practice</li></Link>
                <Link to="/search" className='nav-mobile-link' onClick={() => setMobileVisible(mobileVisible => !mobileVisible)}><li>Search</li></Link>
                <Link to="/profile" className='nav-mobile-link' onClick={() => setMobileVisible(mobileVisible => !mobileVisible)}><li>Profile</li></Link>
                <Link to="/settings" className='nav-mobile-link' onClick={() => setMobileVisible(mobileVisible => !mobileVisible)}><li>Settings</li></Link>
                <Link to="/" className='nav-mobile-link' onClick={logout}><li>Logout</li></Link>
                </ul>
            </div>)
        }

    
    </div>
        
    );
}

export default NavBarMain;