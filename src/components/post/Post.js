import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import DefaultProfile from '../images/avatar.jpg';
import Moment from 'react-moment';
import CommentFrom from '../post/CommentFrom';
import { getPost, deletePost, addLike, removeLike } from '../../actions/post';
import CommentItem from './CommentItem';

const Post = ({ addLike, removeLike, getPost, deletePost, post: { post, loading }, match, auth, history }) => {
    useEffect(() => {
        getPost(match.params.postId);
    }, [getPost, match.params.postId]);

    const removeLikeClikc = id => {
        if (!auth.isAuthenticated) {
            return history.push('/signin');
        }
        removeLike(id);
    };

    const addLikeClikc = id => {
        if (!auth.isAuthenticated) {
            console.log(history);
            return history.push('/signin');
        }
        addLike(id);
    };

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h2 className="display-2 mt-5 mb-5">title: {post.title}</h2>
            <div className="card-body">
                <img
                    style={{ height: '300px', width: '100%' }}
                    className="img-thumbnail mb-3"
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    alt={post.title}
                />
                <>
                    {auth.isAuthenticated ? (
                        post.likes.filter(like => auth.user._id === like._id).length > 0 ? (
                            <h2 onClick={() => removeLikeClikc(match.params.postId)}>
                                <i className="fa fa-thumbs-up text-warning bg-dark" style={{ padding: '10px', borderRadius: '50%' }} />{' '}
                                unLike {post.likes.length}
                            </h2>
                        ) : (
                            <h2 onClick={() => addLikeClikc(match.params.postId)}>
                                <i className="fa fa-thumbs-up text-success bg-dark" style={{ padding: '10px', borderRadius: '50%' }} /> Like{' '}
                                {post.likes.length}
                            </h2>
                        )
                    ) : (
                        <h2 onClick={() => addLikeClikc(match.params.postId)}>
                            <i className="fa fa-thumbs-up text-success bg-dark" style={{ padding: '10px', borderRadius: '50%' }} /> Like{' '}
                            {post.likes.length}
                        </h2>
                    )}
                </>
                <p className="card-text">{post.body}</p>
                <br />
                <p className="font-italic mark">
                    Posted by <Link to={`${post.postedBy._id}`}>{post.postedBy.name} </Link>
                    on <Moment format="YYYY/MM/DD">{post.created}</Moment>
                </p>
                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
                        Back to posts
                    </Link>
                    {auth.isAuthenticated && !auth.loading && post.postedBy._id === auth.user._id && (
                        <>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning btn-sm mr-5">
                                Update Post
                            </Link>
                            <button onClick={() => deletePost(post._id, history)} className="btn btn-raised btn-danger">
                                Delete Post
                            </button>
                        </>
                    )}
                </div>
            </div>
            <CommentFrom postId={post._id} />
            <div className="col-md-12">
                <h3 className="text-primary">{post.comments.length}</h3>
                <hr />

                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost, getPost })(withRouter(Post));
