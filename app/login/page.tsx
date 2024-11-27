'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import "../../styles/main.scss";
import Fruit_Icon from '@/public/assets/svgs/fruit_icon.svg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Next.js router for navigation

  // Handle login form submission
  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email.trim() && password.trim()) {
      router.push('/'); // Navigate to the Home page
    } else {
    //   alert("Please fill out both fields.");
    }
  };

  return (
    <div className="login">
      <Image
        src={Fruit_Icon}
        alt="Fruit Icon"
        unoptimized={true}
        className="login__icon"
      />
      <h1 className="login__header">- Log In -</h1>
      <form onSubmit={handleLoginSubmit} className="login__form">
        <div className="login__field">
          <label htmlFor="email" className="login__label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login__input"
            required
          />
        </div>
        <div className="login__field">
          <label htmlFor="password" className="login__label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
            required
          />
        </div>
        <button type="submit" className="login__button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
