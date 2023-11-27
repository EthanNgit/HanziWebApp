import React, { FC } from 'react';
import '../../../global/variables.css';

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ percent }) => {
  const progressStyle: React.CSSProperties = {
    width: `${percent}%`,
    height: '10px',
    backgroundColor: 'var(--brand-one)', 
  };

  return (
    <div className="progress-container" style={{ backgroundColor: 'var(--gray-min)', borderRadius: '3px', overflow: 'hidden'}}>
      <div className="progress-bar" style={progressStyle}></div>
    </div>
  );
};

export default ProgressBar;