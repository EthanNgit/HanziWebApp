import React from 'react';

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
            color: var(--fore-three);
            cursor: pointer;
            letter-spacing: 0px;
            margin-left: 20px;
        }
        
        .scroll-button:hover {
            color: var(--fore-one);
        }
        
        `}
            </style>
            <p className="scroll-button" onClick={scrollToDiv}>{`${buttonName}`}</p>
        </>
    );
}

export default ScrollToButton;
