import React, { useContext, useEffect, useState } from 'react';
import '../styles/PracticePage.css';
import {
    API_PRACTICE_CALCULATE_HANZI_COUNT_URL,
    EN_UC_LEARN_HANZI_HEADER,
} from '../../global/Ts/Strings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import HanziSelectionNotification from '../../components/components/Boxes/HSKSelectionNotification';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { HanziContext } from '../../helpers/HanziContext';

function PracticePage() {
    const [showRedirectionButton, setShowRedirectionButton] =
        useState<boolean>(false);
    const [redirectionButtonHeader, setRedirectionButtonHeader] =
        useState<string>('');
    const [redirectionButtonNavRoute, setRedirectionButtonNavRoute] =
        useState<string>('');

    const setRedirectionButtonOn = (header: string, navRoute: string) => {
        if (header) {
            setShowRedirectionButton(true);
            setRedirectionButtonHeader(header);
            setRedirectionButtonNavRoute(navRoute);
        }
    };

    const setRedirectionButtonOff = (event?: React.MouseEvent) => {
        setShowRedirectionButton(false);
        setRedirectionButtonHeader('');
        setRedirectionButtonNavRoute('');
    };

    return (
        <div className="practice-page">
            <div className="practice-page-wrapper">
                <div className="practice-page-main-grid">
                    <div className="practive-page-reading-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Reading</h3>
                                <p>Practice reading comprehension.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">
                                    Stories
                                    <FontAwesomeIcon
                                        className="auto-left"
                                        icon={faArrowRight}
                                    />
                                </button>
                                <button className="button-20">
                                    Tongue twisters
                                    <FontAwesomeIcon
                                        className="auto-left"
                                        icon={faArrowRight}
                                    />
                                </button>
                                <button className="button-20">
                                    Sentences
                                    <FontAwesomeIcon
                                        className="auto-left"
                                        icon={faArrowRight}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-listening-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Listening</h3>
                                <p>Practice listening skills.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">
                                    Stories
                                    <FontAwesomeIcon
                                        className="auto-left"
                                        icon={faArrowRight}
                                    />
                                </button>
                                <button className="button-20">
                                    Tongue twisters
                                    <FontAwesomeIcon
                                        className="auto-left"
                                        icon={faArrowRight}
                                    />
                                </button>
                                <button className="button-20">
                                    Sentences
                                    <FontAwesomeIcon
                                        className="auto-left"
                                        icon={faArrowRight}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-writing-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Writing</h3>
                                <p>Practice stroke order of hanzi. </p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">
                                    Stroke order
                                    <FontAwesomeIcon
                                        className="auto-left"
                                        icon={faArrowRight}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-lesson-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Games</h3>
                                <p>Review games from lessons.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">
                                    Pinyin match
                                    <FontAwesomeIcon
                                        className="auto-left"
                                        icon={faArrowRight}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="practice-page-character-wrapper">
                    <h3>Hanzi</h3>
                    <p>
                        Review pinyin, sound, definition, traditional and
                        simplified, and other qualities about hanzi.
                    </p>
                    <div className="practice-page-character-contents">
                        <button
                            className="button-21"
                            onClick={() =>
                                setRedirectionButtonOn(
                                    'Pinyin practice',
                                    'pinyin'
                                )
                            }>
                            Pinyin
                            <FontAwesomeIcon
                                className="auto-left"
                                icon={faArrowRight}
                            />
                        </button>
                        <button
                            className="button-21"
                            onClick={() =>
                                setRedirectionButtonOn(
                                    'Character practice',
                                    'hanzi'
                                )
                            }>
                            Characters
                            <FontAwesomeIcon
                                className="auto-left"
                                icon={faArrowRight}
                            />
                        </button>
                        <button
                            className="button-21"
                            onClick={() =>
                                setRedirectionButtonOn(
                                    'Traditional practice',
                                    'traditional'
                                )
                            }>
                            Traditional and simplified
                            <FontAwesomeIcon
                                className="auto-left"
                                icon={faArrowRight}
                            />
                        </button>
                        <button
                            className="button-21"
                            onClick={() =>
                                setRedirectionButtonOn(
                                    'Definition practice',
                                    'definition'
                                )
                            }>
                            Definitions
                            <FontAwesomeIcon
                                className="auto-left"
                                icon={faArrowRight}
                            />
                        </button>
                        <button
                            className="button-21"
                            onClick={() =>
                                setRedirectionButtonOn('Tone practice', 'tone')
                            }>
                            Tones
                            <FontAwesomeIcon
                                className="auto-left"
                                icon={faArrowRight}
                            />
                        </button>
                        <button
                            className="button-21"
                            onClick={() =>
                                setRedirectionButtonOn(
                                    'Bookmark practice',
                                    'traditional'
                                )
                            }>
                            Bookmarked review
                            <FontAwesomeIcon
                                className="auto-left"
                                icon={faArrowRight}
                            />
                        </button>
                    </div>
                </div>
            </div>
            {showRedirectionButton && (
                <HanziSelectionNotification
                    header={redirectionButtonHeader}
                    clickedOutside={setRedirectionButtonOff}
                    navRoute={redirectionButtonNavRoute}
                />
            )}
        </div>
    );
}

export default PracticePage;
