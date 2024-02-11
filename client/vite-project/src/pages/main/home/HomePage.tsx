import React, { useContext, useEffect } from 'react';
import './home-page.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../helpers/AuthContext';
import { EN_UC_INTRO_CALL_TO_ACTION_1, EN_UC_INTRO_CALL_TO_ACTION_2, EN_UC_INTRO_SIGN_UP, NAV_LEARN_URL } from '../../../global/Strings';

function HomePage() {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (authState.status != false) {
            navigate(NAV_LEARN_URL);
        }
    });

    return (
        <div className="home-page-contents">
            <div className="home-page-row-one">
                <h1 className="home-page-call-to-action home-page-call-to-action-one">{EN_UC_INTRO_CALL_TO_ACTION_1}</h1>
                <h1 className="home-page-call-to-action">{EN_UC_INTRO_CALL_TO_ACTION_2}</h1>
                <Link to="/register">
                    <button className="home-page-sign-up-btn">{EN_UC_INTRO_SIGN_UP}</button>
                </Link>
            </div>
            <div className="home-page-row-two">
                <ul className="home-page-hangul-list">
                    <li className="home-page-hangul-list-item-one">
                        <span>学</span>
                    </li>
                    <li className="home-page-hangul-list-item-two">
                        <span>习</span>
                    </li>
                    <li className="home-page-hangul-list-item-three">
                        <span>汉</span>
                    </li>
                    <li className="home-page-hangul-list-item-four">
                        <span>字</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HomePage;
