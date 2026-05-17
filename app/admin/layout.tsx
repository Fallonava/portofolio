'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Briefcase, MessageSquareQuote, LogOut, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', mobileName: 'Home', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', mobileName: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Experience', mobileName: 'Career', href: '/admin/experience', icon: Briefcase },
    { name: 'Testimonials', mobileName: 'Reviews', href: '/admin/testimonials', icon: MessageSquareQuote },
  ];

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans relative overflow-hidden flex selection:bg-gray-900 selection:text-white">
      {/* Apple 2026 Ambient Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-blue-300/30 to-purple-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-pink-300/20 to-orange-300/10 blur-[120px] pointer-events-none" />

      {/* Floating Apple-Style Sidebar (Desktop) */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex w-[280px] h-[calc(100vh-32px)] m-4 flex-col justify-between bg-white/70 backdrop-blur-[40px] rounded-[32px] border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] z-20 overflow-hidden"
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
                    className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'}`} 
                  />
                  <span className={`relative z-10 text-[15px] transition-colors duration-300 ${isActive ? 'text-white font-semibold' : 'text-gray-600 group-hover:text-gray-900 font-medium'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 space-y-2">
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
