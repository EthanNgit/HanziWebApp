import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PinyinLesson from '../../../learn/lessons/PinyinLesson';
import NumbersLesson from '../../../learn/lessons/NumberLesson';
import TimeLesson from '../../../learn/lessons/TimeLesson';
import MoneyLesson from '../../../learn/lessons/MoneyLesson';
import '../lesson-redirect/lesson-page.css';

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
