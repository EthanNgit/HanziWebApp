import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import {
    EN_UC_GRAMMAR_PRACTICE_DESCRIPTION,
    EN_UC_GRAMMAR_PRACTICE_HEADER,
    EN_UC_SENTENCES_HEADER,
    EN_UC_SENTENCES_PRACTICE_DESCRIPTION,
    EN_UC_STORIES_PRACTICE_DESCRIPTION,
    EN_UC_STORIES_PRACTICE_HEADER,
    EN_UC_WRITING_PRACTICE_DESCRIPTION,
    EN_UC_WRITING_PRACTICE_HEADER,
    STRING_TO_URL,
} from '../../../../global/Strings';
import HanziSelectionNotification from '../../../../components/notifications/hsk-selection-notification/HSKSelectionNotification';
import '../practice-page/practice-page.css';

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
                                <h3>{EN_UC_STORIES_PRACTICE_HEADER}</h3>
                                <p>{EN_UC_STORIES_PRACTICE_DESCRIPTION}</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20" onClick={redirectToStoriesPage}>
                                    Reading
                                    <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-subject-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>{EN_UC_SENTENCES_HEADER}</h3>
                                <p>{EN_UC_SENTENCES_PRACTICE_DESCRIPTION}</p>
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
                                <h3>{EN_UC_WRITING_PRACTICE_HEADER}</h3>
                                <p>{EN_UC_WRITING_PRACTICE_DESCRIPTION}</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20" onClick={() => setRedirectionButtonOn('Stroke order', 'stroke-order')}>
                                    Stroke order
                                    <FontAwesomeIcon className="auto-left" icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-subject-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>{EN_UC_GRAMMAR_PRACTICE_HEADER}</h3>
                                <p>{EN_UC_GRAMMAR_PRACTICE_DESCRIPTION}</p>
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
