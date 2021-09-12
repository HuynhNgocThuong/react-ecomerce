import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';


PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};
PasswordField.defaultProps = {
    disabled: false
}

function PasswordField(props) {
    const {form, name, label, disabled} = props;
    const [showPassword, setShowPassword] = useState(false);
    const {errors, formState} = form;
    const hasError = errors[name];
    
    function toggleShowPassword(){
        setShowPassword(x => !x);
    }

    return (

            <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <Controller
                name={name}
                control={form.control}
                label={label}
                as={OutlinedInput}
                id={name}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            edge="end"
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                disabled={disabled}
                error={!!hasError}

            ></Controller>
            <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>   
            </FormControl>
    );
}

export default PasswordField;