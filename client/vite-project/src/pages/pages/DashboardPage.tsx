import React, { useContext, useEffect } from 'react';
import '../styles/DashboardPage.css';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_CALCULATE_LEVEL_URL } from '../../global/Ts/Strings';

function DashboardPage() {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    return <div>DashboardPage</div>;
}

export default DashboardPage;
