import React, { useRef } from 'react';

interface ScrollButtonProps {
    buttonName: string;
    targetRef: React.RefObject<HTMLDivElement>;
}

function ScrollToButton({ buttonName, targetRef }: ScrollButtonProps) {
    const scrollToDiv = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <style>
                {`
          .scroll-button {
            color: var(--white-min);
            cursor: pointer;
            letter-spacing: 0px;
            margin-left: 20px;
        }
        
        .scroll-button:hover {
            color: var(--white-full);
        }
        
        `}
            </style>
            <p
                className="scroll-button"
                onClick={scrollToDiv}>{`${buttonName}`}</p>
        </>
    );
}

export default ScrollToButton;
