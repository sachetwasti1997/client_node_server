'use client';

import { useState } from 'react';
import axios from 'axios';
import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (res) => router.push('/')
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
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
      {errors}
      <button className="btn btn-primary formelement">Sign Up</button>
    </form>
  );
}
