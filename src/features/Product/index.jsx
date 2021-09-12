import React from 'react';
import PropTypes from 'prop-types';
import ListPage from './pages/ListPage';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Box } from '@material-ui/core';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    const match = useRouteMatch();
    return (
        <div>
            <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPage}>
                </Route>
            </Switch>
            </Box>
        </div>
    );
}

export default ProductFeature;