import React from 'react';
import '../styles/RegisterPage.css';
import { Validator } from '../../global/Ts/Validator';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import axios from 'axios';
import {
    API_REGISTER_URL,
    EN_UC_I_AGREE_END,
    EN_UC_I_AGREE_START,
    EN_UC_LOGIN_HEADER,
    EN_UC_REGISTER_HEADER,
    EN_UC_YES_ACCOUNT,
} from '../../global/Ts/Strings';

const RegisterPage = () => {
    return (
        <div className="register-page-contents">
            <div className="register-page-wrapper">
                <form action="" noValidate onSubmit={handleSubmit}>
                    <h1 className="register-page-h1">
                        {EN_UC_REGISTER_HEADER}
                    </h1>
                    <div className="register-page-input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <FontAwesomeIcon
                            icon={faUser}
                            className="register-page-icon"
                        />
                    </div>
                    <div className="register-page-input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <FontAwesomeIcon
                            icon={faLock}
                            className="register-page-icon"
                        />
                    </div>

                    <div className="register-page-terms-of-service">
                        <label>
                            <input type="checkbox" name="acceptTOS" />
                            {EN_UC_I_AGREE_START}{' '}
                            <Link to="/tos" className="register-page-link">
                                {EN_UC_I_AGREE_END}
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="register-page-register-btn">
                        {EN_UC_REGISTER_HEADER}
                    </button>

                    <div className="register-page-login-link">
                        <p>
                            {EN_UC_YES_ACCOUNT}{' '}
                            <Link
                                to="/login"
                                className="register-page-link register-page-login-link">
                                {EN_UC_LOGIN_HEADER}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

function handleSubmit(e: any) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const acceptTOS = e.target.acceptTOS.checked;

    const userVals = {
        email: email,
        password: password,
    };

    const validator = new Validator();

    if (
        validator.validateEmail(email) &&
        validator.validatePassword(password) &&
        acceptTOS
    ) {
        axios.post(API_REGISTER_URL, userVals).then((response) => {
            console.log(response);
        });
    }
}

export default RegisterPage;
