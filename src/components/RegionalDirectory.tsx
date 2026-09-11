import React, { useState } from 'react';
import { MapPin, Phone, Mail, Printer, ExternalLink, Building2, Search, ArrowRight, Shield } from 'lucide-react';
import { REGIONAL_OFFICES } from '../data/beatsData';

interface RegionalDirectoryProps {
  onOpenAdmissionModal: (region?: string) => void;
}

export const RegionalDirectory: React.FC<RegionalDirectoryProps> = ({ onOpenAdmissionModal }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOffices = REGIONAL_OFFICES.filter((office) => {
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
            Location Of BFCs Regional Office Director BEATS
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Directing educational operations across 87+ campuses through 3 administrative directorates located in Islamabad, Lahore, and Karachi.
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
              All Regions (87+)
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

          {/* Search box for city/district */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search city, district, or campus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
            />
          </div>

        </div>

        {/* Regional Offices Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffices.map((office) => (
            <div
              key={office.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between text-left group"
            >
              <div>
                {/* Header Banner */}
                <div className="p-6 bg-gradient-to-br from-blue-900 to-slate-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Shield className="w-24 h-24 text-white" />
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider mb-2">
                    {office.campusesCount} Registered Campuses
                  </span>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    {office.region}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 font-light">
                    {office.title}
                  </p>
                </div>

                {/* Office Contact Details */}
                <div className="p-6 space-y-4 text-xs">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Regional Secretariat</div>
                      <div className="text-slate-600 leading-relaxed mt-0.5">{office.address}</div>
                    </div>
                  </div>

                  {/* Phones */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Telephone Lines</div>
                      <div className="space-y-0.5 mt-0.5">
                        {office.phones.map((ph, pIdx) => (
                          <a
                            key={pIdx}
                            href={`tel:${ph.replace(/\s+/g, '')}`}
                            className="block text-slate-600 hover:text-blue-900 font-medium transition-colors"
                          >
                            {ph}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fax if available */}
                  {office.fax && (
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Facsimile</div>
                        <div className="text-slate-600 mt-0.5">{office.fax}</div>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Official Directorate Email</div>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-blue-900 hover:underline font-medium break-all"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>

                  {/* Prominent District Coverage */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Key Districts &amp; Cities Served:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {office.highlightDistricts.map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={office.branchesLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1 transition-colors"
                >
                  <span>View All {office.region} Branches</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onOpenAdmissionModal(office.region)}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white bg-blue-900 hover:bg-blue-800 transition-all cursor-pointer"
                >
                  Inquire
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
