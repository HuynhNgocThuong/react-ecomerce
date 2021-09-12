import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Product from './Product';

ProductSkeletonList.propTypes = {
    data: PropTypes.array,

};
ProductSkeletonList.defaultProps = {
    data: [],
}
function ProductSkeletonList(props) {
    const {data} = props;
    return (
      <Box>
          <Grid container>
            {data.map((product)=>(
                <Grid item key={product.id} xs={12} sm={2} md={4} lg={3}>
                    <Product product={product}></Product>
                </Grid>
            ))}
          </Grid>
      </Box>
    );
}

export default ProductSkeletonList;