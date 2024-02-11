import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import { SettingsContext } from '../../helpers/SettingsContext';
import YesNoDropdown from './dropdowns/YesNoDropdown';
import HanziTypeDropdown from './dropdowns/HanziTypeDropdown';
import { ThemeApplier } from '../../scripts/ThemeApplier';
import '../../pages/main/settings/settings-page.css';

interface SettingsContainerProps {
    title: string;
}

const updateSettings = (settingType: string, settingUpdatedValues: any) => {
    const settingsJson = localStorage.getItem('settings');
    let userSettings = {
        accountState: {
            reminders: true,
            tips: true,
            updates: true,
        },
        generalState: {
            usesTraditional: false,
            studyGoal: 5,
            batchSize: 5,
        },
        themeState: {
            backgroundTheme: 'light',
            accentColor: 'blue',
        },
        apiState: {
            userKey: '',
        },
    };

    if (settingsJson !== null && settingType !== '') {
        userSettings = JSON.parse(settingsJson);
    }

    switch (settingType) {
        case 'account':
            try {
                // tba...
            } catch {
                // error
            }

            break;
        case 'general':
            try {
                if (settingUpdatedValues.usesTraditional !== null && settingUpdatedValues.batchSize !== null && settingUpdatedValues.studyGoal !== null) {
                    userSettings.generalState = settingUpdatedValues;
                }
            } catch {
                // error
            }

            break;
        case 'theme':
            try {
                if (settingUpdatedValues.backgroundTheme !== null && settingUpdatedValues.accentColor !== null) {
                    userSettings.themeState = settingUpdatedValues;

                    const backgroundTheme = userSettings.themeState.backgroundTheme;
                    const accentColor = userSettings.themeState.accentColor;
                    const themeApplier = new ThemeApplier();

                    themeApplier.applyTheme(backgroundTheme, accentColor);
                }
                // error
            } catch {
                // error
            }

            break;
        case 'api':
            try {
                //tba..
            } catch {
                // error
            }

            break;
        default:
            // error
            break;
    }

    localStorage.setItem('settings', JSON.stringify(userSettings));
};

const AccountSettings: FC = () => {
    const { authState } = useContext(AuthContext);
    const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);

    return (
        <div className="settings-container">
            <h1 className="settings-container-header">Account details</h1>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Email</h3>
                <p className="settings-container-value settings-pad-2">{authState.email}</p>
            </div>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Password</h3>
                {isChangingPassword ? (
                    <div className="settings-vertical-form settings-pad-1">
                        <h4 className="settings-container-sub-sub-header">Old password</h4>
                        <input type="password"></input>
                        <h4 className="settings-container-sub-sub-header">New password</h4>
                        <input type="password"></input>
                        <button className="settings-page-button">Change password</button>
                    </div>
                ) : (
                    <button className="settings-page-button settings-mar-2" onClick={() => setIsChangingPassword(true)}>
                        Change password
                    </button>
                )}
            </div>
            <h1 className="settings-container-header">Notifications</h1>
            <div className="settings-setting-wrapper">
                <h4 className="settings-container-sub-header settings-pad-1">Reminders</h4>
                <h4 className="settings-container-sub-sub-hint settings-pad-2">send emails to remind you to study</h4>
                <div className="settings-pad-2">
                    <YesNoDropdown />
                </div>
            </div>
            <div className="settings-setting-wrapper">
                <h4 className="settings-container-sub-header settings-pad-1">Tips</h4>
                <h4 className="settings-container-sub-sub-hint settings-pad-2">send emails tips on all things hanzi</h4>
                <div className="settings-pad-2">
                    <YesNoDropdown />
                </div>
            </div>
            <div className="settings-setting-wrapper">
                <h4 className="settings-container-sub-header settings-pad-1">Updates</h4>
                <h4 className="settings-container-sub-sub-hint settings-pad-2">send emails about updated curriculum</h4>
                <div className="settings-pad-2">
                    <YesNoDropdown />
                </div>
            </div>
        </div>
    );
};

const GeneralSettings: FC = () => {
    const { generalState, setGeneralState } = useContext(SettingsContext);

    const handleGoalChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        const newGeneralSettings = {
            usesTraditional: generalState.usesTraditional,
            studyGoal: newValue,
            batchSize: generalState.batchSize,
        };

        setGeneralState(newGeneralSettings);
        updateSettings('general', newGeneralSettings);
    };

    const handleBatchChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newValue = 0;
        try {
            newValue = parseInt(event.target.value);
        } catch {
            return;
        }

        if (newValue > 15) {
            newValue = 15;
        } else if (newValue < 5) {
            newValue = 5;
        }

        const newGeneralSettings = {
            usesTraditional: generalState.usesTraditional,
            studyGoal: generalState.studyGoal,
            batchSize: newValue,
        };

        setGeneralState(newGeneralSettings);
        updateSettings('general', newGeneralSettings);
    };

    return (
        <div className="settings-container">
            <h1 className="settings-container-header">Study options</h1>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Default hanzi type</h3>
                <div className="settings-pad-2">
                    <HanziTypeDropdown />
                </div>
            </div>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Study time goal</h3>
                <div className="settings-vertical-form settings-pad-2">
                    <input type="number" step={5} value={generalState.studyGoal} min={5} onChange={handleGoalChange}></input>
                </div>
            </div>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Hanzi amount per batch</h3>
                <div className="settings-vertical-form settings-pad-2">
                    <input type="number" step={5} value={generalState.batchSize} min={5} max={15} onChange={handleBatchChange}></input>
                </div>
            </div>
        </div>
    );
};

const ThemeSettings: FC = () => {
    const { themeState, setThemeState } = useContext(SettingsContext);
    const siteThemes = ['light', 'dark'];
    const presetAccents = ['blue', 'red', 'purple', 'gold', 'orange', 'teal', 'green', 'brown'];

    const [currentSiteTheme, setCurrentSiteTheme] = useState<string>('');
    const [currentAccent, setCurrentAccent] = useState<string>('');

    useEffect(() => {
        setCurrentSiteTheme(themeState.backgroundTheme);
        setCurrentAccent(themeState.accentColor);
    }, [themeState]);

    const getIsCurrentTheme = (theme: string) => {
        return theme == currentSiteTheme;
    };

    const getIsCurrentAccent = (accent: string) => {
        return accent == currentAccent;
    };

    const changeTheme = (theme: string) => {
        const newThemeSettings = { backgroundTheme: theme, accentColor: currentAccent };

        setCurrentSiteTheme(newThemeSettings.backgroundTheme);
        setThemeState(newThemeSettings);
        updateSettings('theme', newThemeSettings);
    };

    const changeAccent = (accent: string) => {
        const newThemeSettings = { backgroundTheme: currentSiteTheme, accentColor: accent };

        setCurrentAccent(newThemeSettings.accentColor);
        setThemeState(newThemeSettings);
        updateSettings('theme', newThemeSettings);
    };

    return (
        <div className="settings-container">
            <h1 className="settings-container-header">Theme</h1>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Background theme</h3>
                <div className="theme-options-wrapper settings-pad-2">
                    {siteThemes.map((theme) => (
                        <div
                            className={`theme-option ${getIsCurrentTheme(theme) ? 'theme-option-border' : ''}`}
                            key={theme}
                            onClick={() => {
                                changeTheme(theme);
                            }}>
                            <p>{theme}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Accent color</h3>
                <div className="theme-options-wrapper settings-pad-2">
                    {presetAccents.map((accent) => (
                        <div
                            className={`theme-option ${getIsCurrentAccent(accent) ? 'theme-option-border' : ''}`}
                            key={accent}
                            onClick={() => {
                                changeAccent(accent);
                            }}>
                            <p>{accent}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const APISettings: FC = () => {
    return (
        <div className="settings-container">
            <h1 className="settings-container-header">API</h1>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Your API key</h3>
                <div className="settings-vertical-form settings-pad-1">
                    <input type="text" readOnly={true}></input>
                    <button className="settings-page-button">Generate API key</button>
                </div>
            </div>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Documentation</h3>
                <h4 className="settings-container-sub-sub-hint settings-container-link settings-pad-2">View the documentation of API here</h4>
            </div>
        </div>
    );
};

const ResetSettings: FC = () => {
    return (
        <div className="settings-container">
            <h1 className="settings-container-header">Account data</h1>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Reset lessons data</h3>
                <button className="settings-page-button settings-mar-2">Reset lessons data</button>
            </div>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Reset bookmarked list</h3>
                <button className="settings-page-button settings-mar-2">Reset bookmarked list</button>
            </div>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Reset account data</h3>
                <button className="settings-page-button settings-mar-2">Reset account data</button>
            </div>
            <div className="settings-setting-wrapper">
                <h3 className="settings-container-sub-header settings-pad-1">Delete Account</h3>
                <button className="settings-page-button settings-mar-2">Delete Account</button>
            </div>
        </div>
    );
};

const SettingsContainer: FC<SettingsContainerProps> = ({ title }) => {
    switch (title) {
        case 'Account':
            return <AccountSettings />;
        case 'General':
            return <GeneralSettings />;
        case 'Theme':
            return <ThemeSettings />;
        case 'API':
            return <APISettings />;
        case 'Reset':
            return <ResetSettings />;
        default:
            return null;
    }
};

export default SettingsContainer;
