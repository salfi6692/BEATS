import React from 'react';
import { School, Users, Award, History, MapPin, BookCheck } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      icon: School,
      value: '87+',
      label: 'Campuses Nationwide',
      detail: 'Schools & Colleges in all provinces',
      accent: 'text-blue-900',
      bg: 'bg-blue-50'
    },
    {
      icon: Users,
      value: '37,000+',
      label: 'Enrolled Students',
      detail: 'Rural, urban & coastal communities',
      accent: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      icon: Award,
      value: '94%',
      label: 'BISE Passing Average',
      detail: 'Awarded by Chief of Naval Staff',
      accent: 'text-emerald-700',
      bg: 'bg-emerald-50'
    },
    {
      icon: History,
      value: '1998',
      label: 'Year Established',
      detail: '25+ Years of Educational Trust',
      accent: 'text-indigo-900',
      bg: 'bg-indigo-50'
    },
    {
      icon: BookCheck,
      value: '100%',
      label: 'Faculty Training',
      detail: 'In-house Teacher Training Centers',
      accent: 'text-rose-700',
      bg: 'bg-rose-50'
    }
  ];

  return (
    <section className="relative -mt-6 sm:-mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90 p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className={`flex flex-col items-center text-center group ${
                  idx > 0 ? 'pt-4 sm:pt-0 sm:pl-4 lg:pl-6' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.accent} flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-200 shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wide">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 max-w-[140px] leading-tight">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
