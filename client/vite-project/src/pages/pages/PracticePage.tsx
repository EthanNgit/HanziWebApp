import React, { useContext, useEffect, useState } from 'react';
import '../styles/PracticePage.css';
import { API_PRACTICE_CALCULATE_HANZI_COUNT_URL, EN_UC_LEARN_HANZI_HEADER, STRING_TO_URL } from '../../global/Ts/Strings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import HanziSelectionNotification from '../../components/components/Boxes/HSKSelectionNotification';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import { HanziContext } from '../../helpers/HanziContext';
import { useNavigate } from 'react-router-dom';

function PracticePage() {
    const [showRedirectionButton, setShowRedirectionButton] = useState<boolean>(false);
    const [redirectionButtonHeader, setRedirectionButtonHeader] = useState<string>('');
    const [redirectionButtonNavRoute, setRedirectionButtonNavRoute] = useState<string>('');
    const [showSentenceRedirectionButton, setShowSentenceRedirectionButton] = useState<boolean>(false);
    const [sentenceRedirectionButtonHeader, setSentenceRedirectionButtonHeader] = useState<string>('');
    const [sentenceRedirectionButtonNavRoute, setSentenceRedirectionButtonNavRoute] = useState<string>('');
    const navigate = useNavigate();

    const setRedirectionButtonOn = (header: string, navRoute: string, sentenceButton?: boolean) => {
        if (header) {
            // If it is being used for sentence based buttons
            if (!sentenceButton) {
                setShowRedirectionButton(true);
                setRedirectionButtonHeader(header);
                setRedirectionButtonNavRoute(navRoute);
            } else {
                setShowSentenceRedirectionButton(true);
                setSentenceRedirectionButtonHeader(header);
                setSentenceRedirectionButtonNavRoute(navRoute);
            }
        }
    };

    const setRedirectionButtonOff = (event?: React.MouseEvent) => {
        setShowRedirectionButton(false);
        setShowSentenceRedirectionButton(false);
        setRedirectionButtonHeader('');
        setRedirectionButtonNavRoute('');
        setSentenceRedirectionButtonHeader('');
        setSentenceRedirectionButtonNavRoute('');
    };

    const redirectToStoriesPage = () => {
        navigate(STRING_TO_URL('stories'), {
            state: {
                isVerified: true,
                practiceMaterial: null,
            },
        });
    };

    return (
        <div className="practice-page">
            <div className="practice-page-wrapper">
                <div className="practice-page-main-grid">
                    <div className="practive-page-subject-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Stories</h3>
                                <p>Practice reading and listening comprehension through stories.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20" onClick={redirectToStoriesPage}>
                                    Reading
                                    <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                                </button>
                                <button className="button-20">
                                    Listening
                                    <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-subject-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Sentences</h3>
                                <p>Practice reading and listening comprehension with sentences.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20" onClick={() => setRedirectionButtonOn('Organize sentences', 'translate-sentences', true)}>
                                    Translate
                                    <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                                </button>
                                <button className="button-20" onClick={() => setRedirectionButtonOn('Organize sentences', 'reverse-translate-sentences', true)}>
                                    Translate reverse
                                    <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-subject-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Writing</h3>
                                <p>Practice stroke order of hanzi. </p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">
                                    Stroke order
                                    <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-subject-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Grammar</h3>
                                <p>Review grammar rules.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20" onClick={() => setRedirectionButtonOn('Measure words', 'measure')}>
                                    Measure words
                                    <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="practice-page-character-wrapper">
                    <h3>Hanzi</h3>
                    <p>Review pinyin, sound, definition, traditional and simplified, and other qualities about hanzi.</p>
                    <div className="practice-page-character-contents">
                        <button className="button-21" onClick={() => setRedirectionButtonOn('Pinyin practice', 'pinyin')}>
                            Pinyin
                            <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                        </button>
                        <button className="button-21" onClick={() => setRedirectionButtonOn('Character practice', 'character')}>
                            Characters
                            <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                        </button>
                        <button className="button-21" onClick={() => setRedirectionButtonOn('Traditional practice', 'traditional')}>
                            Traditional and simplified
                            <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                        </button>
                        <button className="button-21" onClick={() => setRedirectionButtonOn('Definition practice', 'definition')}>
                            Definitions
                            <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                        </button>
                        <button className="button-21" onClick={() => setRedirectionButtonOn('Tone practice', 'tone')}>
                            Tones
                            <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                        </button>
                        <button className="button-21" onClick={() => setRedirectionButtonOn('Bookmark practice', 'bookmarked')}>
                            Bookmarked review
                            <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>
            {showRedirectionButton && <HanziSelectionNotification header={redirectionButtonHeader} clickedOutside={setRedirectionButtonOff} navRoute={redirectionButtonNavRoute} />}
            {showSentenceRedirectionButton && (
                <HanziSelectionNotification header={sentenceRedirectionButtonHeader} clickedOutside={setRedirectionButtonOff} navRoute={sentenceRedirectionButtonNavRoute} />
            )}
        </div>
    );
}

export default PracticePage;
