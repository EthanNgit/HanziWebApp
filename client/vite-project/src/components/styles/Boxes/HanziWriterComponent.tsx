import React, { useRef, useEffect } from 'react';
import HanziWriter from 'hanzi-writer';
import '../../../global/variables.css';

interface HanziWriterComponentProps {
  character: string;
}

const HanziWriterComponent: React.FC<HanziWriterComponentProps> = ({ character }) => {
  const writerRef = useRef<HTMLDivElement | null>(null);
  const writerInstanceRef = useRef<HanziWriter | null>(null);

  useEffect(() => {
    if (!writerInstanceRef.current) {
      const writer = HanziWriter.create(writerRef.current!, character, {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: false,
        strokeAnimationSpeed: 0.5, 
        delayBetweenStrokes: 50, 
        delayBetweenLoops: 3000,
        strokeColor: '#f2f3f4', 
      });

      writerInstanceRef.current = writer;
      // Optionally, you can call other methods or set up event listeners
    } else {
      writerInstanceRef.current.setCharacter(character);
    }

    writerInstanceRef.current.loopCharacterAnimation();

  }, [character]);

  return (
    <>
      <div ref={writerRef} />
    </>
  );
};

export default HanziWriterComponent;