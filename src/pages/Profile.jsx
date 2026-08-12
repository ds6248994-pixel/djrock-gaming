import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const savedUser = JSON.parse(localStorage.getItem("djrockUser"));

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(savedUser?.name || "");
  const [email, setEmail] = useState(savedUser?.email || "");

  function handleSave() {
    const updatedUser = {
      ...savedUser,
      name: name,
      email: email,
    };

    localStorage.setItem("djrockUser", JSON.stringify(updatedUser));

    setIsEditing(false);
  }

  function handleLogout() {
    localStorage.removeItem("djrockLoggedIn");
    navigate("/login");
  }

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

            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p>{name}</p>
            )}
          </div>

          <div>
            <strong>Email</strong>

            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p>{email}</p>
            )}
          </div>

          <div>
            <strong>Member Since</strong>
            <p>{savedUser?.memberSince || "2026"}</p>
          </div>

        </div>

        <div className="profile-actions">

          {isEditing ? (
            <>
              <button type="button" onClick={handleSave}>
                💾 Save
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;