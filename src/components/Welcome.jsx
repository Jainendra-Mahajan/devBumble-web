import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="my-16">
            <div className="card card-dash bg-base-200 w-[90%] md:w-4/5 lg:w-3/5 mx-auto shadow-2xl">
                <div className="card-body space-y-6 text-center">
                    <h2 className="card-title text-primary text-3xl mx-auto">Welcome to DevBumble! 🐝</h2>

                    <p className="text-base-content text-lg">
                        You've successfully joined a community of passionate developers ready to connect, collaborate, and grow together!
                    </p>

                    <p className="text-base-content text-md">
                        Start swiping to find like-minded devs or explore your dashboard to customize your profile.
                    </p>

                    <div className="flex justify-center gap-4 pt-4">
                        <Link to="/feed" className="btn btn-primary">Go to Dashboard</Link>
                        <Link to="/profile" className="btn btn-outline btn-secondary">Edit Profile</Link>
                    </div>

                    <p className="text-sm text-base-content/70 pt-6">
                        Need help? Reach us at <a className="link text-primary" href="mailto:support@devbumble.space">support@devbumble.space</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
