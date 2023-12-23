import React from 'react';
import '../styles/LessonPage.css';
import { useParams } from 'react-router-dom';
import PinyinLesson from './Learn/PinyinLesson';

function LessonPage() {
    const { lesson } = useParams();

    const exceptionsMap = new Map([
        ['pinyin', PinyinLesson],
    ]);

    const ExceptionComponent = exceptionsMap.get(lesson? lesson : '');
    
    return (
        <>
            {ExceptionComponent ? (
                <ExceptionComponent/>
            ) : (
                <>
                    <div className='margin'>Default lesson: {lesson}</div>
                </>
            )}
        </>
    );

}




export default LessonPage