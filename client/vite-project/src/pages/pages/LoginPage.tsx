import React, { useContext, useState } from 'react';
import '../styles/LoginPage.css';
import '../../global/Ts/Validator';
import { Link, NavigateFunction } from 'react-router-dom';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { Validator } from '../../global/Ts/Validator';
import {
    API_LOGIN_URL,
    API_PASSWORD_RESET_SEND_URL,
    API_PASSWORD_RESET_URL,
    API_PASSWORD_RESET_VERIFY_URL,
    EN_UC_CONFIRM_HEADER,
    EN_UC_FORGOT_PASSWORD,
    EN_UC_KNOW_PASSWORD,
    EN_UC_LOGIN_HEADER,
    EN_UC_NO_ACCOUNT,
    EN_UC_REGISTER_HEADER,
    EN_UC_REMEMBER_ME,
    EN_UC_RESEND_CODE,
    EN_UC_RESET_PASSWORD,
    EN_UC_SEND_CODE,
    NAV_DASHBOARD_URL,
} from '../../global/Ts/Strings';

function LoginPage() {
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);
    const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
    const [showSentCodeFirstTime, setShowSentCodeFirstTime] = useState<boolean>(true);
    const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);
    const [isCodeButtonDisabled, setIsCodeButtonDisabled] = useState<boolean>(false);
    const [validEmail, setValidEmail] = useState<string>();
    const [validOTP, setValidOTP] = useState<string>();
    const [passwordForReset, setPasswordForReset] = useState('');
    const [passwordForResetVerify, setPasswordForResetVerify] = useState('');
    const [mainPassword, setMainPassword] = useState('');
    const [mainEmail, setMainEmail] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const email = mainEmail;
        const password = mainPassword;
        const rememberMe = e.target.rememberMe.checked;

        const userVals = {
            email: email,
            password: password,
        };

        axios.post(API_LOGIN_URL, userVals).then((response) => {
            setValidEmail(email);
            setValidOTP('');
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem('accessToken', response.data.accessToken);
                setAuthState({
                    email: response.data.email,
                    id: response.data.id,
                    status: true,
                });
                navigate(NAV_DASHBOARD_URL);
            }
        });
    };

    const handleCode = (e: any) => {
        e.preventDefault();

        const email = mainEmail;

        const validator = new Validator();

        if (isCodeButtonDisabled || !validator.validateEmail(email)) {
            return;
        }

        setIsCodeButtonDisabled(true);

        setValidEmail(email);
        setValidOTP('');

        axios.post(API_PASSWORD_RESET_SEND_URL, { email }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
                setIsCodeButtonDisabled(false);
                setShowPasswordReset(false);
            } else {
                console.log('send code');
                setShowSentCodeFirstTime(false);
                setShowPasswordReset(false);
                setTimeout(() => {
                    setIsCodeButtonDisabled(false);
                }, 3000);
            }
        });
    };

    const handleVerify = (e: any) => {
        e.preventDefault();

        const email = e.target.emailForReset.value;
        const otp = e.target.otp.value;

        const validator = new Validator();

        if (!validator.validateEmail(email)) {
            return;
        }

        axios.post(API_PASSWORD_RESET_VERIFY_URL, { email, otp }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
                console.log('code is not good');
                setShowPasswordReset(false);
                setValidEmail(email);
                setValidOTP('');
            } else {
                console.log('code is correct');
                setShowPasswordReset(true);
                setValidEmail(email);
                setValidOTP(otp);
            }
        });
    };

    const handleReset = (e: any) => {
        e.preventDefault();

        const validator = new Validator();

        if (!(validEmail && validOTP)) {
            console.log('Invalid information');
            // Give incorrect information error
            return;
        }

        if (!validator.validatePassword(passwordForReset) || !validator.validatePassword(passwordForResetVerify)) {
            console.log('Password not sufficient');
            // Give incorrect password format error
            return;
        }

        if (passwordForReset !== passwordForResetVerify) {
            console.log('Passwords do not match');
            // Give incorrect password does not match error
            return;
        }

        axios
            .post(API_PASSWORD_RESET_URL, {
                email: validEmail,
                otp: validOTP,
                newPassword: passwordForReset,
            })
            .then((response) => {
                if (response.data.error) {
                    console.log('Password change failure');
                } else {
                    console.log('Password change success');
                    setShowPasswordReset(false);
                    setShowSentCodeFirstTime(false);
                    setShowResetPassword(false);
                }
            })
            .catch((error) => {
                console.error('Error in password change:', error);
            });
    };

    const handleEmailChange = (e: any) => {
        setMainEmail(e.target.value);
    };

    const handleMainPasswordChange = (e: any) => {
        setMainPassword(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPasswordForReset(e.target.value);
    };

    const handlePasswordVerifyChange = (e: any) => {
        setPasswordForResetVerify(e.target.value);
    };

    return (
        <div className="login-page-contents">
            {!showResetPassword ? (
                <div className="login-page-wrapper">
                    <form action="" noValidate onSubmit={handleSubmit}>
                        <h1 className="login-page-h1">{EN_UC_LOGIN_HEADER}</h1>
                        <div className="login-page-input-box">
                            <input type="email" name="email" placeholder="Email" value={mainEmail} onChange={handleEmailChange} required />
                            <FontAwesomeIcon icon={faUser} className="login-page-icon" />
                        </div>
                        <div className="login-page-input-box">
                            <input type="password" name="password" placeholder="Password" value={mainPassword} onChange={handleMainPasswordChange} required />
                            <FontAwesomeIcon icon={faLock} className="login-page-icon" />
                        </div>
                        <div className="login-page-sub-buttons">
                            <div className="login-page-remember-me">
                                <label>
                                    <input type="checkbox" name="rememberMe" /> {EN_UC_REMEMBER_ME}
                                </label>
                            </div>
                            <div className="login-page-forgot-password">
                                <label className="login-page-reset-link" onClick={() => setShowResetPassword((showResetPassword) => !showResetPassword)}>
                                    {EN_UC_FORGOT_PASSWORD}
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="login-page-login-btn">
                            {EN_UC_LOGIN_HEADER}
                        </button>
                        <div className="login-page-login-link">
                            <p>
                                {EN_UC_NO_ACCOUNT}{' '}
                                <Link to="/register" className="login-page-link login-page-login-link">
                                    {EN_UC_REGISTER_HEADER}
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="login-page-wrapper">
                    {showSentCodeFirstTime ? (
                        <>
                            <form action="" noValidate onSubmit={handleCode}>
                                <h1 className="login-page-h1">{EN_UC_RESET_PASSWORD}</h1>
                                <div className="login-page-input-box">
                                    <input type="email" name="emailForReset" placeholder="Email" defaultValue={validEmail ? String(validEmail) : ''} required />
                                    <FontAwesomeIcon icon={faUser} className="login-page-icon" />
                                </div>
                                <button type="submit" className="login-page-login-btn">
                                    {EN_UC_SEND_CODE}
                                </button>
                                <div className="login-page-login-link">
                                    <p>
                                        {EN_UC_KNOW_PASSWORD}{' '}
                                        <span className="login-page-link login-page-login-link" onClick={() => setShowResetPassword((showResetPassword) => !showResetPassword)}>
                                            {EN_UC_LOGIN_HEADER}
                                        </span>
                                    </p>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <form action="" noValidate onSubmit={handleVerify}>
                                <h1 className="login-page-h1">{EN_UC_RESET_PASSWORD}</h1>
                                {!showPasswordReset ? (
                                    <>
                                        <div className="login-page-input-box">
                                            <input type="email" name="emailForReset" placeholder="Email" defaultValue={validEmail ? String(validEmail) : ''} required />
                                            <FontAwesomeIcon icon={faUser} className="login-page-icon" />
                                        </div>
                                        <div className="login-page-input-box">
                                            <input type="text" name="otp" placeholder="Verifaction code" required />
                                            <FontAwesomeIcon icon={faLock} className="login-page-icon" />
                                        </div>
                                        <button type="submit" className="login-page-login-btn">
                                            {EN_UC_CONFIRM_HEADER}
                                        </button>
                                        <div className="login-page-login-link">
                                            <p>
                                                <span className="login-page-link login-page-login-link" onClick={handleCode}>
                                                    {EN_UC_RESEND_CODE}
                                                </span>
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="login-page-input-box">
                                            <input type="password" name="passwordForReset" placeholder="Password" value={passwordForReset} onChange={handlePasswordChange} required />
                                            <FontAwesomeIcon icon={faLock} className="login-page-icon" />
                                        </div>
                                        <div className="login-page-input-box">
                                            <input
                                                type="password"
                                                name="passwordForResetVerify"
                                                placeholder="Confirm password"
                                                value={passwordForResetVerify}
                                                onChange={handlePasswordVerifyChange}
                                                required
                                            />
                                            <FontAwesomeIcon icon={faLock} className="login-page-icon" />
                                        </div>
                                        <button type="submit" className="login-page-login-btn" onClick={handleReset}>
                                            {EN_UC_RESET_PASSWORD}
                                        </button>
                                    </>
                                )}
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default LoginPage;
