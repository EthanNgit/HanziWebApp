import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    API_COMPLETED_LESSONS_URL,
    NAV_LEARN_URL,
    EN_UC_FINISH_LESSON_HEADER,
} from '../../../global/Ts/Strings';

interface FinishLessonProps {
    userId: number;
    lessonId: string;
}

function FinishLessonButton({ userId, lessonId }: FinishLessonProps) {
    const navigate = useNavigate();

    const updateLessonsCompleted = async () => {
        await axios
            .post(API_COMPLETED_LESSONS_URL, { userId, lessonId })
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    console.log(response.data);
                    navigate(NAV_LEARN_URL, { replace: true });
                }
            });
    };

    return (
        <div className="article-complete-btn-holder">
            <style>
                {`
          .button-19 {
            width: 50%;
            max-width: 480px;
            height: 50px;
            background-color: var(--brand-one);
            border: none;
            color: var(--white-full);
            font-weight: 900;
            font-size: 90%;
            user-select: none;
            -webkit-user-select: none;
            cursor: pointer;
            border-radius: 3px;
        }
        
        .article-complete-btn-holder {
            padding-top: 10%;
            padding-bottom: 5%;
            display: flex;
            min-height: 50px;
            width: 100%;
            align-items: center;
            justify-content: center;
        }
        `}
            </style>
            <button
                className="button-19"
                role="button"
                onClick={updateLessonsCompleted}>
                {EN_UC_FINISH_LESSON_HEADER}
            </button>
        </div>
    );
}

export default FinishLessonButton;
