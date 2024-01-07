import React from 'react';
import '../styles/LessonPage.css';
import { useLocation, useParams } from 'react-router-dom';
import PinyinLesson from './Learn/Lessons/PinyinLesson';
import NumbersLesson from './Learn/Lessons/NumberLesson';

function LessonPage() {
    const { lesson } = useParams();
    const location = useLocation();
    const { state: verifiedState } = location;

    const lessonMap = new Map([
        ['pinyin', PinyinLesson],
        ['numbers', NumbersLesson],
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
