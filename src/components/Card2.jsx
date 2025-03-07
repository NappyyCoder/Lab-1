import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from '../styles/card.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useLayoutEffect, useState } from 'react';
import { useImageLoader } from '../hooks/useImageLoader';

const Card2 = ({ id, image_url, name, title, email }) => {
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

    return (
        <motion.div
            ref={cardRef}
            className={styles.profileCard}
            onClick={() => navigate(`/profile/${id}`)}
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
                        onClick={(e) => e.stopPropagation()}
                    >
                        {email}
                    </a>
                </p>
            </div>
        </motion.div>
    );
};

Card2.propTypes = {
    id: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    email: PropTypes.string.isRequired
};

export default Card2;
