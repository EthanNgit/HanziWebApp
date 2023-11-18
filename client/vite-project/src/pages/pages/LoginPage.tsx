import React, {useContext} from 'react'
import '../styles/LoginPage.css';
import { Link, NavigateFunction } from 'react-router-dom';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { AuthContext} from '../../helpers/AuthContext'
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  
    const email = e.target.email.value;
    const password = e.target.password.value;
    const rememberMe = e.target.rememberMe.checked;
  
    const userVals = {
      email: email,
      password: password
    }
  
    axios.post("http://localhost:3001/api/login", userVals).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          setAuthState({email: response.data.email, id: response.data.id, status: true});
          navigate("/dashboard");
        }
      });
  };

  return (
    <div className='login-page-contents'>
      <div className='login-page-wrapper'>
        <form action='' noValidate onSubmit={handleSubmit}>
          <h1 className='login-page-h1'>Login</h1>
          <div className="login-page-input-box">
            <input type='email' name='email' placeholder='Email' required/>
            <FontAwesomeIcon icon={faUser} className='login-page-icon'/>
          </div>
          <div className="login-page-input-box">
            <input type='password' name='password' placeholder='Password' required/>
            <FontAwesomeIcon icon={faLock} className='login-page-icon'/>
          </div>

          <div className='login-page-remember-me'>
            <label><input type='checkbox' name='rememberMe'/> Remember me?</label>
          </div>

          <button type='submit' className='login-page-login-btn'>Login</button>

          <div className='login-page-login-link'>
            <p>Dont have an account? <Link to='/register' className='login-page-link login-page-login-link'>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}



export default LoginPage