import React, { useState } from 'react';
import { register, login } from '../../auth/authService';
import { useAuth } from '../../auth/AuthContext';
import './elements.css';

const RegisterBoard = () => {
    const [mode, setMode] = useState<'register' | 'login'>('register');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsAuthenticated } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (mode === 'register') {
                await register(email, username, password);
            } else {
                await login(email, password);
                setIsAuthenticated(true);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="register-board">
            <h3 className="register-board-header">{mode === 'register' ? 'Create an account' : 'Log in to your account'}</h3>
            <form className="register-form" onSubmit={handleSubmit}>

                {mode === 'register' && (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="register-input"
                            required
                        /><br />
                    </>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="register-input"
                    required
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input"
                    required
                /><br />

                <button type="submit" className="register-submit-btn">{mode === 'register' ? 'Register' : 'Login'}</button>
            </form>

            {error && <p className="register-error">{error}</p>}

            {mode === 'register' ? (
                <p>
                    Already have an account?{' '}
                    <button type="button" className="switch-form-btn" onClick={() => setMode('login')}>
                        Switch to Login
                    </button>
                </p>
            ) : (
                <p>
                    Need an account?{' '}
                    <button type="button" className="switch-form-btn" onClick={() => setMode('register')}>
                        Switch to Register
                    </button>
                </p>
            )}
        </div>
    );
};

export default RegisterBoard;