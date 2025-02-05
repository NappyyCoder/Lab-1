import { useState } from "react";

const ProfileForm = () => {
    const [data, setData] = useState({ name: "", title: "", email: "", bio: "" });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); // Corrected typo here

        try {
            const response = await fetch("https://web.ics.purdue.edu/~clayl/test/send-data.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log(result.message);  // Assuming the API returns a JSON with a 'message' key

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;
