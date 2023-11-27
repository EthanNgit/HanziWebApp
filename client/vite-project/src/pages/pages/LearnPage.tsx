import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/LearnPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import ProgressBar from '../../components/components/Boxes/ProgressBar';
import ToTopButton from '../../components/components/Buttons/ToTopButton';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';
import DynamicSvg from '../../components/components/Boxes/DynamicSVG';

interface courseRow {
  id: number,
  lessonName: string,
  imageIdReference: number,
  hskLevel: number,
  prerequisites: string,
  words: string
}

function LearnPage() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [items, setItems] = useState<courseRow[]>([]);
  const [userCompletedCourses, setuserCompletedCourses] = useState<Set<number>>(new Set());
  const courseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authState.status == false) {
      navigate("/");
      return;
    }

    axios.get(`http://localhost:3001/api/stats/${authState.id}`).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        const {completedLevels} = response.data;
        setuserCompletedCourses(new Set(JSON.parse(completedLevels || '[]').completed));
      }
    });

    axios.get("http://localhost:3001/api/lessons").then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setItems(response.data);
      }
    });
  }, []);


  return (
    <div className="learn-page">
      <div className="two-left-one-right-flex">
        <div className="tlor-left">
          <div className="tlor-left-box">
            <h4>Main Course</h4>
            <h3>Learn hanzi</h3>
            <p>Learn all HSK 1 words and vocabulary. This is reccomended to take prior to taking other lessons.</p>
            <button className="button-18" role="button">Learn HSK 0</button>
          </div>
          <div className="tlor-left-box">
            <h4>Main Course</h4>
            <h3>Review hanzi</h3>
            <p>Reviews words that you have not mastered yet. Review works on spaced repitition.</p>
            <button className="button-18" role="button">Review 0 words</button>
          </div>
        </div>
        <div className="tlor-right">
          <div className="tlor-right-box">
            <h4>HSK 1 Lessons</h4>
            <h3>All lessons</h3>
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