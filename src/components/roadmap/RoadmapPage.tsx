import React from 'react';
import { RoadmapTimeline } from './RoadmapTimeline';
import { RoadmapHeader } from './RoadmapHeader';

const RoadmapPage: React.FC = () => {
  return (
    <section id="roadmap" className="py-12 px-4 max-w-7xl mx-auto scroll-mt-20">
      <RoadmapHeader />
      <RoadmapTimeline />
    </section>
  );
};

export default RoadmapPage;