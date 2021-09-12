import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
    
};

function Login(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    
    async function handleSubmitForm(values){
        try{
            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            const {closeDialog} = props;
            if(closeDialog){
                closeDialog();
            }
        } catch(error){
            console.log('Fail to register: ', error)
            enqueueSnackbar(error.message, {variant:'error'})
        }
    }
    
    return (
        <div>
            <LoginForm onSubmit={handleSubmitForm}/>
        </div>
    );
}

export default Login;