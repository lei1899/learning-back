'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContainer, LoginForm, Input, Button } from './style';
import { useAuth } from '../../hook/useAuth';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const res = await login(formData.username, formData.password);
      console.log(res);
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <Input 
          type="text" 
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="" 
          required 
        />
        <Input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="" 
          required 
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;