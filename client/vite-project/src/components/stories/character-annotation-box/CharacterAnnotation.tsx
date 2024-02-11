import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HanziContext } from '../../../helpers/HanziContext';
import { AuthContext } from '../../../helpers/AuthContext';
import { BookmarkManager } from '../../../scripts/BookmarkManager';
import AnnotationBox from '../annotation-wrapper/AnnotationBox';
import '../character-annotation-box/character-annotation.css';

interface CharacterAnnotationProps {
    chineseWords: string;
}

const CharacterAnnotation: React.FC<CharacterAnnotationProps> = ({ chineseWords }) => {
    const { authState } = useContext(AuthContext);
    const { allHanziState: allHanzi } = useContext(HanziContext);
    const [annotationData, setAnnotationData] = useState<HanziRow | null>(null);
    const [storyContents, setStoryContents] = useState<string[]>([]);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [bookmarkManager, setBookmarkManager] = useState<BookmarkManager>();
    const [isBookmarked, setIsBookmarked] = useState<boolean>();

    useEffect(() => {
        const bookmarkManager = new BookmarkManager({ userId: authState.id });
        setBookmarkManager(bookmarkManager);
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/texseg/cn/${chineseWords}`).then((response) => {
            if (response.data) {
                // Break words if they do not exist in the dictionary.
                const segmentedWords = response.data.segmentedWords;
                const updatedSegmentedWords = segmentedWords.flatMap((word: string) => {
                    const hanziInformation = allHanzi.find((obj) => obj.simplified === word);

                    if (hanziInformation) {
                        return [word];
                    } else {
                        return Array.from(word);
                    }
                });

                setStoryContents(updatedSegmentedWords);
            }
        });
    }, [chineseWords]);

    const handleHover = (word: string, event: React.MouseEvent | React.TouchEvent) => {
        // Set the annotation data
        if (allHanzi) {
            const hanziInformation = allHanzi.find((obj) => obj.simplified === word);

            if (hanziInformation) {
                setAnnotationData(hanziInformation);

                const isThisCharacterBookmarked = bookmarkManager?.getIsHanziBookmarked(hanziInformation);
                setIsBookmarked(isThisCharacterBookmarked);
            }
        }

        calculateWindowSizeAndPos(event);
    };

    const calculateWindowSizeAndPos = (event: React.MouseEvent | React.TouchEvent) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();

        // Create dimensions of the window
        // TODO: dynamically change window specs
        const tooltipWidth = 200;
        const tooltipHeight = 100;
        const top = rect.top + window.scrollY - tooltipHeight - 5;

        // Offset the window to be centered and above the text
        let left = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
        if (left + tooltipWidth > window.innerWidth) {
            left = window.innerWidth - tooltipWidth;
        }

        if (left < 0) {
            left = 0;
        }

        setTooltipPosition({ top, left });
    };

    const handleLeave = () => {
        // Clear data for annotations
        setAnnotationData(null);
        setTooltipPosition({ top: 0, left: 0 });
    };

    const setBookmark = async () => {
        if (annotationData) {
            setIsBookmarked(await bookmarkManager?.setBookmark(annotationData));
        }
    };

    return (
        <div>
            {storyContents.map((word, index) => (
                <span key={index} className="chinese-word" onMouseEnter={(event) => handleHover(word, event)} onMouseLeave={handleLeave} onClick={setBookmark}>
                    {word}
                </span>
            ))}
            <AnnotationBox annotationData={annotationData} isBookmarked={isBookmarked ?? false} position={tooltipPosition} />
        </div>
    );
};

export default CharacterAnnotation;
