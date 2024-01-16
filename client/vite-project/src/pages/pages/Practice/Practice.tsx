import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import {
    EN_LC_LOADING_TEXT,
    EN_UC_CHARACTER_PRACTICE_HEADER,
    EN_UC_CONTINUE_HEADER,
    EN_UC_HINT_HEADER,
    EN_UC_PINYIN_PRACTICE_HEADER,
    EN_UC_TRADITIONAL_PRACTICE_HEADER,
} from '../../../global/Ts/Strings';
import '../../styles/Learn/HanziReview.css';
import { useNavigate } from 'react-router-dom';
import RedirectionNotification from '../../../components/components/Boxes/RedirectionNotification';
import { ArrayShuffler } from '../../../global/Ts/ArrayShuffler';
import { HanziContext } from '../../../helpers/HanziContext';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Validator } from '../../../global/Ts/Validator';

function Practice({ isVerified, practiceMaterial, lessonType }: LessonProps) {
    const allHanziContext = useContext(HanziContext);
    const [askedToLeave, setAskedToLeave] = useState<boolean | null>(false);
    const [practiceName, setPracticeName] = useState<string>('');
    const [materialQueue, setMaterialQueue] = useState<HanziRow[]>([]);
    const [currentQuestionAnswerChoices, setCurrentQuestionAnswerChoices] =
        useState<string[]>([]);
    const [currentQuestionAnswer, setCurrentQuestionAnswer] =
        useState<HanziRow>();
    const [buttonOptionToAnswer, setButtonOptionToAnswer] = useState<number[]>([
        0, 0, 0, 0,
    ]);

    const [mainQuestionText, setMainQuestionText] = useState<string>('');
    const [subQuestionText, setSubQuestionText] = useState<string>('');

    const [canMoveOn, setCanMoveOn] = useState<boolean>(false);
    const [userCorrectStreak, setUserCorrectStreak] = useState<number>(0);
    const [fireAnimationName, setFireAnimationName] = useState<string>('');
    const [shouldLowerFontSize, setShouldLowerFontSize] =
        useState<boolean>(false);

    // Traditional practice
    const [traditionalHanziList, setTraditionalHanziList] = useState<string[]>(
        []
    );
    const validator = new Validator();

    const navigate = useNavigate();

    // Set this higher or lower for longer or shorter gaps between
    //wrong answer review...
    const MAX_QUESTIONS_BEFORE_WRONG_RENEW = 3;

    useEffect(() => {
        if (!isVerified || !practiceMaterial) {
            navigate('/practice');
        }

        if (practiceMaterial) {
            generateQueue(practiceMaterial);
        }

        // If the lesson type exists then set the title for the practice,
        //otherwise leave, as it doesn't exist.
        switch (lessonType) {
            case 'pinyin':
                setPracticeName(EN_UC_PINYIN_PRACTICE_HEADER);
                break;
            case 'character':
                setPracticeName(EN_UC_CHARACTER_PRACTICE_HEADER);
                break;
            case 'traditional':
                setPracticeName(EN_UC_TRADITIONAL_PRACTICE_HEADER);
                break;
            case 'bookmarked':
                setPracticeName('Bookmarked character practice');
                break;
            case 'definition':
                setPracticeName('Character definition practice');
                setShouldLowerFontSize(true);
                break;
            case 'tone':
                setPracticeName('Character tone practice');
                break;
            default:
                navigate('/practice');
                break;
        }
    }, []);

    const generateQueue = (material: HanziRow[]) => {
        const allHanzi = allHanziContext.allHanziState;

        // Traditional requires more work...
        if (lessonType === 'traditional') {
            const onlyTraditionalArr = allHanzi?.filter(
                (obj) => obj.traditional !== null
            );
            setTraditionalHanziList(
                onlyTraditionalArr.map((obj) => obj.traditional)
            );
        }

        // Characters in the provided set (only part of a row)
        const practiceMaterialSet = new Set(
            practiceMaterial?.map((obj) => obj.id)
        );

        // Full rows of the characters
        const materialFilteredHanzi = allHanzi.filter((obj) =>
            practiceMaterialSet.has(obj.id)
        );

        let onlyMaterialFilteredArr = [] as HanziRow[];

        // Again check the lesson type to set the filter options,
        //for each set, make sure that the needed values aren't null
        //if the lesson doesn't exist (and you didn't leave), leave.
        switch (lessonType) {
            case 'pinyin':
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter(
                    (obj) => obj.simplified !== null
                );
                break;
            case 'character':
            case 'bookmarked':
            case 'tone':
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter(
                    (obj) => obj.pinyin !== null
                );
                break;
            case 'traditional':
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter(
                    (obj) => obj.traditional !== null
                );
                break;
            case 'definition':
                onlyMaterialFilteredArr = materialFilteredHanzi?.filter(
                    (obj) => obj.definition !== null
                );
                break;
            default:
                navigate('/practice');
                break;
        }

        // Shuffle the filtered learning material, and set the queue.
        const arrayShuffler = new ArrayShuffler();
        const shuffledQueue =
            arrayShuffler.shuffleArray(onlyMaterialFilteredArr) ?? [];

        setMaterialQueue(shuffledQueue);
    };

    useEffect(() => {
        generateCurrentQuestion();
    }, [materialQueue]);

    const generateCurrentQuestion = () => {
        const currentAnswer = materialQueue[0];
        setCurrentQuestionAnswer(currentAnswer);
    };

    useEffect(() => {
        const newAnswerChoices: Set<string> = new Set();

        // First add the correct answer to the choices (of four)
        //then set the main header to a line, and the second header as well.
        switch (lessonType) {
            case 'pinyin':
                newAnswerChoices.add(currentQuestionAnswer!?.simplified);
                setMainQuestionText(currentQuestionAnswer!?.pinyin);
                setSubQuestionText(currentQuestionAnswer!?.definition);
                break;
            case 'character':
            case 'bookmarked':
            case 'tone':
                newAnswerChoices.add(currentQuestionAnswer!?.pinyin);
                setMainQuestionText(currentQuestionAnswer!?.simplified);
                setSubQuestionText(currentQuestionAnswer!?.definition);
                break;
            case 'traditional':
                newAnswerChoices.add(currentQuestionAnswer!?.traditional);
                setMainQuestionText(currentQuestionAnswer!?.simplified);
                setSubQuestionText(currentQuestionAnswer!?.definition);
                break;
            case 'definition':
                newAnswerChoices.add(
                    validator.formatDefinition(
                        currentQuestionAnswer!?.definition
                    )
                );
                setMainQuestionText(currentQuestionAnswer!?.simplified);
                setSubQuestionText(currentQuestionAnswer!?.pinyin);
                break;
            default:
                navigate('/practice');
                break;
        }

        // 4 choices to choose from.
        const maxUniqueCharacters = 4;

        while (newAnswerChoices.size < maxUniqueCharacters) {
            let randomCharacter = generateRandomCharacter();
            newAnswerChoices.add(randomCharacter);
        }

        // Shuffle the options again to make sure,
        //then set the options, and reset the button states.
        const shuffledAnswers = Array.from(newAnswerChoices);
        const arrayShuffler = new ArrayShuffler();
        const finalShuffledAnswers: string[] =
            arrayShuffler.shuffleArray(shuffledAnswers) ?? [];

        setCurrentQuestionAnswerChoices(finalShuffledAnswers);
        setButtonOptionToAnswer([0, 0, 0, 0]);
    }, [currentQuestionAnswer]);

    const generateRandomCharacter = (): string => {
        if (lessonType === 'traditional') {
            // Traditional requires extra work to generate random character.
            if (traditionalHanziList && traditionalHanziList.length === 0) {
                return Math.random().toString();
            }

            const randomIndex = Math.floor(
                Math.random() * traditionalHanziList.length
            );

            return traditionalHanziList[randomIndex].length !==
                currentQuestionAnswer!?.simplified.length
                ? generateRandomCharacter()
                : traditionalHanziList[randomIndex];
        } else if (lessonType === 'tone') {
            // Try generating similar pinyin
            const currentAnswer = currentQuestionAnswer?.pinyin ?? '';

            const newFillerPinyin = randomizeTones(currentAnswer);

            if (newFillerPinyin === '') {
                return Math.random().toString();
            }

            return newFillerPinyin;
        }

        if (materialQueue && materialQueue.length === 0) {
            return Math.random().toString();
        }

        const randomIndex = Math.floor(Math.random() * materialQueue.length);

        // Pinyin -> simplified choices
        // Character -> pinyin choices
        // Traditional -> simplified choices
        // Definition -> definition choices
        // Tone -> pinyin choices
        switch (lessonType) {
            case 'pinyin':
                return materialQueue[randomIndex].simplified;
            case 'character':
            case 'bookmarked':
                return materialQueue[randomIndex].pinyin;
            case 'definition':
                return validator.formatDefinition(
                    materialQueue[randomIndex].definition
                );
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

    const leaveReview = () => {
        setAskedToLeave(true);
    };

    const checkAnswer = (character: string) => {
        const btnIndex = currentQuestionAnswerChoices.indexOf(character);

        // If the button is already wrong or right or if the answer was already answered.
        if (
            buttonOptionToAnswer[btnIndex] === 2 ||
            buttonOptionToAnswer[btnIndex] === 1 ||
            buttonOptionToAnswer.includes(1)
        ) {
            return;
        }

        if (
            character === currentQuestionAnswer?.traditional ||
            character === currentQuestionAnswer?.simplified ||
            character === currentQuestionAnswer?.pinyin ||
            character ===
                validator.formatDefinition(
                    currentQuestionAnswer?.definition || ''
                )
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
                const randomPlacement =
                    Math.floor(
                        Math.random() * MAX_QUESTIONS_BEFORE_WRONG_RENEW
                    ) + 1;

                setMaterialQueue((prevQueue) => {
                    const newQueue = [...prevQueue];
                    const removedElement = newQueue.splice(0, 1)[0];
                    const adjustedPlacement =
                        randomPlacement % (newQueue.length + 1);
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

    useEffect(() => {
        // Streak 1: 5 correct, Streak 2: 20 correct...
        if (userCorrectStreak !== undefined) {
            if (userCorrectStreak >= 100) {
                setFireAnimationName('streak-animation-max');
            } else if (userCorrectStreak >= 50) {
                setFireAnimationName('streak-animation-high');
            } else if (userCorrectStreak >= 20) {
                setFireAnimationName('streak-animation-med');
            } else if (userCorrectStreak >= 5) {
                setFireAnimationName('streak-animation-min');
            } else {
                setFireAnimationName('');
            }
        }
    }, [userCorrectStreak]);

    const randomizeTones = (input: string): string => {
        const toneMap: { [key: string]: string[] } = {
            a: ['ā', 'á', 'ǎ', 'à', 'a'],
            e: ['ē', 'é', 'ě', 'è', 'e'],
            i: ['ī', 'í', 'ǐ', 'ì', 'i'],
            o: ['ō', 'ó', 'ǒ', 'ò', 'o'],
            u: ['ū', 'ú', 'ǔ', 'ù', 'u'],
            ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'],
        };
        const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'ü']);

        if (validator.normalizeString(input) !== input) {
            // Switch out the tone marks
            let newPinyin = input;
            for (let i = 0; i < input.length; i++) {
                const normalizedChar = validator.normalizeString(input[i]);
                if (input[i] !== normalizedChar) {
                    const randomIndex = Math.floor(Math.random() * 5);
                    const randomTone = toneMap[normalizedChar][randomIndex];

                    newPinyin =
                        newPinyin.slice(0, i) +
                        randomTone +
                        newPinyin.slice(i + 1);
                }
            }

            return newPinyin;
        } else {
            // Make new options
            for (let i = 0; i < input.length; i++) {
                if (vowels.has(input[i])) {
                    // Cut it off before it can reach another flat vowel (4)
                    const normalizedChar = validator.normalizeString(input[i]);
                    const randomIndex = Math.floor(Math.random() * 4);
                    const randomTone = toneMap[normalizedChar][randomIndex];

                    const newPinyin =
                        input.slice(0, i) + randomTone + input.slice(i + 1);

                    return newPinyin;
                }
            }
        }

        return '';
    };

    return (
        <div className="hanzi-review-wrapper">
            <div className="hanzi-review-info-div">
                <p>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={leaveReview}
                        className="hanzi-review-space-right"
                    />
                    {practiceName}
                </p>
                <div className="hanzi-review-streak-div">
                    <FontAwesomeIcon
                        icon={faFire}
                        className={`hanzi-review-streak-icon ${fireAnimationName}`}
                    />
                    <span className="hanzi-review-streak-text">
                        {userCorrectStreak.toString()}
                    </span>
                </div>
            </div>
            <div className="hanzi-review-details-div">
                <h1 className="hanzi-review-bigger-h1">
                    {mainQuestionText || EN_LC_LOADING_TEXT}
                </h1>
                <h3>{subQuestionText || EN_LC_LOADING_TEXT}</h3>
            </div>
            <div className="hanzi-review-four-options-div">
                <div
                    className={`hanzi-review-four-option-item
                      ${
                          buttonOptionToAnswer[0] === 1
                              ? 'hanzi-correct-background-color'
                              : buttonOptionToAnswer[0] === 2
                              ? 'hanzi-wrong-background-color'
                              : ''
                      } 
                      ${shouldLowerFontSize ? 'hanzi-review-lower-font' : ''}`}
                    onClick={() =>
                        checkAnswer(currentQuestionAnswerChoices[0])
                    }>
                    {currentQuestionAnswerChoices[0] ?? EN_LC_LOADING_TEXT}
                </div>

                <div
                    className={`hanzi-review-four-option-item
                      ${
                          buttonOptionToAnswer[1] === 1
                              ? 'hanzi-correct-background-color'
                              : buttonOptionToAnswer[1] === 2
                              ? 'hanzi-wrong-background-color'
                              : ''
                      }
                      ${shouldLowerFontSize ? 'hanzi-review-lower-font' : ''}`}
                    onClick={() =>
                        checkAnswer(currentQuestionAnswerChoices[1])
                    }>
                    {currentQuestionAnswerChoices[1] ?? EN_LC_LOADING_TEXT}
                </div>

                <div
                    className={`hanzi-review-four-option-item $
                      ${
                          buttonOptionToAnswer[2] === 1
                              ? 'hanzi-correct-background-color'
                              : buttonOptionToAnswer[2] === 2
                              ? 'hanzi-wrong-background-color'
                              : ''
                      }
                      ${shouldLowerFontSize ? 'hanzi-review-lower-font' : ''}`}
                    onClick={() =>
                        checkAnswer(currentQuestionAnswerChoices[2])
                    }>
                    {currentQuestionAnswerChoices[2] ?? EN_LC_LOADING_TEXT}
                </div>

                <div
                    className={`hanzi-review-four-option-item
                      ${
                          buttonOptionToAnswer[3] === 1
                              ? 'hanzi-correct-background-color'
                              : buttonOptionToAnswer[3] === 2
                              ? 'hanzi-wrong-background-color'
                              : ''
                      } 
                      ${shouldLowerFontSize ? 'hanzi-review-lower-font' : ''}`}
                    onClick={() =>
                        checkAnswer(currentQuestionAnswerChoices[3])
                    }>
                    {currentQuestionAnswerChoices[3] ?? EN_LC_LOADING_TEXT}
                </div>
            </div>
            <div
                className={
                    canMoveOn
                        ? 'hanzi-review-submit-button-enabled'
                        : 'hanzi-review-submit-button-disabled'
                }
                onClick={() => moveOn()}>
                {EN_UC_CONTINUE_HEADER}
            </div>

            {askedToLeave && (
                <RedirectionNotification
                    header="Leave practice?"
                    description=""
                    selectedOption={updateLeaveOption}
                />
            )}
        </div>
    );
}

export default Practice;
