import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
    //Case don't have input show message error
    fullName: yup.string()
                .required('Please enter your full name.')
                .test('Should has at least two words', 'Please enter at least two words', value =>{
                    return value.split(' ').length >= 2;
                }),
    email: yup.string()
                .required('Please enter your email.')
                .email('Please enter a valid email address.'),
    password: yup.string()
                .required('Please enter your password.')
                .min(6, 'Please enter at least 6 characters.'),
    retypePassword: yup.string()
                .required('Please retype your password.')
                .oneOf([yup.ref('password')], 'Password does not match.')
  });

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(4),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        margin: theme.spacing(2, 0, 4, 0),
        textAlign: 'center',
    },
    form: {

    },
    submit: {
        margin: theme.spacing(3, 0, 2), 
    },
    progress:{
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0
    }
}))

function RegisterForm(props) {
    const classes = useStyles();
    const form = useForm({
        defaultValues: {
            fullName: '',
            email:'',
            password:'',
            retypePassword:''
        },
        resolver: yupResolver(schema)
    });
    async function handlesSubmit(values){
            console.log("Todo form: ", values)
            const {onSubmit} = props;
            if(onSubmit){
                await onSubmit(values);
                console.log('register form done')
            }
            // form.reset();
        }
    const {isSubmitting} = form.formState;
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.title}>
                Create An Account
            </Typography>
            <form onSubmit={form.handleSubmit(handlesSubmit)}>
                <InputField form={form} name="fullName" label="Full Name" />
                <InputField form={form} name="email" label="Email" />
                <PasswordField form={form} name="password" label="Password" />
                <PasswordField form={form} name="retypePassword" label="Retype Password" />
            <Button 
                variant="contained" 
                color="primary"
                fullWidth 
                type="submit"
                disabled={isSubmitting}
                className={classes.submit}
                size='large'
            >Create An Account</Button>
            </form>
            
        </div>

    );
}

export default RegisterForm;