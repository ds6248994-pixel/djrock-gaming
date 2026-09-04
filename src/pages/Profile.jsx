import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  // ================================
  // LOAD PROFILE
  // ================================

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setMessage("");

      // ================================
      // GET AUTH USER
      // ================================

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error(
          "Profile Auth Error:",
          authError
        );

        navigate("/login");
        return;
      }

      setUser(user);
      console.log("CURRENT USER ID:", user.id);
      console.log("CURRENT USER EMAIL:", user.email);

      setEmail(
        user.email || ""
      );

      // ================================
      // GET PROFILE
      // ================================

        const {
          data: profiles,
          error: profileError,
        } = await supabase
          .from("profile")
          .select(
            "id, username, avatar_url, created_at, role, contact_number"
          )
          .eq("id", user.id);

        if (profileError) {
          console.error(
            "Profile Load Error:",
            profileError
          );

          setMessage(
            profileError.message
          );

          return;
        }

        if (!profiles || profiles.length === 0) {
          console.error(
            "PROFILE NOT FOUND:",
            user.id
          );

          setMessage(
            "Profile not found for this account."
          );

          return;
        }

        const profile = profiles[0];

      if (profileError) {
        console.error(
          "Profile Load Error:",
          profileError
        );

        setMessage(
          "Could not load profile."
        );

        return;
      }

      setName(
        profile?.username || ""
      );

      setContactNumber(
        profile?.contact_number || ""
      );

    } catch (error) {
      console.error(
        "Load Profile Error:",
        error
      );

      setMessage(
        "Something went wrong while loading your profile."
      );

    } finally {
      setLoading(false);
    }
  }

  // ================================
  // SAVE PROFILE
  // ================================

  async function handleSave() {
    if (!name.trim()) {
      setMessage(
        "Please enter your name."
      );

      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const {
          data: updatedProfiles,
          error,
        } = await supabase
          .from("profile")
          .update({
            username: name.trim(),
            contact_number:
              contactNumber.trim() || null,
          })
          .eq("id", user.id)
          .select(
            "id, username, avatar_url, created_at, role, contact_number"
          );

        if (error) {
          console.error(
            "Profile Update Error:",
            error
          );

          setMessage(error.message);
          return;
        }

        if (
          !updatedProfiles ||
          updatedProfiles.length === 0
        ) {
          console.error(
            "PROFILE UPDATE RETURNED 0 ROWS:",
            user.id
          );

          setMessage(
            "Profile could not be updated."
          );

          return;
    } 

const updatedProfile =
  updatedProfiles[0];

      if (error) {
        console.error(
          "Profile Update Error:",
          error
        );

        setMessage(
          error.message
        );

        return;
      }

        const { error: authUpdateError } =
  await supabase.auth.updateUser({
    data: {
      name: name.trim(),
    },
  });

if (authUpdateError) {
  console.error(
    "Auth Display Name Update Error:",
    authUpdateError
  );
}
      // ================================
      // UPDATE LOCAL STORAGE
      // ================================

      const savedUser =
        JSON.parse(
          localStorage.getItem(
            "djrockUser"
          )
        ) || {};

      const updatedUser = {
        ...savedUser,
        id: updatedProfile.id,
        name:
          updatedProfile.username,
        email:
          user.email || "",
        contactNumber:
          updatedProfile.contact_number,
        memberSince:
          updatedProfile.created_at
            ? new Date(
                updatedProfile.created_at
              ).getFullYear()
            : "2026",
      };

      localStorage.setItem(
        "djrockUser",
        JSON.stringify(
          updatedUser
        )
      );

      setMessage(
        "Profile updated successfully! ✅"
      );

      setIsEditing(false);

    } catch (error) {
      console.error(
        "Save Profile Error:",
        error
      );

      setMessage(
        "Could not save profile."
      );

    } finally {
      setSaving(false);
    }
  }

  // ================================
  // LOGOUT
  // ================================

  async function handleLogout() {
    try {
      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          "Logout Error:",
          error
        );

        setMessage(
          error.message
        );

        return;
      }

      localStorage.removeItem(
        "djrockLoggedIn"
      );

      localStorage.removeItem(
        "djrockUser"
      );

      navigate("/login");

    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );

      setMessage(
        "Logout failed. Please try again."
      );
    }
  }

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h1>Loading Profile...</h1>
        </div>
      </div>
    );
  }

  // ================================
  // UI
  // ================================

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>
          My Profile
        </h1>

        <p className="profile-subtitle">
          Welcome to your DJROCK profile
        </p>

        {/* ================================
            PROFILE INFORMATION
        ================================ */}

        <div className="profile-info">

          {/* NAME */}

          <div>
            <strong>
              Name
            </strong>

            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Enter your name"
              />
            ) : (
              <p>
                {name || "Not set"}
              </p>
            )}
          </div>

          {/* EMAIL */}

          <div>
            <strong>
              Email
            </strong>

            <p>
              {email || "Not available"}
            </p>
          </div>

          {/* CONTACT NUMBER */}

          <div>
            <strong>
              Contact Number
            </strong>

            {isEditing ? (
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) =>
                  setContactNumber(
                    e.target.value
                  )
                }
                placeholder="Enter your contact number"
              />
            ) : (
              <p>
                {contactNumber ||
                  "Not added"}
              </p>
            )}
          </div>

          {/* MEMBER SINCE */}

          <div>
            <strong>
              Member Since
            </strong>

            <p>
              {user?.created_at
                ? new Date(
                    user.created_at
                  ).getFullYear()
                : "2026"}
            </p>
          </div>

        </div>

        {/* ================================
            MESSAGE
        ================================ */}

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        {/* ================================
            PROFILE ACTIONS
        ================================ */}

        <div className="profile-actions">

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "💾 Save"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setMessage("");
                }}
                disabled={saving}
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setIsEditing(true);
              }}
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