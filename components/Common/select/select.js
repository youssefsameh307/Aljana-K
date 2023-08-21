/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment */
import React from 'react';
import ReactSelect from 'react-select';

const themes = {
    darker: (theme) => ({
        ...theme,
        borderRadius: 10,
        colors: {
            ...theme.colors,
            // NOTE: Darker theme also makes the dropdown darker unfortunately
            primary: '#ffffff', // no idea
            primary25: '#f1f5f9', //hover
            primary50: '#000', // no idea
            neutral0: '#ffffff', //background color
            neutral5: '#000', // no idea
            neutral20: '#000',
            neutral40: 'white',
        },
    }),
};

const styles = (invalid) => ({
    container: (provided, { isDisabled }) => ({
        ...provided,
        opacity: isDisabled ? 0.4 : 1,
    }),
    control: (provided, { isDisabled }) => ({
        ...provided,
        cursor: 'pointer',
        padding: '5px 0',
        border: isDisabled ? '2px dashed #eb459e80' : invalid ? '2px dashed #ed424580' : '1px dashed transparent',
        '.react-select-control-icon': {
            color: '#313749',
        },
        '&:hover,&:focus-within': {
            borderColor: 'transparent',
            '.react-select-control-icon': {
                color: 'white',
            },
        },
        '&:focus-within div .react-select-placeholder-onhover': {
            color: 'rgba(204, 208, 255, 0.5)',
        },
        '&:hover div img': {
            filter: 'brightness(0) saturate(100%) invert(100%) sepia(37%) saturate(2%) hue-rotate(308deg) brightness(107%) contrast(101%) opacity(100%)',
        },
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: '14px',
        color: '#9ca3af',
    }),
    input: (provided) => ({ ...provided, color: '#ccd0ffd' }),
    option: (provided, { isDisabled }) => ({
        ...provided,
        opacity: isDisabled ? 0.4 : 1,
        paddingTop: '14px',
        paddingBottom: '14px',
        borderRadius: '16px',
    }),
    menu: (provided) => ({
        ...provided,
        overflow: 'clip',
        zIndex: 2,
        padding: '1rem 1.5rem 1rem 1.5rem',
        width: '100%'
    }),
    menuList: (provided) => ({
        ...provided,
        overflowX: 'hidden'
    }),
    singleValue: (provided) => ({
        ...provided,
        // TODO: Use hex instead
        color: '#344c5d',
    }),
});

const Select = ({ theme = 'darker', ...props }) => (
    <ReactSelect
        {...props}
        classNames={{
            ...props.classNames,
            placeholder: () => 'react-select-placeholder-onhover',
        }}
        components={{ IndicatorSeparator: null, ...props.components }}
        styles={{ ...styles(props.invalid), ...props.styles }}
        theme={themes[theme]}
    />
);
export default Select;
