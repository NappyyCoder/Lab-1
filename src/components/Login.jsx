import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/authSlice';
import styles from '../styles/login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ ...formData, isRegistering }));
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData(prev => ({
      ...prev,
      email: ''
    }));
    dispatch(clearError());
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {error && <div className={styles.error}>{error}</div>}
        {loading && <div className={styles.loading}>Loading...</div>}

        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        {isRegistering && (
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required={isRegistering}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className={styles.loginButton} disabled={loading}>
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <button
          type="button"
          className={styles.toggleButton}
          onClick={toggleMode}
          disabled={loading}
        >
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
};

export default Login;
