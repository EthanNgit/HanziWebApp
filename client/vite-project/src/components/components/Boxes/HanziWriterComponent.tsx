import React, { useRef, useEffect } from 'react';
import HanziWriter from 'hanzi-writer';

interface HanziWriterComponentProps {
    characters: string;
}

function HanziWriterComponent({ characters }: HanziWriterComponentProps) {
    const writerRefs = useRef<Array<HTMLDivElement | null>>([]);
    const writerInstancesRef = useRef<Array<HanziWriter | null>>([]);

    const hanziWriterOptions = {
        width: 100 / (characters.length < 2 ? 1 : characters.length),
        height: 100,
        padding: 5,
        showOutline: false,
        strokeAnimationSpeed: 0.5,
        delayBetweenStrokes: 50,
        delayBetweenLoops: 3000,
        strokeColor: '#f2f3f4',
    };

    useEffect(() => {
        if (!characters) return;

        writerRefs.current = Array.from({ length: characters.length }, (_, i) => writerRefs.current[i] || null);
        writerInstancesRef.current = Array.from({ length: characters.length }, (_, i) => writerInstancesRef.current[i] || null);

        Array.from(characters).forEach((character, index) => {
            if (!writerInstancesRef.current[index]) {
                const writer = HanziWriter.create(writerRefs.current[index]!, character, hanziWriterOptions);
                writerInstancesRef.current[index] = writer;
            } else {
                writerInstancesRef.current[index]!.setCharacter(character);
            }
        });

        const chainAnimations = async () => {
            for (let i = 0; i < characters.length; i++) {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        writerInstancesRef.current[i]!.loopCharacterAnimation();
                        resolve();
                    }, hanziWriterOptions.delayBetweenLoops);
                });
            }
        };

        chainAnimations();
    }, [characters, hanziWriterOptions]);

    return (
        <div style={{ display: 'flex' }}>
            {Array.from(characters).map((_, index) => (
                <div key={index} style={{ display: 'inline-block' }} ref={(ref) => (writerRefs.current[index] = ref)} />
            ))}
        </div>
    );
}

export default HanziWriterComponent;
