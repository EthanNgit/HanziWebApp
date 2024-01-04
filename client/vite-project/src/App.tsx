import './App.css'
import { useEffect } from "react";
import Home from "./pages/pages/HomePage";
import Register from "./pages/pages/RegisterPage";
import Login from "./pages/pages/LoginPage";
import Dashboard from "./pages/pages/DashboardPage";
import Search from "./pages/pages/SearchPage";
import NavBarMain from './components/components/NavBar/NavBarMain';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { AuthContext } from './helpers/AuthContext';
import axios from 'axios';
import PageNotFound from './pages/pages/PageNotFound';
import Hanzi from './pages/pages/HanziPage';
import HanziReview from './pages/pages/Learn/HanziReview';
import Learn from './pages/pages/LearnPage';
import Lesson from './pages/pages/LessonPage';
import Practice from './pages/pages/PracticePage';
import PracticeLesson from './pages/pages/PracticeLessonPage';
import { HanziContext } from './helpers/HanziContext';

function App() {
  const [authState, setAuthState] = useState({
    email: "", 
    id: 0, 
    status: false});
    const [allHanziState, setAllHanziState] = useState<HanziRow[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth', { headers: {
      accessToken: localStorage.getItem('accessToken'),
    },
    }).then((response) => {
        if (response.data.error) {
          setAuthState({...authState, status: false});
        } else {
          setAuthState({
            email: response.data.email, 
            id: response.data.id, 
            status: true});
            
            //Update streak
            axios.get('http://localhost:3001/api/hanzi/get').then((response) => {
                if (!response.data.error) {
                  setAllHanziState(response.data);
                }
            });

        }
    });
  }, []);
  
  return (
  <>
  <AuthContext.Provider value={{authState, setAuthState}}>
    <HanziContext.Provider value={{allHanziState, setAllHanziState}}>
      <BrowserRouter>
          <NavBarMain/>
          <Routes>
            <Route path="/" element = {<Home />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/register" element = {<Register />}/>
            <Route path="/dashboard" element = {<Dashboard />}/>
            <Route path="/search" element = {<Search />}/>
            <Route path="/hanzi/:char" element = {<Hanzi />}/>
            <Route path="/hanzi/review" element = {<HanziReview />}/>
            <Route path="/learn" element = {<Learn />}/>
            <Route path="/learn/:lesson" element = {<Lesson />}/>
            <Route path="/practice" element = {<Practice />}/>
            <Route path="/practice/:lesson" element = {<PracticeLesson />}/>
            <Route path="/*" element = {<PageNotFound/>}/>
          </Routes>
      </BrowserRouter>
    </HanziContext.Provider>
  </AuthContext.Provider>
  </>);
}

export default App
