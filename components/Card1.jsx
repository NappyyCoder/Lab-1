
import img from './components/photo1.png'
import './card.css'
const Card1 = () => {
    const name = "John Doe";
    const title = "softwate engineer";
    const email = "a@a.com";
    return (
        <div className="profile-card">
            <div className="profile-card__img">
                <img src={img} alt="profile" />
            </div>
            <div className="profile-card-content">
                <p>{name}</p>
                <p>{title}</p>
                <p><a href={'mailto:${email}'}>{email}</a></p>
            </div>
        </div>

    );
}
export default Card1;