import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';

const ProfileTabs = ({ following, followers, posts }) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <h3 className="text-primary">{followers && followers.length} Followers</h3>
                    <hr />
                    {followers.length > 0 &&
                        followers.map((follow, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/profile/${follow._id}`}>
                                        <img
                                            style={{
                                                borderRadius: '50%',
                                                border: '1px solid black'
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            alt={follow.name}
                                            onError={i => (i.target.src = `${DefaultProfile}`)}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${follow._id}`}
                                        />
                                        <div>
                                            <p className="lead">{follow.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="col-md-4">
                    <h3 className="text-primary">{following && following.length} Following</h3>
                    <hr />
                    {following.length > 0 &&
                        following.map((follow, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/profile/${follow._id}`}>
                                        <img
                                            style={{
                                                borderRadius: '50%',
                                                border: '1px solid black'
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            alt={follow.name}
                                            onError={i => (i.target.src = `${DefaultProfile}`)}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${follow._id}`}
                                        />
                                        <div>
                                            <p className="lead">{follow.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="col-md-4">
                    <h3 className="text-primary">{posts.length} Posts</h3>
                    <hr />
                    {posts.map(post => (
                        <div key={post._id}>
                            <div>
                                <Link to={`/post/${post._id}`}>
                                    <div>
                                        <p className="lead">{post.title}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileTabs;
