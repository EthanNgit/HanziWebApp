import Select from 'react-select';
import { EN_UC_NO_HEADER, EN_UC_YES_HEADER } from '../../../global/Strings';

function YesNoDropdown() {
    const yesNoOptions = [
        { value: '1', label: EN_UC_YES_HEADER },
        { value: '2', label: EN_UC_NO_HEADER },
    ];

    return (
        <Select
            options={yesNoOptions}
            defaultValue={yesNoOptions[0]}
            isSearchable={false}
            styles={{
                singleValue: (provided) => ({
                    ...provided,
                    color: 'var(--fore-one)',
                    fontSize: '15px',
                }),
                control: (provided) => ({
                    ...provided,
                    backgroundColor: 'var(--back-two)',
                    borderRadius: '3px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'Roboto',
                    fontWeight: '500',
                    width: '30%',
                    height: '30px',
                    border: 'var(--border-thickness-max) solid var(--fore-two)',
                    ':hover': {
                        backgroundColor: 'var(--back-two)',
                        border: 'var(--border-thickness-max) solid var(--acc-one)',
                    },
                    ':active': {
                        border: 'var(--border-thickness-max) solid var(--acc-one)',
                    },
                }),
                option: (provided) => ({
                    ...provided,
                    backgroundColor: 'var(--back-two)',
                    color: 'var(--fore-one)',
                    cursor: 'pointer',
                    fontFamily: 'Roboto',
                    fontWeight: '500',
                    marginBottom: '2px',
                    fontSize: '12px',
                    ':hover': {
                        backgroundColor: 'var(--back-three)',
                    },
                }),
                menu: (provided) => ({
                    ...provided,
                    backgroundColor: 'var(--back-three)',
                    width: '29%',
                }),
            }}
        />
    );
}

export default YesNoDropdown;
