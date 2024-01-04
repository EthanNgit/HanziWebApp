import React from 'react'
import '../../styles/Boxes/RedirectionNotification.css';
import { EN_UC_CONTINUE_HEADER, EN_UC_STOP_HEADER } from '../../../global/Ts/Strings';
import MultiSelectDropdownButton from '../Buttons/MultiSelectDropdownButton';
import { MultiValue } from 'react-select';

interface PracticeRedirectionNotificationProps {
    header?: string;
    practiceHSKAmount?: string;
    selectedOption: (newOption: boolean | null) => void;
    dropdownSelectedOptions?: (options: string[]) => void;
    clickedOutside?: (event?: React.MouseEvent) => void;
}

function PracticeRedirectionNotification({ header, practiceHSKAmount, selectedOption, clickedOutside, dropdownSelectedOptions}: PracticeRedirectionNotificationProps) {
    const dropdownOptions = [
        { value:"1", label: "HSK 1" },
        { value: "2", label: "HSK 2" },
        { value: "3", label: "HSK 3" },
        { value: "4", label: "HSK 4" },
        { value: "5", label: "HSK 5" },
        { value: "6", label: "HSK 6" }
    ];

    const onDropdownSelect = (selectedOptions: string[]) => {
      if (dropdownSelectedOptions) {
        dropdownSelectedOptions(selectedOptions);
      }
    }

    return (
        <div className="black-out-wrapper" onClick={() => clickedOutside&& clickedOutside()}>
          <div className='redirection-notification-wrapper' onClick={(e) => e.stopPropagation()}>
            <h1>{header}</h1>
            <hr className="notification-bar"/>
            <div className="redirection-practice-desc">
                <p>Hsk to practice</p>
                <p>{ practiceHSKAmount? practiceHSKAmount: '0'} hanzi</p>
            </div>

            <MultiSelectDropdownButton dropdownOptions={dropdownOptions} selectedOptions={onDropdownSelect}/>
            <button className="button-18" role="button" onClick={() => {selectedOption(false)}}>{EN_UC_CONTINUE_HEADER}</button>
          </div>
        </div>
      );
}

export default PracticeRedirectionNotification