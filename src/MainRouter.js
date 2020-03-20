import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/core/Home';
import Navbar from './components/layout/Navbar';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Profile from './components/profile/Profile';
import Users from './components/user/Users';
import EditProfile from './components/profile/EditProfile';
import FindPeople from './components/user/FindPeople';
import NewPost from './components/post/NewPost';
import Post from './components/post/Post';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import EditPost from './components/post/EditPost';

if (localStorage.token) {
    console.log(localStorage.token);
    setAuthToken(localStorage.token);
}

const MainRouter = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <>
                    <section className="container">
                        <Navbar />
                        <Alert />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/signin" component={Signin} />
                            <Route exact path="/forgot-password" component={ForgotPassword} />
                            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
                            <Route exact path="/post/:postId" component={Post} />
                            <PrivateRoute exact path="/create/post" component={NewPost} />
                            <PrivateRoute exact path="/users" component={Users} />
                            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
                            <PrivateRoute exact path="/user/edit" component={EditProfile} />
                            <PrivateRoute exact path="/profile/:id" component={Profile} />
                            <PrivateRoute exact path="/findpeople" component={FindPeople} />
                            <PrivateRoute exact path="/create/post" component={NewPost} />
                        </Switch>
                    </section>
                </>
            </Router>
        </Provider>
    );
};

export default MainRouter;
