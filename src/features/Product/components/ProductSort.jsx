import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

ProductSort.propTypes = {
    curentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};
// ProductSort.defaultProps = {
//     curentSort: '',
//     onChange: null
// }

function ProductSort({currentSort, onChange}) {
    const handleSortChange = (event, newValue) =>{
        if(onChange) onChange(newValue);
    }
    return (
        <Tabs
            value={currentSort}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleSortChange}
            aria-label="disabled tabs example"
        >
            <Tab label="Giá thấp tới cao" value="salePrice:ASC"/>
            <Tab label="Giá cao tới thấp" value="salePrice:DESC"/>
        </Tabs>
    );
}

export default ProductSort;