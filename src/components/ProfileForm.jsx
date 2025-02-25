

import { useState } from "react";
import "../styles/profileform.css";

const ProfileForm = () => {
    const [data, setData] = useState({ name: "", title: "", email: "", bio: "", image: null });
    const [errors, setErrors] = useState({ image: "", general: "" });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            if (file) {
                setSelectedFileName(file.name);
                setData({ ...data, image: file });
                if (file.size > 2000000) {
                    setErrors({ ...errors, image: "Image must be less than 2MB." });
                } else {
                    setErrors({ ...errors, image: "" });
                }
            }
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.target);

        try {
            const response = await fetch("https://web.ics.purdue.edu/~clayl/test/send-data.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                setData({ name: "", title: "", email: "", bio: "", image: null });
                setSelectedFileName("");
                setErrors({ image: "", general: "" });
                setSuccessMessage("Profile created successfully!");
                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                setErrors({ ...errors, general: result.message });
            }
        } catch (error) {
            setErrors({ ...errors, general: "Something went wrong. Please try again." });
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className={`profile-form ${submitting ? 'loading' : ''}`} onSubmit={handleSubmit}>
            <h1>Create New Profile</h1>

            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                />
            </div>

            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter your professional title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="bio">Biography</label>
                <textarea
                    id="bio"
                    name="bio"
                    value={data.bio}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about yourself..."
                />
            </div>

            <div className="file-upload">
                <label htmlFor="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="file-upload-text">
                        {selectedFileName || "Choose a profile picture"}
                    </span>
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                />
                {errors.image && <div className="error-message">{errors.image}</div>}
            </div>

            <button
                type="submit"
                className="submit-button"
                disabled={submitting || errors.image}
            >
                {submitting ? "Creating Profile..." : "Create Profile"}
            </button>

            {errors.general && <div className="error-message">{errors.general}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
    );
};

export default ProfileForm;
