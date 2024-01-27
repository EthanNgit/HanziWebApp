import React, { useContext, useRef } from 'react';
import '../../../styles/Learn/Lessons/ArticleMain.css';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TTSButton from '../../../../components/components/Buttons/TTSButton';
import PinyinGame from '../../../../components/components/Boxes/PinyinGame';
import ScrollToButton from '../../../../components/components/Buttons/ScrollToButton';
import FinishLessonButton from '../../../../components/components/Buttons/FinishLessonButton';
import { AuthContext } from '../../../../helpers/AuthContext';

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
                    <div className="article-body"></div>
                </div>
                <div className="article-ads-wrapper">
                    <div className="article-ads"></div>
                </div>
            </div>
        </div>
    );
}

export default NumberLesson;
