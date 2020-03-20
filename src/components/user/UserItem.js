import React from 'react';
import PropTypes from 'prop-types';
import DefaultProfile from '../images/avatar.jpg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFollow } from '../../actions/profile';

const UserItem = ({ profile, showActions, addFollow }) => {
    return (
        <div className="card col-md-4">
            <img
                style={{ height: '200px', width: 'auto' }}
                className="img-thumbnail"
                alt={profile.name}
                onError={i => (i.target.src = `${DefaultProfile}`)}
                src={`${process.env.REACT_APP_API_URL}/user/photo/${profile._id}`}
            />
            <div className="card-body">
                <h5 className="card-title">{profile.name}</h5>
                <p className="card-text">{profile.email}</p>
                <Link to={`/profile/${profile._id}`} className="btn btn-raised btn-primary btn-sm">
                    View Profile
                </Link>
                {!showActions && (
                    <>
                        <button onClick={() => addFollow(profile._id, true)} className="btn btn-raised btn-info float-right btn-sm">
                            Follow
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

UserItem.defaultProps = {
    showActions: true
};

UserItem.propTypes = {
    addFollow: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addFollow })(UserItem);
