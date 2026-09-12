import React, { useState } from 'react';
import { MapPin, Phone, Mail, Printer, ExternalLink, Building2, Search, ArrowRight, Shield } from 'lucide-react';
import { REGIONAL_OFFICES } from '../data/beatsData';
import { useSettings } from '../context/SettingsContext';

interface RegionalDirectoryProps {
  onOpenAdmissionModal: (region?: string) => void;
}

export const RegionalDirectory: React.FC<RegionalDirectoryProps> = ({ onOpenAdmissionModal }) => {
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const offices = REGIONAL_OFFICES.map((base) => {
    if (base.id === 'north') {
      return {
        ...base,
        campusesCount: settings.northCampusesCount || base.campusesCount,
        address: settings.northAddress || base.address,
        phones: settings.northPhones ? settings.northPhones.split(',').map(s => s.trim()) : base.phones,
        email: settings.northEmail || base.email,
        highlightDistricts: settings.northDistricts ? settings.northDistricts.split(',').map(s => s.trim()) : base.highlightDistricts,
      };
    }
    if (base.id === 'centre') {
      return {
        ...base,
        campusesCount: settings.centreCampusesCount || base.campusesCount,
        address: settings.centreAddress || base.address,
        phones: settings.centrePhones ? settings.centrePhones.split(',').map(s => s.trim()) : base.phones,
        email: settings.centreEmail || base.email,
        highlightDistricts: settings.centreDistricts ? settings.centreDistricts.split(',').map(s => s.trim()) : base.highlightDistricts,
      };
    }
    if (base.id === 'south') {
      return {
        ...base,
        campusesCount: settings.southCampusesCount || base.campusesCount,
        address: settings.southAddress || base.address,
        phones: settings.southPhones ? settings.southPhones.split(',').map(s => s.trim()) : base.phones,
        email: settings.southEmail || base.email,
        highlightDistricts: settings.southDistricts ? settings.southDistricts.split(',').map(s => s.trim()) : base.highlightDistricts,
      };
    }
    return base;
  });

  const filteredOffices = offices.filter((office) => {
    const matchesTab = activeTab === 'all' || office.id === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      office.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.highlightDistricts.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <section id="campuses" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-blue-800" />
            <span>Pan-Pakistan Institutional Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {settings.directoryHeading || 'Location Of BFCs Regional Office Director BEATS'}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {settings.directorySubheading || `Directing educational operations across ${settings.statCampuses || '87+'} campuses through 3 administrative directorates located in Islamabad, Lahore, and Karachi.`}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Regions ({settings.statCampuses || '87+'})
            </button>
            {REGIONAL_OFFICES.map((off) => (
              <button
                key={off.id}
                onClick={() => setActiveTab(off.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === off.id
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {off.region} ({off.campusesCount})
              </button>
            ))}
          </div>

          {/* District search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, district, campus..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Regional Directorate Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {filteredOffices.map((office) => (
            <div
              key={office.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between text-left relative overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-900 via-blue-700 to-amber-500"></div>

              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-100">
                    {office.city}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60">
                    {office.campusesCount} Campuses
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {office.region}
                </h3>
                <div className="text-xs font-semibold text-blue-900 mb-4 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  <span>{office.title}</span>
                </div>

                {/* Contact List */}
                <div className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4 mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{office.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {office.phones.map((p, idx) => (
                        <a key={idx} href={`tel:${p}`} className="hover:text-blue-900 font-medium">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`mailto:${office.email}`} className="hover:text-blue-900 font-medium truncate">
                      {office.email}
                    </a>
                  </div>

                  {office.fax && (
                    <div className="flex items-center gap-2.5 text-slate-400">
                      <Printer className="w-4 h-4 shrink-0" />
                      <span>Fax: {office.fax}</span>
                    </div>
                  )}
                </div>

                {/* Highlight Districts Chips */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Campus Districts Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {office.highlightDistricts.map((district, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 font-medium"
                      >
                        {district}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onOpenAdmissionModal(office.id)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Apply in {office.city}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom index link note */}
        <div className="p-6 rounded-2xl bg-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-left border border-blue-900">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-white flex items-center gap-2">
              <span className="text-amber-400">⚓</span>
              Looking for a specific Bahria Foundation College in your city?
            </h4>
            <p className="text-xs text-slate-300">
              Browse the complete address and telephone directory of all {settings.statCampuses || '87+'} campuses across Pakistan.
            </p>
          </div>
          <a
            href="https://beats.com.pk/campuses/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span>View Complete Campus Index</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
