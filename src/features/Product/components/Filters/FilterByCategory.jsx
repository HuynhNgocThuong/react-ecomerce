import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
FilterbyCategory.propTypes = {
    onChange: PropTypes.func,
};
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    menu: {
        padding:0,
        margin: 0,
        listStyleType: 'none',
        '& > li':{
            marginTop: theme.spacing(1),
            transition: 'all .25s',
            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.primary.dark,
         }   
        }
    }
}));
function FilterbyCategory(props) {
    const {onChange} = props;
    const [categoryList, setCategoryList] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        (async()=>{
          try{
            const response = await categoryApi.getAll();
            setCategoryList(
                response.map((item) => ({
                    id: item.id,
                    name: item.name
                }))
            );
          } catch(error){
            console.log('Failed to fetch category list', error);
          }
        })();
    }, [])

    const handleCategoryClick = (category) => {
        if(!onChange) return;
        onChange(category.id);
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2" align="left">Danh Mục Sản Phẩm</Typography>
            <ul className={classes.menu}>
                {
                    categoryList.map((category)=>(
                        <li 
                            key={category.id} 
                            onClick={()=> handleCategoryClick(category)}
                            align="left"
                        >
                            <Typography variant="body2">{category.name}</Typography>
                        </li>
                    ))
                }
            </ul>
        </Box>
    );
}

export default FilterbyCategory;