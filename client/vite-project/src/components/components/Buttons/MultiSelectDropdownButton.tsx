// MultiSelectDropdownButton.tsx
import React, { useState, FC } from 'react';
import Select, { MultiValue, ActionMeta, StylesConfig } from 'react-select';
import '../../../global/variables.css';
import { EN_UP_HANZI_DROPDOWN_HINT } from '../../../global/Ts/Strings';

interface MultiSelectDropdownProps {
    dropdownOptions: { value: string; label: string }[];
    selectedOptions: (newOptions: string[]) => void;
}

function MultiSelectDropdownButton({
    dropdownOptions,
    selectedOptions,
}: MultiSelectDropdownProps) {
    const [selectedValues, setSelectedValues] = useState<
        { value: string; label: string }[]
    >([]);

    const handleChange = (
        selectedValues: MultiValue<{ value: string; label: string }>,
        actionMeta: ActionMeta<{ value: string; label: string }>
    ) => {
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
                        backgroundColor: 'var(--gray-med)',
                        borderRadius: '3px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        border: 'none',
                        outline: '2px solid var(--white-med)',
                        ':hover': {
                            backgroundColor: 'var(--gray-min)',
                            outline: '2px solid var(--brand-one)',
                        },
                        ':active': {
                            border: 'none',
                            outline: '2px solid var(--brand-one)',
                        },
                    }),
                    option: (provided) => ({
                        ...provided,
                        backgroundColor: 'var(--gray-med)',
                        color: 'var(--white-med)',
                        cursor: 'pointer',
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        marginBottom: '2px',
                        ':hover': {
                            backgroundColor: 'var(--gray-min)',
                        },
                    }),
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: 'var(--gray-min)',
                    }),
                    multiValueLabel: (provided) => ({
                        ...provided,
                        color: 'var(--gray-full)',
                        backgroundColor: 'var(--white-min)',
                    }),
                    multiValueRemove: (provided) => ({
                        ...provided,
                        color: 'var(--gray-full)',
                        backgroundColor: 'var(--white-min)',
                        ':hover': {
                            color: 'var(--white-med)',
                            backgroundColor: 'var(--error-red)',
                        },
                    }),
                }}
            />
        </div>
    );
}

export default MultiSelectDropdownButton;
