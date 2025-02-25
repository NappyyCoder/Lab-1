import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMode } from "../context/ModeContext.jsx";
import styles from "../styles/editprofile.module.css";

const EditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useMode();
    const [data, setData] = useState({ name: "", title: "", email: "", bio: "", image_url: "" });
    const [errors, setErrors] = useState({ image: "", general: "" });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~clayl/test/fetch-data-with-id.php?id=${id}`)
            .then(res => res.json())
            .then(profileData => {
                setData(profileData);
            })
            .catch(error => {
                console.error("Error fetching profile:", error);
                setErrors({ ...errors, general: "Error loading profile data" });
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({ image: "", general: "" });

        // Log the data being sent
        console.log("Sending data:", data);

        try {
            const response = await fetch(`https://web.ics.purdue.edu/~clayl/test/send-data-with-id.php?id=${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    name: data.name,
                    email: data.email,
                    title: data.title,
                    bio: data.bio,
                    image_url: data.image_url
                }),
            });

            // Log the raw response
            const rawResponse = await response.text();
            console.log("Raw response:", rawResponse);

            let result;
            try {
                result = JSON.parse(rawResponse);
            } catch (e) {
                console.error("Failed to parse response as JSON:", e);
                throw new Error("Server response was not valid JSON");
            }

            if (result.success) {
                setSuccessMessage("Profile updated successfully click go back to home to see results!");
                setTimeout(() => {
                    navigate(`/profile/${id}`);
                }, 1500);
            } else {
                setErrors({ ...errors, general: result.message || "Error updating profile" });
            }
        } catch (error) {
            console.error("Update error:", error);
            setErrors({ ...errors, general: "Something went wrong. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://web.ics.purdue.edu/~clayl/test/delete-profile.php?id=${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                // Close the confirmation modal
                setShowDeleteConfirm(false);
                // Navigate to home page immediately
                navigate('/home');
            } else {
                setShowDeleteConfirm(false);
                setErrors({ ...errors, general: result.message || "Error deleting profile" });
            }
        } catch (error) {
            console.error("Delete error:", error);
            setShowDeleteConfirm(false);
            setErrors({ ...errors, general: "Failed to delete profile. Please try again." });
        }
    };

    return (
        <div className={`${styles.editProfileContainer} ${darkMode ? styles.darkMode : ''}`}>
            <button
                onClick={() => navigate(`/profile/${id}`)}
                className={styles.backButton}
            >
                &larr; Back to Profile
            </button>

            <form className={styles.editForm} onSubmit={handleSubmit}>
                <h1>Edit Profile</h1>

                <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="bio">Biography</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={data.bio || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={submitting}
                    >
                        {submitting ? "Updating..." : "Update Profile"}
                    </button>

                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        Delete Profile
                    </button>
                </div>

                {errors.general && (
                    <div className={styles.errorMessage}>{errors.general}</div>
                )}
                {successMessage && (
                    <div className={styles.successMessage}>{successMessage}</div>
                )}
            </form>

            {showDeleteConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this profile? This action cannot be undone.</p>
                        <div className={styles.modalButtons}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.confirmDeleteButton}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
