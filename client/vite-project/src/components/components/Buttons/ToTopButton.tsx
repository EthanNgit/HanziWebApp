import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
//

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      style={{
        width: '50px', 
        height: '50px', 
        borderRadius: '50%',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        fontSize: '24px',
        backgroundColor: 'var(--white-full)',
        color: 'var(--gray-full)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        zIndex: 999
      }}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </div>
  );
};

export default ToTopButton;