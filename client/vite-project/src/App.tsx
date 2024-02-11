import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { ThemeApplier } from './scripts/ThemeApplier';
import { AuthContext } from './helpers/AuthContext';
import { SettingsContext } from './helpers/SettingsContext';
import { HanziContext } from './helpers/HanziContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBarMain from './components/navbar/whole-nav-bar/NavBarMain';
import Home from './pages/main/home/HomePage';
import Login from './pages/main/login/LoginPage';
import Register from './pages/main/register/RegisterPage';
import Dashboard from './pages/main/dash-main/DashboardPage';
import Search from './pages/main/search/SearchPage';
import Hanzi from './pages/main/hanzi-info/HanziPage';
import HanziReview from './pages/learn/srs-review/HanziReview';
import Learn from './pages/main/dash-learn/learn-page/LearnPage';
import Lesson from './pages/main/dash-learn/lesson-redirect/LessonPage';
import Practice from './pages/main/dash-practice/practice-page/PracticePage';
import PracticeLesson from './pages/main/dash-practice/practice-redirect/PracticeLessonPage';
import StoryViewer from './pages/practice/story/story-page/StoryViewPage';
import Settings from './pages/main/settings/SettingsPage';
import PageNotFound from './pages/other/page-404/PageNotFound';

function App() {
    const [authState, setAuthState] = useState({
        email: '',
        id: 0,
        status: false,
    });
    const [allHanziState, setAllHanziState] = useState<HanziRow[]>([]);

    // settings
    const [accountState, setAccountState] = useState({
        reminders: true,
        tips: true,
        updates: true,
    });

    const [generalState, setGeneralState] = useState({
        usesTraditional: false,
        studyGoal: 5,
        batchSize: 5,
    });

    const [themeState, setThemeState] = useState({
        backgroundTheme: 'light',
        accentColor: 'blue',
    });

    const [apiState, setApiState] = useState({
        userKey: '',
    });

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/auth', {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, status: false });
                } else {
                    setAuthState({
                        email: response.data.email,
                        id: response.data.id,
                        status: true,
                    });

                    // Fetch settings from storage
                    const settingsJson = localStorage.getItem('settings');

                    if (settingsJson !== null && settingsJson !== '') {
                        const userSettings = JSON.parse(settingsJson);

                        if (userSettings) {
                            setAccountState({
                                reminders: userSettings.accountState.reminders,
                                tips: userSettings.accountState.tips,
                                updates: userSettings.accountState.updates,
                            });
                            setGeneralState({
                                usesTraditional: userSettings.generalState.usesTraditional,
                                studyGoal: userSettings.generalState.studyGoal,
                                batchSize: userSettings.generalState.batchSize,
                            });
                            setThemeState({
                                backgroundTheme: userSettings.themeState.backgroundTheme,
                                accentColor: userSettings.themeState.accentColor,
                            });
                            setApiState({
                                userKey: userSettings.apiState.userKey,
                            });

                            themeState.backgroundTheme = userSettings.themeState.backgroundTheme;
                            themeState.accentColor = userSettings.themeState.accentColor;
                        }
                    } else {
                        const defaultSettings = {
                            accountState,
                            generalState,
                            themeState,
                            apiState,
                        };

                        localStorage.setItem('settings', JSON.stringify(defaultSettings));
                    }

                    const themeApplier = new ThemeApplier();
                    themeApplier.applyTheme(themeState.backgroundTheme, themeState.accentColor);

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
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <SettingsContext.Provider value={{ accountState, setAccountState, generalState, setGeneralState, themeState, setThemeState, apiState, setApiState }}>
                    <HanziContext.Provider value={{ allHanziState, setAllHanziState }}>
                        <BrowserRouter>
                            <NavBarMain />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/hanzi/:char" element={<Hanzi />} />
                                <Route path="/hanzi/review" element={<HanziReview />} />
                                <Route path="/learn" element={<Learn />} />
                                <Route path="/learn/:lesson" element={<Lesson />} />
                                <Route path="/practice" element={<Practice />} />
                                <Route path="/practice/:lesson" element={<PracticeLesson />} />
                                <Route path="/practice/stories/:story" element={<StoryViewer />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/*" element={<PageNotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </HanziContext.Provider>
                </SettingsContext.Provider>
            </AuthContext.Provider>
        </>
    );
}

export default App;
