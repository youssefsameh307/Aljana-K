/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { components } from 'react-select';

const DescriptionSelectOption = ({ children, data, ...props }) => (
    <components.Option {...props} data={data}>
        {children}
        <div className="text-primary xsmall">
            {data.description}
        </div>
        {/* TODO: Add premium icon if option is premium and redirect to affiliate or premium page */}
    </components.Option>
);

export default DescriptionSelectOption;
