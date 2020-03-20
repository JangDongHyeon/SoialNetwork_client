import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/post';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';

const CommentItem = ({ postId, deleteComment, auth, comment: { _id, text, name, created, postedBy } }) => {
    return (
        <div>
            <Link to={`/user/${postedBy}`}>
                <img
                    style={{
                        borderRadius: '50%',
                        border: '1px solid black'
                    }}
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${postedBy}`}
                    alt={name}
                />
            </Link>
            <div>
                <p className="lead">{text}</p>
                <p className="font-italic mark">
                    Posted by <Link to={`/user/${postedBy}`}>{name} </Link>
                    on <Moment format="YYYY/MM/DD">{created}</Moment>
                    <span>
                        {!auth.loading && auth.user._id === postedBy && (
                            <span onClick={() => deleteComment(postId, _id)} className="text-danger float-right mr-1">
                                Remove
                            </span>
                        )}
                    </span>
                </p>
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
