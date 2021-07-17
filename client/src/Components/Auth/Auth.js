import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux'
import { signin, signup } from '../../actions/authAction'
import { useHistory } from 'react-router-dom';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            if (isSignup) {
                dispatch(signup(formData, history))
            } else {
                dispatch(signin(formData, history))
            }
        } else {
            setOpen(true)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
        setFormData(initialState)
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Passwords dont match!
                </Alert>
            </Snackbar>
            <div style={{ height: '80vh', display: 'flex', alignItems: 'center' }}>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {isSignup && (
                                    <>
                                        <Input value={formData.firstName} name="firstName" label="First Name" handleChange={handleChange} half />
                                        <Input value={formData.lastName} name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )}
                                <Input value={formData.email} name="email" label="Email Address" handleChange={handleChange} type="email" />
                                <Input value={formData.password} name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                <Input value={formData.confirmPassword} name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                {isSignup ? 'Sign Up' : 'Sign In'}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button onClick={switchMode}>
                                        {isSignup ? 'Sign In' : "Sign Up"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </div>
        </>
    )
}

export default Auth