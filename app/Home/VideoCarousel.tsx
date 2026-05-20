'use client'

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react';
import { COLORS, FONT_FAMILY, FONT_SIZES } from '@/lib/constants'

interface VideoData {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
}

const videoData: VideoData[] = [
  {
    id: 'dQw4w9WgXcQ', // Replace with actual video IDs
    title: 'How to Fix a Leaky Faucet',
    description: 'Step-by-step guide to repair common faucet leaks',
    duration: '8:45',
    views: '125K'
  },
  {
    id: 'ScMzIvxBSi4', // Replace with actual video IDs
    title: 'Fixing Jammed Door Locks',
    description: 'Quick solutions for stuck and jammed door mechanisms',
    duration: '6:30',
    views: '89K'
  },
  {
    id: 'kJQP7kiw5Fk', // Replace with actual video IDs
    title: 'LED Light Bulb Troubleshooting',
    description: 'Diagnose and fix flickering and dim LED bulbs',
    duration: '5:15',
    views: '201K'
  },
  {
    id: 'lAIGb1lfpBw', // Replace with actual video IDs
    title: 'Unclogging Drains Naturally',
    description: 'Chemical-free methods to clear blocked drains',
    duration: '7:20',
    views: '156K'
  },
  {
    id: 'ZbZSe6N_BXs', // Replace with actual video IDs
    title: 'Wall Paint Touch-ups',
    description: 'Professional techniques for seamless paint repairs',
    duration: '9:10',
    views: '78K'
  },
  {
    id: 'fJ9rUzIMcZQ', // Replace with actual video IDs
    title: 'Squeaky Hinge Solutions',
    description: 'Stop door and cabinet hinges from squeaking',
    duration: '4:45',
    views: '92K'
  }
];

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const openYouTubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const scrollAmount = index * (carouselRef.current.offsetWidth / 3);
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % videoData.length;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? videoData.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  return (
    <section 
      className="py-20 px-6"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="font-bold mb-4"
            style={{ 
              fontSize: FONT_SIZES.heading,
              color: COLORS.text,
              fontFamily: FONT_FAMILY.default 
            }}
          >
            Popular Repair Guides
          </h2>
          <p 
            className="max-w-2xl mx-auto opacity-80"
            style={{ 
              fontSize: FONT_SIZES.body,
              color: COLORS.text 
            }}
          >
            Watch step-by-step video tutorials from our experts. Click any video to watch on YouTube.
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: COLORS.primary }}
          />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: COLORS.primary }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: COLORS.primary }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Video Grid */}
          <div className="mx-12">
            <div 
              ref={carouselRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {videoData.map((video, index) => (
                <div
                  key={video.id}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => openYouTubeVideo(video.id)}
                >
                  {/* Video Card */}
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback to default thumbnail if maxres is not available
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div 
                          className="p-4 rounded-full transform group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: COLORS.primary }}
                        >
                          <Play className="w-8 h-8 text-white fill-current" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black bg-opacity-80 rounded text-white text-sm font-medium">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 
                          className="font-semibold line-clamp-2 group-hover:text-opacity-80 transition-colors"
                          style={{ 
                            fontSize: FONT_SIZES.body,
                            color: COLORS.text 
                          }}
                        >
                          {video.title}
                        </h3>
                        <ExternalLink 
                          className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
                          style={{ color: COLORS.primary }}
                        />
                      </div>
                      
                      <p 
                        className="text-sm opacity-70 mb-4 line-clamp-2"
                        style={{ color: COLORS.text }}
                      >
                        {video.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span 
                          className="text-sm font-medium"
                          style={{ color: COLORS.primary }}
                        >
                          {video.views} views
                        </span>
                        <button
                          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                          style={{ 
                            backgroundColor: `${COLORS.primary}20`,
                            color: COLORS.primary 
                          }}
                        >
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: Math.ceil(videoData.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index * 3)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === index ? 'scale-125' : 'opacity-50 hover:opacity-75'
                }`}
                style={{ backgroundColor: COLORS.primary }}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            style={{ 
              backgroundColor: COLORS.secondary,
              fontSize: FONT_SIZES.body 
            }}
          >
            View All Video Guides
          </button>
        </div>
      </div>
    </section>
  );
}