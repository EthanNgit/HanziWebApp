import React, { useContext, useEffect } from 'react';
import '../styles/HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);


  useEffect(() => {
    if (authState.status != false) {
      navigate("/dashboard");
    }
  });

  return (
    <div className='home-page-contents'>
      <div className='home-page-row-one'>
        <h1 className='home-page-call-to-action home-page-call-to-action-one'>Start Your Hanzi Adventure Today.</h1>
        <h1 className='home-page-call-to-action'>Hanzi Made Easy.</h1>
        <Link to="/register"><button className='home-page-sign-up-btn'>Sign up free</button></Link>
        
      </div>
      <div className='home-page-row-two'>
        <ul className='home-page-hangul-list'>
          <li className='home-page-hangul-list-item-one'><span>学</span></li>
          <li className='home-page-hangul-list-item-two'><span>习</span></li>
          <li className='home-page-hangul-list-item-three'><span>汉</span></li>
          <li className='home-page-hangul-list-item-four'><span>字</span></li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage