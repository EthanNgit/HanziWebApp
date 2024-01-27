import React from 'react';
import '../styles/LessonPage.css';
import { useLocation, useParams } from 'react-router-dom';
import PinyinLesson from './Learn/Lessons/PinyinLesson';
import NumbersLesson from './Learn/Lessons/NumberLesson';
import TimeLesson from './Learn/Lessons/TimeLesson';
import MoneyLesson from './Learn/Lessons/MoneyLesson';

function LessonPage() {
    const { lesson } = useParams();
    const location = useLocation();
    const { state: verifiedState } = location;

    const lessonMap = new Map([
        ['pinyin', PinyinLesson],
        ['numbers', NumbersLesson],
        ['time', TimeLesson],
        ['money', MoneyLesson],
    ]);

    const LessonComponent = lessonMap.get(lesson ? lesson : '');
    const isVerified = verifiedState?.isVerified || false;
    return (
        <>
            {LessonComponent ? (
                <LessonComponent isVerified={isVerified} />
            ) : (
                <>
                    <div className="margin">No lesson: {lesson}</div>
                </>
            )}
        </>
    );
}

export default LessonPage;
