function Profile() {
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-avatar">
                    👤
                </div>

                <h1>My Profile</h1>
                <p className="profile-subtitle">
                    Welcome to your DJROCK profile
                </p>

                <div className="profile-info">
                    <div>
                        <strong>Name</strong>
                        <p>Deepak</p>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <p>Your Email Here</p>
                    </div>

                    <div>
                        <strong>Member Since</strong>
                        <p>2026</p>
                    </div>
                </div>

                <div className="profile-actions">
                    <button>Edit Profile</button>
                    <button>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;