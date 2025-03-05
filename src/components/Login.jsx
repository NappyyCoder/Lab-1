import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    action: 'login'
  });
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = new FormData();
    form.append('username', formData.username);
    form.append('password', formData.password);
    form.append('action', isRegistering ? 'register' : 'login');

    if (isRegistering) {
      form.append('email', formData.email);
    }

    try {
      const response = await fetch('https://web.ics.purdue.edu/~clayl/test/auth.php', {
        method: 'POST',
        body: form
      });

      // Log the raw response for debugging
      const rawResponse = await response.text();
      console.log('Raw server response:', rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error(`Failed to parse server response: ${rawResponse}`);
      }

      if (data.success) {
        login({ username: formData.username });
        navigate('/home');
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(`Authentication error: ${err.message}`);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData(prev => ({
      ...prev,
      action: !isRegistering ? 'register' : 'login',
      email: ''
    }));
    setError('');
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {error && <div className={styles.error}>{error}</div>}

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

        <button type="submit" className={styles.loginButton}>
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <button
          type="button"
          className={styles.toggleButton}
          onClick={toggleMode}
        >
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
};

export default Login;
