import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import { findPeople } from '../../actions/profile';
import UserItem from './UserItem';

const FindPeople = ({ findPeople, profile: { profiles, loading } }) => {
    useEffect(() => {
        findPeople();
    }, [findPeople]);

    return (
        <Fragment>
            {loading || !profiles ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h2 className="mt-5 mb-5">Find People</h2>

                    {profiles.length > 0 ? (
                        <div className="row">
                            {profiles.map(profile => (
                                <UserItem key={profile._id} profile={profile} showActions={false} />
                            ))}
                        </div>
                    ) : (
                        <h4>No profiles found....</h4>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

FindPeople.propTypes = {
    findPeople: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { findPeople })(FindPeople);
