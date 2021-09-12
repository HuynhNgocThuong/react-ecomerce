import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';

import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
Register.propTypes = {
    
};

function Register(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    
    async function handleSubmitForm(values){
        try{

            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            const {closeDialog} = props;
            if(closeDialog){
                closeDialog();
                console.log('register done')
            }
            enqueueSnackbar('Register successfully !!!', {variant:'success'});
        } catch(error){
            console.log('Fail to register: ', error)
            enqueueSnackbar(error.message, {variant:'error'})
        }
    }
    
    return (
        <div>
            <RegisterForm onSubmit={handleSubmitForm}/>
        </div>
    );
}

export default Register;