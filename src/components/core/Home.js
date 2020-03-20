import React from 'react';
import Posts from '../posts/Posts';

const Home = () => {
    return (
        <>
            <div className="jumbotron">
                <h2>Home</h2>
                <p className="lead">Welcome to React Frontend</p>
            </div>
            <div>
                <Posts />
            </div>
        </>
    );
};

export default Home;
