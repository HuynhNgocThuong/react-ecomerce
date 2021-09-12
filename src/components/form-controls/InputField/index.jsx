import { TextField } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};
InputField.defaultProps = {
    disabled: false
}

function InputField(props) {
    const {form, name, label, disabled} = props;
    const {errors, formState} = form;
    const hasError =  errors[name];
    return (
        <Controller
            name={name}
            control={form.control}
            variant="outlined"
            margin="normal"
            as={TextField}
            label={label}
            fullWidth
            disabled={disabled}
            error={!!hasError}
            helperText={errors[name]?.message}
        >
        </Controller>
    );
}

export default InputField;
