import React, { useContext, useEffect } from 'react';
import '../styles/DashboardPage.css';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardPage() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);


  useEffect(() => {
    if (authState.status == false) {
      navigate("/");
    }
  });

  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage