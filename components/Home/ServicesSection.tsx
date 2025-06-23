'use client'

import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Home, 
  Hammer, 
  Settings,
  CheckCircle,
  Clock,
  Users,
  Star,
  ArrowRight
} from 'lucide-react';
import { COLORS, FONT_FAMILY, FONT_SIZES } from '@/lib/constants'

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  count: number;
  features: string[];
}

const services: Service[] = [
  {
    id: 'plumbing',
    title: 'Plumbing Repairs',
    description: 'Fix leaks, unclog drains, and repair faucets with our expert guidance.',
    icon: Droplets,
    count: 45,
    features: ['Leak Detection', 'Drain Cleaning', 'Faucet Repair', 'Pipe Maintenance']
  },
  {
    id: 'electrical',
    title: 'Electrical Solutions',
    description: 'Troubleshoot wiring issues, replace fixtures, and ensure electrical safety.',
    icon: Zap,
    count: 38,
    features: ['Switch Repair', 'Outlet Installation', 'Light Fixtures', 'Circuit Troubleshooting']
  },
  {
    id: 'general',
    title: 'General Maintenance',
    description: 'Keep your home in perfect condition with regular maintenance tips.',
    icon: Wrench,
    count: 62,
    features: ['Preventive Care', 'Tool Guidance', 'Safety Tips', 'Maintenance Schedules']
  },
  {
    id: 'carpentry',
    title: 'Carpentry & Woodwork',
    description: 'Repair furniture, fix doors, and handle all your woodworking needs.',
    icon: Hammer,
    count: 29,
    features: ['Furniture Repair', 'Door Adjustment', 'Cabinet Fixes', 'Wood Finishing']
  },
  {
    id: 'appliances',
    title: 'Appliance Repair',
    description: 'Diagnose and fix common issues with household appliances.',
    icon: Settings,
    count: 33,
    features: ['Washing Machines', 'Refrigerators', 'Dishwashers', 'Small Appliances']
  },
  {
    id: 'home-improvement',
    title: 'Home Improvement',
    description: 'Upgrade and enhance your living space with DIY improvement projects.',
    icon: Home,
    count: 41,
    features: ['Paint & Finish', 'Storage Solutions', 'Energy Efficiency', 'Room Upgrades']
  }
];

interface CounterProps {
  end: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count}</span>;
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const totalServices = services.reduce((sum, service) => sum + service.count, 0);

  return (
    <section className="py-20 px-6 bg-white">
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
            Our Services
          </h2>
          <p 
            className="max-w-2xl mx-auto opacity-80 mb-8"
            style={{ 
              fontSize: FONT_SIZES.body,
              color: COLORS.text 
            }}
          >
            Professional guidance for all your household repair and maintenance needs
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            {[
              { icon: CheckCircle, label: 'Total Solutions', value: totalServices, suffix: '+' },
              { icon: Clock, label: 'Avg. Completion', value: 15, suffix: ' min' },
              { icon: Users, label: 'Happy Customers', value: 12500, suffix: '+' },
              { icon: Star, label: 'Average Rating', value: 4.9, suffix: '/5' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${COLORS.primary}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: COLORS.primary }} />
                  </div>
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{ color: COLORS.secondary }}
                  >
                    <Counter end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div 
                    className="text-sm font-medium opacity-70"
                    style={{ color: COLORS.text }}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;
            
            return (
              <div
                key={service.id}
                className="group cursor-pointer"
                onClick={() => setSelectedService(isSelected ? null : service.id)}
              >
                <div 
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 ${
                    isSelected ? 'border-opacity-100' : 'border-transparent hover:border-opacity-50'
                  }`}
                  style={{ 
                    borderColor: isSelected ? COLORS.primary : COLORS.accent 
                  }}
                >
                  {/* Service Header */}
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${COLORS.primary}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: COLORS.primary }} />
                    </div>
                    <div>
                      <h3 
                        className="font-semibold mb-1"
                        style={{ 
                          fontSize: FONT_SIZES.subheading,
                          color: COLORS.text 
                        }}
                      >
                        {service.title}
                      </h3>
                      <div 
                        className="font-bold"
                        style={{ 
                          fontSize: FONT_SIZES.body,
                          color: COLORS.primary 
                        }}
                      >
                        <Counter end={service.count} /> Solutions
                      </div>
                    </div>
                  </div>

                  {/* Service Description */}
                  <p 
                    className="mb-6 opacity-80"
                    style={{ 
                      fontSize: FONT_SIZES.body,
                      color: COLORS.text 
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className={`transition-all duration-300 ${isSelected ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle 
                            className="w-4 h-4 mr-3 flex-shrink-0" 
                            style={{ color: COLORS.primary }} 
                          />
                          <span 
                            className="text-sm"
                            style={{ color: COLORS.text }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: isSelected ? COLORS.primary : `${COLORS.primary}20`,
                      color: isSelected ? 'white' : COLORS.primary,
                      fontSize: FONT_SIZES.body
                    }}
                  >
                    {isSelected ? 'View Solutions' : 'Learn More'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div 
            className="inline-block px-8 py-4 rounded-2xl mb-6"
            style={{ backgroundColor: `${COLORS.primary}10` }}
          >
            <p 
              className="font-medium mb-2"
              style={{ 
                fontSize: FONT_SIZES.body,
                color: COLORS.text 
              }}
            >
              Need help with something specific?
            </p>
            <button
              className="inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 group"
              style={{
                backgroundColor: COLORS.primary,
                color: 'white',
                fontSize: FONT_SIZES.body
              }}
            >
              Get Personalized Help
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}