import axios from 'axios';
import {
    setAlert
} from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    PHOTO_GET,
    ADD_FOLLOW,
    REMOVE_FOLLOW,

    FIND_PEOPLE
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/me`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}

// Get profile by ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`);

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}

export const UdateProfile = (formData, history, userid) => async dispatch => {

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/user`, formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        history.push(`/profile/${userid}`);

        dispatch(setAlert('Your account has been permanantly Update', 'success'));

    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'));
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }

}

export const photoProfile = (id) => async dispatch => {

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/photo/${id}`);

        dispatch({
            type: PHOTO_GET,
            payload: res.data
        });



    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }

}



export const deleteAccount = (history) => async dispatch => {

    if (window.confirm('Are you sure? This can Not be undone!')) {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/user`);

            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: ACCOUNT_DELETED
            });

            dispatch(setAlert('Your account has been permanantly deleted', 'success'));

            history.push('/');
        } catch (err) {
            dispatch(setAlert(err.response.data.msg, 'danger'));
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status
                }
            });
        }
    }
}

export const findPeople = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/find_people`);

        dispatch({
            type: FIND_PEOPLE,
            payload: res.data
        })

    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'));
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}

export const addFollow = (id, find = false) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/follow/${id}`);
        dispatch({
            type: ADD_FOLLOW,
            payload: res.data
        });
        if (find)
            dispatch(
                findPeople()
            );



        dispatch(setAlert('success Add User Follow', 'danger'));

    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'));
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}

export const removeFollow = id => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/unfollow/${id}`);

        dispatch({
            type: REMOVE_FOLLOW,
            payload: res.data


        })

        dispatch(setAlert('success Remove User Follow', 'danger'));

    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'));
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}