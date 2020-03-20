import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import SocialLogin from '../user/SocialLogin';

const Signin = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        recaptcha: false
    });

    const { email, password, recaptcha } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        login({ email, password });
    };

    const recaptchaHandler = e => {
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === 'sunday') {
            dayCount = 0;
        } else if (userDay === 'monday') {
            dayCount = 1;
        } else if (userDay === 'tuesday') {
            dayCount = 2;
        } else if (userDay === 'wednesday') {
            dayCount = 3;
        } else if (userDay === 'thursday') {
            dayCount = 4;
        } else if (userDay === 'friday') {
            dayCount = 5;
        } else if (userDay === 'saturday') {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            setFormData({ ...formData, ['recaptcha']: true });
            return true;
        } else {
            setFormData({ ...formData, ['recaptcha']: false });
            return false;
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <h2 className="mt-5 mb-5">Sign In</h2>

            <hr />
            <SocialLogin />
            <hr />
            <br />
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" className="form-control" name="email" value={email} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <label className="text-muted">{recaptcha ? 'Thanks. You got it!' : 'What day is today?'}</label>

                    <input onChange={e => recaptchaHandler(e)} type="text" name="recaptchaText" className="form-control" />
                </div>
                <button type="submit" className="btn btn-raised btn-primary">
                    Submit
                </button>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p>
                <Link to="/forgot-password" className="text-danger">
                    {' '}
                    Forgot Password
                </Link>
            </p>
        </>
    );
};

Signin.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Signin);
