'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F5F5F7] p-6 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Apple Intelligence Style Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-pink-400/20 to-orange-400/10 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Premium Glass Container */}
        <div className="bg-white/60 backdrop-blur-[40px] rounded-[32px] p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-white/60">
          
          <div className="flex flex-col items-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-[20px] flex items-center justify-center shadow-xl shadow-gray-900/10 mb-6"
            >
              <Lock className="text-white" size={28} strokeWidth={2} />
            </motion.div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight text-center">
              Workspace
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium text-center">
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100/50 text-sm font-medium text-center"
              >
                {error}
              </motion.div>
            )}
            
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl outline-none transition-all duration-300 text-gray-900 font-medium placeholder-gray-400"
                  placeholder="Username"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} strokeWidth={2.5} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl outline-none transition-all duration-300 text-gray-900 font-medium placeholder-gray-400"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 group relative flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 overflow-hidden"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-xs font-medium text-gray-400 mt-8">
          Secure Access • Fallonava System
        </p>
      </motion.div>
    </div>
  );
}
