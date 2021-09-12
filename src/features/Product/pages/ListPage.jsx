import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

ListPage.propTypes = {
    
};
const useStyles = makeStyles(theme => ({
    root: {},
    left:{
        width: '250px'
    },
    right: {
        flex: '1 1 0'
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        padding: '20px 0px',
    }
}))
function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9,
        _sort: 'salePrice:DESC'
    });
    const [pagination, setPagination] = useState({
        page: 1,
        total: 10,
        limit: 9,
    });
    useEffect(() => {
        (async ()=>{
            try{
                const { data, pagination } = await productApi.getAll(filters);
                setProductList(data);
                setPagination(pagination);
                // console.log(data, pagination);
            }
            catch(error){
                console.log('Failed to fetch product list', error);
            }
            setLoading(false);
        })();
    }, [filters]);
    const handlePagechange = (event, pageChange) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            _page: pageChange,
        }))
    }
    const handleSortchange = (newSortValue) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            _sort: newSortValue,
        }))
    }

    const handleFiltersChange = (newFilters) => {
        setFilters(prevFilters => ({
            // Get previous filtered and add new filter
            ...prevFilters,
            ...newFilters,
        }));
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={1} >
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={filters} onChange={handleFiltersChange}/>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <ProductSort currentSort={filters._sort} onChange={handleSortchange}></ProductSort>
                        <Paper elevation={0}>
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList}/>}
                            <Pagination
                                className={classes.pagination}
                                color="primary" 
                                count={Math.ceil(pagination.total/pagination.limit)} 
                                page={pagination.page}
                                onChange={handlePagechange}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;