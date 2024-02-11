import Select from 'react-select';
import { EN_UC_SIMPLIFIED_TEXT, EN_UC_TRADITIONAL_TEXT } from '../../../global/Strings';

function HanziTypeDropdown() {
    const options = [
        { value: '1', label: EN_UC_SIMPLIFIED_TEXT },
        { value: '2', label: EN_UC_TRADITIONAL_TEXT },
    ];

    return (
        <Select
            options={options}
            defaultValue={options[0]}
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
                        backgroundColor: 'var(--back-three)',
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
                        backgroundColor: 'var(--back-two)',
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

export default HanziTypeDropdown;
