import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFollow, removeFollow } from '../../actions/profile';

const FollowProfileButton = ({ addFollow, removeFollow, profile: { _id, followers }, showActions, auth: { user } }) => {
    return (
        <>
            {!showActions && (
                <div className="d-inline-block">
                    {followers.filter(foll => foll === user._id).length === 0 ? (
                        <button onClick={() => addFollow(_id)} className="btn btn-success btn-raised mr-5">
                            Follow
                        </button>
                    ) : (
                        <button onClick={() => removeFollow(_id)} className="btn btn-warning btn-raised">
                            UnFollow
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

FollowProfileButton.defaultProps = {
    showActions: true
};

FollowProfileButton.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showActions: PropTypes.bool,
    addFollow: PropTypes.func.isRequired,
    removeFollow: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addFollow, removeFollow })(FollowProfileButton);
