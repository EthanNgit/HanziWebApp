import React, { useEffect, useRef, useState } from 'react'
import '../../styles/Boxes/PinyinGame.css'
import TTSButton from '../Buttons/TTSButton'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import '../../../global/Interfaces/IHanziRow';

function PinyinGame() {
    const [items, setItems] = useState<HanziRow[]>([]);
    const [currentPinyin, setCurrentPinyin] = useState<HanziRow | undefined>();
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const ttsButtonRef = useRef() as React.MutableRefObject<{ forceClick: () => void } | null>;
 
    const handleClickOutsideButton = () => {
        if (ttsButtonRef.current && ttsButtonRef.current.forceClick) {
            ttsButtonRef.current.forceClick();
        }
      };

    const hasToneMarks = (pinyin: string) => /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(pinyin);
    
    const generatePinyin = (array: HanziRow[]) => {
      let randomItem = array[Math.floor(Math.random() * array.length)];
    
      while (!hasToneMarks(randomItem.pinyin)) {
        randomItem = array[Math.floor(Math.random() * array.length)];
      }
    
      return randomItem;
    };
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/hanzi/get/pinyin-game');
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const data = response.data;
          setItems(data);
          setCurrentPinyin(generatePinyin(data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
        handleClickOutsideButton();
    }, [currentPinyin]);

    useEffect(() => {
      if (isPlaying) {
        handleClickOutsideButton();
      }
    }, [isPlaying]);

    const checkAnswer = (tone: number) => {
      const toneRegexMap: { [key: number]: RegExp } = {
        1: /[āēīōūǖ]/,
        2: /[áéíóúǘ]/,
        3: /[ǎěǐǒǔǚ]/,
        4: /[àèìòùǜ]/,
      };
    
      if (currentPinyin && toneRegexMap[tone].test(currentPinyin.pinyin)) {
        // Correct
        setIsCorrect(true);
        setTimeout(() => {
          setIsCorrect(null);
          const newPinyin = generatePinyin(items.filter(item => item.id !== currentPinyin.id));
          setCurrentPinyin(newPinyin);
        }, 1000); 
      } else {
        // Incorrect
        setIsCorrect(false);
        setTimeout(() => {
          setIsCorrect(null);
        }, 1000); 
      }
    };

    return (
      <div className='pinyin-game-wrapper'>
        {!isPlaying ? (
          <div className='pinyin-game-box align-grid-middle'>
            <div className='circle'>
              <FontAwesomeIcon icon={faPlay} className='play-button' onClick={() => setIsPlaying(!isPlaying)} />
            </div>
          </div>
        ) : (
          <>
            <div className='pinyin-game-box'>
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
            <div className='circle'>
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

export default PinyinGame