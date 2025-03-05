import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from '../styles/card.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useLayoutEffect, useState } from 'react';

const Card2 = ({ id, image_url, name, title, email }) => {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(0);

    useLayoutEffect(() => {
        if (cardRef.current) {
            const width = cardRef.current.offsetWidth;
            setCardWidth(width);

            // Adjust image height to maintain aspect ratio
            const imageElement = cardRef.current.querySelector('img');
            if (imageElement) {
                imageElement.style.height = `${width}px`;
            }
        }
    }, []);

    const handleClick = () => {
        navigate(`/profile/${id}`);
    };

    return (
        <motion.div
            ref={cardRef}
            className={styles.profileCard}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            style={{
                cursor: 'pointer',
                width: '100%',
                maxWidth: cardWidth ? `${cardWidth}px` : 'auto'
            }}
        >
            <div className={styles.profileCardImg}>
                <img src={image_url} alt={name} />
            </div>
            <div className={styles.profileCardContent}>
                <p>{name}</p>
                <p>{title}</p>
                <p><a
                    href={`mailto:${email}`}
                    onClick={(e) => e.stopPropagation()}
                >{email}</a></p>
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
