import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Lazy-loaded Pages (Code-splitting and performance)
const Home = lazy(() => import('./pages/Home'));
const HealthLibrary = lazy(() => import('./pages/HealthLibrary'));
const Assistant = lazy(() => import('./pages/Assistant'));
const HealthGuide = lazy(() => import('./pages/HealthGuide'));
const Quiz = lazy(() => import('./pages/Quiz'));
const CommunityImpact = lazy(() => import('./pages/CommunityImpact'));
const CommunityFeedback = lazy(() => import('./pages/CommunityFeedback'));
const Contact = lazy(() => import('./pages/Contact'));
const AwarenessSession = lazy(() => import('./pages/AwarenessSession'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/awareness-session" element={<AwarenessSession />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
