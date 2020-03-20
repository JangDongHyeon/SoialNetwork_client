import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import { setAlert } from '../../actions/alert';
import DefaultPost from '../images/avatar.jpg';
import { Link, withRouter } from 'react-router-dom';
import { getPost, updatePost } from '../../actions/post';

const initialState = {
    title: '',
    body: '',
    photo: '',
    fileSize: ''
};

let userData;

const EditPost = ({ post: { post, loading }, match, history, getPost, updatePost, setAlert }) => {
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        if (!post) getPost(match.params.postId);
        if (!loading) {
            userData = new FormData();
            const posrData = { ...initialState };
            for (const key in post) {
                if (key in posrData) posrData[key] = post[key];
            }
            setFormData(posrData);
        }
    }, [loading, getPost, match.params.postId]);

    const { title, body, fileSize } = formData;

    const onChange = e => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;

        const fileSize = e.target.name === 'photo' ? e.target.files[0].size : 0;
        userData.set([e.target.name], value);
        setFormData({ ...formData, [e.target.name]: value });
        if (fileSize !== 0) setFormData({ ...formData, [e.target.name]: fileSize });
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
            updatePost(match.params.postId, userData, history);
        }
    };

    return (
        <>
            {loading || post === null ? (
                <Spinner />
            ) : (
                <>
                    <h2 className="mt-5 mb-5">{post.title}</h2>
                    <img
                        style={{ height: '200px', width: 'auto' }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}}`}
                        onError={i => (i.target.src = `${DefaultPost}`)}
                        alt={post.title}
                    />
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label className="text-muted">Post Photo</label>
                            <input onChange={e => onChange(e)} name="photo" type="file" accept="image/*" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Title</label>
                            <input onChange={e => onChange(e)} name="title" type="text" className="form-control" value={title} />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Body</label>
                            <textarea onChange={e => onChange(e)} name="body" type="text" className="form-control" value={body} />
                        </div>

                        <button type="submit" className="btn btn-raised btn-primary">
                            Post Update
                        </button>
                    </form>
                    <div>
                        <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary btn-sm">
                            Back
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};

EditPost.propTypes = {
    getPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { setAlert, getPost, updatePost })(withRouter(EditPost));
