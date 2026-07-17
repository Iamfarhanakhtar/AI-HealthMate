import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Background from './Background';
import ErrorBoundary from './ErrorBoundary';
import ChatModal from './ChatModal';

function Layout({ children }) {
  const { pathname } = useLocation();

  // Scroll Restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-[#05070A] text-[#e1e2eb] min-h-screen flex flex-col relative font-body-lg overflow-x-hidden">
      {/* Background with glowing lights */}
      <Background />

      {/* Global Navbar */}
      <Navbar />

      {/* Main content route wrapper with AnimatePresence */}
      <main className="flex-grow w-full pt-24 max-w-[1200px] mx-auto px-6 md:px-10 pb-16 z-10">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </ErrorBoundary>
      </main>

      {/* Floating AI Chatbot */}
      <ChatModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
