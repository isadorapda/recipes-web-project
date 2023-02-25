import { StylesConfig } from 'react-select'
import { Option } from '../types/models'
export const customStyles: StylesConfig<Option> = {
  menuList: (provided) => ({
    ...provided,
    borderRadius: '2px',
    zIndex: 1000,
    width: 'max-content',
  }),
  menu: (provided) => ({
    ...provided,
    width: 'max-content',
  }),

  option: (provided, state) => ({
    ...provided,
    background: state.isFocused
      ? '#d1d5db'
      : state.isSelected
      ? '#B0C3B5'
      : 'white',
    color: state.isFocused ? 'white' : '',
    borderRadius: '2px',
    width: '100%',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#d1d5db',
    padding: '0',
    width: '0.9rem',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    margin: '7px 4px',
  }),
  singleValue: (provided) => ({
    ...provided,

    paddingRight: '6px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0',
    width: 'max-content',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    borderRadius: 'none',
    border: 'none',
    fontSize: '0.8rem',
    padding: '0',
  }),
}
