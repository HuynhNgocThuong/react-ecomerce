import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

FilterByPrice.propTypes = {
   onChange: PropTypes.func, 
};
const useStyles = makeStyles((theme)=>({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey}`,
        alignItems: "left"
    },
    range:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'row nowrap',

        '& > span': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }  

    }
}))
function FilterByPrice(props) {
    const { onChange } = props;
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    })
    const classes = useStyles();
    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }))

    }
    const handleSubmit = () => {
        if(!onChange) return;
        onChange(values);
        setValues({});
    }
    return (
        <Box className={classes.root}>
            <Typography align="left" variant="subtitle2">Giá</Typography>
            <Box className={classes.range}>
                <TextField 
                    name="salePrice_gte" 
                    value={values.salePrice_gte}
                    onChange={handleChange}/>
                <span>-</span>
                <TextField 
                    name="salePrice_lte" 
                    value={values.salePrice_lte}
                    onChange={handleChange}/>
            </Box>
            <Button
                align="left"
                size="small"
                variant="outlined" 
                color="primary" 
                onClick={handleSubmit}>
                    Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;