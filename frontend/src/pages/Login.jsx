import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  
  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const res = await axios.post('http://localhost:5000/api/auth/login', {email, password});
      localStorage.setItem('token', res.data.token);
      alert('Logged in successfully!');
      nav('/');
    }catch(err){ 
      alert(err.response?.data?.msg || 'Login failed'); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-secondary-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-logo-vibrant to-logo-dark shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img src={Logo} alt="JIJAU Pathology Laboratory" className="h-16 w-auto"/>
                </Link>
              </div>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="text-white hover:text-purple-200 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
                <Link to="/tests" className="text-white hover:text-purple-200 px-3 py-2 text-sm font-medium transition-colors">Tests</Link>
                <Link to="/login" className="text-white px-3 py-2 text-sm font-medium border-b-2 border-white">Login</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-secondary-600">
              Access your test reports and manage your appointments
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-secondary-400"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-secondary-400"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-logo-vibrant focus:ring-logo-vibrant border-secondary-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-logo-vibrant hover:text-logo-dark">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-logo-vibrant hover:bg-logo-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-logo-vibrant disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-secondary-600">
                  Don't have an account?{' '}
                  <a href="#" className="font-medium text-logo-vibrant hover:text-logo-dark">
                    Sign up here
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">New to JIJAU Diagnostics?</h3>
            <p className="text-sm text-secondary-600 mb-4">
              Create an account to book tests, track your reports, and manage your health records.
            </p>
            <button className="bg-logo-vibrant hover:bg-logo-dark text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
