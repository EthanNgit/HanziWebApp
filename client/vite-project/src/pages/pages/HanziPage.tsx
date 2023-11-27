import React, { createRef, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import '../styles/HanziPage.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import HanziWriterComponent from '../../components/components/Boxes/HanziWriterComponent';


interface HanziWriterProps {
  character: string;
}

interface HanziRow {
  id: number,
  simplified: string,
  traditional: string,
  pinyin: string,
  simplifiedStrokeCount: string,
  traditionalStrokeCount: string,
  definition: string,
  hskLevel: number, 
  characterCount: number, 
  category: string,
  sentences: string,
}

function HanziPage() {
    let {char} = useParams();
    const [items, setItems] = useState<HanziRow[]>([]);
    const [sentencesMap, setSentencesMap] = useState(new Map<string, string>());
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showPrevArrow, setShowPrevArrow] = useState<boolean>(true);
    const [showNextArrow, setShowNextArrow] = useState<boolean>(true);
    const [isCooldown, setIsCooldown] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlePrevClick = () => {
      if (!isCooldown) {
        const newIndex = currentIndex - 1;
        if (newIndex > 0) {
          navigate(`/hanzi/${newIndex}`);
          startCooldown();
        }
      }
    };
  
    const handleNextClick = () => {
      if (!isCooldown) {
        const newIndex = currentIndex + 1;
        // Find way to make 174 dynamic, so you can hide and show arrows
        if (newIndex < 174) {
          navigate(`/hanzi/${newIndex}`);
          startCooldown();
        }
      }
    };

    const startCooldown = () => {
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, 1000); 
    };

    useEffect(() => {
      const searchVals = {
        character: char,
        id: char
      };

      axios.post("http://localhost:3001/api/hanzi/get", searchVals).then((response) => {
        console.log(response.data);
        setItems(response.data);
      });

    }, [char]);

    useEffect(() => {
      if (items.length > 0) {

        setCurrentIndex(items[0].id);

        const newUrl = `/hanzi/${items[0].simplified}`;
        navigate(newUrl, { replace: true });

        const retrievedData = JSON.parse(items[0]?.sentences || '[]');
        const newSentencesMap = new Map<string, string>();
  
        retrievedData.forEach((item: { sentence: any; translation: any; }) => {
          newSentencesMap.set(item.sentence, item.translation);
        });
  
        setSentencesMap(newSentencesMap);
      }
    }, [items]);

    if (items.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className='hanzi-dictionary-wrapper'>
        <div className='hanzi-dictionary-main'>
          {showPrevArrow && <FontAwesomeIcon icon={faChevronLeft} className='hanzi-prev' onClick={handlePrevClick} />}
          {showNextArrow && <FontAwesomeIcon icon={faChevronRight} className='hanzi-next' onClick={handleNextClick} />}
          <h1 className='hanzi-dictionary-hanzi'>{items[0]?.simplified} {items[0]?.traditional !== null ? " / " + items[0]?.traditional : ""}</h1>
          <h3 className='hanzi-dictionary-pinyin'>{items[0]?.pinyin} <FontAwesomeIcon icon={faVolumeHigh} className='hanzi-dictionary-pinyin-listen-button'/></h3>
          <h3 className='hanzi-dictionary-definition'>{items[0]?.definition}</h3>
        </div>
        <div className='hanzi-dictionary-details'>
          <div className='hanzi-dictionary-about'>
            <div className='hanzi-dictionary-about-flex'>
              <div className="hanzi-dictionary-about-flex-1">
                <h1>About {items[0]?.simplified}</h1>
                <p>HSK Level <br/><span>HSK {items[0]?.hskLevel}</span></p>
                <p>Part of speech <br/><span>{items[0]?.category}</span></p>
              </div>
              <div className="hanzi-dictionary-about-flex-2">
                <h1>Stroke Order of {items[0]?.simplified}</h1>
                <div className="hanzi-writer-wrapper">
                  <div className="hanzi-writer-container">
                    {items[0]?.simplified && 
                      (<div>
                        <HanziWriterComponent character={items[0]?.simplified} />
                        <p><span>{items[0]?.simplifiedStrokeCount}</span> strokes</p>
                      </div>)}
                    {items[0]?.traditional && 
                      (<div>
                        <HanziWriterComponent character={items[0]?.traditional} />
                        <p><span>{items[0]?.traditionalStrokeCount}</span> strokes</p>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="hanzi-dictionary-about-sentences">
              <h1>Sentences with {items[0]?.simplified}</h1>
              {Array.from(sentencesMap?.entries()).map(([sentence, translation], index) => (
                <div key={index} className="sentence-item">
                  <div className="chinese-sentence">
                    {highlightCharacter(sentence, items[0]?.simplified)}
                  </div>
                  <div className="translation">{translation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}

const highlightCharacter = (sentence: string, character: string) => {
  const characters = [...sentence];
  return characters.map((char, index) => (
    char === character ? <span key={index} className="sentence-highlight-word">{char}</span> : char
  ));
};


export default HanziPage;