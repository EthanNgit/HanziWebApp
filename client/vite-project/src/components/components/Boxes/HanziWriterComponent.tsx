import React, { useRef, useEffect } from 'react';
import HanziWriter from 'hanzi-writer';
import '../../../global/variables.css';

interface HanziWriterComponentProps {
  character: string;
}

const HanziWriterComponent: React.FC<HanziWriterComponentProps> = ({ character }) => {
  const writerRef = useRef<HTMLDivElement | null>(null);
  const writerInstanceRef = useRef<HanziWriter | null>(null);
  
  const hanziWriterOptions = {
    width: 100,
    height: 100,
    padding: 5,
    showOutline: false,
    strokeAnimationSpeed: 0.5, 
    delayBetweenStrokes: 50, 
    delayBetweenLoops: 3000,
    strokeColor: '#f2f3f4', 
  };

  useEffect(() => {
    if (!writerInstanceRef.current) {
      const writer = HanziWriter.create(writerRef.current!, character, hanziWriterOptions);
      writerInstanceRef.current = writer;
    } else {
      writerInstanceRef.current.setCharacter(character);
    }

    writerInstanceRef.current.loopCharacterAnimation();
  }, [character]);

  return (
    <>
      <div ref={writerRef}/>
    </>
  );
};

export default HanziWriterComponent;