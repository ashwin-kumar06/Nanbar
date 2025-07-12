// app/page.tsx
import React from 'react';
import HeroSection from '@/components/Home/HeroSection';
import VideoCarousel from '@/components/Home/VideoCarousel';
import ServicesSection from '@/components/Home/ServicesSection';
import RepairGuideSection from '@/components/Home/RepairGuideSection';
import FloatingChatbot from '@/components/Home/FloatingChatbot';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <VideoCarousel />
      <ServicesSection />
      <RepairGuideSection />
      <FloatingChatbot />
    </div>
  );
}