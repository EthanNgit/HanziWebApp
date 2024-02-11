import React, { useState } from 'react';
import '../settings/settings-page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faBrush } from '@fortawesome/free-solid-svg-icons/faBrush';
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud';
import SettingsContainer from '../../../components/common/SettingsComponent';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons/faArrowRotateRight';

function SettingsPage() {
    const [activeTab, setActiveTab] = useState<number>(0);

    const getIsActiveTab = (tabId: number) => {
        return tabId === activeTab;
    };

    const getIsActiveTabForCSS = (tabId: number) => {
        if (tabId === activeTab) {
            return 'settings-nav-item-selected';
        }
        return '';
    };

    return (
        <div className="settings-wrapper">
            <div className="settings-nav-bar">
                <div className={`settings-nav-item ${getIsActiveTabForCSS(0)}`} onClick={() => setActiveTab(0)}>
                    <FontAwesomeIcon icon={faUser} className="settings-nav-icon" />
                    Account
                </div>
                <div className={`settings-nav-item ${getIsActiveTabForCSS(1)}`} onClick={() => setActiveTab(1)}>
                    <FontAwesomeIcon icon={faGear} className="settings-nav-icon" />
                    General
                </div>
                <div className={`settings-nav-item ${getIsActiveTabForCSS(2)}`} onClick={() => setActiveTab(2)}>
                    <FontAwesomeIcon icon={faBrush} className="settings-nav-icon" />
                    Theme
                </div>
                <div className={`settings-nav-item ${getIsActiveTabForCSS(3)}`} onClick={() => setActiveTab(3)}>
                    <FontAwesomeIcon icon={faCloud} className="settings-nav-icon" />
                    API
                </div>
                <div className={`settings-nav-item ${getIsActiveTabForCSS(4)}`} onClick={() => setActiveTab(4)}>
                    <FontAwesomeIcon icon={faArrowRotateRight} className="settings-nav-icon" />
                    Reset
                </div>
            </div>
            <div className="settings-content-box">
                {getIsActiveTab(0) && <SettingsContainer title="Account" />}
                {getIsActiveTab(1) && <SettingsContainer title="General" />}
                {getIsActiveTab(2) && <SettingsContainer title="Theme" />}
                {getIsActiveTab(3) && <SettingsContainer title="API" />}
                {getIsActiveTab(4) && <SettingsContainer title="Reset" />}
            </div>
        </div>
    );
}

export default SettingsPage;
