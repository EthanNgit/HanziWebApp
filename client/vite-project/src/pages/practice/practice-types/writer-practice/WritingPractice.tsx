import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { EN_UC_LEAVE_HEADER, EN_UC_REVIEW_HEADER } from '../../../../global/Strings';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { useLocation, useNavigate } from 'react-router-dom';
import { HanziContext } from '../../../../helpers/HanziContext';
import { faFire } from '@fortawesome/free-solid-svg-icons/faFire';
import HanziQuizzerComponent, { HanziQuizzerComponentRef } from '../../../../components/hanzi-writer-api/quizzer/HanziQuizzerComponent';
import { AnimationManager } from '../../../../scripts/AnimationManager';
import RedirectionNotification from '../../../../components/notifications/redirection-notification/RedirectionNotification';

function WritingPractice({ lessonType }: LessonProps) {
    const location = useLocation();
    const { state: learningState } = location;
    const allHanziContext = useContext(HanziContext);
    const hanziQuizzerRef = useRef<HanziQuizzerComponentRef>(null);

    const [availableHanzi, setAvailableHanzi] = useState<HanziRow[]>();
    const [currentHanzi, setCurrentHanzi] = useState<HanziRow>();

    const [justGotCorrectAnswer, setJustGotCorrectAnswer] = useState<boolean | null>(null);
    const [currentMistakes, setCurrentMistakes] = useState<number>(-1);

    const [userCorrectStreak, setUserCorrectStreak] = useState<number>(0);
    const [fireAnimationName, setFireAnimationName] = useState<string>('');

    const [askedToLeave, setAskedToLeave] = useState<boolean | null>(false);

    const animationManager = new AnimationManager();
    const navigate = useNavigate();

    useEffect(() => {
        const realMaterial = learningState.practiceMaterial.filter((obj: HanziRow) => obj.simplified.length === 1);

        if (realMaterial.length === 0) {
            return;
        }

        setAvailableHanzi(realMaterial);

        generateCurrentHanzi(realMaterial);
    }, [learningState.learningList]);

    const generateCurrentHanzi = (material: HanziRow[]) => {
        const materialLen = material.length;
        let newHanzi = currentHanzi;

        if (material.length === 1) {
            return material[0];
        }

        while (newHanzi === currentHanzi) {
            const randomIndex = Math.floor(Math.random() * materialLen);

            newHanzi = material[randomIndex];
        }

        setCurrentHanzi(newHanzi);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (justGotCorrectAnswer === true) {
            if (currentMistakes !== 0) {
                setUserCorrectStreak(0);
            } else {
                setUserCorrectStreak(Number(userCorrectStreak) + 1);
            }

            setJustGotCorrectAnswer(null);
            setCurrentMistakes(-1);
            generateCurrentHanzi(availableHanzi ?? []);
        }
    };

    const handleReset = () => {
        if (hanziQuizzerRef.current) {
            hanziQuizzerRef.current.restartQuiz();
            setUserCorrectStreak(0);
            setCurrentMistakes(-1);
        }
    };

    const handleCorrectAnswer = (summary: { character: string; totalMistakes: number }) => {
        console.log(summary, 'a');
        setCurrentMistakes(summary.totalMistakes);
        setJustGotCorrectAnswer(true);
    };

    useEffect(() => {
        console.log(justGotCorrectAnswer);
    }, [justGotCorrectAnswer]);

    const updateLeaveOption = (option: boolean | null) => {
        if (option) {
            navigate('/practice');
        } else {
            setAskedToLeave(false);
        }
    };

    useMemo(() => {
        animationManager.setStreakFireAnimation(userCorrectStreak, setFireAnimationName);
    }, [userCorrectStreak]);

    return (
        <div className="hanzi-review-wrapper">
            <div className="hanzi-review-info-div">
                <p>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={() => setAskedToLeave(true)} className="hanzi-review-space-right" />
                    {EN_UC_REVIEW_HEADER}
                </p>
                <div className="hanzi-review-streak-div">
                    <FontAwesomeIcon icon={faFire} className={`hanzi-review-streak-icon ${fireAnimationName}`} />
                    <span className="hanzi-review-streak-text">{userCorrectStreak.toString()}</span>
                </div>
            </div>
            <div className="hanzi-review-details-div">
                <h1 className="hanzi-review-bigger-h1">Write {currentHanzi?.simplified}</h1>
                <HanziQuizzerComponent character={currentHanzi?.simplified ?? ''} ref={hanziQuizzerRef} onComplete={handleCorrectAnswer} />
            </div>

            <form onSubmit={handleSubmit} className="hanzi-review-answer-bar">
                <button type="button" onClick={handleReset}>
                    {'Reset'}
                </button>
                <div className="hanzi-review-answer-bar-text">
                    <p className={currentMistakes === 0 ? 'correct-answer' : 'wrong-answer'}>{currentMistakes > 0 ? `Mistakes: ${currentMistakes}` : currentMistakes !== -1 ? 'No mistakes' : ' '}</p>
                </div>
                <button type="submit">{justGotCorrectAnswer ? EN_UC_LEAVE_HEADER : ' '}</button>
            </form>
            <div className="hanzi-review-word-bank-bottom"></div>

            {askedToLeave && <RedirectionNotification header="Leave practice?" description="" selectedOption={updateLeaveOption} />}
        </div>
    );
}

export default WritingPractice;
