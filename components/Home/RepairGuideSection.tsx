'use client'

import React, { useState } from 'react';
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Hammer, 
  Settings,
  Home,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Play,
  BookOpen,
  Star,
  User
} from 'lucide-react';
import { COLORS} from '@/lib/constants'

interface RepairGuide {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeRequired: string;
  category: string;
  steps: string[];
  tools: string[];
  safetyTips: string[];
  rating: number;
  completions: number;
  videoUrl?: string;
}

const repairGuides: RepairGuide[] = [
  {
    id: 'fix-leaky-faucet',
    title: 'Fix a Leaky Faucet',
    description: 'Stop that annoying drip and save water with this simple repair guide.',
    icon: Droplets,
    difficulty: 'Easy',
    timeRequired: '15-30 minutes',
    category: 'Plumbing',
    steps: [
      'Turn off the water supply under the sink',
      'Remove the faucet handle by unscrewing',
      'Take out the old washer or O-ring',
      'Replace with a new washer of the same size',
      'Reassemble the faucet in reverse order',
      'Turn water supply back on and test'
    ],
    tools: ['Adjustable wrench', 'Screwdriver', 'New washers/O-rings'],
    safetyTips: [
      'Always turn off water supply before starting',
      'Take a photo before disassembly for reference'
    ],
    rating: 4.8,
    completions: 15420
  },
  {
    id: 'replace-light-switch',
    title: 'Replace a Light Switch',
    description: 'Safely replace a faulty light switch with proper electrical safety.',
    icon: Zap,
    difficulty: 'Medium',
    timeRequired: '20-45 minutes',
    category: 'Electrical',
    steps: [
      'Turn off power at the circuit breaker',
      'Test with voltage tester to confirm power is off',
      'Unscrew and remove the old switch',
      'Take a photo of wire connections',
      'Disconnect wires from old switch',
      'Connect wires to new switch matching colors',
      'Secure switch to wall box and restore power'
    ],
    tools: ['Voltage tester', 'Wire strippers', 'Screwdriver', 'New switch'],
    safetyTips: [
      'NEVER work with electricity without turning off power',
      'Use a voltage tester to double-check',
      'If unsure, consult a professional electrician'
    ],
    rating: 4.6,
    completions: 8930
  },
  {
    id: 'unclog-drain',
    title: 'Unclog a Drain',
    description: 'Clear blockages from sinks and drains using safe, effective methods.',
    icon: Droplets,
    difficulty: 'Easy',
    timeRequired: '10-20 minutes',
    category: 'Plumbing',
    steps: [
      'Remove visible debris from drain opening',
      'Try using a plunger for initial attempt',
      'Pour hot water down the drain',
      'Use baking soda and vinegar method',
      'Let mixture sit for 15 minutes',
      'Flush with hot water again'
    ],
    tools: ['Plunger', 'Baking soda', 'White vinegar', 'Hot water'],
    safetyTips: [
      'Avoid chemical drain cleaners when possible',
      'Wear gloves when handling debris'
    ],
    rating: 4.7,
    completions: 22150
  },
  {
    id: 'fix-squeaky-door',
    title: 'Fix a Squeaky Door',
    description: 'Eliminate annoying door squeaks with proper lubrication techniques.',
    icon: Hammer,
    difficulty: 'Easy',
    timeRequired: '5-10 minutes',
    category: 'General Maintenance',
    steps: [
      'Identify the source of the squeak',
      'Clean dirt and debris from hinges',
      'Apply lubricant to hinge pins and pivot points',
      'Work the door back and forth several times',
      'Wipe away excess lubricant',
      'Test door operation'
    ],
    tools: ['WD-40 or 3-in-1 oil', 'Clean cloth', 'Small brush'],
    safetyTips: [
      'Use appropriate lubricant for indoor use',
      'Don\'t over-lubricate to avoid attracting dirt'
    ],
    rating: 4.9,
    completions: 18760
  },
  {
    id: 'patch-wall-hole',
    title: 'Patch a Wall Hole',
    description: 'Repair small to medium holes in drywall like a professional.',
    icon: Home,
    difficulty: 'Medium',
    timeRequired: '1-2 hours',
    category: 'Home Improvement',
    steps: [
      'Clean around the hole and remove loose debris',
      'Cut a patch slightly larger than the hole',
      'Apply mesh backing or use self-adhesive patch',
      'Apply first coat of joint compound',
      'Let dry completely (24 hours)',
      'Sand smooth and apply second coat if needed',
      'Prime and paint to match existing wall'
    ],
    tools: ['Drywall patch kit', 'Joint compound', 'Putty knife', 'Sandpaper', 'Primer', 'Paint'],
    safetyTips: [
      'Wear dust mask when sanding',
      'Allow adequate drying time between coats'
    ],
    rating: 4.5,
    completions: 12340
  },
  {
    id: 'reset-garbage-disposal',
    title: 'Reset Garbage Disposal',
    description: 'Troubleshoot and reset a jammed or non-functioning garbage disposal.',
    icon: Settings,
    difficulty: 'Easy',
    timeRequired: '5-15 minutes',
    category: 'Appliances',
    steps: [
      'Turn off power and water to disposal',
      'Look for reset button on bottom of unit',
      'Press the reset button firmly',
      'Use disposal wrench to manually turn blades',
      'Remove any visible obstructions with tongs',
      'Restore power and test with cold water running'
    ],
    tools: ['Disposal wrench (hex key)', 'Flashlight', 'Tongs'],
    safetyTips: [
      'Never put hands inside disposal',
      'Always run cold water when operating',
      'Keep power off during manual operation'
    ],
    rating: 4.8,
    completions: 9870
  }
];

const difficultyColors = {
  Easy: COLORS.success,
  Medium: COLORS.warning,
  Hard: COLORS.danger
};

interface RepairGuideCardProps {
  guide: RepairGuide;
  isExpanded: boolean;
  onToggle: () => void;
}

const RepairGuideCard: React.FC<RepairGuideCardProps> = ({ guide, isExpanded, onToggle }) => {
  const Icon = guide.icon;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center flex-1">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
              style={{ backgroundColor: `${COLORS.primary}20` }}
            >
              <Icon className="w-6 h-6" style={{ color: COLORS.primary }} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.text }}>
                {guide.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {guide.description}
              </p>
              
              {/* Meta Information */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" style={{ color: COLORS.primary }} />
                  <span>{guide.timeRequired}</span>
                </div>
                <div className="flex items-center">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${difficultyColors[guide.difficulty]}20`,
                      color: difficultyColors[guide.difficulty]
                    }}
                  >
                    {guide.difficulty}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" style={{ color: COLORS.warning }} />
                  <span>{guide.rating}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" style={{ color: COLORS.primary }} />
                  <span>{guide.completions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onToggle}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight 
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              style={{ color: COLORS.primary }}
            />
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Tools Required */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <Wrench className="w-4 h-4 mr-2" style={{ color: COLORS.primary }} />
              Tools Required
            </h4>
            <div className="flex flex-wrap gap-2">
              {guide.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                  style={{ color: COLORS.text }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" style={{ color: COLORS.warning }} />
              Safety First
            </h4>
            <div className="space-y-2">
              {guide.safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: COLORS.warning }} />
                  <span className="text-sm" style={{ color: COLORS.text }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" style={{ color: COLORS.primary }} />
              Step-by-Step Instructions
            </h4>
            <div className="space-y-3">
              {guide.steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs font-bold text-white"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm" style={{ color: COLORS.text }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              className="flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center"
              style={{
                backgroundColor: COLORS.primary,
                color: 'white'
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Start Repair
            </button>
            {guide.videoUrl && (
              <button
                className="py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center"
                style={{
                  backgroundColor: `${COLORS.primary}20`,
                  color: COLORS.primary
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Video
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function RepairGuideSection() {
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(repairGuides.map(guide => guide.category)))];
  
  const filteredGuides = selectedCategory === 'All' 
    ? repairGuides 
    : repairGuides.filter(guide => guide.category === selectedCategory);

  return (
    <section className="py-20 px-6" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ color: COLORS.text }}
          >
            DIY Repair Guides
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto opacity-80 mb-8"
            style={{ color: COLORS.text }}
          >
            Step-by-step instructions to fix common household problems yourself
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category ? 'transform scale-105' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? COLORS.primary : 'white',
                  color: selectedCategory === category ? 'white' : COLORS.primary,
                  border: `2px solid ${COLORS.primary}`
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="space-y-6">
          {filteredGuides.map((guide) => (
            <RepairGuideCard
              key={guide.id}
              guide={guide}
              isExpanded={expandedGuide === guide.id}
              onToggle={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}