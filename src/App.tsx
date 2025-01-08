import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import Hero from './components/home/Hero';
import RoadmapPage from './components/roadmap/RoadmapPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <div className="mb-16" /> {/* Add spacing between Hero and Roadmap */}
        <RoadmapPage />
        <Toaster position="bottom-right" />
      </Layout>
    </ThemeProvider>
  );
}

export default App;