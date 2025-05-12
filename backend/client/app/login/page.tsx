'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginSuccess } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store/store';
import { useLoginMutation } from '@/store/features/authApi';

export default function LoginPage() {
  const [phone_number, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loginUser] = useLoginMutation()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Example static login logic. Replace with API call.

      await loginUser({ phone_number, password }).unwrap()

      dispatch(loginSuccess({ id: '1', phone_number }));
      router.push('/dashboard');

    } catch (err) {
      console.error('Login failed:', err);
      alert('Login error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl text-slate-900  font-bold mb-6 text-center">Login</h2>

        <input
          type="numeric"
          value={phone_number}
          onChange={e => setEmail(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-6 text-black border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
