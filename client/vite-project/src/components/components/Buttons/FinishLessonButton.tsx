import React from 'react'
import '../../styles/Buttons/FinishLessonButton.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FinishLessonProps {
    userId: number;
    lessonId: string;
}

const FinishLessonButton: React.ForwardRefRenderFunction<any, FinishLessonProps> = ({ userId, lessonId }, ref) => {
  const navigate = useNavigate();

  const updateLessonsCompleted = async () => {
      const response = await axios.post('http://localhost:3001/api/stats/completed-lessons', { userId, lessonId }).then((response) => {
          if (response.data.error) {
              alert(response.data.error);
            } else {
              console.log(response.data);
              navigate('/learn', { replace: true });
            }
      });
  };

  return (
    <div className="article-complete-btn-holder">
        <button className="button-19" role="button" onClick={updateLessonsCompleted}>Finish Lesson</button>
    </div>
  )
}

export default FinishLessonButton