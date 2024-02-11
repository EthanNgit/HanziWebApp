import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';

function ToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const MIN_SCROLL_DISTANCE = 300;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > MIN_SCROLL_DISTANCE);
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
                backgroundColor: 'var(--fore-one)',
                color: 'var(--back-one)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                zIndex: 999,
            }}>
            <FontAwesomeIcon icon={faArrowUp} />
        </div>
    );
}

export default ToTopButton;
