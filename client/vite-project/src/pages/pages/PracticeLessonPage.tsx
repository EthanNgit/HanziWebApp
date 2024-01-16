import React, { useContext, useEffect } from 'react';
import '../styles/LessonPage.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Practice from './Practice/Practice';
import ReadingStories from './Practice/StoriesPage';
import { STRING_TO_URL } from '../../global/Ts/Strings';

function PracticeLessonPage() {
    const { lesson: practice } = useParams();
    const location = useLocation();
    const { state: verifiedState } = location;

    const isVerified = verifiedState?.isVerified || false;
    const practiceMaterial = verifiedState?.practiceMaterial || [];

    let PracticeComponent = Practice;

    if (practice === STRING_TO_URL('stories')) {
        PracticeComponent = ReadingStories;
    }

    return (
        <>
            {PracticeComponent ? (
                <PracticeComponent
                    isVerified={isVerified}
                    practiceMaterial={practiceMaterial}
                    lessonType={practice ?? ''}
                />
            ) : (
                <>
                    <div className="margin">No lesson: {practice}</div>
                </>
            )}
        </>
    );
}

export default PracticeLessonPage;
