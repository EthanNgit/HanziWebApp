// MultiSelectDropdownButton.tsx
import { useState } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { EN_UP_HANZI_DROPDOWN_HINT } from '../../../global/Strings';
import '../../../global/variables.css';

interface MultiSelectDropdownProps {
    dropdownOptions: { value: string; label: string }[];
    selectedOptions: (newOptions: string[]) => void;
}

function MultiSelectDropdownButton({ dropdownOptions, selectedOptions }: MultiSelectDropdownProps) {
    const [selectedValues, setSelectedValues] = useState<{ value: string; label: string }[]>([]);

    const handleChange = (selectedValues: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
        if (selectedValues) {
            const values = selectedValues as { value: string; label: string }[];
            setSelectedValues(values);
            const optionValues = values.map((option) => option.value);
            selectedOptions(optionValues);
        }
    };

    return (
        <div className="multi-select-wrapper">
            <style>
                {`
          @import url('../../../global/variables.css');

          .multi-select-wrapper {
              width: 100%;
          }
          
          .dropdown-multi-select {
              width: 100%;
              margin-bottom: 0px;
          } 
        `}
            </style>
            <Select
                value={selectedValues}
                onChange={handleChange}
                isClearable={false}
                closeMenuOnSelect={false}
                defaultValue={[dropdownOptions[0]]}
                isSearchable={false}
                options={dropdownOptions}
                isMulti={true}
                className="dropdown-multi-select"
                classNamePrefix="selected-option"
                placeholder={EN_UP_HANZI_DROPDOWN_HINT}
                styles={{
                    control: (provided) => ({
                        ...provided,
                        backgroundColor: 'var(--back-two)',
                        borderRadius: '3px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        border: 'none',
                        outline: '2px solid var(--fore-two)',
                        ':hover': {
                            backgroundColor: 'var(--back-three)',
                            outline: '2px solid var(--acc-one)',
                        },
                        ':active': {
                            border: 'none',
                            outline: '2px solid var(--acc-one)',
                        },
                    }),
                    option: (provided) => ({
                        ...provided,
                        backgroundColor: 'var(--back-two)',
                        color: 'var(--fore-two)',
                        cursor: 'pointer',
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        marginBottom: '2px',
                        ':hover': {
                            backgroundColor: 'var(--back-three)',
                        },
                    }),
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: 'var(--back-three)',
                    }),
                    multiValueLabel: (provided) => ({
                        ...provided,
                        color: 'var(--back-one)',
                        backgroundColor: 'var(--fore-three)',
                    }),
                    multiValueRemove: (provided) => ({
                        ...provided,
                        color: 'var(--back-one)',
                        backgroundColor: 'var(--fore-three)',
                        ':hover': {
                            color: 'var(--fore-two)',
                            backgroundColor: 'var(--error-red)',
                        },
                    }),
                }}
            />
        </div>
    );
}

export default MultiSelectDropdownButton;
