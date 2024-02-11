import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import axios from 'axios';
import { AuthContext } from '../../../helpers/AuthContext';
import { ArrayShuffler } from '../../../scripts/ArrayShuffler';
import { Validator } from '../../../scripts/Validator';
import RedirectionNotification from '../../../components/notifications/redirection-notification/RedirectionNotification';
import '../srs-review/hanzi-review.css';
import {
    API_GET_HANZI_BY_IDS,
    API_USER_STATS_UPDATE_SRS,
    EN_LC_LOADING_TEXT,
    EN_UC_LEAVE_HEADER,
    EN_UC_HANZI_INPUT_HINT,
    EN_UC_HINT_HEADER,
    EN_UC_LEAVE_REVIEW,
    EN_UC_REVIEW_COMPLETE,
    EN_UC_REVIEW_COMPLETE_DESCRIPTION,
    EN_UC_REVIEW_CONTINUE_DESCRIPTION,
    EN_UC_REVIEW_HEADER,
    EN_UC_REVIEW_LEAVE_DESCRIPTION,
    EN_UC_SUBMIT_HEADER,
    NAV_LEARN_URL,
} from '../../../global/Strings';

function HanziReview() {
    const location = useLocation();
    const { authState } = useContext(AuthContext);
    const { state: learningState } = location;
    const [learningList, setLearningList] = useState<Set<HanziRow>>(new Set());
    const [shuffledLearningList, setShuffledLearningList] = useState<HanziRow[]>([]);
    const [currentReviewItem, setCurrentReviewItem] = useState<HanziRow>();
    const [studiedCharacters, setStudiedCharacters] = useState<HanziRow[]>();

    // 1: Sentence with blanks 2: Sentence translation 3: Sentence without blanks
    const [currentReviewSentences, setCurrentReviewSentences] = useState<[string, string, string]>(['loading...', 'loading...', 'loading...']);

    const [isSRSReview, setIsSRSReview] = useState<boolean>(false);
    const [askedToLeave, setAskedToLeave] = useState<boolean | null>(false);
    const [inputValue, setInputValue] = useState('');
    const [isUsingHint, setIsUsingHint] = useState<boolean>(false);
    const [justGotCorrectAnswer, setJustGotCorrectAnswer] = useState<boolean | null>(null);
    const [canRedirect, setCanRedirect] = useState<boolean>(false);
    const [redirectionOption, setRedirectionOption] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (learningState && learningState.learningList !== undefined) {
            const idsArr = learningState.learningList.map((obj: { id: any }) => obj.id);

            axios.post(API_GET_HANZI_BY_IDS, { ids: idsArr }).then((response) => {
                setLearningList(new Set(response.data));

                if (learningState.isReviewing) {
                    // save after every answer
                    setIsSRSReview(learningState.isReviewing);
                }
            });
        }
    }, [learningState]);

    useEffect(() => {
        if (learningList) {
            const arrayShuffler = new ArrayShuffler();
            const learningListAsArray = Array.from(learningList);
            const shuffledArray = arrayShuffler.shuffleArray(learningListAsArray);

            if (shuffledArray) {
                setShuffledLearningList(shuffledArray);
            }
        }
    }, [learningList]);

    useEffect(() => {
        setReviewData(true);
    }, [shuffledLearningList]);

    useEffect(() => {
        const retrievedJson = currentReviewItem?.sentences || '[]';
        const retrievedData = JSON.parse(retrievedJson);
        const randomIndex = Math.floor(Math.random() * retrievedData.length);

        const randomSentence = retrievedData[randomIndex]?.sentence;
        const blankSentence = randomSentence?.replaceAll(currentReviewItem?.simplified, '＿＿');

        setCurrentReviewSentences([blankSentence, retrievedData[randomIndex]?.translation, retrievedData[randomIndex]?.sentence]);
    }, [currentReviewItem]);

    const setReviewData = (sll: boolean) => {
        if (shuffledLearningList.length > 0) {
            const poppedItem = shuffledLearningList.pop()!;

            setCurrentReviewItem(poppedItem);
        } else {
            if (!sll) {
                const materialList: string[] = [];

                learningList.forEach((item) => {
                    materialList.push(item.simplified);
                });

                axios.post(API_USER_STATS_UPDATE_SRS, { userId: authState.id, material: materialList }).then((response) => {
                    if (response.data) {
                        setCanRedirect(true);
                    }
                });
            }
        }
    };

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value.trim().toLowerCase());
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (justGotCorrectAnswer === true) {
            setReviewData(false);
            setInputValue('');
            setJustGotCorrectAnswer(null);
            return;
        }

        if (currentReviewItem) {
            const inputValidator = new Validator();
            const normalizedInput = inputValidator.normalizeString(inputValue);
            const normalizedPinyin = inputValidator.normalizeString(currentReviewItem.pinyin);

            if (normalizedInput === normalizedPinyin || inputValue === currentReviewItem.simplified || inputValue === currentReviewItem.traditional) {
                handleCorrectAnswer();
            } else {
                handleWrongAnswer();
            }
        }
    };

    const handleCorrectAnswer = () => {
        if (isSRSReview) {
            if (currentReviewItem) {
                // Make a copy of studiedCharacters (or create an empty array if it's undefined)
                const studiedCharactersArr = [...(studiedCharacters || [])];

                // Add currentReviewItem to the copied array
                studiedCharactersArr.push(currentReviewItem);

                // Update the state with the new array
                setStudiedCharacters(studiedCharactersArr);
            }
        }

        setJustGotCorrectAnswer(true);
    };

    const handleWrongAnswer = () => {
        setJustGotCorrectAnswer(false);
    };

    const updateRedirectionOption = (option: boolean | null) => {
        if (isSRSReview) {
            navigate(NAV_LEARN_URL);
        }

        if (redirectionOption) {
            // Renav to more hanzi
        } else {
            navigate(NAV_LEARN_URL);
        }
    };

    const updateLeaveOption = (option: boolean | null) => {
        if (option) {
            navigate(NAV_LEARN_URL);
        } else {
            setAskedToLeave(false);
        }
    };

    const leaveReview = () => {
        if (isSRSReview) {
            axios.post(API_USER_STATS_UPDATE_SRS, { userId: authState.id, material: studiedCharacters?.map((obj) => obj.simplified) }).then((response) => {
                if (response.data) {
                    navigate(NAV_LEARN_URL);
                }
            });
        } else {
            setAskedToLeave(true);
        }
    };

    return (
        <div className="hanzi-review-wrapper">
            <div className="hanzi-review-info-div">
                <p>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={leaveReview} className="hanzi-review-space-right" />
                    {EN_UC_REVIEW_HEADER}
                </p>
                <p>{`${learningList?.size - shuffledLearningList?.length}/${learningList?.size}`}</p>
            </div>

            {!justGotCorrectAnswer ? <h1>{currentReviewSentences[0] ?? EN_LC_LOADING_TEXT}</h1> : <h1> {currentReviewSentences[2] ?? EN_LC_LOADING_TEXT} </h1>}
            <h3>{currentReviewSentences[1] ?? EN_LC_LOADING_TEXT}</h3>
            {isUsingHint && <h4 className="hanzi-review-hint">{currentReviewItem?.definition}</h4>}
            <form onSubmit={handleSubmit} className="hanzi-review-answer-bar">
                <button
                    type="button"
                    onClick={() => {
                        setIsUsingHint(!isUsingHint);
                    }}>
                    {EN_UC_HINT_HEADER}
                </button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    spellCheck={false}
                    placeholder={EN_UC_HANZI_INPUT_HINT}
                    className={justGotCorrectAnswer === true ? 'hanzi-correct-color' : justGotCorrectAnswer === false ? 'hanzi-wrong-color' : ''}
                />
                <button type="submit">{justGotCorrectAnswer ? EN_UC_LEAVE_HEADER : EN_UC_SUBMIT_HEADER}</button>
            </form>
            {isSRSReview ? (
                <>
                    {canRedirect && (
                        <RedirectionNotification header={EN_UC_REVIEW_COMPLETE} description={EN_UC_REVIEW_COMPLETE_DESCRIPTION} oneOption={true} selectedOption={updateRedirectionOption} />
                    )}
                </>
            ) : (
                <>
                    {canRedirect && <RedirectionNotification header={EN_UC_REVIEW_COMPLETE} description={EN_UC_REVIEW_CONTINUE_DESCRIPTION} selectedOption={updateRedirectionOption} />}
                    {askedToLeave && <RedirectionNotification header={EN_UC_LEAVE_REVIEW} description={EN_UC_REVIEW_LEAVE_DESCRIPTION} selectedOption={updateLeaveOption} />}
                </>
            )}
        </div>
    );
}

export default HanziReview;
