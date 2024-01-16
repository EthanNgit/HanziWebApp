import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MultiSelectDropdownButton from '../Buttons/MultiSelectDropdownButton';
import '../../styles/Boxes/RedirectionNotification.css';
import {
    API_PRACTICE_BOOKMARK_CALCULATE_HANZI_COUNT_URL,
    API_PRACTICE_CALCULATE_HANZI_COUNT_URL,
    EN_UC_CONTINUE_HEADER,
    EN_UC_HANZI_DYNAMIC_HEADER,
    EN_UP_HSK_TO_PRACTICE_HEADER,
    STRING_TO_URL,
} from '../../../global/Ts/Strings';
import { AuthContext } from '../../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Validator } from '../../../global/Ts/Validator';

interface HanziSelectionNotificiationProps {
    header?: string;
    navRoute?: string;
    clickedOutside?: (event?: React.MouseEvent) => void;
}

function HanziSelectionNotification({
    header,
    navRoute,
    clickedOutside,
}: HanziSelectionNotificiationProps) {
    const { authState } = useContext(AuthContext);
    const dropdownOptions = [
        { value: '1', label: 'HSK 1' },
        { value: '2', label: 'HSK 2' },
        { value: '3', label: 'HSK 3' },
        { value: '4', label: 'HSK 4' },
        { value: '5', label: 'HSK 5' },
        { value: '6', label: 'HSK 6' },
    ];
    const [selectedHSKLevels, setSelectedHSKLevels] = useState<string[]>([]);
    const [hskCalculationTimeout, setHSKCalculationTimeout] = useState<
        number | null
    >(null);
    const [totalPracticeHSKCharactersList, setTotalPracticeHSKCharactersList] =
        useState<HanziRow[]>([]);
    const [canContinue, setCanContinue] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // When the dropdown just changes, set timeout so it doesn't
        //query instantly.
        if (hskCalculationTimeout) {
            clearTimeout(hskCalculationTimeout);
            setTotalPracticeHSKCharactersList([]);
            setCanContinue(false);
        }

        // To be able to continue (press the confirm button), you need
        //at least one option selected from the dropdown.
        if (selectedHSKLevels.length === 0) {
            setTotalPracticeHSKCharactersList([]);
            setCanContinue(false);
        }

        // Calculate the amount of characters the user can learn
        const hskTimeout = setTimeout(() => {
            calculateTotalHanzi();
            setHSKCalculationTimeout(null);
        }, 1000);

        setHSKCalculationTimeout(hskTimeout);
    }, [selectedHSKLevels]);

    const calculateTotalHanzi = () => {
        if (!selectedHSKLevels || selectedHSKLevels.length === 0) {
            return;
        }

        axios
            .post(
                navRoute === 'bookmarked'
                    ? API_PRACTICE_BOOKMARK_CALCULATE_HANZI_COUNT_URL
                    : API_PRACTICE_CALCULATE_HANZI_COUNT_URL,
                {
                    userId: authState.id,
                    levels: selectedHSKLevels,
                }
            )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    setTotalPracticeHSKCharactersList(response.data);
                    setCanContinue(response.data.length > 0);
                }
            });
    };

    const onDropdownSelect = (selectedIncomingOptions: string[]) => {
        if (selectedIncomingOptions) {
            setSelectedHSKLevels(selectedIncomingOptions);
        }
    };

    const handleNavigation = () => {
        // Navigate and pass in the characters the user can practice to avoid having to calculate again.
        navigate(STRING_TO_URL(navRoute ?? ''), {
            state: {
                isVerified: true,
                practiceMaterial: totalPracticeHSKCharactersList,
            },
        });
    };

    return (
        <div
            className="black-out-wrapper"
            onClick={() => clickedOutside && clickedOutside()}>
            <div
                className="redirection-notification-wrapper"
                onClick={(e) => e.stopPropagation()}>
                <h1>{header}</h1>
                <hr className="notification-bar" />
                <div className="redirection-practice-desc">
                    <p>{EN_UP_HSK_TO_PRACTICE_HEADER}</p>
                    <p>
                        {EN_UC_HANZI_DYNAMIC_HEADER(
                            totalPracticeHSKCharactersList.length ?? 0
                        )}
                    </p>
                </div>

                <div className="redirection-space">
                    <MultiSelectDropdownButton
                        dropdownOptions={dropdownOptions}
                        selectedOptions={onDropdownSelect}
                    />
                </div>

                {canContinue ? (
                    <button
                        className="button-18"
                        role="button"
                        onClick={handleNavigation}>
                        {EN_UC_CONTINUE_HEADER}
                    </button>
                ) : (
                    <button
                        className="button-18 button-18-disabled"
                        role="button">
                        Select HSK
                    </button>
                )}
            </div>
        </div>
    );
}

export default HanziSelectionNotification;
