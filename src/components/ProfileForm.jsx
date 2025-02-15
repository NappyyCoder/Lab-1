


import { useState } from "react";

const ProfileForm = () => {
    const [data, setData] = useState({ name: "", title: "", email: "", bio: "", image: null });
    const [errors, setErrors] = useState({ image: "", general: "" });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            setData({ ...data, image: file });
            if (file && file.size > 2000000) { // Check if file exists before accessing its size
                setErrors({ ...errors, image: "Image must be less than 2MB." });
            } else {
                setErrors({ ...errors, image: "" }); // Reset error message if file size is fine
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
                setData({ name: "", title: "", email: "", bio: "", image: null })
                setErrors({ image: "", general: "" });
                setSuccessMessage("Data submitted successfully.")
                setTimeout(() => {
                    setSuccessMessage("");
                }, 1000);
            } else {
                setErrors({ image: "", general: result.message });
            }

        } catch (error) {
            setErrors({ ...errors, general: "Something went wrong. Please try again." });
            console.error(error); // Log the actual error for debugging purposes
        } finally {
            setSubmitting(false); // Reset submitting state once the request finishes
        }
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={data.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={data.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="title"
                placeholder="Title"
                required
                value={data.title}
                onChange={handleChange}
            />
            <textarea
                name="bio"
                placeholder="Some description"
                required
                value={data.bio}
                onChange={handleChange}
            ></textarea>

            <label htmlFor="image">Choose a profile Picture:</label>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={handleChange}
            />
            {errors.image && <p>{errors.image}</p>}
            <button type="submit" disabled={submitting || errors.image}>Submit</button>
            {errors.general && <p>{errors.general}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
};

export default ProfileForm;
