'use client'

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { COLORS, FONT_FAMILY, FONT_SIZES } from '@/lib/constants'

export default function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${COLORS.secondary}cc 0%, ${COLORS.primary}99 50%, ${COLORS.secondary}cc 100%)`
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-20 animate-pulse"
          style={{ backgroundColor: COLORS.primary }}
        />
        <div 
          className="absolute bottom-32 right-32 w-48 h-48 rounded-full opacity-10 animate-bounce"
          style={{ backgroundColor: COLORS.accent }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full opacity-15 animate-ping"
          style={{ backgroundColor: COLORS.primary }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
          {/* Main Heading */}
          <h1 
            className="font-bold leading-tight text-white drop-shadow-2xl"
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: FONT_FAMILY.default 
            }}
          >
            Welcome to{' '}
            <span 
              className="inline-block transform hover:scale-105 transition-transform duration-300"
              style={{ color: COLORS.primary }}
            >
              Nanban
            </span>
          </h1>

          {/* Subtitle */}
          <div className="relative">
            <p 
              className="text-white leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium"
              style={{ 
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontFamily: FONT_FAMILY.default 
              }}
            >
              Your smart helper for fixing everyday household problems—leaking taps, 
              jammed doors, flickering bulbs, and more.
            </p>
            
            {/* Decorative line */}
            <div 
              className="w-24 h-1 mx-auto mt-6 rounded-full"
              style={{ backgroundColor: COLORS.primary }}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              className="px-8 py-4 rounded-full font-semibold text-white shadow-2xl transform hover:scale-105 hover:shadow-3xl transition-all duration-300 group"
              style={{ 
                backgroundColor: COLORS.primary,
                fontSize: FONT_SIZES.body 
              }}
            >
              <span className="flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
            
            <button
              className="px-8 py-4 rounded-full font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
              style={{ fontSize: FONT_SIZES.body }}
            >
              Learn More
            </button>
          </div>

          {/* Stats Preview */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: '1000+', label: 'Problems Solved' },
              { number: '50+', label: 'Video Guides' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-110 transition-transform duration-300"
              >
                <div 
                  className="text-3xl font-bold text-white mb-2"
                  style={{ color: COLORS.primary }}
                >
                  {stat.number}
                </div>
                <div className="text-white text-sm font-medium opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToContent}
          className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}