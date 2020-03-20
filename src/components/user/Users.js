import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import UserItem from './UserItem';
import { getProfiles } from '../../actions/profile';
const Users = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h2 className="mt-5 mb-5">Users</h2>

                    {profiles.length > 0 ? (
                        <div className="row">
                            {profiles.map(profile => (
                                <UserItem key={profile._id} profile={profile} />
                            ))}
                        </div>
                    ) : (
                        <h4>No profiles found....</h4>
                    )}
                </>
            )}
        </>
    );
};

Users.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Users);
