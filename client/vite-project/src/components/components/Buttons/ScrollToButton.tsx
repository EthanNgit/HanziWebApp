import React, { useRef } from 'react';
import '../../styles/Buttons/ScrollToButton.css'

interface ScrollButtonProps {
  buttonName: string
  targetRef: React.RefObject<HTMLDivElement>;
}

function ScrollToButton({ buttonName, targetRef }: ScrollButtonProps) {
  const scrollToDiv = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <p className='scroll-button' onClick={scrollToDiv}>{`${buttonName}`}</p>
  );
}

export default ScrollToButton