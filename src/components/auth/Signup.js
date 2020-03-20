import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',

        recaptcha: false
    });
    const { name, email, password, recaptcha } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        console.log(recaptcha);
        if (recaptcha) register({ name, email, password });
        else setAlert('What day is today? Please write a correct answer!', 'danger');
    };

    //Redirect if logged In
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

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

    return (
        <>
            <h2 className="mt-5 mb-5">Signup</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={e => onChange(e)} />
                </div>
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
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </>
    );
};

Signup.prototypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Signup);
