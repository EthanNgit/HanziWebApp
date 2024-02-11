import { useContext, useRef } from 'react';
import { AuthContext } from '../../../helpers/AuthContext';
import HanziQuizzerComponent from '../../../components/hanzi-writer-api/quizzer/HanziQuizzerComponent';

function NumberLesson({ isVerified }: LessonProps) {
    const { authState } = useContext(AuthContext);
    const TimeRef = useRef<HTMLDivElement>(null);

    return (
        <div className="article-wrapper">
            <div className="article-title-div">
                <h1 className="article-title">Money</h1>
            </div>
            <div className="article-main-contents">
                <div className="table-of-contents-wrapper">
                    <div className="table-of-contents">
                        <p className="article-tab-header">Contents</p>
                        {/*<ScrollToButton buttonName='Practice' targetRef={PracticeRef}/>*/}
                    </div>
                </div>
                <div className="article-body-wrapper">
                    <div className="article-body">
                        <HanziQuizzerComponent character="恰" />
                    </div>
                </div>
                <div className="article-ads-wrapper">
                    <div className="article-ads"></div>
                </div>
            </div>
        </div>
    );
}

export default NumberLesson;
