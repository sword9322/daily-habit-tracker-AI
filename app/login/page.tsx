'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { BarChart, ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <header className="w-full py-4 px-4 lg:px-6 flex items-center justify-between bg-white/10 backdrop-blur-md">
        <Link className="flex items-center justify-center" href="/">
          <BarChart className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold text-white">HabitHub</span>
        </Link>
        <Link href="/" className="text-white hover:text-white/80 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-6 text-center"> Login </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white/20 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white/20 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-purple-600 py-2 px-4 rounded-md hover:bg-white/90 transition-colors font-semibold"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-white/70">
            Don't have an account yet?{' '}
            <Link href="/signup" className="text-white hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>

      <footer className="w-full py-6 px-4 bg-white/10 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">© 2023 HabitHub. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="#" className="text-white/70 hover:text-white text-sm">About</Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm">Privacy</Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm">Terms</Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}