import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';
import { AuthContext } from '../../../../helpers/AuthContext';
import { HanziContext } from '../../../../helpers/HanziContext';
import { SettingsContext } from '../../../../helpers/SettingsContext';
import '../../../../interfaces/ICourseRow';
import { ArrayShuffler } from '../../../../scripts/ArrayShuffler';
import {
    EN_UC_LEARN_HANZI_DYNAMIC_DESCRIPTION,
    EN_UC_LEARN_HANZI_HEADER,
    EN_UC_MAIN_LESSON_HEADER,
    EN_UC_REVIEW_HANZI_DESCRIPTION,
    EN_UC_REVIEW_HANZI_HEADER,
    EN_UC_ALL_LESSONS_HEADER,
    EN_UC_LESSONS_DYNAMIC_HEADER,
    EN_UC_REVIEW_HANZI_DYNAMIC_HEADER,
    EN_UC_LEARN_HANZI_DYNAMIC_HEADER,
    EN_UC_REVIEW_HANZI_EMPTY_HEADER,
    API_USER_STATS_URL,
    API_GET_LESSONS_URL,
    NAV_REVIEW_URL,
    STRING_TO_URL,
    NAV_HOME_URL,
    NAV_HANZI_PAGE_URL,
    NAV_LESSON_URL,
} from '../../../../global/Strings';
import '../learn-page/learn-page.css';

function LearnPage() {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const { generalState } = useContext(SettingsContext);
    const { allHanziState: allHanzi } = useContext(HanziContext);
    const [items, setItems] = useState<courseRow[]>([]);
    const [userCompletedCourses, setUserCompletedCourses] = useState<Set<number>>(new Set());
    const [shuffledHanzi, setShuffledHanzi] = useState<HanziRow[]>([]);
    const [studiedHanzi, setStudiedHanzi] = useState<Set<string>>(new Set());
    const [currentUserReview, setCurrentUserReview] = useState<ReviewItem[]>([]);
    const [currentHSKLevel, setCurrentHSKLevel] = useState<number>(0);
    const [currentReviewItems, setCurrentReviewItems] = useState<ReviewItem[]>([]);
    const courseRef = useRef<HTMLDivElement>(null);
    const MAX_HSK_LEVEL = 6;

    useEffect(() => {
        if (authState.status == false) {
            navigate(NAV_HOME_URL);
            return;
        }

        axios.get(API_USER_STATS_URL(authState.id)).then((response) => {
            if (!response.data.error) {
                const completedLevels = response.data.completedLevels;
                setUserCompletedCourses(new Set(JSON.parse(completedLevels || '[]')));

                const studiedCharacters = response.data.studiedCharacters;
                setStudiedHanzi(new Set(JSON.parse(studiedCharacters || '[]')));

                const reviewItems = response.data.srsCharacters;
                setCurrentUserReview(JSON.parse(reviewItems || []));

                axios.get(API_GET_LESSONS_URL).then((response) => {
                    if (!response.data.error) {
                        setItems(response.data);
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        if (allHanzi) {
            const arrayShuffler = new ArrayShuffler();
            setShuffledHanzi(arrayShuffler.shuffleArray(allHanzi)!);
        }
    }, [allHanzi]);

    useEffect(() => {
        if (shuffledHanzi.length !== 0) {
            // Calculate current hsk level
            setCurrentHSKLevel(recurseHSKLevel(1));

            // Calculate review items
            if (currentUserReview) {
                const currentDate = new Date().toISOString().split('T')[0];
                const filteredItems = currentUserReview.filter((item) => item.nextReviewDate <= currentDate);

                setCurrentReviewItems(filteredItems);
            }
        }
    }, [studiedHanzi, shuffledHanzi]);

    const recurseHSKLevel = (currentLevel: number): number => {
        if (currentLevel > MAX_HSK_LEVEL) {
            return MAX_HSK_LEVEL;
        }

        const filteredHSKLevelItems = shuffledHanzi.filter((item) => item.hskLevel == currentLevel);
        const nonStudiedCharacters = new Set();

        filteredHSKLevelItems.forEach((item) => {
            if (!studiedHanzi.has(item.simplified)) {
                nonStudiedCharacters.add(item);
            }
        });

        if (nonStudiedCharacters.size === 0) {
            return recurseHSKLevel(currentLevel + 1);
        }
        return currentLevel;
    };

    const startLearning = () => {
        const learningList: HanziRow[] = [];

        if (shuffledHanzi !== undefined) {
            for (let i = 0; i < shuffledHanzi.length - 1; i++) {
                const notStudied = !studiedHanzi.has(shuffledHanzi[i].simplified);
                const canAddMoreMaterial = learningList.length < generalState.batchSize;

                if (notStudied && canAddMoreMaterial) {
                    learningList.push(shuffledHanzi[i]);
                }
            }
        }

        if (learningList.length > 0) {
            const sortedArray: HanziRow[] = learningList.slice().sort((a, b) => a.id - b.id);
            const idArray: number[] = sortedArray.map((item) => item.id);
            const newUrl = NAV_HANZI_PAGE_URL(idArray[0]);

            navigate(newUrl, {
                replace: true,
                state: {
                    isLearning: true,
                    learningList: learningList,
                    learningIndexes: idArray,
                    currentIndex: 0,
                },
            });
        }
    };

    const startReviewing = () => {
        if (!currentReviewItems) {
            return;
        }

        const learningList: HanziRow[] = [];
        const reviewSet = new Set(currentReviewItems.map((item) => item.material));

        shuffledHanzi.forEach((item) => {
            if (reviewSet.has(item.simplified)) {
                learningList.push(item);
            }
        });

        if (learningList.length > 0) {
            const sortedArray: HanziRow[] = learningList.slice().sort((a, b) => a.id - b.id);
            const idArray: number[] = sortedArray.map((item) => item.id);

            const newUrl = NAV_REVIEW_URL;
            navigate(newUrl, {
                replace: true,
                state: {
                    isReviewing: true,
                    learningList: learningList,
                    learningIndexes: idArray,
                    currentIndex: 0,
                },
            });
        }
    };

    return (
        <div className="learn-page">
            <div className="two-left-one-right-flex">
                <div className="tlor-left">
                    <div className="tlor-left-box">
                        <h4>{EN_UC_MAIN_LESSON_HEADER}</h4>
                        <h3>{EN_UC_LEARN_HANZI_HEADER}</h3>
                        <p>{EN_UC_LEARN_HANZI_DYNAMIC_DESCRIPTION(currentHSKLevel)}</p>
                        <button className="button-18" role="button" onClick={startLearning}>
                            {EN_UC_LEARN_HANZI_DYNAMIC_HEADER(currentHSKLevel)}
                        </button>
                    </div>
                    <div className="tlor-left-box">
                        <h4>{EN_UC_MAIN_LESSON_HEADER}</h4>
                        <h3>{EN_UC_REVIEW_HANZI_HEADER}</h3>
                        <p>{EN_UC_REVIEW_HANZI_DESCRIPTION}</p>
                        <button className="button-18" role="button" onClick={startReviewing}>
                            {currentReviewItems?.length > 0 ? EN_UC_REVIEW_HANZI_DYNAMIC_HEADER(currentReviewItems?.length) : EN_UC_REVIEW_HANZI_EMPTY_HEADER}
                        </button>
                    </div>
                </div>
                <div className="tlor-right">
                    <div className="tlor-right-box">
                        <h4>{EN_UC_LESSONS_DYNAMIC_HEADER(currentHSKLevel)}</h4>
                        <h3>{EN_UC_ALL_LESSONS_HEADER}</h3>
                        <div className="course-grid-wrapper">
                            <div className="course-grid-container" ref={courseRef}>
                                {items.map((item) => {
                                    if (userCompletedCourses.has(item.id)) {
                                        return null;
                                    }

                                    const prerequisitesArray = JSON.parse(item?.prerequisites || '[]');
                                    const allPrerequisitesCompleted = prerequisitesArray.prerequisites.every((prerequisite: number) => userCompletedCourses.has(prerequisite));

                                    return (
                                        <div
                                            key={item.id}
                                            className={`course-grid-item ${allPrerequisitesCompleted ? 'prerequisites-completed' : ''}`}
                                            data-key={item.id}
                                            onClick={() => {
                                                if (allPrerequisitesCompleted) {
                                                    navigate(NAV_LESSON_URL(item.lessonName), {
                                                        state: {
                                                            isVerified: true,
                                                        },
                                                    });
                                                }
                                            }}>
                                            <h4>HSK {item.hskLevel}</h4>
                                            <div className="course-grid-item-h3">
                                                {(() => {
                                                    const className = allPrerequisitesCompleted ? 'unlocked-color' : 'locked-color';
                                                    return <h3 className={`${className}`}>{item.lessonName}</h3>;
                                                })()}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearnPage;
