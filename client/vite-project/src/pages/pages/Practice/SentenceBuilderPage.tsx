import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { EN_LC_LOADING_TEXT, EN_UC_CONTINUE_HEADER, EN_UC_REVIEW_HEADER, EN_UC_SUBMIT_HEADER } from '../../../global/Ts/Strings';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { HanziContext } from '../../../helpers/HanziContext';
import { StringSplitter } from '../../../global/Ts/StringSplitter';
import { ArrayShuffler } from '../../../global/Ts/ArrayShuffler';
import { faFire } from '@fortawesome/free-solid-svg-icons/faFire';

function SentenceBuilderPage({ lessonType }: LessonProps) {
    // Grab sentences either from word or db
    // decide either forward or backward translation
    // Split the sentence and show the translation
    // in a word bank have a drag and drop system
    const location = useLocation();
    const { state: learningState } = location;
    const allHanziContext = useContext(HanziContext);
    const [sentences, setSentences] = useState<storyRow[]>([]);
    const [sentenceQueue, setSentenceQueue] = useState<storyRow[]>([]);
    const [currentSentence, setCurrentSentence] = useState<storyRow>();
    const [currentWordBank, setCurrentWordBank] = useState<string[]>([]);
    const [userCurrentResponse, setUserCurrentResponse] = useState<{ word: string; index: number }[]>(() => []);
    const [justGotCorrectAnswer, setJustGotCorrectAnswer] = useState<boolean | null>(null);

    const [userCorrectStreak, setUserCorrectStreak] = useState<number>(0);
    const [fireAnimationName, setFireAnimationName] = useState<string>('');

    const [reverseTranslate, setReverseTranslate] = useState<boolean>(false);

    useEffect(() => {
        const includedHSKLevels = Array.from(new Set(learningState.practiceMaterial.map((obj: { hskLevel: number }) => obj.hskLevel)));

        axios.get(`http://localhost:3001/api/blocks/sentences/${includedHSKLevels}`).then((response) => {
            if (response.data) {
                const storyRows: storyRow[] = [];

                for (const row of response.data) {
                    const parsedContents = JSON.parse(row.contents);

                    const transformedData: storyRow = {
                        id: row.id,
                        category: row.category,
                        contents: {
                            story: parsedContents.story,
                            pinyin: parsedContents.pinyin,
                            translation: parsedContents.translation,
                        },
                        hskLevel: row.hskLevel,
                    };

                    storyRows.push(transformedData);
                }

                setSentences(storyRows);
            }
        });

        setReverseTranslate(lessonType === 'reverse-translate-sentences');
        console.log(lessonType);
    }, []);

    useEffect(() => {
        generateCurrentSentence();
        setUserCurrentResponse([]);
        setSentenceQueue(sentences);
    }, [sentences]);

    const generateCurrentSentence = async () => {
        const arrayShuffler = new ArrayShuffler();
        // If the queue is empty, reset it with shuffled sentences
        if (sentenceQueue.length === 0) {
            setSentenceQueue(arrayShuffler.shuffleArray([...sentences])!);
        }

        // Get the first sentence from the queue
        const currentSentence = sentenceQueue[0];

        // Move the first sentence to the end of the queue
        setSentenceQueue((prevQueue) => [...prevQueue.slice(1), prevQueue[0]]);

        // Calculate word bank
        if (currentSentence && currentSentence.contents) {
            const cleanedSplitString = await smartSplitString(reverseTranslate ? currentSentence.contents.story : currentSentence.contents.translation);

            console.log(cleanedSplitString, 'a');

            const wordBank = arrayShuffler.shuffleArray(addFillerWordsToArray(cleanedSplitString));

            setCurrentWordBank(wordBank!);
            setCurrentSentence(currentSentence);
        }
    };

    const smartSplitString = (str: string): Promise<string[]> => {
        if (reverseTranslate) {
            return axios
                .get(`http://localhost:3001/api/texseg/cn/${str}`)
                .then((response) => {
                    if (response.data) {
                        const splitString = response.data.segmentedWords;

                        const cleanedSplitString: string[] = splitString.filter((word: string) => word !== '' && word !== ' ' && word !== '。');

                        return cleanedSplitString;
                    } else {
                        return [];
                    }
                })
                .catch((error) => {
                    console.error('Error in reverse translation:', error);
                    return [];
                });
        } else {
            const preparedString = str
                .toLowerCase()
                .replace(/[.,?!]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            // Split the string using a regular expression that captures word boundaries
            const splitString = preparedString.split(/\b/);

            // Remove empty strings from the array
            const cleanedSplitString = splitString.filter((word) => word !== '' && word !== ' ');

            return Promise.resolve(cleanedSplitString);
        }
    };

    const addFillerWordsToArray = (array: string[]): string[] => {
        const MAX_FILLER_WORDS = 5;
        const fillerWordsAmount = Math.floor(Math.random() * MAX_FILLER_WORDS);
        const setOfArray = new Set(array);

        const regularFillerWords = [
            'and',
            'but',
            'or',
            'nor',
            'yet',
            'so',
            'in',
            'on',
            'at',
            'since',
            'for',
            'ago',
            'before',
            'after',
            'during',
            'by',
            'beside',
            'under',
            'over',
            'who',
            'which',
            'whom',
            'whose',
            'where',
            'when',
            'however',
            'therefore',
            'moreover',
            'meanwhile',
            'nevertheless',
        ];

        const reverseFillerWords = [
            '和',
            '但是',
            '或者',
            '既然',
            '然而',
            '所以',
            '在',
            '上',
            '下',
            '自从',
            '因为',
            '以前',
            '之前',
            '之后',
            '通过',
            '谁',
            '哪个',
            '谁的',
            '在哪里',
            '然而',
            '因此',
            '而且',
            '同时',
            '然而',
        ];

        const fillerWords = reverseTranslate ? reverseFillerWords : regularFillerWords;

        let remainingCycles = fillerWordsAmount;
        const extraWords: Set<string> = new Set();

        while (remainingCycles > 0 && setOfArray.size < fillerWords.length) {
            const randomWordIndex = Math.floor(Math.random() * fillerWords.length);
            const randomWord = fillerWords[randomWordIndex];

            if (!setOfArray.has(randomWord) && !extraWords.has(randomWord)) {
                // Process the unique word (e.g., add it to your set, do something with it)
                extraWords.add(randomWord);

                // Decrease the remaining cycles
                remainingCycles--;
            }
        }

        return [...array, ...extraWords];
    };

    const addWordToUserAnswer = (word: string, originalIndex: number) => {
        if (userCurrentResponse.find((obj) => obj.index === originalIndex)) {
            return;
        }

        const result = {
            word: word,
            index: originalIndex,
        };

        setUserCurrentResponse((prevState) => [...prevState, result]);

        // clear colors
        setJustGotCorrectAnswer(null);
    };

    function arraysEqual(arr1: string[], arr2: string[]): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (justGotCorrectAnswer === true) {
            generateCurrentSentence();
            setUserCurrentResponse([]);
            setJustGotCorrectAnswer(null);
        } else {
            const userAnswer = userCurrentResponse.map((obj) => obj.word);
            const realAnswer = await smartSplitString(reverseTranslate ? currentSentence?.contents.story ?? '' : currentSentence?.contents.translation ?? '');

            if (userAnswer.length === 0) {
                return;
            }

            if (arraysEqual(userAnswer, realAnswer)) {
                setJustGotCorrectAnswer(true);
                setUserCorrectStreak(Number(userCorrectStreak) + 1);
                console.log('correct');
            } else {
                setJustGotCorrectAnswer(false);
                console.log('wrong', userAnswer, realAnswer);
                setUserCorrectStreak(Number(0));
            }
        }
    };

    useEffect(() => {
        // Streak 1: 5 correct, Streak 2: 20 correct...
        if (userCorrectStreak !== undefined) {
            if (userCorrectStreak >= 100) {
                setFireAnimationName('streak-animation-max');
            } else if (userCorrectStreak >= 50) {
                setFireAnimationName('streak-animation-high');
            } else if (userCorrectStreak >= 20) {
                setFireAnimationName('streak-animation-med');
            } else if (userCorrectStreak >= 5) {
                setFireAnimationName('streak-animation-min');
            } else {
                setFireAnimationName('');
            }
        }
    }, [userCorrectStreak]);

    return (
        <div className="hanzi-review-wrapper">
            <div className="hanzi-review-info-div">
                <p>
                    <FontAwesomeIcon icon={faArrowLeft} className="hanzi-review-space-right" />
                    {EN_UC_REVIEW_HEADER}
                </p>
                <div className="hanzi-review-streak-div">
                    <FontAwesomeIcon icon={faFire} className={`hanzi-review-streak-icon ${fireAnimationName}`} />
                    <span className="hanzi-review-streak-text">{userCorrectStreak.toString()}</span>
                </div>
            </div>
            <div className="hanzi-review-details-div">
                <h1 className="hanzi-review-bigger-h1">{reverseTranslate ? currentSentence?.contents.translation : currentSentence?.contents.story}</h1>
                <h3>{reverseTranslate ? '' : currentSentence?.contents.pinyin}</h3>
            </div>

            <div className="hanzi-review-word-bank-div">
                {currentWordBank.map((word, index) => (
                    <div
                        key={index}
                        className={`hanzi-review-word-bank-box ${userCurrentResponse.find((obj) => obj.index === index) ? 'hanzi-review-word-bank-box-used' : ''} `}
                        onClick={() => addWordToUserAnswer(word, index)}>
                        {word}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="hanzi-review-answer-bar">
                <button type="button" onClick={() => setUserCurrentResponse([])}>
                    {'Clear'}
                </button>
                <div className="hanzi-review-answer-bar-text">
                    <p className={justGotCorrectAnswer ? 'correct-answer' : justGotCorrectAnswer === false ? 'wrong-answer' : ''}>{userCurrentResponse.map((obj) => obj.word).join(' ')}</p>
                </div>
                <button type="submit">{justGotCorrectAnswer ? EN_UC_CONTINUE_HEADER : EN_UC_SUBMIT_HEADER}</button>
            </form>
            <div className="hanzi-review-word-bank-bottom"></div>
        </div>
    );
}

export default SentenceBuilderPage;
