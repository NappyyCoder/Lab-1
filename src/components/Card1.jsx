import img from './photo1.png';
import PropTypes from 'prop-types';

const Card1 = ({ img, name, title, email }) => {
    return (
        <div className="profile-card">
            <div className="profile-card__img">
                <img src={img} alt={name} />
            </div>
            <div className="profile-card-content">
                <p>{name}</p>
                <p>{title}</p>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </div>
    );
};

Card1.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    email: PropTypes.string.isRequired
};

export default Card1;