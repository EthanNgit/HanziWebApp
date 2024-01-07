import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import {
    EN_LC_LOADING_TEXT,
    EN_UC_CONTINUE_HEADER,
    EN_UC_HINT_HEADER,
} from '../../../global/Ts/Strings';
import '../../styles/Learn/HanziReview.css';
import { useNavigate } from 'react-router-dom';
import RedirectionNotification from '../../../components/components/Boxes/RedirectionNotification';
import { ArrayShuffler } from '../../../global/Ts/ArrayShuffler';
import { HanziContext } from '../../../helpers/HanziContext';
import { faFire } from '@fortawesome/free-solid-svg-icons';

function Traditional({ isVerified, practiceMaterial }: LessonProps) {
    const allHanziContext = useContext(HanziContext);
    const [askedToLeave, setAskedToLeave] = useState<boolean | null>(false);
    const [materialQueue, setMaterialQueue] = useState<HanziRow[]>([]);
    const [traditionalHanziList, setTraditionalHanziList] = useState<string[]>(
        []
    );
    const [currentQuestionAnswerChoices, setCurrentQuestionAnswerChoices] =
        useState<string[]>([]);
    const [currentQuestionAnswer, setCurrentQuestionAnswer] =
        useState<HanziRow>();
    const [buttonOptionToAnswer, setButtonOptionToAnswer] = useState<number[]>([
        0, 0, 0, 0,
    ]);
    const [canMoveOn, setCanMoveOn] = useState<boolean>(false);
    const [userCorrectStreak, setUserCorrectStreak] = useState<number>(0);
    const [fireAnimationName, setFireAnimationName] = useState<string>('');
    const navigate = useNavigate();

    const MAX_QUESTIONS_BEFORE_TRADITIONAL_RENEW = 3;

    // Cycle algorithm
    // Shuffle array
    // if you get it wrong add it in the queue quicker
    // if you get it right add it to the end of the queue

    useEffect(() => {
        if (!isVerified || !practiceMaterial) {
            navigate('/practice');
        }

        if (practiceMaterial) {
            generateQueue(practiceMaterial);
        }
    }, []);

    const generateQueue = (material: HanziRow[]) => {
        const allHanzi = allHanziContext.allHanziState;

        const onlyTraditionalArr = allHanzi?.filter(
            (obj) => obj.traditional !== null
        );
        setTraditionalHanziList(
            onlyTraditionalArr.map((obj) => obj.traditional)
        );
        console.log(
            onlyTraditionalArr.map((obj) => obj.traditional),
            'asdasd'
        );

        const practiceMaterialSet = new Set(
            practiceMaterial?.map((obj) => obj.id)
        );
        const materialFilteredHanzi = allHanzi.filter((obj) =>
            practiceMaterialSet.has(obj.id)
        );
        const onlyMaterialTraditionalArr = materialFilteredHanzi?.filter(
            (obj) => obj.traditional !== null
        );

        const arrayShuffler = new ArrayShuffler();
        const shuffledQueue =
            arrayShuffler.shuffleArray(onlyMaterialTraditionalArr) ?? [];

        setMaterialQueue(shuffledQueue);
    };

    useEffect(() => {
        generateCurrentQuestion();
        console.log(materialQueue);
    }, [materialQueue]);

    const generateCurrentQuestion = () => {
        const currentAnswer = materialQueue[0];
        setCurrentQuestionAnswer(currentAnswer);

        console.log(currentAnswer, 'current question answer');

        const newAnswerChoices: Set<string> = new Set();
        newAnswerChoices.add(currentAnswer?.traditional);

        const maxUniqueCharacters = 4;

        while (newAnswerChoices.size < maxUniqueCharacters) {
            let randomCharacter = generateRandomTraditionalCharacter();
            newAnswerChoices.add(randomCharacter);
        }

        const shuffledAnswers = Array.from(newAnswerChoices);
        const arrayShuffler = new ArrayShuffler();
        const finalShuffledAnswers: string[] =
            arrayShuffler.shuffleArray(shuffledAnswers) ?? [];

        console.log(finalShuffledAnswers, 'shuffled answers');
        setCurrentQuestionAnswerChoices(finalShuffledAnswers);
        setButtonOptionToAnswer([0, 0, 0, 0]);
        // Move the first element to the end of the array
        //

        // Update currentQuestionAnswerChoices and trigger re-render
        //setMaterialQueue(finalShuffledAnswers);
    };

    const generateRandomTraditionalCharacter = (): string => {
        if (traditionalHanziList && traditionalHanziList.length === 0) {
            return Math.random().toString();
        }

        const randomIndex = Math.floor(
            Math.random() * traditionalHanziList.length
        );
        return traditionalHanziList[randomIndex];
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

        if (character === currentQuestionAnswer?.traditional) {
            console.log(
                'correct',
                character,
                currentQuestionAnswer?.traditional
            );
            const newButtonChoicesArray = [...buttonOptionToAnswer];
            newButtonChoicesArray[btnIndex] = 1;

            setButtonOptionToAnswer(newButtonChoicesArray);

            setCanMoveOn(true);
        } else {
            console.log('false');
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
                        Math.random() * MAX_QUESTIONS_BEFORE_TRADITIONAL_RENEW
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
        if (userCorrectStreak) {
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

    return (
        <div className="hanzi-review-wrapper">
            <div className="hanzi-review-info-div">
                <p>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={leaveReview}
                        className="hanzi-review-space-right"
                    />
                    Traditional character practice
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
            <div className="hanzi-traditional-review-details-div">
                <h1 className="hanzi-review-bigger-h1">
                    {materialQueue[0]?.simplified || EN_LC_LOADING_TEXT}
                </h1>
                <h3>{materialQueue[0]?.definition || EN_LC_LOADING_TEXT}</h3>
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
                      }`}
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
                      }`}
                    onClick={() =>
                        checkAnswer(currentQuestionAnswerChoices[1])
                    }>
                    {currentQuestionAnswerChoices[1] ?? EN_LC_LOADING_TEXT}
                </div>

                <div
                    className={`hanzi-review-four-option-item 
                      ${
                          buttonOptionToAnswer[2] === 1
                              ? 'hanzi-correct-background-color'
                              : buttonOptionToAnswer[2] === 2
                              ? 'hanzi-wrong-background-color'
                              : ''
                      }`}
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
                      }`}
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

export default Traditional;
