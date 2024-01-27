import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { EN_LC_LOADING_TEXT, EN_UC_CHARACTER_PRACTICE_HEADER, EN_UC_CONTINUE_HEADER, EN_UC_PINYIN_PRACTICE_HEADER, EN_UC_TRADITIONAL_PRACTICE_HEADER } from '../../../global/Ts/Strings';
import '../../styles/Learn/HanziReview.css';
import { useNavigate } from 'react-router-dom';
import RedirectionNotification from '../../../components/components/Boxes/RedirectionNotification';
import { ArrayShuffler } from '../../../global/Ts/ArrayShuffler';
import { HanziContext } from '../../../helpers/HanziContext';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Validator } from '../../../global/Ts/Validator';
import { AnimationManager } from '../../../global/Ts/AnimationManager';
import { PinyinManager } from '../../../global/Ts/PinyinManager';

function Practice({ isVerified, practiceMaterial, lessonType }: LessonProps) {
    const allHanziContext = useContext(HanziContext);
    const [askedToLeave, setAskedToLeave] = useState<boolean | null>(false);
    const [practiceName, setPracticeName] = useState<string>('');
    const [materialQueue, setMaterialQueue] = useState<HanziRow[]>([]);
    const [currentQuestionAnswerChoices, setCurrentQuestionAnswerChoices] = useState<string[]>([]);
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState<HanziRow>();
    const [buttonOptionToAnswer, setButtonOptionToAnswer] = useState<number[]>([0, 0, 0, 0]);

    const [mainQuestionText, setMainQuestionText] = useState<string>('');
    const [subQuestionText, setSubQuestionText] = useState<string>('');

    const [canMoveOn, setCanMoveOn] = useState<boolean>(false);
    const [userCorrectStreak, setUserCorrectStreak] = useState<number>(0);
    const [fireAnimationName, setFireAnimationName] = useState<string>('');

    const [shouldLowerFontSize, setShouldLowerFontSize] = useState<boolean>(false);

    const animationManager = new AnimationManager();
    const pinyinManager = new PinyinManager();
    const validator = new Validator();
    const navigate = useNavigate();

    // Set this higher or lower for longer or shorter gaps between
    //wrong answer review...
    const MAX_QUESTIONS_BEFORE_WRONG_RENEW = 3;
    const MAX_ANSWER_CHOICES = 4;

    useEffect(() => {
        if (!isVerified || !practiceMaterial) {
            navigate('/practice');
        }

        setPracticeSettings();
    }, []);

    useMemo(() => {
        animationManager.setStreakFireAnimation(userCorrectStreak, setFireAnimationName);
    }, [userCorrectStreak]);

    const setPracticeSettings = () => {
        const allHanzi = allHanziContext.allHanziState;
        const practiceMaterialSet = new Set(practiceMaterial?.map((obj) => obj.id));
        const materialFilteredHanzi = allHanzi.filter((obj) => practiceMaterialSet.has(obj.id));
        let onlyMaterialFilteredArr = [] as HanziRow[];

        let practiceName = '';
        let shouldLowerFontSize = false;

        switch (lessonType) {
            case 'pinyin':
                practiceName = EN_UC_PINYIN_PRACTICE_HEADER;
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter((obj) => obj.simplified !== null);
                break;
            case 'character':
                practiceName = EN_UC_CHARACTER_PRACTICE_HEADER;
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter((obj) => obj.pinyin !== null);
                break;
            case 'traditional':
                practiceName = EN_UC_TRADITIONAL_PRACTICE_HEADER;
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter((obj) => obj.traditional !== null);
                break;
            case 'bookmarked':
                practiceName = 'Bookmarked character practice';
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter((obj) => obj.pinyin !== null);
                break;
            case 'definition':
                practiceName = 'Character definition practice';
                shouldLowerFontSize = true;
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter((obj) => obj.definition !== null);
                break;
            case 'tone':
                practiceName = 'Character tone practice';
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter((obj) => obj.pinyin !== null);
                break;
            case 'measure':
                practiceName = 'Measure words practice';
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter((obj) => obj.simplified !== null);
                break;
            default:
                navigate('/practice');
                return;
        }

        setPracticeName(practiceName);
        setShouldLowerFontSize(shouldLowerFontSize);
        generateQueue(onlyMaterialFilteredArr);
    };

    const generateQueue = (material: HanziRow[]) => {
        // Shuffle the filtered learning material, and set the queue.
        const arrayShuffler = new ArrayShuffler();
        const shuffledQueue = arrayShuffler.shuffleArray(material) ?? [];

        setMaterialQueue(shuffledQueue);
    };

    useEffect(() => {
        generateCurrentQuestion();
    }, [materialQueue]);

    const generateCurrentQuestion = () => {
        const currentAnswer = materialQueue[0];
        setCurrentQuestionAnswer(currentAnswer);

        const newAnswerChoices: Set<string> = new Set();

        let answerChoice = ' ';
        let mainHeader = ' ';
        let subHeader = ' ';
        let answerType = ' ';

        // Pinyin -> simplified choices
        // Character -> pinyin choices
        // Traditional -> simplified choices
        // Definition -> definition choices
        // Tone -> pinyin choices
        switch (lessonType) {
            case 'pinyin':
                answerChoice = currentAnswer?.simplified;
                mainHeader = currentAnswer?.pinyin;
                subHeader = currentAnswer?.definition;
                answerType = 'simplified';
                break;
            case 'character':
            case 'bookmarked':
            case 'tone':
                answerChoice = currentAnswer?.pinyin;
                mainHeader = currentAnswer?.simplified;
                subHeader = currentAnswer?.definition;
                answerType = 'pinyin';
                break;
            case 'traditional':
                answerChoice = currentAnswer?.traditional;
                mainHeader = currentAnswer?.simplified;
                subHeader = currentAnswer?.definition;
                answerType = 'traditional';
                break;
            case 'definition':
                answerChoice = validator.formatDefinition(currentQuestionAnswer!?.definition);
                mainHeader = currentAnswer?.simplified;
                subHeader = currentAnswer?.pinyin;
                answerType = 'definition';
                break;
            case 'measure':
                answerChoice = currentAnswer?.simplified;
                mainHeader = currentAnswer?.definition;
                answerType = 'simplified';
                break;
        }

        newAnswerChoices.add(answerChoice);
        setMainQuestionText(mainHeader);
        setSubQuestionText(subHeader);

        while (newAnswerChoices.size < MAX_ANSWER_CHOICES) {
            let randomCharacter = generateRandomCharacter(answerType);
            newAnswerChoices.add(randomCharacter);
        }

        // Shuffle the options again to make sure,
        //then set the options, and reset the button states.
        const shuffledAnswers = Array.from(newAnswerChoices);
        const arrayShuffler = new ArrayShuffler();
        const finalShuffledAnswers: string[] = arrayShuffler.shuffleArray(shuffledAnswers) ?? [];

        setCurrentQuestionAnswerChoices(finalShuffledAnswers);
        setButtonOptionToAnswer([0, 0, 0, 0]);
    };

    const generateRandomCharacter = (answerType: string): string => {
        if (lessonType === 'tone') {
            // Try generating similar pinyin
            const currentAnswer = currentQuestionAnswer?.pinyin ?? '';

            const newFillerPinyin = pinyinManager.randomizeTones(currentAnswer);

            if (newFillerPinyin === '') {
                return Math.random().toString();
            }

            return newFillerPinyin;
        }

        if (materialQueue && materialQueue.length === 0) {
            return Math.random().toString();
        }

        const randomIndex = Math.floor(Math.random() * materialQueue.length);
        switch (answerType) {
            case 'simplified':
                return materialQueue[randomIndex].simplified;
            case 'traditional':
                return materialQueue[randomIndex].traditional;
            case 'pinyin':
                return materialQueue[randomIndex].pinyin;
            case 'definition':
                return validator.formatDefinition(materialQueue[randomIndex].definition);
            default:
                return Math.random().toString();
        }
    };

    const updateLeaveOption = (option: boolean | null) => {
        if (option) {
            navigate('/practice');
        } else {
            setAskedToLeave(false);
        }
    };

    const checkAnswer = (character: string) => {
        const btnIndex = currentQuestionAnswerChoices.indexOf(character);

        // If the button is already wrong or right or if the answer was already answered.
        if (buttonOptionToAnswer[btnIndex] === 2 || buttonOptionToAnswer[btnIndex] === 1 || buttonOptionToAnswer.includes(1)) {
            return;
        }

        if (
            character === currentQuestionAnswer?.traditional ||
            character === currentQuestionAnswer?.simplified ||
            character === currentQuestionAnswer?.pinyin ||
            character === validator.formatDefinition(currentQuestionAnswer?.definition || '')
        ) {
            // Correct answer
            const newButtonChoicesArray = [...buttonOptionToAnswer];
            newButtonChoicesArray[btnIndex] = 1;

            setButtonOptionToAnswer(newButtonChoicesArray);

            setCanMoveOn(true);
        } else {
            // Wrong answer
            const newButtonChoicesArray = [...buttonOptionToAnswer];
            newButtonChoicesArray[btnIndex] = 2;

            setButtonOptionToAnswer(newButtonChoicesArray);
        }
    };

    const moveOn = () => {
        // Got an answer wrong -> bring it closer to review again
        if (canMoveOn) {
            if (buttonOptionToAnswer.includes(2)) {
                const randomPlacement = Math.floor(Math.random() * MAX_QUESTIONS_BEFORE_WRONG_RENEW) + 1;

                setMaterialQueue((prevQueue) => {
                    const newQueue = [...prevQueue];
                    const removedElement = newQueue.splice(0, 1)[0];
                    const adjustedPlacement = randomPlacement % (newQueue.length + 1);
                    newQueue.splice(adjustedPlacement, 0, removedElement);
                    return newQueue;
                });

                setUserCorrectStreak(0);
            } else {
                setMaterialQueue((prevQueue) => {
                    const newQueue = [...prevQueue];
                    newQueue.push(newQueue.shift()!);
                    return newQueue;
                });

                setUserCorrectStreak(Number(userCorrectStreak) + 1);
            }

            setCanMoveOn(false);
        }
    };

    return (
        <div className="hanzi-review-wrapper">
            <div className="hanzi-review-info-div">
                <p>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => setAskedToLeave(true)} className="hanzi-review-space-right" />
                    {practiceName}
                </p>
                <div className="hanzi-review-streak-div">
                    <FontAwesomeIcon icon={faFire} className={`hanzi-review-streak-icon ${fireAnimationName}`} />
                    <span className="hanzi-review-streak-text">{userCorrectStreak.toString()}</span>
                </div>
            </div>
            <div className="hanzi-review-details-div">
                <h1 className="hanzi-review-bigger-h1">{mainQuestionText || EN_LC_LOADING_TEXT}</h1>
                <h3>{subQuestionText || EN_LC_LOADING_TEXT}</h3>
            </div>
            <div className="hanzi-review-four-options-div">
                <div
                    className={`hanzi-review-four-option-item
                      ${buttonOptionToAnswer[0] === 1 ? 'hanzi-correct-background-color' : buttonOptionToAnswer[0] === 2 ? 'hanzi-wrong-background-color' : ''} 
                      ${shouldLowerFontSize ? 'hanzi-review-lower-font' : ''}`}
                    onClick={() => checkAnswer(currentQuestionAnswerChoices[0])}>
                    {currentQuestionAnswerChoices[0] ?? EN_LC_LOADING_TEXT}
                </div>

                <div
                    className={`hanzi-review-four-option-item
                      ${buttonOptionToAnswer[1] === 1 ? 'hanzi-correct-background-color' : buttonOptionToAnswer[1] === 2 ? 'hanzi-wrong-background-color' : ''}
                      ${shouldLowerFontSize ? 'hanzi-review-lower-font' : ''}`}
                    onClick={() => checkAnswer(currentQuestionAnswerChoices[1])}>
                    {currentQuestionAnswerChoices[1] ?? EN_LC_LOADING_TEXT}
                </div>

                <div
                    className={`hanzi-review-four-option-item $
                      ${buttonOptionToAnswer[2] === 1 ? 'hanzi-correct-background-color' : buttonOptionToAnswer[2] === 2 ? 'hanzi-wrong-background-color' : ''}
                      ${shouldLowerFontSize ? 'hanzi-review-lower-font' : ''}`}
                    onClick={() => checkAnswer(currentQuestionAnswerChoices[2])}>
                    {currentQuestionAnswerChoices[2] ?? EN_LC_LOADING_TEXT}
                </div>

                <div
                    className={`hanzi-review-four-option-item
                      ${buttonOptionToAnswer[3] === 1 ? 'hanzi-correct-background-color' : buttonOptionToAnswer[3] === 2 ? 'hanzi-wrong-background-color' : ''} 
                      ${shouldLowerFontSize ? 'hanzi-review-lower-font' : ''}`}
                    onClick={() => checkAnswer(currentQuestionAnswerChoices[3])}>
                    {currentQuestionAnswerChoices[3] ?? EN_LC_LOADING_TEXT}
                </div>
            </div>
            <div className={canMoveOn ? 'hanzi-review-submit-button-enabled' : 'hanzi-review-submit-button-disabled'} onClick={() => moveOn()}>
                {EN_UC_CONTINUE_HEADER}
            </div>

            {askedToLeave && <RedirectionNotification header="Leave practice?" description="" selectedOption={updateLeaveOption} />}
        </div>
    );
}

export default Practice;
