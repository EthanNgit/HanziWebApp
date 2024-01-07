import React from 'react';
import '../styles/LessonPage.css';
import { useLocation, useParams } from 'react-router-dom';
import TraditionalPractice from './Practice/Traditional';

function PracticeLessonPage() {
    const { lesson: practice } = useParams();
    const location = useLocation();
    const { state: verifiedState } = location;

    const practiceMap = new Map([['traditional', TraditionalPractice]]);

    const PracticeComponent = practiceMap.get(practice ? practice : '');
    const isVerified = verifiedState?.isVerified || false;
    const practiceMaterial = verifiedState?.practiceMaterial || [];
    return (
        <>
            {PracticeComponent ? (
                <PracticeComponent
                    isVerified={isVerified}
                    practiceMaterial={practiceMaterial}
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
