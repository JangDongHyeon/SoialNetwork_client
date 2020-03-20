import React, { useState } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/auth';
import PropTypes from 'prop-types';

const ForgotPassword = ({ forgotPassword }) => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const { email } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        forgotPassword({ email });
    };
    return (
        <>
            <h2 className="mt-5 mb-5">Ask for Password Reset</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group mt-5">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                        value={email}
                        name="email"
                        onChange={e => onChange(e)}
                        autoFocus
                    />
                </div>
                <button type="submit" className="btn btn-raised btn-primary">
                    Send Password Rest Link
                </button>
            </form>
        </>
    );
};

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired
};

export default connect(null, { forgotPassword })(ForgotPassword);
