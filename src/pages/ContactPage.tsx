/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Send, 
  CheckCircle, 
  Printer, 
  ExternalLink,
  MessageSquare,
  Upload,
  ArrowRight
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { CONTACT_PAGE_DATA } from '../data/beatsData';

interface ContactPageProps {
  onNavigateHome: () => void;
  onNavigateCampuses: (region?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onNavigateCampuses,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    region: 'North Region',
    subject: '',
    message: '',
  });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem('beats_contact_queries') || '[]');
      existing.push({
        ...formData,
        file: selectedFile,
        date: new Date().toISOString(),
      });
      localStorage.setItem('beats_contact_queries', JSON.stringify(existing));
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0D284C] text-white py-14 border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Contact Us', active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              Directorate Inquiries &amp; Regional Secretariat
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Get In Touch With Us
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Feel free to contact Head Office or our Regional Directorates across North, Centre, and South regions for admission inquiries, campus guidance, or administrative assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        
        {/* Head Office & Form Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Head Office Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 via-[#0B1E3F] to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-blue-900/60 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-blue-800/80 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Central Secretariat
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {CONTACT_PAGE_DATA.headOffice.title}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Bahria Education &amp; Training System (BEATS)
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold mb-0.5">Physical Address</strong>
                    <span className="text-slate-300 leading-relaxed">
                      {CONTACT_PAGE_DATA.headOffice.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold mb-0.5">Telephones &amp; PBX</strong>
                    <div className="space-y-0.5 text-slate-300">
                      {CONTACT_PAGE_DATA.headOffice.phones.map((phone, i) => (
                        <div key={i}>{phone}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold mb-0.5">Official Emails</strong>
                    <div className="space-y-0.5 text-slate-300">
                      {CONTACT_PAGE_DATA.headOffice.emails.map((em, i) => (
                        <div key={i} className="text-amber-300 font-mono text-xs">{em}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-blue-900/80 mt-6 text-[11px] text-slate-400">
              Office Hours: Monday – Friday, 08:00 AM – 03:30 PM (PST)
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Direct Communication
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill in the details below. Our support coordinator will respond promptly.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Message Delivered!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for contacting Bahria Education &amp; Training System. Your query has been logged and assigned to the relevant regional desk.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-semibold hover:bg-blue-900 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tariq@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Select Region *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                    >
                      <option>North Region</option>
                      <option>Centre Region</option>
                      <option>South Region</option>
                      <option>Head Office</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Admission Inquiry for Montessori / Transfer Request"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Query / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or campus..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Upload Attachment (Optional, PDF / JPEG / PNG)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0].name);
                      }
                    }}
                    className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {selectedFile && (
                    <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                      Selected: {selectedFile}
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-950 hover:bg-blue-900 transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Query</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </section>

        {/* Location of BFCs Regional Offices (North, Centre, South) */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200">
          <div className="border-b border-slate-100 pb-4 mb-8 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Regional Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Location of BFCs Regional Offices
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Regional Directorates overseeing BFEI schools, teacher training institutes, and monitoring audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT_PAGE_DATA.regionalOffices.map((reg) => (
              <div
                key={reg.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-xs font-bold text-amber-700 block">
                      {reg.name}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {reg.directorate}
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                      <span>{reg.address}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        {reg.phones.map((p, i) => (
                          <div key={i}>{p}</div>
                        ))}
                      </div>
                    </div>

                    {reg.fax && (
                      <div className="flex items-start gap-2">
                        <Printer className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <span>Fax: {reg.fax}</span>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                      <span className="text-blue-900 font-mono text-[11px] font-semibold">{reg.email}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200">
                  <button
                    onClick={() => onNavigateCampuses(reg.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-950 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    <span>{reg.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
