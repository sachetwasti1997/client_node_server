'use client';

import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('/api/users/signup', {
        email,
        password,
      });
    } catch (err) {
      setErrors(err.response.data.errors);
    }
    console.log(resp.data);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3 formelement">
        <label className="form-label">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label formelement">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors.map((err) => err.message)}
      <button className="btn btn-primary formelement">Sign Up</button>
    </form>
  );
}
