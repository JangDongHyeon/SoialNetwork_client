import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';

const CommentFrom = ({ setAlert, addComment, postId }) => {
    const [formData, setFormData] = useState({
        text: ''
    });

    const { text } = formData;

    const isValid = () => {
        if (!text.length > 0 || text.length > 150) {
            setAlert('Comment should not be empty and less than 150 characters long', 'danger');
            return false;
        }
        return true;
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (isValid) addComment({ text }, postId);
    };

    return (
        <>
            <h2 className="mt-5 mb-5">Leave a comment</h2>

            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        name="text"
                        onChange={e => onChange(e)}
                        value={text}
                        className="form-control"
                        placeholder="Leave a comment..."
                    />
                    <button type="submit" className="btn btn-raised btn-success mt-2">
                        Comment send
                    </button>
                </div>
            </form>
        </>
    );
};

CommentFrom.propTypes = { addComment: PropTypes.func.isRequired };

export default connect(null, { setAlert, addComment })(CommentFrom);
