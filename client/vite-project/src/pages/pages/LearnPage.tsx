import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/LearnPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import ProgressBar from '../../components/components/Boxes/ProgressBar';
import ToTopButton from '../../components/components/Buttons/ToTopButton';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import axios, { all } from 'axios';
import DynamicSvg from '../../components/components/Boxes/DynamicSVG';
import '../../global/Interfaces/ICourseRow';
import { ArrayShuffler } from '../../global/Ts/ArrayShuffler';
import { EN_UC_HSK_HEADER, EN_UC_LEARN_HANZI_DESCRIPTION, EN_UC_LEARN_HANZI_HEADER, EN_UC_LEARN_HSK_HEADER, EN_LC_LESSONS_HEADER, EN_UC_MAIN_LESSON_HEADER, EN_UC_REVIEW_HANZI_DESCRIPTION, EN_UC_REVIEW_HANZI_HEADER, EN_UC_ALL_LESSONS_HEADER } from '../../global/Ts/Strings';


function LearnPage() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [items, setItems] = useState<courseRow[]>([]);
  const [userCompletedCourses, setUserCompletedCourses] = useState<Set<number>>(new Set());
  const courseRef = useRef<HTMLDivElement>(null);

  const [allHanzi, setAllHanzi] = useState<HanziRow[]>([]);
  const [studiedHanzi, setStudiedHanzi] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (authState.status == false) {
      navigate("/");
      return;
    }

    axios.get(`http://localhost:3001/api/stats/${authState.id}`).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        const completedLevels = response.data.completedLevels;
        setUserCompletedCourses(new Set(JSON.parse(completedLevels || '[]')));

        const studiedCharacters = response.data.studiedCharacters;
        setStudiedHanzi(new Set(JSON.parse(studiedCharacters || '[]')));
      }
    });

    axios.get("http://localhost:3001/api/lessons").then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setItems(response.data);
      }
    });

    axios.get("http://localhost:3001/api/hanzi/get").then((response): void | undefined => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        const arrayShuffler = new ArrayShuffler();
        setAllHanzi(arrayShuffler.shuffleArray(response.data)!);
      }
    });

  }, []);

  
  const startLearning = () => {
    const exceptionsSet = new Set(['number']);
    const learningList : HanziRow[] = [];

    if (allHanzi !== undefined) {
      for (let i = 0; i < allHanzi.length - 1; i++) {
        if (!studiedHanzi.has(allHanzi[i].simplified) &&
          !exceptionsSet.has(allHanzi[i].category) &&
          learningList.length < 5) {
            learningList.push(allHanzi[i]);
        }
      }
    }

    console.log("curated list: ", learningList);

    if (learningList.length > 0) {
      const sortedArray: HanziRow[] = learningList.slice().sort((a, b) => a.id - b.id);
      const idArray: number[] = sortedArray.map(item => item.id);

      console.log(sortedArray);

      const newUrl = `/hanzi/${idArray[0]}`;
      navigate(newUrl, { replace: true, state: { isLearning:true, learningList: learningList, learningIndexes: idArray, currentIndex: 0} });
    }
     // Workflow
        // presses "Learn" button -> this func -> grab all hanzi-> allHanzi useEffect ->
        // grab all studied hanzi -> studiedHanzi useEffect -> algorithm -> navigation...
  };

  return (
    <div className="learn-page">
      <div className="two-left-one-right-flex">
        <div className="tlor-left">
          <div className="tlor-left-box">
            <h4>{EN_UC_MAIN_LESSON_HEADER}</h4>
            <h3>{EN_UC_LEARN_HANZI_HEADER}</h3>
            <p>{EN_UC_LEARN_HANZI_DESCRIPTION}</p>
            <button className="button-18" role="button" onClick={startLearning}>{EN_UC_LEARN_HSK_HEADER} 0</button>
          </div>
          <div className="tlor-left-box">
            <h4>{EN_UC_MAIN_LESSON_HEADER}</h4>
            <h3>{EN_UC_REVIEW_HANZI_HEADER}</h3>
            <p>{EN_UC_REVIEW_HANZI_DESCRIPTION}</p>
            <button className="button-18" role="button">Review 0 words</button>
          </div>
        </div>
        <div className="tlor-right">
          <div className="tlor-right-box">
            <h4>{EN_UC_HSK_HEADER} 1 {EN_LC_LESSONS_HEADER}</h4>
            <h3>{EN_UC_ALL_LESSONS_HEADER}</h3>
            <div className='course-grid-wrapper'>
              <div className="course-grid-container" ref={courseRef}>
                {items.map((item) => {
                  if (userCompletedCourses.has(item.id)) {
                    return null; 
                  }

                  const prerequisitesArray = JSON.parse(item?.prerequisites || '[]');
                  const allPrerequisitesCompleted = prerequisitesArray.prerequisites.every((prerequisite: number) => userCompletedCourses.has(prerequisite));

                  return (
                    <div key={item.id} className={`course-grid-item ${allPrerequisitesCompleted ? 'prerequisites-completed' : ''}`} data-key={item.id} onClick={() => {
                      if (allPrerequisitesCompleted) {
                        navigate(`/learn/${item.lessonName.toLowerCase().replace(/ /g, "-")}`);
                      }
                    }}>
                      <h4>HSK {item.hskLevel}</h4>
                      <div className='course-grid-item-h3'>
                        {(() => {
                          const className = allPrerequisitesCompleted ? "unlocked-color" : "locked-color";
                          return (
                            <>
                              <h3 className={`${className}`}>{item.lessonName}</h3>
                              <DynamicSvg id={item.imageIdReference} active={allPrerequisitesCompleted} />
                            </>
                          );
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
  )
}

export default LearnPage