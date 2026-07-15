import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { useFirebaseUser } from './hooks/useFirebaseUser';

// Lazy-loaded Pages (Code-splitting and performance)
const Home = lazy(() => import('./pages/Home'));
const HealthLibrary = lazy(() => import('./pages/HealthLibrary'));
const Assistant = lazy(() => import('./pages/Assistant'));
const HealthGuide = lazy(() => import('./pages/HealthGuide'));
const Quiz = lazy(() => import('./pages/Quiz'));
const CommunityImpact = lazy(() => import('./pages/CommunityImpact'));
const CommunityFeedback = lazy(() => import('./pages/CommunityFeedback'));

const AwarenessSession = lazy(() => import('./pages/AwarenessSession'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { loading, error } = useFirebaseUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <LoadingSpinner size="w-12 h-12" />
        <p className="text-on-surface-variant mt-4 font-medium animate-pulse">Initializing HealthMate...</p>
      </div>
    );
  }

  // Graceful fallback if Firebase is completely unreachable
  if (error) {
    console.warn("App starting in offline fallback mode due to auth error.");
  }

  return (
    <Layout>
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <LoadingSpinner size="w-12 h-12" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health-library" element={<HealthLibrary />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/health-guide" element={<HealthGuide />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/community-impact" element={<CommunityImpact />} />
          <Route path="/community-feedback" element={<CommunityFeedback />} />
          <Route path="/contact" element={<Navigate to="/community-feedback" replace />} />
          <Route path="/awareness-session" element={<AwarenessSession />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

