import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons/faBookmark';
import { AuthContext } from '../../../helpers/AuthContext';
import TTSButton from '../../../components/common/buttons/tts-button/TTSButton';
import HanziWriterComponent from '../../../components/hanzi-writer-api/writer/HanziWriterComponent';
import RedirectionNotification from '../../../components/notifications/redirection-notification/RedirectionNotification';
import ToggleButton from '../../../components/common/buttons/two-way-button/ToggleButton';
import { HanziContext } from '../../../helpers/HanziContext';
import { BookmarkManager } from '../../../scripts/BookmarkManager';
import '../../../interfaces/IHanziRow';
import '../../../global/Strings';
import {
    EN_LC_STROKES_HEADER,
    EN_UC_ABOUT_HEADER,
    EN_UC_DETAILS_HEADER,
    EN_UC_HANZI_REDIRECTION_DESCRIPTION,
    EN_UC_HSK_LEVEL_HEADER,
    EN_UC_OTHER_PRONUNCIATIONS_HEADER,
    EN_UC_PRIMARY_RADICAL_HEADER,
    EN_UC_REVIEW_HANZI_HEADER,
    EN_UC_SENTENCES_HEADER,
    EN_UC_SPEECH_TYPE_HEADER,
    EN_UC_STROKE_ORDER_HEADER_HEADER,
    NAV_HANZI_PAGE_URL,
    NAV_REVIEW_URL,
} from '../../../global/Strings';
import '../hanzi-info/hanzi-page.css';

interface HanziWriterProps {
    character: string;
}

function HanziPage(HanziPageProps: any) {
    const { char } = useParams();
    const { allHanziState: allHanzi } = useContext(HanziContext);
    const { authState } = useContext(AuthContext);
    const { state: learningState } = useLocation();
    const navigate = useNavigate();

    const [currentHanzi, setCurrentHanzi] = useState<HanziRow>();
    const [sentencesMap, setSentencesMap] = useState(new Map<string, { translation: string; pinyin: string }>());
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showPrevArrow, setShowPrevArrow] = useState<boolean>(true);
    const [showNextArrow, setShowNextArrow] = useState<boolean>(true);
    const [isCooldown, setIsCooldown] = useState<boolean>(false);
    const [bookmarkManager, setBookmarkManager] = useState<BookmarkManager>();
    const [isBookmarked, setIsBookmarked] = useState<boolean>();
    const [isShowingPinyin, setIsShowingPinyin] = useState<boolean>(false);
    const [isLearning, setIsLearning] = useState<boolean>(false);
    const [learningList, setLearningList] = useState<Set<string>>(new Set());
    const [learningIndex, setLearningIndex] = useState<number>(0);
    const [isAtReview, setIsAtReview] = useState<boolean>(false);
    const [reviewRedirectionOption, setReviewRedirectionOption] = useState<boolean | null>(null);
    const MAX_LESSONS_BEFORE_TEST = 5;
    const COOLDOWN_BETWEEN_PAGE_FLIP = 500; // 500ms

    useEffect(() => {
        window.scrollTo(0, 0);

        const bookmarkManager = new BookmarkManager({ userId: authState.id });
        setBookmarkManager(bookmarkManager);
    }, [authState]);

    const handlePrevClick = () => {
        if (!isCooldown) {
            let newIndex = 0;

            if (isLearning) {
                const indexMinusOne = learningIndex - 1;
                newIndex = learningState.learningIndexes[indexMinusOne];

                if (indexMinusOne >= 0) {
                    navigate(NAV_HANZI_PAGE_URL(newIndex), {
                        state: {
                            isLearning: isLearning,
                            learningList: learningList,
                            learningIndexes: learningState.learningIndexes,
                            currentIndex: indexMinusOne,
                        },
                    });

                    startCooldown();
                }
            } else {
                newIndex = currentIndex - 1;

                if (newIndex > 0) {
                    navigate(NAV_HANZI_PAGE_URL(newIndex));

                    startCooldown();
                }
            }
        }
    };

    const handleNextClick = () => {
        if (!isCooldown) {
            let newIndex = 0;

            if (isLearning) {
                if (learningIndex + 1 < learningState.learningIndexes.length) {
                    newIndex = learningState.learningIndexes[learningIndex + 1];

                    navigate(NAV_HANZI_PAGE_URL(newIndex), {
                        state: {
                            isLearning: isLearning,
                            learningList: learningList,
                            learningIndexes: learningState.learningIndexes,
                            currentIndex: learningIndex + 1,
                        },
                    });

                    startCooldown();
                } else {
                    setIsAtReview(true);
                }
            } else {
                newIndex = currentIndex + 1;
                const maxIndex = allHanzi.length;

                if (newIndex <= maxIndex) {
                    navigate(NAV_HANZI_PAGE_URL(newIndex), {
                        state: {
                            isLearning: false,
                            learningList: new Set<HanziRow>(),
                        },
                    });

                    startCooldown();
                }
            }
        }
    };

    const handleNewHanziUpdate = (searchVal: any) => {
        if (allHanzi && char) {
            const newItem = allHanzi.find((obj) => {
                return obj.id === Number(searchVal) || obj.simplified === searchVal || obj.traditional === searchVal;
            });

            setCurrentHanzi(newItem);
        }
    };

    const startCooldown = () => {
        setIsCooldown(true);

        setTimeout(() => {
            setIsCooldown(false);
        }, COOLDOWN_BETWEEN_PAGE_FLIP);
    };

    useEffect(() => {
        handleNewHanziUpdate(char);
    }, [char, allHanzi]);

    useEffect(() => {
        setShowPrevArrow(true);
        setShowNextArrow(true);

        if (currentHanzi !== undefined) {
            if (currentHanzi?.id === 1) {
                setShowPrevArrow(false);
            } else if (currentHanzi?.id === allHanzi.length) {
                setShowNextArrow(false);
            }

            const isThisCharacterBookmarked = bookmarkManager?.getIsHanziBookmarked(currentHanzi);
            setIsBookmarked(isThisCharacterBookmarked);
        }
    }, [currentHanzi]);

    useEffect(() => {
        if (currentHanzi) {
            setCurrentIndex(currentHanzi.id);

            const newUrl = NAV_HANZI_PAGE_URL(currentHanzi.simplified);
            navigate(newUrl, {
                replace: true,
                state: {
                    isLearning: isLearning,
                    learningList: learningList,
                    learningIndexes: learningState?.learningIndexes,
                    currentIndex: learningIndex,
                },
            });

            const retrievedData = JSON.parse(currentHanzi?.sentences || '[]');
            const newSentencesMap = new Map<string, { translation: string; pinyin: string }>();

            retrievedData.forEach((item: { sentence: any; translation: any; pinyin: any }) => {
                newSentencesMap.set(item.sentence, {
                    translation: item.translation,
                    pinyin: item.pinyin,
                });
            });

            setSentencesMap(newSentencesMap);
        }
    }, [currentHanzi]);

    useEffect(() => {
        if (learningState && learningState.isLearning !== undefined) {
            setIsLearning(learningState.isLearning);

            if (learningState.learningList !== undefined) {
                setLearningList(learningState.learningList);
                setLearningIndex(learningState.currentIndex);
            }
        }
    }, [learningState]);

    const updateRedirectionOption = (option: boolean | null) => {
        setReviewRedirectionOption(option);

        if (option === true) {
            navigate(NAV_REVIEW_URL, {
                state: {
                    isLearning: isLearning,
                    learningList: learningList,
                    learningIndexes: learningState.learningIndexes,
                    currentIndex: learningIndex,
                },
            });
        } else {
            setIsAtReview(false);
        }
    };

    if (currentHanzi === null) {
        return <div>Loading...</div>;
    }

    const onPinyinToggle = (option: boolean) => {
        setIsShowingPinyin(!option);
    };

    const setBookmark = async () => {
        if (currentHanzi) {
            setIsBookmarked(await bookmarkManager?.setBookmark(currentHanzi));
        }
    };

    return (
        <div className="hanzi-dictionary-wrapper">
            <div className="hanzi-dictionary-main">
                {isBookmarked ? (
                    <FontAwesomeIcon icon={faBookmarkSolid} className="top-right top-right-hanzi-icon" onClick={setBookmark} />
                ) : (
                    <FontAwesomeIcon icon={faBookmarkEmpty} className="top-right top-right-hanzi-icon" onClick={setBookmark} />
                )}
                {isLearning && (
                    <p className="bottom-right learning-progress">
                        {learningIndex + 1}/{isLearning ? learningState.learningIndexes.length : MAX_LESSONS_BEFORE_TEST?.toLocaleString()}
                    </p>
                )}
                {showPrevArrow && <FontAwesomeIcon icon={faChevronLeft} className="hanzi-prev" onClick={handlePrevClick} />}
                {showNextArrow && <FontAwesomeIcon icon={faChevronRight} className="hanzi-next" onClick={handleNextClick} />}
                <h1 className="hanzi-dictionary-hanzi">
                    {currentHanzi?.simplified} {currentHanzi !== undefined && currentHanzi?.traditional !== null ? ' / ' + currentHanzi?.traditional : ''}
                </h1>
                <h3 className="hanzi-dictionary-pinyin">
                    {currentHanzi?.pinyin} <TTSButton text={`${currentHanzi?.simplified}`} />
                </h3>
                <h3 className="hanzi-dictionary-definition">{currentHanzi?.definition}</h3>
            </div>
            <div className="hanzi-dictionary-details">
                <div className="hanzi-dictionary-about">
                    <div className="hanzi-dictionary-about-flex">
                        <div className="hanzi-dictionary-about-flex-1">
                            <h1>
                                {EN_UC_ABOUT_HEADER} {currentHanzi?.simplified}
                            </h1>
                            <div className="hanzi-dictionary-about-flex-1-1">
                                <p>
                                    {EN_UC_HSK_LEVEL_HEADER}
                                    <br />
                                    <span>HSK {currentHanzi?.hskLevel}</span>
                                </p>
                                <p>
                                    {EN_UC_SPEECH_TYPE_HEADER}
                                    <br />
                                    <span>{currentHanzi && currentHanzi.category ? JSON.parse(currentHanzi.category).join(', ') : ''}</span>
                                </p>
                                {currentHanzi?.radical && (
                                    <p>
                                        {EN_UC_PRIMARY_RADICAL_HEADER}
                                        <br />
                                        <span>{currentHanzi?.radical}</span>
                                    </p>
                                )}
                                {currentHanzi?.douyinzi && (
                                    <p>
                                        {EN_UC_OTHER_PRONUNCIATIONS_HEADER}
                                        <br />
                                        <span>{Array.from(new Set(JSON.parse(currentHanzi?.douyinzi))).join(', ')}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="hanzi-dictionary-about-flex-2">
                            <h1>
                                {EN_UC_STROKE_ORDER_HEADER_HEADER} {currentHanzi?.simplified}
                            </h1>
                            <div className="hanzi-writer-wrapper">
                                <div className="hanzi-writer-container">
                                    {currentHanzi?.simplified && (
                                        <div>
                                            <HanziWriterComponent characters={currentHanzi?.simplified} />
                                            <p>
                                                <span>{currentHanzi?.simplifiedStrokeCount}</span> {EN_LC_STROKES_HEADER}
                                            </p>
                                        </div>
                                    )}
                                    {currentHanzi?.traditional && (
                                        <div>
                                            <HanziWriterComponent characters={currentHanzi?.traditional} />
                                            <p>
                                                <span>{currentHanzi?.traditionalStrokeCount}</span> {EN_LC_STROKES_HEADER}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {currentHanzi?.about && (
                        <div className="hanzi-dictionary-hanzi-details">
                            <h1>{EN_UC_DETAILS_HEADER}</h1>
                            <div className="hanzi-dictionary-hanzi-details-text">
                                <pre className="hanzi-dictionary-hanzi-details-pre">{highlightCharacter(currentHanzi?.about, currentHanzi?.simplified)}</pre>
                            </div>
                        </div>
                    )}
                    <div className="hanzi-dictionary-about-sentences">
                        <div className="sentences-top-bar">
                            <h1>
                                {EN_UC_SENTENCES_HEADER} {currentHanzi?.simplified}
                            </h1>
                            <ToggleButton
                                buttonNames={{
                                    buttonOne: 'Translation',
                                    buttonTwo: 'Pinyin',
                                }}
                                onToggle={onPinyinToggle}
                            />
                        </div>

                        {Array.from(sentencesMap?.entries()).map(([sentence, { translation, pinyin }], index) => (
                            <div key={index} className="sentence-item">
                                <div className="chinese-sentence">
                                    {highlightCharacter(sentence, currentHanzi?.simplified)}
                                    <TTSButton text={`${sentence}`} />
                                </div>
                                {isShowingPinyin ? <div className="translation">{pinyin || translation}</div> : <div className="translation">{translation}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isAtReview && <RedirectionNotification header={EN_UC_REVIEW_HANZI_HEADER} description={EN_UC_HANZI_REDIRECTION_DESCRIPTION} selectedOption={updateRedirectionOption} />}
        </div>
    );
}

const highlightCharacter = (sentence: string, character: string | undefined) => {
    if (!character) {
        return;
    }

    const characters = [...sentence];
    return characters.map((char, index) =>
        char === character ? (
            <span key={index} className="sentence-highlight-word">
                {char}
            </span>
        ) : (
            char
        )
    );
};

export default HanziPage;
