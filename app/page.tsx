// app/page.tsx
import React from 'react';
import HeroSection from '@/app/Home/HeroSection';
import VideoCarousel from '@/app/Home/VideoCarousel';
import ServicesSection from '@/app/Home/ServicesSection';
import RepairGuideSection from '@/app/Home/RepairGuideSection';
import FloatingChatbot from '@/app/Home/FloatingChatbot';

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