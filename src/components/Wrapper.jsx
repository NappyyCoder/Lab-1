const Wrapper = ({ children }) => {
    return (
        <div className="section">
            <div className="container">{children}
                <p>Welcome to Cgt 390</p></div>
        </div>
    );
};
export default Wrapper;