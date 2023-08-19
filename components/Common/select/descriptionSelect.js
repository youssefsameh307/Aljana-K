/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import DescriptionSelectOption from './descriptionSelectOption';
import Select from './select';

const filterOptions = (candidate, input) => {
    if (candidate.label.includes(input) || candidate.data.email.includes(input))
        return true;
    else
        return false;
};

const DescriptionSelect = (props) => (
    <Select
        {...props}
        components={{ Option: DescriptionSelectOption }}
        filterOption={filterOptions}
    />
);

export default DescriptionSelect;
