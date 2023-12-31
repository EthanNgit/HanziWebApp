import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles/HanziPage.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import HanziWriterComponent from '../../components/components/Boxes/HanziWriterComponent';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons/faBookmark';
import { AuthContext } from '../../helpers/AuthContext';
import TTSButton from '../../components/components/Buttons/TTSButton';
import '../../global/Interfaces/IHanziRow';
import '../../global/Ts/Strings';
import '../../global/Ts/Strings';
import {
    EN_LC_STROKES_HEADER,
    EN_UC_ABOUT_HEADER,
    EN_UC_COMMON_WORDS_HEADER,
    EN_UC_DETAILS_HEADER,
    EN_UC_HANZI_REDIRECTION_DESCRIPTION,
    EN_UC_HSK_LEVEL_HEADER,
    EN_UC_OTHER_PRONUNCIATIONS_HEADER,
    EN_UC_PRIMARY_RADICAL_HEADER,
    EN_UC_REVIEW_HANZI_HEADER,
    EN_UC_SENTENCES_HEADER,
    EN_UC_SPEECH_TYPE_HEADER,
    EN_UC_STROKE_ORDER_HEADER_HEADER,
} from '../../global/Ts/Strings';
import RedirectionNotification from '../../components/components/Boxes/RedirectionNotification';
import ToggleButton from '../../components/components/Buttons/ToggleButton';
import { HanziContext } from '../../helpers/HanziContext';

interface HanziWriterProps {
    character: string;
}

function HanziPage(HanziPageProps: any) {
    let { char } = useParams();
    const allHanziContext = useContext(HanziContext);
    const { authState } = useContext(AuthContext);
    const [items, setItems] = useState<HanziRow[]>([]);
    const [sentencesMap, setSentencesMap] = useState(
        new Map<string, { translation: string; pinyin: string }>()
    );
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showPrevArrow, setShowPrevArrow] = useState<boolean>(true);
    const [showNextArrow, setShowNextArrow] = useState<boolean>(true);
    const [isCooldown, setIsCooldown] = useState<boolean>(false);
    const [isBookmarkCooldown, setIsBookmarkCooldown] =
        useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isShowingPinyin, setIsShowingPinyin] = useState<boolean>(false);

    const location = useLocation();
    const { state: learningState } = location;
    const [isLearning, setIsLearning] = useState<boolean>(false);
    const [learningList, setLearningList] = useState<Set<string>>(new Set());
    const [learningIndex, setLearningIndex] = useState<number>(0);
    const [isAtReview, setIsAtReview] = useState<boolean>(false);
    const [reviewRedirectionOption, setReviewRedirectionOption] = useState<
        boolean | null
    >(null);
    const maxLessonsBeforeTest = 5;

    const navigate = useNavigate();

    const handlePrevClick = () => {
        if (!isCooldown) {
            let newIndex = 0;

            if (isLearning) {
                const indexMinusOne = learningIndex - 1;
                newIndex = learningState.learningIndexes[indexMinusOne];
                if (indexMinusOne >= 0) {
                    navigate(`/hanzi/${newIndex}`, {
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
                    navigate(`/hanzi/${newIndex}`);

                    startCooldown();
                }
            }
        }
    };

    const handleNextClick = () => {
        if (!isCooldown) {
            let newIndex = 0;
            if (isLearning) {
                if (learningIndex + 1 < 5) {
                    newIndex = learningState.learningIndexes[learningIndex + 1];

                    navigate(`/hanzi/${newIndex}`, {
                        state: {
                            isLearning: isLearning,
                            learningList: learningList,
                            learningIndexes: learningState.learningIndexes,
                            currentIndex: learningIndex + 1,
                        },
                    });
                    startCooldown();
                } else {
                    //review
                    setIsAtReview(true);
                }
            } else {
                newIndex = currentIndex + 1;
                const maxIndex = allHanziContext.allHanziState.length;
                if (newIndex <= maxIndex) {
                    navigate(`/hanzi/${newIndex}`, {
                        state: {
                            isLearning: isLearning,
                            learningList: learningList,
                        },
                    });
                    startCooldown();
                }
            }
        }
    };

    const startCooldown = () => {
        setIsCooldown(true);
        setTimeout(() => {
            setIsCooldown(false);
        }, 1000);
    };

    const setBookmark = () => {
        const searchVals = {
            id: authState.id,
            characters: [char],
            adding: !isBookmarked,
        };

        if (!isBookmarkCooldown) {
            axios
                .post('http://localhost:3001/api/stats/bookmark', searchVals)
                .then((response) => {
                    if (response.data.error) {
                        alert(response.data.error);
                    } else {
                        console.log(response.data);
                    }
                });
            setIsBookmarked(!isBookmarked);
            setIsBookmarkCooldown(true);
            setTimeout(() => {
                setIsBookmarkCooldown(false);
            }, 3000);
        }
    };

    useEffect(() => {
        console.log('current char', char);
        const searchVals = {
            character: char,
            id: char,
        };

        axios
            .post('http://localhost:3001/api/hanzi/get', searchVals)
            .then((response) => {
                setItems(response.data);
            });

        axios
            .get(`http://localhost:3001/api/stats/${authState.id}`)
            .then((response) => {
                if (response.data) {
                    let bookmarkedCharacters = new Set(
                        JSON.parse(response.data.bookmarkedCharacters)
                    );

                    if (!bookmarkedCharacters) {
                        bookmarkedCharacters = new Set();
                    }

                    if (bookmarkedCharacters.has(char)) {
                        setIsBookmarked(true);
                    } else {
                        setIsBookmarked(false);
                    }
                }
            });
    }, [char]);

    useEffect(() => {
        if (items.length > 0) {
            setCurrentIndex(items[0].id);

            const newUrl = `/hanzi/${items[0].simplified}`;
            navigate(newUrl, {
                replace: true,
                state: {
                    isLearning: isLearning,
                    learningList: learningList,
                    learningIndexes: learningState?.learningIndexes,
                    currentIndex: learningIndex,
                },
            });

            const retrievedData = JSON.parse(items[0]?.sentences || '[]');
            const newSentencesMap = new Map<
                string,
                { translation: string; pinyin: string }
            >();

            retrievedData.forEach(
                (item: { sentence: any; translation: any; pinyin: any }) => {
                    newSentencesMap.set(item.sentence, {
                        translation: item.translation,
                        pinyin: item.pinyin,
                    });
                }
            );

            setSentencesMap(newSentencesMap);
        }
    }, [items]);

    useEffect(() => {
        if (learningState && learningState.isLearning !== undefined) {
            setIsLearning(learningState.isLearning);
            if (learningState.learningList !== undefined) {
                setLearningList(learningState.learningList);
                setLearningIndex(learningState.currentIndex);
                //console.log(learningState);
            }
        }
    }, [learningState]);

    const updateRedirectionOption = (option: boolean | null) => {
        setReviewRedirectionOption(option);

        if (option === true) {
            navigate(`/hanzi/review`, {
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

    if (items.length === 0) {
        return <div>Loading...</div>;
    }

    const onPinyinToggle = (option: boolean) => {
        setIsShowingPinyin(!option);
    };

    return (
        <div className="hanzi-dictionary-wrapper">
            <div className="hanzi-dictionary-main">
                {isBookmarked ? (
                    <FontAwesomeIcon
                        icon={faBookmarkSolid}
                        className="top-right top-right-hanzi-icon"
                        onClick={setBookmark}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faBookmarkEmpty}
                        className="top-right top-right-hanzi-icon"
                        onClick={setBookmark}
                    />
                )}
                {isLearning && (
                    <p className="bottom-right learning-progress">
                        {learningIndex + 1}/
                        {maxLessonsBeforeTest?.toLocaleString()}
                    </p>
                )}
                {showPrevArrow && (
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="hanzi-prev"
                        onClick={handlePrevClick}
                    />
                )}
                {showNextArrow && (
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="hanzi-next"
                        onClick={handleNextClick}
                    />
                )}
                <h1 className="hanzi-dictionary-hanzi">
                    {items[0]?.simplified}{' '}
                    {items[0]?.traditional !== null
                        ? ' / ' + items[0]?.traditional
                        : ''}
                </h1>
                <h3 className="hanzi-dictionary-pinyin">
                    {items[0]?.pinyin}{' '}
                    <TTSButton text={`${items[0]?.simplified}`} />
                </h3>
                <h3 className="hanzi-dictionary-definition">
                    {items[0]?.definition}
                </h3>
            </div>
            <div className="hanzi-dictionary-details">
                <div className="hanzi-dictionary-about">
                    <div className="hanzi-dictionary-about-flex">
                        <div className="hanzi-dictionary-about-flex-1">
                            <h1>
                                {EN_UC_ABOUT_HEADER} {items[0]?.simplified}
                            </h1>
                            <div className="hanzi-dictionary-about-flex-1-1">
                                <p>
                                    {EN_UC_HSK_LEVEL_HEADER}
                                    <br />
                                    <span>HSK {items[0]?.hskLevel}</span>
                                </p>
                                <p>
                                    {EN_UC_SPEECH_TYPE_HEADER}
                                    <br />
                                    <span>{items[0]?.category}</span>
                                </p>
                                {items[0]?.radical && (
                                    <p>
                                        {EN_UC_PRIMARY_RADICAL_HEADER}
                                        <br />
                                        <span>{items[0]?.radical}</span>
                                    </p>
                                )}
                                {items[0]?.douyinzi && (
                                    <p>
                                        {EN_UC_OTHER_PRONUNCIATIONS_HEADER}
                                        <br />
                                        <span>
                                            {Array.from(
                                                new Set(
                                                    JSON.parse(
                                                        items[0]?.douyinzi
                                                    )
                                                )
                                            ).join(', ')}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="hanzi-dictionary-about-flex-2">
                            <h1>
                                {EN_UC_STROKE_ORDER_HEADER_HEADER}{' '}
                                {items[0]?.simplified}
                            </h1>
                            <div className="hanzi-writer-wrapper">
                                <div className="hanzi-writer-container">
                                    {items[0]?.simplified && (
                                        <div>
                                            <HanziWriterComponent
                                                character={items[0]?.simplified}
                                            />
                                            <p>
                                                <span>
                                                    {
                                                        items[0]
                                                            ?.simplifiedStrokeCount
                                                    }
                                                </span>{' '}
                                                {EN_LC_STROKES_HEADER}
                                            </p>
                                        </div>
                                    )}
                                    {items[0]?.traditional && (
                                        <div>
                                            <HanziWriterComponent
                                                character={
                                                    items[0]?.traditional
                                                }
                                            />
                                            <p>
                                                <span>
                                                    {
                                                        items[0]
                                                            ?.traditionalStrokeCount
                                                    }
                                                </span>{' '}
                                                {EN_LC_STROKES_HEADER}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {items[0]?.about && (
                        <div className="hanzi-dictionary-hanzi-details">
                            <h1>{EN_UC_DETAILS_HEADER}</h1>
                            <div className="hanzi-dictionary-hanzi-details-text">
                                <pre className="hanzi-dictionary-hanzi-details-pre">
                                    {highlightCharacter(
                                        items[0]?.about,
                                        items[0]?.simplified
                                    )}
                                </pre>
                            </div>
                        </div>
                    )}
                    <div className="hanzi-dictionary-about-sentences">
                        <div className="sentences-top-bar">
                            <h1>
                                {EN_UC_SENTENCES_HEADER} {items[0]?.simplified}
                            </h1>
                            <ToggleButton
                                buttonNames={{
                                    buttonOne: 'Translation',
                                    buttonTwo: 'Pinyin',
                                }}
                                onToggle={onPinyinToggle}
                            />
                        </div>

                        {Array.from(sentencesMap?.entries()).map(
                            ([sentence, { translation, pinyin }], index) => (
                                <div key={index} className="sentence-item">
                                    <div className="chinese-sentence">
                                        {highlightCharacter(
                                            sentence,
                                            items[0]?.simplified
                                        )}
                                        <TTSButton text={`${sentence}`} />
                                    </div>
                                    {isShowingPinyin ? (
                                        <div className="translation">
                                            {pinyin || translation}
                                        </div>
                                    ) : (
                                        <div className="translation">
                                            {translation}
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            {isAtReview && (
                <RedirectionNotification
                    header={EN_UC_REVIEW_HANZI_HEADER}
                    description={EN_UC_HANZI_REDIRECTION_DESCRIPTION}
                    selectedOption={updateRedirectionOption}
                />
            )}
        </div>
    );
}

const highlightCharacter = (sentence: string, character: string) => {
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
