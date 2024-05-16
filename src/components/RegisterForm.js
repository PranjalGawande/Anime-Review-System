import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterForm = ({ onClose, onRegisterSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match', {
                duration: 3000,
            });
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid email format. Please enter a valid email.', {
                duration: 3000,
            });
            setError('Invalid email format. Please enter a valid email.');
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.', {
                duration: 3000,
            });
            setError('Password must be at least 8 characters long.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:9292/register', {
                email,
                password,
                role: 'USER',
                status: true,
                name
            });
            // const token = response.data.token;
            // sessionStorage.setItem('token', token); // Store the token in session storage
            // window.dispatchEvent(new Event('storage'));
            // setToken(token); // Update the token state
            onClose();
            onRegisterSuccess();
            toast.success('Registration successful', {
                duration: 3000,
            });
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            toast.error('Registration failed. Please try again.', {
                duration: 3000,
            });
            // setError('Registration failed. Please try again.'); // Display error message
        }
    };

    return (
        <div className="LoginForm">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="heading">Register</div>
                    <button style={{ border: "none", backgroundColor: "#f4f7fb", height: "100%" }} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="form">
                    <div className="input-container">
                        <input required className="input" type="text" name="name" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <input required className="input" type="email" name="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <input required className="input" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <input required className="input" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <input  className="register-button" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
