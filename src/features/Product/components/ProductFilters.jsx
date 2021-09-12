import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters(props) {
    const {filters, onChange} = props;
    const handleCategoryChange = (newCategoryId) => {
        if(!onChange) return;
        const newFilters = {
            ...filters,
            "category.id": newCategoryId
        }
        onChange(newFilters);
    }
    const handlePriceChange = (newPrices) => {
        if(!onChange) return;
        onChange(newPrices);
    }
    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange}></FilterByCategory>
            <FilterByPrice onChange={handlePriceChange}></FilterByPrice>
        </Box>
    );
}

export default ProductFilters;