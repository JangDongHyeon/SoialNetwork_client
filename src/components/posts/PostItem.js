import React from 'react';
import PropTypes from 'prop-types';
import DefaultProfile from '../images/avatar.jpg';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const PostItem = ({ post: { _id, title, body, created, postedBy }, showActions }) => {
    return (
        <div className="card col-md-4">
            <div className="card-body">
                <img
                    style={{
                        height: '200px',
                        width: '100%'
                    }}
                    className="img-thumbnail mb-3"
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${_id}`}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    alt={title}
                />{' '}
                <h5 className="card-title"> {title} </h5> <p className="card-text"> {body.substring(0, 100)} </p> <br />
                <p className="font-italic mark">
                    Posted by <Link to={`${postedBy._id}`}> {postedBy.name} </Link>
                    on <Moment format="YYYY/MM/DD"> {created} </Moment>{' '}
                </p>{' '}
                <Link to={`/post/${_id}`} className="btn btn-raised btn-primary btn-sm">
                    Read more{' '}
                </Link>{' '}
            </div>{' '}
        </div>
    );
};

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    showActions: PropTypes.bool
};

export default PostItem;
