/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  CreditCard, 
  Calendar, 
  HelpCircle, 
  ArrowRight,
  Send,
  UserCheck,
  ShieldAlert,
  Percent,
  Sparkles
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ADMISSION_PAGE_DATA } from '../data/beatsData';
import { useSettings } from '../context/SettingsContext';

interface AdmissionPageProps {
  onNavigateHome: () => void;
  onOpenProspectus: () => void;
  onOpenAdmissionModal: () => void;
}

export const AdmissionPage: React.FC<AdmissionPageProps> = ({
  onNavigateHome,
  onOpenProspectus,
  onOpenAdmissionModal,
}) => {
  const { settings } = useSettings();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    email: '',
    phone: '',
    gradeSeeking: 'Primary (Class 1-5)',
    preferredCampus: 'North Region',
    concessionCategory: 'General Civilian',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0D284C] text-white py-14 border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Admission', active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Academic Session 2025–26 • Merit &amp; Welfare Admissions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Admission Procedure &amp; Regulations
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Transparent admission guidelines, required document checklists, welfare concessions under BFEI Rules-2024, and fee payment instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Top Split: Procedure & Required Documents */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Procedure & Document Checklist */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Official Guidelines
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {ADMISSION_PAGE_DATA.procedureTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {ADMISSION_PAGE_DATA.procedureDesc}
              </p>
            </div>

            <div className="space-y-3">
              {ADMISSION_PAGE_DATA.requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/50 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium">
                    {doc}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenProspectus}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-blue-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Prospectus</span>
              </button>
              <button
                onClick={onOpenAdmissionModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-950 hover:bg-blue-900 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Launch Quick Application</span>
              </button>
            </div>
          </div>

          {/* Right: Concessions Available (BFEI Rules-2024) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-blue-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-blue-800/80 pb-4 mb-6">
                <Percent className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Concessions Available
                  </h3>
                  <span className="text-xs text-amber-300 font-medium">
                    As per BFEI Rules-2024
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Bahria Foundation provides institutional fee subsidies and tuition concessions to support families, armed forces personnel, and talented students:
              </p>

              <div className="space-y-2.5">
                {ADMISSION_PAGE_DATA.concessions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-blue-900/40 border border-blue-800/60 text-xs text-slate-200"
                  >
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {item}
                    </span>
                    <span className="text-[11px] text-amber-300 font-medium bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      BFEI-2024
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-900/80 text-[11px] text-slate-400">
              * Note: Concession certificates and service records must be verified by the respective college administration during admission finalization.
            </div>
          </div>

        </section>

        {/* Payment of College Dues (8 Rules from PDF) */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200">
          <div className="border-b border-slate-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Accounts &amp; Fee Policy
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Payment of College Dues
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-200 self-start sm:self-center">
              Strict Adherence Required
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADMISSION_PAGE_DATA.duesRules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {rule}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Payment Notes Callout */}
          <div className="mt-6 bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Online Payment Advice:</strong> Parents may deposit tuition through standard 1Link / Kuickpay online banking channels, bank counters, or mobile banking apps. Always retain the transaction transaction ID / bank receipt for reconciliation.
            </div>
          </div>
        </section>

        {/* Interactive In-Page Admission Inquiry Form */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold text-blue-950 uppercase tracking-wider block">
              Step 1
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Online Admission Inquiry Form
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Submit your candidate details to receive provisional registration guidelines and college prospectus.
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="max-w-md mx-auto text-center p-8 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-950">Inquiry Received!</h3>
              <p className="text-xs sm:text-sm text-emerald-800">
                Thank you for applying to Bahria Education &amp; Training System. Our admissions desk will contact you via email and phone shortly.
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Father / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    placeholder="e.g. Muhammad Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parent Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact / WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Grade Seeking Admission *
                  </label>
                  <select
                    value={formData.gradeSeeking}
                    onChange={(e) => setFormData({ ...formData, gradeSeeking: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                  >
                    <option>Montessori Section (Age 3-5)</option>
                    <option>Primary (Class 1-5)</option>
                    <option>Secondary (Class 6-10 / SSC)</option>
                    <option>HSSC (Class 11-12 Pre-Med/Eng/ICS)</option>
                    <option>Cambridge O Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Region *
                  </label>
                  <select
                    value={formData.preferredCampus}
                    onChange={(e) => setFormData({ ...formData, preferredCampus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                  >
                    <option>North Region (Islamabad, Rawalpindi, KPK, AJK)</option>
                    <option>Centre Region (Lahore, Punjab)</option>
                    <option>South Region (Karachi, Coastal Belt, Sindh)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Concession Category
                  </label>
                  <select
                    value={formData.concessionCategory}
                    onChange={(e) => setFormData({ ...formData, concessionCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                  >
                    <option>General Civilian</option>
                    <option>Sibling Concession</option>
                    <option>Children of Naval Personnel</option>
                    <option>Children of Army / PAF Personnel</option>
                    <option>BF / BFEI Employee Child</option>
                    <option>Martyrs of Defence Personnel (MDP)</option>
                    <option>Merit Scholarship Candidate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Inquiry / Specific Campus Name (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention previous institution or preferred city campus..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl font-bold text-sm text-white bg-blue-950 hover:bg-blue-900 transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Admission Application</span>
                </button>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
};
