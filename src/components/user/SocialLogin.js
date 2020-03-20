import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { socialLogin } from '../../actions/auth';
import GoogleLogin from 'react-google-login';

const SocialLogin = ({ socialLogin }) => {
    const responseGoogleSuccess = response => {
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        socialLogin(user);
    };
    const responseGoogleFailure = response => {
        console.log(response);
    };
    return (
        <>
            <GoogleLogin
                clientId="478027028340-tlu0shefnlmtcn8cfbc46qpie97crg14.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
            />
        </>
    );
};

SocialLogin.propTypes = {
    socialLogin: PropTypes.func.isRequired
};

export default connect(null, { socialLogin })(SocialLogin);
