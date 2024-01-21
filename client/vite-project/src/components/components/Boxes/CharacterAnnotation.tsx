import React, { useState, useEffect, useContext, useRef } from 'react';
import '../../styles/Boxes/CharacterAnnotation.css';
import axios from 'axios';
import { HanziContext } from '../../../helpers/HanziContext';
import { Validator } from '../../../global/Ts/Validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons/faBookmark';
import { AuthContext } from '../../../helpers/AuthContext';

interface WordAnnotation {
    word: string[];
    pinyin: string[];
    meaning: string[];
    hskLevel: string[];
}

interface CharacterAnnotationProps {
    chineseWords: string;
}

const CharacterAnnotation: React.FC<CharacterAnnotationProps> = ({
    chineseWords,
}) => {
    const allHanziContext = useContext(HanziContext);
    const { authState } = useContext(AuthContext);
    const [annotation, setAnnotation] = useState<WordAnnotation | null>(null);
    const [storyContents, setStoryContents] = useState<string[]>([]);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const [userBookmarkedCharacters, setUserBookmarkedCharacters] =
        useState<Set<string>>();
    const [isBookmarkCooldown, setIsBookmarkCooldown] =
        useState<boolean>(false);

    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/texseg/cn/${chineseWords}`)
            .then((response) => {
                if (response.data) {
                    // Break words down if they do not exist in the dictionary.
                    const segmentedWords = response.data.segmentedWords;
                    const updatedSegmentedWords = segmentedWords.flatMap(
                        (word: string) => {
                            const hanziInformation =
                                allHanziContext.allHanziState.find(
                                    (obj) => obj.simplified === word
                                );

                            if (hanziInformation) {
                                return [word];
                            } else {
                                return Array.from(word);
                            }
                        }
                    );

                    setStoryContents(updatedSegmentedWords);
                }
            });
    }, [chineseWords]);

    const handleHover = (
        word: string,
        event: React.MouseEvent | React.TouchEvent
    ) => {
        // Calculate the position based on the hover event
        const allHanzi: HanziRow[] = allHanziContext.allHanziState;
        if (allHanzi) {
            const hanziInformation = allHanzi.find(
                (obj) => obj.simplified === word
            );
            const validator = new Validator();

            if (hanziInformation) {
                const words = [];
                const pinyins = [];
                const meanings = [];
                const hskLevels = [];

                words.push(hanziInformation.simplified);
                pinyins.push(hanziInformation.pinyin);
                meanings.push(
                    validator.formatDefinition(hanziInformation.definition)
                );
                hskLevels.push(hanziInformation.hskLevel.toString());

                setAnnotation({
                    word: words,
                    pinyin: pinyins,
                    meaning: meanings,
                    hskLevel: hskLevels,
                });

                const isBookmarked =
                    userBookmarkedCharacters?.has(
                        hanziInformation.simplified
                    ) ?? false;
                //console.log(isBookmarked);
                setIsBookmarked(isBookmarked);
            }
        }

        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const tooltipWidth = 200;
        const tooltipHeight = 100;
        const top = rect.top + window.scrollY - tooltipHeight - 5;

        let left =
            rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
        if (left + tooltipWidth > window.innerWidth) {
            left = window.innerWidth - tooltipWidth;
        }

        if (left < 0) {
            left = 0;
        }

        setTooltipPosition({ top, left });
    };

    const handleLeave = () => {
        setAnnotation(null);
        setIsBookmarked(false);
        setTooltipPosition({ top: 0, left: 0 });
    };

    const setBookmark = () => {
        const searchVals = {
            id: authState.id,
            characters: annotation?.word,
            adding: !isBookmarked,
        };

        if (!isBookmarkCooldown) {
            axios
                .post('http://localhost:3001/api/stats/bookmark', searchVals)
                .then((response) => {
                    if (response.data.error) {
                        alert(response.data.error);
                    } else {
                        //console.log(response.data);
                    }
                });

            if (annotation?.word[0]) {
                setUserBookmarkedCharacters((prevUserBookmarkedCharacters) => {
                    const newUserBookmarkedCharacters = new Set(
                        prevUserBookmarkedCharacters || []
                    );

                    if (!isBookmarked) {
                        newUserBookmarkedCharacters.add(annotation.word[0]);
                    } else {
                        newUserBookmarkedCharacters.delete(annotation.word[0]);
                    }

                    return newUserBookmarkedCharacters;
                });
            }

            setIsBookmarked(!isBookmarked);
            setIsBookmarkCooldown(true);
            setTimeout(() => {
                setIsBookmarkCooldown(false);
            }, 3000);
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/stats/${authState.id}`)
            .then((response) => {
                if (response.data) {
                    let bookmarkedCharacters: Set<string> = new Set(
                        JSON.parse(response.data.bookmarkedCharacters)
                    );

                    if (!bookmarkedCharacters) {
                        bookmarkedCharacters = new Set();
                    }

                    setUserBookmarkedCharacters(bookmarkedCharacters);
                }
            });
    }, []);

    return (
        <div>
            {storyContents.map((word, index) => (
                <span
                    key={index}
                    className="chinese-word"
                    onMouseEnter={(event) => handleHover(word, event)}
                    onMouseLeave={handleLeave}
                    onClick={setBookmark}>
                    {word}
                </span>
            ))}
            {annotation && (
                <div
                    className="annotation-tooltip"
                    style={{
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                    }}>
                    <div className="annotation-top-info">
                        <p>
                            {annotation.word[0]} ({annotation.pinyin[0]})
                        </p>
                        <p>HSK: {annotation.hskLevel[0]}</p>
                    </div>

                    <p>{annotation.meaning[0]}</p>
                    <div className="annotation-bottom-info">
                        {!isBookmarked ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faBookmarkEmpty}
                                    className="annotation-icon"
                                />
                                <p>click to add bookmark</p>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon
                                    icon={faBookmarkSolid}
                                    className="annotation-icon"
                                />
                                <p>click to remove bookmark</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterAnnotation;
