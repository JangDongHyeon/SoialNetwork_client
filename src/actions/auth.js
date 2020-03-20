import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/me`);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const register = ({
    name,
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        name,
        email,
        password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/singup`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(
            loadUser()
        );
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });

    }
};

export const login = ({
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/singin`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(
            loadUser()
        );
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const logout = (history) => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_PROFILE
    })
    history.push('/signin');
};

export const forgotPassword = email => async dispatch => {
    try {



        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/forgot-password`, email, config);
        dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'))
        dispatch({
            type: LOGIN_FAIL
        });
    }
}


export const resetPassword = ({
    newPassword
}, resetPasswordLink, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({
            newPassword,
            resetPasswordLink

        });
        console.log(body);
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/reset-password`, body, config);
        dispatch(setAlert(res.data.msg, 'success'))
        history.push('/signin')
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'))
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const socialLogin = user => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify(
            user
        );
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/social-login`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(
            loadUser()
        );
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'))
        dispatch({
            type: LOGIN_FAIL
        });
    }

}