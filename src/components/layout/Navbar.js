import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout, history }) => {
    const logoutOnclick = () => {
        logout(history);
    };
    const authLinks = (
        <>
            <li className="nav-item">
                <Link className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'} to="/users">
                    <i className="fas fa-user-friends" /> Users
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className={history.location.pathname === '/findpeople' ? 'active nav-link' : 'not-active nav-link'}
                    to={`/findpeople`}
                >
                    <i className="fas fa-users" /> Find People
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className={history.location.pathname === '/create/post' ? 'active nav-link' : 'not-active nav-link'}
                    to={`/create/post`}
                >
                    <i className="fas fa-plus" /> Create Post
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className={history.location.pathname === '/profile' ? 'active nav-link' : 'not-active nav-link'}
                    to={user ? `/profile/${user._id}` : '#'}
                >
                    <i className="fas fa-user" /> {user && user.name} Profile
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" onClick={() => logoutOnclick()} to="#!">
                    <i className="fas fa-sign-out-alt" /> Logout
                </Link>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li className="nav-item">
                <Link className={history.location.pathname === '/signup' ? 'active nav-link' : 'not-active nav-link'} to="/signup">
                    <i className="fas fa-user-plus"></i> Signup
                </Link>
            </li>
            <li className="nav-item">
                <Link className={history.location.pathname === '/signin' ? 'active nav-link' : 'not-active nav-link'} to="/signin">
                    <i className="fas fa-sign-in"></i> Signin
                </Link>
            </li>
        </>
    );
    return (
        <>
            <ul className="nav nav-tabs bg-primary" style={{ fontSize: 18 }}>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-home"></i> Home
                    </Link>
                </li>
                {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
            </ul>
        </>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
