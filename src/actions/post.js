import axios from 'axios';
import {
    setAlert
} from './alert';

import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    REMOVE_LIKES
} from './types';


export const create = (formData, history) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/post/new`, formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        history.push('/');

        dispatch(setAlert('Success Add Post', 'success'));


    } catch (err) {
        console.log(err.response)
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });

    }
}

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
    }
}


export const getPostById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/by/${id}`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })
    }
}

export const deletePost = (id, history) => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/post/${id}`);

            dispatch({
                type: DELETE_POST,
                payload: id
            });

            history.push('/')

            dispatch(setAlert('Post Removed', 'success'));
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status
                }
            })
        }
    }
}


export const updatePost = (id, formData, history) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/post/${id}`, formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        history.push('/')

        dispatch(setAlert('Post success Update', 'success'));

    } catch (err) {

        dispatch(setAlert(err.response.data.msg, 'danger'));
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        })

    }
}

export const addLike = id => async dispatch => {
    try {

        let res = await axios.put(`${process.env.REACT_APP_API_URL}/post/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id,
                likes: res.data
            }
        });




    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}

// Remove like
export const removeLike = id => async dispatch => {
    try {

        let res = await axios.put(`${process.env.REACT_APP_API_URL}/post/unlike/${id}`);

        dispatch({
            type: REMOVE_LIKES,
            payload: {
                id,
                likes: res.data
            }
        });


    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
};

export const addComment = ({
    text
}, id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({
            text
        });
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/post/comment/${id}`, body, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Add', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/post/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status
            }
        });
    }
}