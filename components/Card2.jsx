import img from './components/photo2.jpg'

const Card2 = () => {
    const name = "Lenny ";
    const title = "CSS pro ";
    const email = "clayl@purdue.edu";
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
export default Card2;