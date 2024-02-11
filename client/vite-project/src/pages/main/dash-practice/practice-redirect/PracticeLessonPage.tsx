import { useLocation, useParams } from 'react-router-dom';
import '../practice-page/practice-page.css';
import Practice from '../../../practice/practice-types/four-option-practice/OptionPractice';
import ReadingStories from '../../../practice/story/stories-hub/StoriesPage';
import SentenceOrganize from '../../../practice/practice-types/sentence-builder-practice/SentencePractice';
import WritingPractice from '../../../practice/practice-types/writer-practice/WritingPractice';
import { STRING_TO_URL } from '../../../../global/Strings';

function PracticeLessonPage() {
    const { lesson: practice } = useParams();
    const location = useLocation();
    const { state: verifiedState } = location;

    const isVerified = verifiedState?.isVerified || false;
    const practiceMaterial = verifiedState?.practiceMaterial || [];

    let PracticeComponent = Practice;

    if (practice === STRING_TO_URL('stories')) {
        PracticeComponent = ReadingStories;
    } else if (practice === STRING_TO_URL('translate-sentences') || practice === STRING_TO_URL('reverse-translate-sentences')) {
        PracticeComponent = SentenceOrganize;
    } else if (practice === STRING_TO_URL('stroke-order')) {
        PracticeComponent = WritingPractice;
    }

    return (
        <>
            {PracticeComponent ? (
                <PracticeComponent isVerified={isVerified} practiceMaterial={practiceMaterial} lessonType={practice ?? ''} />
            ) : (
                <>
                    <div className="margin">No lesson: {practice}</div>
                </>
            )}
        </>
    );
}

export default PracticeLessonPage;
