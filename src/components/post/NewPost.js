import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { create } from '../../actions/post';
import { setAlert } from '../../actions/alert';

const initialState = {
    title: '',
    body: '',
    fileSize: ''
};

let userData;

const NewPost = ({ setAlert, create, history }) => {
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        userData = new FormData();
    }, []);

    const { title, body, fileSize } = formData;

    const onChange = e => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;

        const fileSize = e.target.name === 'photo' ? e.target.files[0].size : 0;
        userData.set([e.target.name], value);
        setFormData({
            ...formData,
            [e.target.name]: value
        });
        if (fileSize !== 0)
            setFormData({
                ...formData,
                [e.target.name]: fileSize
            });
    };

    const isValid = () => {
        if (fileSize > 1000000) {
            setAlert('File size should be less than 100kb', 'danger');
            return false;
        }

        if (title.length === 0 || body.length === 0) {
            setAlert('All fields are required', 'danger');
            return false;
        }
        return true;
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (isValid()) {
            create(userData, history);
        }
    };

    return (
        <>
            <h2 className="mt-5 mb-5"> Create a new post </h2>{' '}
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label className="text-muted"> Post Photo </label>{' '}
                    <input onChange={e => onChange(e)} name="photo" type="file" accept="image/*" className="form-control" />
                </div>{' '}
                <div className="form-group">
                    <label className="text-muted"> Title </label>{' '}
                    <input onChange={e => onChange(e)} name="title" type="text" className="form-control" value={title} />{' '}
                </div>
                <div className="form-group">
                    <label className="text-muted"> Body </label>{' '}
                    <textarea onChange={e => onChange(e)} name="body" type="text" className="form-control" value={body} />{' '}
                </div>
                <button type="submit" className="btn btn-raised btn-primary">
                    Create Post{' '}
                </button>{' '}
            </form>{' '}
        </>
    );
};

NewPost.propTypes = {
    create: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default connect(null, {
    setAlert,
    create
})(withRouter(NewPost));
