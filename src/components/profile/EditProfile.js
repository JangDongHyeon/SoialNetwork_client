import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';

import { UdateProfile, getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import DefaultProfile from '../images/avatar.jpg';
import { withRouter } from 'react-router-dom';
const initialState = {
    name: '',
    password: '',
    created: '',
    about: '',
    fileSize: ''
};

let userData;

const EditProfile = ({ setAlert, getCurrentProfile, UdateProfile, profile: { profile, loading }, history }) => {
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        if (!profile) getCurrentProfile();
        if (!loading) {
            userData = new FormData();
            const profileData = { ...initialState };
            for (const key in profile) {
                if (key in profileData) profileData[key] = profile[key];
            }
            setFormData(profileData);
        }
    }, [loading, getCurrentProfile]);

    const { about, name, password, fileSize } = formData;

    const onChange = e => {
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;

        const fileSize = e.target.name === 'photo' ? e.target.files[0].size : 0;
        userData.set([e.target.name], value);
        setFormData({ ...formData, [e.target.name]: value });
        if (fileSize !== 0) setFormData({ ...formData, [e.target.name]: fileSize });
    };

    const isValid = () => {
        if (fileSize > 1000000) {
            setAlert('File size should be less than 100kb', 'danger');
            return false;
        }

        if (name.length === 0) {
            setAlert('Name is required', 'danger');
            return false;
        }
        if ((password.length >= 1 && password.length <= 5) || password.length === 0) {
            setAlert('Password must be at least 6 characters long', 'danger');
            return false;
        }
        return true;
    };

    const photoUrl = profile._id ? `${process.env.REACT_APP_API_URL}/user/photo/${profile._id}` : DefaultProfile;

    const onSubmit = e => {
        e.preventDefault();
        if (isValid()) {
            UdateProfile(userData, history, profile._id);
        }
    };

    return (
        <>
            <h2 className="mt-5 mb-5">EditProfile</h2>
            {loading && profile === null ? (
                <Spinner />
            ) : (
                <>
                    <img
                        style={{ height: '200px', width: 'auto' }}
                        className="img-thumbnail"
                        src={photoUrl}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={name}
                    />
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label className="text-muted">Profile Photo</label>
                            <input onChange={e => onChange(e)} name="photo" type="file" accept="image/*" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input onChange={e => onChange(e)} name="name" type="text" className="form-control" value={name} />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input onChange={e => onChange(e)} name="password" type="password" className="form-control" value={password} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">about</label>
                            <textarea onChange={e => onChange(e)} name="about" type="text" className="form-control" value={about} />
                        </div>
                        <button type="submit" className="btn btn-raised btn-primary">
                            Update
                        </button>
                    </form>
                </>
            )}
        </>
    );
};

EditProfile.propTypes = {
    UdateProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { setAlert, getCurrentProfile, UdateProfile })(withRouter(EditProfile));
