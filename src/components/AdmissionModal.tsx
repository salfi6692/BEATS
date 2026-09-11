import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, FileText, Phone, Download, Send, Check } from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRegion?: string;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  preselectedRegion
}) => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    email: '',
    city: '',
    stream: 'Montessori Section',
    region: preselectedRegion || 'North Region (Islamabad / Rawalpindi)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Admissions 2025–2026</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Bahria Foundation Colleges Admission Desk
          </h3>
          <p className="text-xs text-slate-300 mt-1 font-light">
            Open for Montessori, Primary, Secondary (SSC), HSSC (F.Sc/ICS), and Cambridge O-Level.
          </p>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Inquiry Successfully Submitted!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong className="text-slate-800">{formData.parentName}</strong>. Our Regional Directorate Admissions Coordinator will contact you on <strong className="text-slate-800">{formData.phone}</strong> regarding seat availability and document submission.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <a
                  href="https://beats.com.pk/wp-content/uploads/2024/12/Final-PROSPECTUS-22-02-2024.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official Prospectus PDF</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Process Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <div>
                    <strong className="block text-slate-900">Prospectus &amp; Form</strong>
                    <span className="text-slate-500">Collect form online or from branch</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <div>
                    <strong className="block text-slate-900">Assessment &amp; Interview</strong>
                    <span className="text-slate-500">Age verification &amp; baseline check</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <div>
                    <strong className="block text-slate-900">Fee Deposit &amp; Enrollment</strong>
                    <span className="text-slate-500">Official roll number allocation</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayan Tariq"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Nearest District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Islamabad, Lahore, Karachi..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Academic Stream Desired
                    </label>
                    <select
                      value={formData.stream}
                      onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    >
                      <option value="Montessori Section">Montessori Section (Age 3-5)</option>
                      <option value="Primary Section">Primary Section (Grades 1-5)</option>
                      <option value="Secondary Section">Secondary Section (Grades 6-10 BISE)</option>
                      <option value="HSSC / College">Higher Secondary (HSSC Pre-Med/Engg/ICS)</option>
                      <option value="Cambridge O Level">Cambridge O Level (CAIE)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Regional Directorate
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    >
                      <option value="North Region (Islamabad / Rawalpindi)">North Region (Islamabad / Rawalpindi / KPK)</option>
                      <option value="Centre Region (Lahore / Punjab)">Centre Region (Lahore / Punjab)</option>
                      <option value="South Region (Karachi / Coastal Belt)">South Region (Karachi / Coastal Belt / Sindh)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Inquiries or Previous School
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific questions about fee concessions, bus transport, or campus transfers..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <a
                    href="https://beats.com.pk/wp-content/uploads/2024/12/Final-PROSPECTUS-22-02-2024.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Official Prospectus</span>
                  </a>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Admission Inquiry</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
