import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Card2 from './Card2';
import styles from '../styles/home.module.css';

const ProfileGrid = memo(({ profiles, darkMode }) => {
    return (
        <div className={styles.profileGrid}>
            {profiles.map((profile, index) => (
                <div
                    className={styles.profileCard}
                    key={profile.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <Link to={`/profile/${profile.id}`} style={{ textDecoration: 'none' }}>
                        <Card2 {...profile} darkMode={darkMode} />
                    </Link>
                </div>
            ))}
        </div>
    );
});

ProfileGrid.displayName = 'ProfileGrid';

export default ProfileGrid;