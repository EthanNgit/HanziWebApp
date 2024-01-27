import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../styles/Boxes/PinyinGame.css';
import '../../../global/Interfaces/IHanziRow';
import TTSButton from '../Buttons/TTSButton';
import { HanziContext } from '../../../helpers/HanziContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';

function PinyinGame() {
    const allHanziContext = useContext(HanziContext);
    const [filteredHanzi, setFilteredHanzi] = useState<HanziRow[]>([]);
    const [items, setItems] = useState<HanziRow[]>([]);
    const [currentPinyin, setCurrentPinyin] = useState<HanziRow | undefined>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const ttsButtonRef = useRef() as React.MutableRefObject<{ forceClick: () => void } | null>;

    useEffect(() => {
        setFilteredHanzi(allHanziContext.allHanziState.filter((obj) => obj.pinyin.length <= 2));
    }, [allHanziContext.allHanziState]);

    useEffect(() => {
        fetchData();
    }, [filteredHanzi]);

    useEffect(() => {
        forceClickTTSButton();
    }, [currentPinyin]);

    useEffect(() => {
        if (isPlaying) {
            forceClickTTSButton();
        }
    }, [isPlaying]);

    const fetchData = async () => {
        // Calculate a character out of a list that fits qualifications
        //and then set it to the active question.
        if (filteredHanzi) {
            setItems(filteredHanzi);
            setCurrentPinyin(generatePinyin(filteredHanzi));
        } else {
            alert('Error fetching data');
        }
    };

    const generatePinyin = (array: HanziRow[]) => {
        let randomItem = array[Math.floor(Math.random() * array.length)];
        while (!hasToneMarks(randomItem.pinyin)) {
            randomItem = array[Math.floor(Math.random() * array.length)];
        }

        return randomItem;
    };

    const hasToneMarks = (pinyin: string): boolean => {
        return /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(pinyin);
    };

    const forceClickTTSButton = () => {
        // Force trigger the TTS button to play audio.
        if (ttsButtonRef.current && ttsButtonRef.current.forceClick) {
            ttsButtonRef.current.forceClick();
        }
    };

    const checkAnswer = (tone: number) => {
        // Map which tone a string belongs to...
        const toneRegexMap: { [key: number]: RegExp } = {
            1: /[āēīōūǖ]/,
            2: /[áéíóúǘ]/,
            3: /[ǎěǐǒǔǚ]/,
            4: /[àèìòùǜ]/,
        };

        if (currentPinyin && toneRegexMap[tone].test(currentPinyin.pinyin)) {
            // Correct answer -> generate new.
            setIsCorrect(true);

            setTimeout(() => {
                setIsCorrect(null);
                const newPinyin = generatePinyin(items.filter((item) => item.id !== currentPinyin.id));
                setCurrentPinyin(newPinyin);
            }, 1000);
        } else {
            // Incorrect answer -> timeout and reset.
            setIsCorrect(false);

            setTimeout(() => {
                setIsCorrect(null);
            }, 1000);
        }
    };

    return (
        <div className="pinyin-game-wrapper">
            {!isPlaying ? (
                <div className="pinyin-game-box align-grid-middle">
                    <div className="circle">
                        <FontAwesomeIcon icon={faPlay} className="play-button" onClick={() => setIsPlaying(!isPlaying)} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="pinyin-game-box">
                        <div className={`pinyin-game-box-box pinyin-tone-1 ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'incorrect' : ''}`} onClick={() => checkAnswer(1)}>
                            <p>ˉ</p>
                        </div>
                        <div className={`pinyin-game-box-box pinyin-tone-2 ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'incorrect' : ''}`} onClick={() => checkAnswer(2)}>
                            <p>ˊ</p>
                        </div>
                        <div className={`pinyin-game-box-box pinyin-tone-3 ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'incorrect' : ''}`} onClick={() => checkAnswer(3)}>
                            <p>ˇ</p>
                        </div>
                        <div className={`pinyin-game-box-box pinyin-tone-4 ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'incorrect' : ''}`} onClick={() => checkAnswer(4)}>
                            <p>ˋ</p>
                        </div>
                    </div>
                    <div className="circle">
                        {currentPinyin && (
                            <>
                                <TTSButton ref={ttsButtonRef} text={`${currentPinyin.pinyin}`} />
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default PinyinGame;
