import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Shield, Dices, Award, Swords, ArrowUpRight } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: '1. Roll a 6 to Release',
      icon: <Dices className="w-8 h-8 text-amber-400" />,
      description:
        'All tokens start inside your base Yard. Roll a 6 on your turn to bring a token out onto your starting track. Rolling a 6 also awards an immediate bonus roll!'
    },
    {
      title: '2. Move & Navigate Clockwise',
      icon: <ArrowUpRight className="w-8 h-8 text-blue-400" />,
      description:
        'Tokens advance clockwise along the 52 perimeter track tiles according to the number shown on the dice. Strategic movement keeps you ahead while staying safe.'
    },
    {
      title: '3. Capture Opponents for Bonus Turn',
      icon: <Swords className="w-8 h-8 text-red-400" />,
      description:
        'Landing on an opponent token on any non-safe cell sends their token back to their base yard! Capturing an opponent also grants you an instant bonus roll.'
    },
    {
      title: '4. Safe Star & Starting Zones',
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      description:
        'Cells marked with golden stars and colored starting arrows are Safe Zones. Tokens residing on safe cells cannot be captured by any opponent.'
    },
    {
      title: '5. Reach Home to Win!',
      icon: <Award className="w-8 h-8 text-yellow-400" />,
      description:
        'After completing a full circuit around the board, enter your private colored Home Lane. Roll the exact number to reach the center. The first player to get all 4 tokens Home wins!'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl glass-panel p-6 border border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white font-display">How to Play Ludo</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content */}
        <div className="py-6 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4 shadow-inner">
            {slides[currentStep].icon}
          </div>

          <h4 className="text-lg font-bold text-white font-display mb-2">
            {slides[currentStep].title}
          </h4>
          <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
            {slides[currentStep].description}
          </p>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-1.5 mb-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentStep === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`py-2.5 px-4 rounded-xl glass-button text-sm font-semibold flex items-center gap-1.5 ${
              currentStep === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {currentStep < slides.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(slides.length - 1, prev + 1))}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Got it!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
