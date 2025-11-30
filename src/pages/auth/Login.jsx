import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import jharkhandLogo from '@/assets/jharkhand-tourism-logo.png';

const jharkhandImages = [
  "https://images.unsplash.com/photo-1593693397690-362cb9666c74?q=80&w=2070&auto=format&fit=crop", // Waterfall/Nature
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop", // Temple/Architecture
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop", // Forest/Fog
  "https://images.unsplash.com/photo-1582510003544-4d00b7f5feee?q=80&w=2070&auto=format&fit=crop", // Landscape
  "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?q=80&w=2070&auto=format&fit=crop"  // Cultural/Vibrant
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % jharkhandImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white">
      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* LEFT: Login panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white relative z-10">
        <div className="max-w-md w-full mx-auto">
          {/* Mini logo / title */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src={jharkhandLogo}
              alt="Jharkhand Tourism"
              className="h-12 w-auto object-contain"
            />
            <span className="text-sm font-semibold tracking-wide text-neutral-700">
              Tourism Admin Portal
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Login to Your Account
          </h1>
          <p className="text-neutral-500 mb-8">
            Enter your credentials to access the dashboard
          </p>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
              <div className="text-xs text-red-700">
                <p className="font-semibold">Authentication failed</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  placeholder="admin@tourism.gov.in"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-600 hover:text-neutral-900 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-black text-white text-sm font-semibold shadow-lg shadow-neutral-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* RIGHT: Image Slider */}
      <div className="hidden md:block w-1/2 h-full relative bg-neutral-900 overflow-hidden">
        {jharkhandImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={img}
              alt={`Jharkhand Tourism ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Slider Content */}
        <div className="absolute bottom-0 left-0 right-0 p-16 text-white z-10">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Experience the Beauty of Jharkhand
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-lg">
            Discover the land of forests, waterfalls, and rich cultural heritage. Manage and promote tourism effectively with our admin portal.
          </p>

          {/* Slider Indicators */}
          <div className="flex gap-2 mt-8">
            {jharkhandImages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
