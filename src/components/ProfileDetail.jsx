import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMode } from "../context/ModeContext";
import styles from "../styles/profiledetail.module.css";

const ProfileDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useMode() || { darkMode: false }; // Provide default value
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~clayl/test/fetch-data-with-id.php?id=${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch profile');
                }
                return res.json();
            })
            .then(data => setProfile(data))
            .catch(error => {
                console.error("Error fetching data:", error);
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    if (!profile) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={`${styles.profileDetailContainer} ${darkMode ? styles.darkMode : ''}`}>
            <button onClick={() => navigate('/home')} className={styles.backButton}>
                &larr; Back to Home
            </button>

            <div className={styles.profileDetail}>
                <div className={styles.imageSection}>
                    <img src={profile.image_url} alt={profile.name} />
                </div>
                <div className={styles.infoSection}>
                    <div className={styles.headerSection}>
                        <h1>{profile.name}</h1>
                        <Link to={`/profile/${id}/edit`} className={styles.editButton}>
                            Edit Profile
                        </Link>
                    </div>
                    <h2>{profile.title}</h2>
                    <div className={styles.emailSection}>
                        <h3>Contact</h3>
                        <a href={`mailto:${profile.email}`} className={styles.email}>
                            {profile.email}
                        </a>
                    </div>
                    <div className={styles.bioSection}>
                        <h3>About</h3>
                        <p>{profile.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
