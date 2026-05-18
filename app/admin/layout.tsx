'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Briefcase, MessageSquareQuote, LogOut, BarChart2, Moon, Sun, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin-dark-mode');
    if (stored === 'true') setIsDark(true);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('admin-dark-mode', String(next));
  };

  const navItems = [
    { name: 'Overview',     mobileName: 'Home',     href: '/admin',               icon: LayoutDashboard },
    { name: 'Projects',     mobileName: 'Projects', href: '/admin/projects',       icon: FolderKanban },
    { name: 'Experience',   mobileName: 'Career',   href: '/admin/experience',     icon: Briefcase },
    { name: 'Testimonials', mobileName: 'Reviews',  href: '/admin/testimonials',   icon: MessageSquareQuote },
    { name: 'Analytics',    mobileName: 'Stats',    href: '/admin/analytics',      icon: BarChart2 },
    { name: 'Settings',     mobileName: 'Settings', href: '/admin/settings',       icon: Settings },
  ];

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div
      className="admin-layout h-screen font-sans relative overflow-hidden flex transition-colors duration-500"
      style={{ backgroundColor: isDark ? '#050508' : '#F5F5F7', color: isDark ? '#EBEBF5' : '#1D1D1F' }}
      data-dark={isDark ? 'true' : 'false'}
    >
      {/* Ambient Glow — vivid in dark, soft in light */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[65vw] h-[65vw] rounded-full blur-[140px] pointer-events-none bg-gradient-to-tr"
        style={{ background: isDark
          ? 'radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, rgba(59,130,246,0.30) 40%, transparent 70%)'
          : 'radial-gradient(ellipse, rgba(196,181,253,0.35) 0%, rgba(167,139,250,0.20) 40%, transparent 70%)'
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full blur-[140px] pointer-events-none"
        style={{ background: isDark
          ? 'radial-gradient(ellipse, rgba(244,63,94,0.30) 0%, rgba(251,146,60,0.20) 40%, transparent 70%)'
          : 'radial-gradient(ellipse, rgba(253,164,175,0.25) 0%, rgba(253,224,71,0.15) 40%, transparent 70%)'
        }}
      />
      {isDark && (
        <div
          className="absolute top-[40%] right-[25%] w-[40vw] h-[40vw] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, transparent 70%)' }}
        />
      )}

      {/* Floating Apple-Style Sidebar (Desktop) */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`admin-sidebar hidden md:flex w-[280px] h-[calc(100vh-32px)] m-4 flex-col justify-between backdrop-blur-[40px] rounded-[32px] border shadow-[0_8px_40px_rgba(0,0,0,0.08)] z-20 overflow-hidden transition-colors duration-500 ${
          isDark
            ? 'bg-[#000000] border-[rgba(84,84,88,0.4)]'
            : 'bg-white/70 border-white/60'
        }`}
      >
        <div>
          <div className="px-8 pt-10 pb-6">
            <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 shadow-md">
               <span className="text-white font-bold text-lg font-mono">F</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Workspace
            </h1>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
              Admin Portal
            </p>
          </div>
          
          <nav className="px-4 flex flex-col gap-1 mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gray-900 rounded-2xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className={`relative z-10 transition-colors duration-300 ${isActive ? (isDark ? 'text-gray-900' : 'text-white') : 'text-gray-500 group-hover:text-gray-900'}`} 
                  />
                  <span className={`relative z-10 text-[15px] transition-colors duration-300 ${isActive ? (isDark ? 'text-gray-900 font-semibold' : 'text-white font-semibold') : 'text-gray-600 group-hover:text-gray-900 font-medium'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 space-y-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-[15px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 rounded-2xl transition-all duration-300 group"
          >
            <motion.div
              key={isDark ? 'sun' : 'moon'}
              initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              {isDark ? <Sun size={20} strokeWidth={2} className="text-[#FF9500]" /> : <Moon size={20} strokeWidth={2} />}
            </motion.div>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-[15px] font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-2xl transition-all duration-300"
          >
            <LogOut size={20} strokeWidth={2} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 h-screen md:h-[calc(100vh-32px)] md:my-4 md:mr-4 bg-[#F5F5F7]/50 md:bg-white/50 backdrop-blur-[40px] rounded-none md:rounded-[32px] border-none md:border border-white/60 shadow-none md:shadow-[0_8px_40px_rgba(0,0,0,0.04)] z-10 overflow-y-auto overscroll-contain"
      >
        <div className="p-6 md:p-10 max-w-6xl mx-auto pt-10 md:pt-10 pb-32 md:pb-12">
          {children}
        </div>
      </motion.main>

      {/* iOS Style Floating Bottom Tab Bar (Mobile) */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/80 backdrop-blur-[40px] rounded-[32px] border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-2 flex items-center justify-between px-2"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex-1 flex flex-col items-center justify-center py-2.5 rounded-[20px] transition-all duration-300 group"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobileNavIndicator"
                    className="absolute inset-0 bg-gray-900 rounded-[20px]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`relative z-10 mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`} 
                />
                <span className={`relative z-10 text-[10px] tracking-wide transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-gray-500 font-semibold'}`}>
                  {item.mobileName}
                </span>
              </Link>
            );
          })}
          
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="relative flex flex-col items-center justify-center py-2.5 rounded-[20px] transition-all duration-300 w-16"
          >
            <LogOut size={22} strokeWidth={2} className="text-red-400 mb-1" />
            <span className="text-[10px] tracking-wide text-red-500 font-semibold">
              Exit
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
