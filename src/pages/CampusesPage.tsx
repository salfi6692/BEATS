/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Phone, 
  Mail, 
  Building2, 
  ExternalLink, 
  Filter, 
  GraduationCap, 
  ArrowRight,
  Shield
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { REGIONAL_OFFICES } from '../data/beatsData';

interface CampusesPageProps {
  onNavigateHome: () => void;
  onOpenAdmission: () => void;
  initialRegion?: string;
}

interface CampusItem {
  id: string;
  name: string;
  city: string;
  region: 'North' | 'Centre' | 'South';
  streams: string[];
  phone: string;
  address: string;
}

const SAMPLE_CAMPUSES: CampusItem[] = [
  // North Region
  { id: 'n1', name: 'Bahria Foundation College Sihala', city: 'Islamabad', region: 'North', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC'], phone: '+92-51-8153584', address: 'Japan Road, Near Ibadat University, Sihala, Islamabad' },
  { id: 'n2', name: 'Bahria Foundation College Westridge', city: 'Rawalpindi', region: 'North', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC', 'O-Level'], phone: '+92-51-5463120', address: 'Peshawar Road, Westridge-III, Rawalpindi' },
  { id: 'n3', name: 'Bahria Foundation College Chaklala', city: 'Rawalpindi', region: 'North', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-51-5591234', address: 'Airport Road, Chaklala Scheme-III, Rawalpindi' },
  { id: 'n4', name: 'Bahria Foundation College Peshawar Cantt', city: 'Peshawar', region: 'North', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC'], phone: '+92-91-5271890', address: 'Defence Officers Colony, Khyber Road, Peshawar' },
  { id: 'n5', name: 'Bahria Foundation College Abbottabad', city: 'Abbottabad', region: 'North', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC'], phone: '+92-992-381456', address: 'Supply Area, Mansehra Road, Abbottabad' },
  { id: 'n6', name: 'Bahria Foundation College Muzaffarabad', city: 'Muzaffarabad', region: 'North', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-5822-442190', address: 'Upper Chattar, Near Secretariat, Muzaffarabad (AJK)' },
  { id: 'n7', name: 'Bahria Foundation College Gujar Khan', city: 'Gujar Khan', region: 'North', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-51-3512345', address: 'Main G.T. Road, Gujar Khan' },
  { id: 'n8', name: 'Bahria Foundation College Gilgit', city: 'Gilgit', region: 'North', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-5811-455200', address: 'Jutial Cantt, Near Serena, Gilgit' },

  // Centre Region
  { id: 'c1', name: 'Bahria Foundation College Gulberg-III', city: 'Lahore', region: 'Centre', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC', 'O-Level'], phone: '+92-42-5889415', address: 'Naval Complex Askari-1, Near Walton Airport, Gulberg-III, Lahore' },
  { id: 'c2', name: 'Bahria Foundation College Multan', city: 'Multan', region: 'Centre', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC'], phone: '+92-61-6512390', address: 'Officers Colony, Bosan Road, Multan' },
  { id: 'c3', name: 'Bahria Foundation College Faisalabad', city: 'Faisalabad', region: 'Centre', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-41-8714520', address: 'Civil Lines, Near Chenab Club, Faisalabad' },
  { id: 'c4', name: 'Bahria Foundation College Sialkot Cantt', city: 'Sialkot', region: 'Centre', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC'], phone: '+92-52-4261890', address: 'Kashmir Road, Sialkot Cantt' },
  { id: 'c5', name: 'Bahria Foundation College Bahawalpur', city: 'Bahawalpur', region: 'Centre', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-62-2883410', address: 'University Road, Model Town A, Bahawalpur' },
  { id: 'c6', name: 'Bahria Foundation College Sargodha', city: 'Sargodha', region: 'Centre', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-48-3721900', address: 'PAF Road, Near Cantt, Sargodha' },

  // South Region
  { id: 's1', name: 'Bahria Foundation College Karsaz', city: 'Karachi', region: 'South', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC', 'O-Level'], phone: '+92-21-35610364', address: 'Naval Housing Scheme, Habib Rahmatullah Road, Karsaz, Karachi' },
  { id: 's2', name: 'Bahria Foundation College Bahria Complex-I', city: 'Karachi', region: 'South', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC'], phone: '+92-21-35610242', address: 'M.T. Khan Road, Lalazar, Karachi' },
  { id: 's3', name: 'Bahria Foundation College Gwadar', city: 'Gwadar', region: 'South', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-864-210450', address: 'Naval Base, Jinnah Avenue, Gwadar' },
  { id: 's4', name: 'Bahria Foundation College Ormara', city: 'Ormara', region: 'South', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC'], phone: '+92-853-210123', address: 'Cadet College / Jinnah Naval Base, Ormara' },
  { id: 's5', name: 'Bahria Foundation College Pasni', city: 'Pasni', region: 'South', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-864-412300', address: 'Coastal Highway, Near PN Station, Pasni' },
  { id: 's6', name: 'Bahria Foundation College Hyderabad', city: 'Hyderabad', region: 'South', streams: ['Montessori', 'Primary', 'Secondary', 'HSSC'], phone: '+92-22-2781490', address: 'Defence Housing Society, Autobahn Road, Hyderabad' },
  { id: 's7', name: 'Bahria Foundation College Sukkur', city: 'Sukkur', region: 'South', streams: ['Montessori', 'Primary', 'Secondary'], phone: '+92-71-5623810', address: 'Military Road, Sukkur' },
];

export const CampusesPage: React.FC<CampusesPageProps> = ({
  onNavigateHome,
  onOpenAdmission,
  initialRegion,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>(
    initialRegion === 'north' ? 'North' : initialRegion === 'centre' ? 'Centre' : initialRegion === 'south' ? 'South' : 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampuses = SAMPLE_CAMPUSES.filter((c) => {
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesQuery;
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0D284C] text-white py-14 border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Campuses Network', active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <MapPin className="w-3.5 h-3.5" />
              87+ Institutions • 120 Campuses Nationwide
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bahria Foundation Campuses Directory
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our widespread presence in North Region (58+), Centre Region (8), and South Region (20). Smooth inter-college transfers available.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'North', 'Centre', 'South'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {reg === 'All' ? 'All Regions (87+)' : `${reg} Region (${reg === 'North' ? '58+' : reg === 'Centre' ? '8' : '20'})`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city or campus name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-blue-900 outline-hidden bg-slate-50"
            />
          </div>
        </div>

        {/* Campuses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampuses.map((campus) => (
            <div
              key={campus.id}
              className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    campus.region === 'North'
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : campus.region === 'Centre'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {campus.region} Region
                  </span>
                  <span className="text-xs font-bold text-slate-500">{campus.city}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{campus.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{campus.address}</span>
                  </p>
                </div>

                {/* Streams */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {campus.streams.map((s, i) => (
                    <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 text-xs text-slate-600 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-900" />
                  <span>{campus.phone}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={onOpenAdmission}
                  className="text-xs font-bold text-blue-950 hover:text-amber-600 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Apply to Campus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Admissions Open
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredCampuses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No campuses matched your search</h3>
            <p className="text-xs text-slate-500">
              Try searching with a different keyword or resetting the regional filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
              className="px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-semibold hover:bg-blue-900 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
