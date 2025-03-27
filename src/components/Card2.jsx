import React, { memo, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from '../styles/card.module.css';
import { useNavigate } from 'react-router-dom';
import { useImageLoader } from '../hooks/useImageLoader';

const Card2 = memo(({ id, image_url, name, title, email }) => {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(0);
    const { loading, error, imgSrc } = useImageLoader(
        image_url,
        'https://via.placeholder.com/300?text=Profile+Image'
    );

    useLayoutEffect(() => {
        if (cardRef.current) {
            const width = cardRef.current.offsetWidth;
            setCardWidth(width);

            const imageElement = cardRef.current.querySelector('img');
            if (imageElement) {
                imageElement.style.height = `${width}px`;
            }
        }
    }, []);

    const handleNavigate = useCallback(() => {
        navigate(`/profile/${id}`);
    }, [navigate, id]);

    const handleEmailClick = useCallback((e) => {
        e.stopPropagation();
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className={styles.profileCard}
            onClick={handleNavigate}
            whileHover={{ scale: 1.05 }}
            style={{
                cursor: 'pointer',
                width: '100%',
                maxWidth: cardWidth ? `${cardWidth}px` : 'auto'
            }}
        >
            <div className={styles.profileCardImg}>
                {loading && <div className={styles.loadingSpinner}>Loading...</div>}
                <img
                    src={imgSrc}
                    alt={name}
                    className={error ? styles.errorImage : ''}
                />
            </div>
            <div className={styles.profileCardContent}>
                <p>{name}</p>
                <p>{title}</p>
                <p>
                    <a
                        href={`mailto:${email}`}
                        onClick={handleEmailClick}
                    >
                        {email}
                    </a>
                </p>
            </div>
        </motion.div>
    );
});

Card2.displayName = 'Card2';

Card2.propTypes = {
    id: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

export default Card2;
