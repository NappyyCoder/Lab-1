import { motion } from 'framer-motion';
import img from './photo1.png';
import PropTypes from 'prop-types';
import styles from '../styles/card.module.css';

const Card2 = ({ img, name, title, email }) => {
    return (
        <motion.div className={styles.profileCard}>
            <div className={styles.profileCardImg}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.profileCardContent}>
                <p>{name}</p>
                <p>{title}</p>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </motion.div>
    );
};

Card2.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    email: PropTypes.string.isRequired
};

export default Card2;
