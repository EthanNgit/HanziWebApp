import React, { useContext, useEffect, useState } from 'react'
import '../styles/PracticePage.css'
import { API_PRACTICE_CALCULATE_HANZI_COUNT_URL, EN_UC_LEARN_HANZI_HEADER } from '../../global/Ts/Strings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import PracticeRedirectionNotification from '../../components/components/Boxes/PracticeRedirectionNotification'
import { AuthContext } from '../../helpers/AuthContext'
import axios from 'axios'
import { HanziContext } from '../../helpers/HanziContext'

function PracticePage() {
    const { authState } = useContext(AuthContext);
    const [showRedirectionButton, setShowRedirectionButton] = useState<boolean>(false);
    const [redirectionButtonHeader, setRedirectionButtonHeader] = useState<string>('');
    const [currentHSKSelectionOptions, setCurrentHSKSelectionOptions] = useState<string[]>([]);
    const [hskCalculationTimeout, setHSKCalculationTimeout] = useState<number  | null>(null);
    const [totalPracticeHSKCharactersList, setTotalPracticeHSKCharactersList] = useState<HanziRow[]>([]);

    useEffect(() => {
        if (hskCalculationTimeout)  {
            clearTimeout(hskCalculationTimeout);
            setTotalPracticeHSKCharactersList([]);
        }

        if (currentHSKSelectionOptions.length === 0) {
            setTotalPracticeHSKCharactersList([]);
        }

        const hskTimeout = setTimeout(() => {
            calculateTotalHanzi();
            setHSKCalculationTimeout(null);
        }, 1000);

        setHSKCalculationTimeout(hskTimeout);
    }, [currentHSKSelectionOptions]);

    const calculateTotalHanzi = () => {
        // get user stats
        // get min hanzi

        if (!currentHSKSelectionOptions || currentHSKSelectionOptions.length === 0) {
            return;
        }

        axios.post(API_PRACTICE_CALCULATE_HANZI_COUNT_URL, { userId: authState.id, levels: currentHSKSelectionOptions }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setTotalPracticeHSKCharactersList(response.data);
            }
        });
    };

    const setRedirectionButtonOn = (header: string) => {
        if (header) {
            setShowRedirectionButton(true); 
            setRedirectionButtonHeader(header);
        }
    }

    const setRedirectionButtonOff = (event?: React.MouseEvent) => {
        setShowRedirectionButton(false); 
        setRedirectionButtonHeader('');
    }

    const onRedirectionChoiceSelected = () => {
        
    }

    const onRedirectionOptionsSelected = (options: string[]) => {
        setCurrentHSKSelectionOptions(options);
    }

    return (
        <div className='practice-page'>
            <div className="practice-page-wrapper">
                <div className="practice-page-main-grid">
                    <div className="practive-page-reading-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Reading</h3>
                                <p>Practice reading comprehension.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">Stories<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                                <button className="button-20">Tongue twisters<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                                <button className="button-20">Sentences<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-listening-wrapper">
                    <div className="practice-page-grid-half-wrapper">
                        <div className="practice-page-half-one">
                                <h3>Listening</h3>
                                <p>Practice listening skills.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">Stories<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                                <button className="button-20">Tongue twisters<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                                <button className="button-20">Sentences<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-writing-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Writing</h3>
                                <p>Practice stroke order of hanzi. </p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">Stroke order<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="practive-page-lesson-wrapper">
                        <div className="practice-page-grid-half-wrapper">
                            <div className="practice-page-half-one">
                                <h3>Games</h3>
                                <p>Review games from lessons.</p>
                            </div>
                            <div className="practice-page-half-two">
                                <button className="button-20">Pinyin match<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="practice-page-character-wrapper">
                    <h3>Hanzi</h3>
                    <p>Review pinyin, sound, definition, traditional and simplified, and other qualities about hanzi.</p>
                    <div className="practice-page-character-contents">
                    <button className="button-21"  onClick={() => setRedirectionButtonOn('Pinyin practice')}>Pinyin<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                    <button className="button-21" onClick={() => setRedirectionButtonOn('Character practice')}>Characters<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                    <button className="button-21" onClick={() => setRedirectionButtonOn('Style practice')}>Traditional and simplified<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                    <button className="button-21" onClick={() => setRedirectionButtonOn('Definition practice')}>Definitions<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                    <button className="button-21" onClick={() => setRedirectionButtonOn('Tone practice')}>Tones<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                    <button className="button-21" onClick={() => setRedirectionButtonOn('Bookmark practice')}>Bookmarked review<FontAwesomeIcon className='auto-left' icon={faArrowRight} /></button>
                    </div>
                </div>
            </div>
            { showRedirectionButton && <PracticeRedirectionNotification header={redirectionButtonHeader} selectedOption={onRedirectionChoiceSelected} dropdownSelectedOptions={onRedirectionOptionsSelected} clickedOutside={setRedirectionButtonOff} practiceHSKAmount={totalPracticeHSKCharactersList.length.toString()}/> }
        </div>

    )
}

export default PracticePage