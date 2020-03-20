import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultProfile from '../images/avatar.jpg';
import Moment from 'react-moment';
import Spinner from '../layout/spinner';
import FollowBtn from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import { getProfileById, deleteAccount } from '../../actions/profile';

import { Link, withRouter } from 'react-router-dom';
import { getPostById } from '../../actions/post';
const Profile = ({ getProfileById, getPostById, profile: { profile, loading }, auth, match, deleteAccount, history, post: { posts } }) => {
    useEffect(() => {
        getProfileById(match.params.id);
        getPostById(match.params.id);
    }, [getPostById, getProfileById, match.params.id]);
    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h2 className="mt-5 mb-5">Profile</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                style={{ height: '200px', width: 'auto' }}
                                className="img-thumbnail"
                                src={`${process.env.REACT_APP_API_URL}/user/photo/${profile._id}`}
                                onError={i => (i.target.src = `${DefaultProfile}`)}
                                alt={profile.name}
                            />
                        </div>

                        <div className="col-md-8">
                            <div className="lead mt-2">
                                <p>Hello {profile.name}</p>
                                <p>Email: {profile.email}</p>

                                <p className="date">
                                    user date: <Moment format="YYYY/MM/DD">{profile.created}</Moment>
                                </p>
                            </div>
                            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile._id ? (
                                <div className="d-inline-block">
                                    <Link to={'/user/edit'} className="btn btn-raised btn-success mr-5">
                                        Edit Profile
                                    </Link>
                                    <button onClick={() => deleteAccount(history)} className="btn btn-raised btn-danger">
                                        Delete Profile
                                    </button>
                                </div>
                            ) : (
                                <FollowBtn profile={profile} showActions={false} />
                            )}

                            <hr />
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-12 mt-5 mb-5">
                                <hr />
                                <p className="lead">{profile.about ? profile.about : 'Not About'}</p>
                                <hr />

                                <ProfileTabs followers={profile.followers} following={profile.following} posts={posts} />
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    getPostById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { getPostById, getProfileById, deleteAccount })(withRouter(Profile));
