import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
const ResetPassword = ({ match, resetPassword, history }) => {
    const [formData, setFormData] = useState({
        newPassword: ''
    });
    const { newPassword } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        resetPassword({ newPassword }, match.params.resetPasswordToken, history);
    };
    return (
        <>
            <h2 className="mt-5 mb-5">Reset your Password</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group mt-5">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Your new password"
                        value={newPassword}
                        name="newPassword"
                        onChange={e => onChange(e)}
                        autoFocus
                    />
                </div>
                <button type="submit" className="btn btn-raised btn-primary">
                    Reset Password
                </button>
            </form>
        </>
    );
};

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired
};

export default connect(null, { resetPassword })(withRouter(ResetPassword));
