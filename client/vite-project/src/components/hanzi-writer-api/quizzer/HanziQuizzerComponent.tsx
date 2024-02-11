import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useContext } from 'react';
import HanziWriter, { StrokeData } from 'hanzi-writer';
import { SettingsContext } from '../../../helpers/SettingsContext';

interface HanziQuizzerComponentProps {
    character: string;
    onMistake?: (strokeData: StrokeData) => void;
    onCorrectStroke?: (strokeData: StrokeData) => void;
    onComplete?: (summaryData: { character: string; totalMistakes: number }) => void;
}

interface HanziQuizzerComponentRef {
    restartQuiz: () => void;
}

const HanziQuizzerComponent = forwardRef<HanziQuizzerComponentRef, HanziQuizzerComponentProps>(({ character, onMistake, onCorrectStroke, onComplete }, ref) => {
    const { themeState } = useContext(SettingsContext);
    const internalRef = useRef<HTMLDivElement>(null!);
    const [writer, setWriter] = useState<HanziWriter | null>(null);

    useEffect(() => {
        if (internalRef.current && internalRef.current.firstChild) {
            internalRef.current.innerHTML = '';
        }

        // TODO: figure way out to dynamically get colors
        const writer = HanziWriter.create(internalRef.current!, character, {
            width: 250,
            height: 250,
            padding: 5,
            strokeColor: themeState.backgroundTheme === 'dark' ? '#f0f0f0' : '#000',
            strokeWidth: 5,
            outlineColor: themeState.backgroundTheme === 'dark' ? '#121212' : '#808080',
            highlightCompleteColor: '#4caf50',
            showHintAfterMisses: 2,
            highlightColor: '#d32f2f',
            strokeHighlightSpeed: 0.5,
            strokeAnimationSpeed: 0.5,
        });

        setWriter(writer);

        writer.quiz({
            onMistake: function (strokeData) {
                if (onMistake) {
                    onMistake(strokeData);
                }
            },
            onCorrectStroke: function (strokeData) {
                if (onCorrectStroke) {
                    onCorrectStroke(strokeData);
                }
            },
            onComplete: function (summaryData) {
                if (onComplete) {
                    onComplete(summaryData);
                }

                // Wait time and then play stroke animation and stop
                setTimeout(() => {
                    writer.cancelQuiz();
                    writer.animateCharacter();
                }, 3000);
            },
        });
    }, [character]);

    const restartQuiz = () => {
        if (writer) {
            writer.cancelQuiz();
            writer.quiz();
        }
    };

    useImperativeHandle(ref, () => ({
        restartQuiz,
    }));

    return <div ref={internalRef}></div>;
});

export type { HanziQuizzerComponentRef };
export default HanziQuizzerComponent;
