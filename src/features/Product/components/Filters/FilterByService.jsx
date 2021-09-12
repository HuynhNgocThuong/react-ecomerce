import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey}`,
        alignItems: "left"
    },
    list: {
        padding:0,
        margin: 0,
        listStyleType: 'none',
        '& > li':{
            margin: 0,
            marginTop: theme.spacing(1),
         }   
        }
    }
));
function FilterByService(props) {
    const {filters, onChange} = props;
    const service = [
        {
            label: 'Có khuyến mãi',
            value: 'isPromotion'
        },
        {
            label: 'Vận chuyển miễn phí',
            value: 'isFreeShip'
        }
    ]
    const classes = useStyles();
    const handleChange = (event) => {
        if(!onChange) return;
        const {name, checked} = event.target;
        onChange({[name]: checked})
    }
    return (
        <Box className={classes.root}>
            <Typography align="left">Dịch vụ</Typography>
            <ul className={classes.list}>
                {
                    service.map((item)=>(
                        <li key={item.value} align="left">
                           <FormControlLabel
                            control={
                            <Checkbox
                                checked={filters[item.value]}
                                onChange={handleChange}
                                name={item.value}
                                color="primary"
                            />
                            }
                            label={item.label}
                        />
                        </li>
                    ))
                }
            </ul>
        </Box>
    );
}

export default FilterByService;