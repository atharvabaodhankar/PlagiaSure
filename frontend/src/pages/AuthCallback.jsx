import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleAuthCallback();
  }, []);

  const handleAuthCallback = async () => {
    try {
      // Get the access token and refresh token from URL params
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        setStatus('error');
        setMessage(errorDescription || 'Email verification failed');
        return;
      }

      if (accessToken) {
        // Store the tokens
        localStorage.setItem('auth_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }

        // Check auth status to update the context
        await checkAuthStatus();

        setStatus('success');
        setMessage('Email verified successfully! Redirecting to dashboard...');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setStatus('error');
        setMessage('No authentication token found');
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      setStatus('error');
      setMessage('An error occurred during email verification');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-[#52DE97] to-[#3AB795] rounded-2xl shadow-lg">
                <img
                  src="/plagiasure.png"
                  alt="PlagiaSure Logo"
                  className="h-12 w-12"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3282B8] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Status Content */}
          {status === 'processing' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 bg-blue-50 rounded-full">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Verifying Your Email
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 bg-green-50 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Email Verified!
              </h2>
              <p className="text-gray-600">{message}</p>
              <div className="mt-6">
                <div className="animate-pulse">
                  <div className="h-2 bg-green-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-4 bg-red-50 rounded-full">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Verification Failed
              </h2>
              <p className="text-gray-600">{message}</p>
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full bg-[#3282B8] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2D4B7C] transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;