/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Upload, 
  CheckCircle, 
  Send, 
  Building2, 
  Sparkles,
  Calendar,
  Briefcase
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

interface AlumniPageProps {
  onNavigateHome: () => void;
}

export const AlumniPage: React.FC<AlumniPageProps> = ({ onNavigateHome }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherFirstName: '',
    fatherLastName: '',
    dob: '',
    cnic: '',
    gender: 'Male',
    email: '',
    phone: '',
    campusName: '',
    startingYear: '',
    endingYear: '',
    permanentAddress: '',
    lastDegree: '',
    presentOccupation: '',
    otherInfo: '',
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In local client state / store submission
    try {
      const existing = JSON.parse(localStorage.getItem('beats_alumni_submissions') || '[]');
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('beats_alumni_submissions', JSON.stringify(existing));
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
          <Breadcrumb items={[{ label: 'Alumni Registration', active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Global Bahrian Community
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Alumni Registration Form
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Join the Legacy of Excellence! BEATS Alumni Network: Connecting the Brightest Minds.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Contact Strip */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-3">
            <Building2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-bold">Head Office</strong>
              <span className="text-slate-600">Laraib Plaza, Gulberg Greens Islamabad</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-bold">Direct Lines</strong>
              <span className="text-slate-600">+92-51-5915601 / 602, +92-51-8153584</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-bold">Official Email</strong>
              <span className="text-slate-600">beats@bahriafoundation.com</span>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-xs border border-slate-200 space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-900">
              Registration Successfully Submitted!
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Thank you for registering with the Bahria Education &amp; Training System Alumni Network. Your record has been sent to Directorate BEATS. Welcome back to the Bahrian family!
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                Register Another Alumnus
              </button>
              <button
                onClick={onNavigateHome}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-950 hover:bg-blue-900 text-white transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Official Directory
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Alumnus Membership Form
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please provide accurate historical enrollment and present career information.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Alumnus Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Name *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
              </div>

              {/* Father Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Father Name *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.fatherFirstName}
                    onChange={(e) => setFormData({ ...formData, fatherFirstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.fatherLastName}
                    onChange={(e) => setFormData({ ...formData, fatherLastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
              </div>

              {/* DOB, CNIC & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date of Birth (MM/DD/YYYY)
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    CNIC / B-Form Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 61101-1234567-1"
                    value={formData.cnic}
                    onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Picture Upload
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                  <input
                    type="file"
                    id="alumni-pic"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="alumni-pic" className="cursor-pointer flex flex-col items-center gap-1">
                    <Upload className="w-6 h-6 text-slate-400" />
                    <span className="text-xs font-medium text-blue-900">
                      {uploadedFileName ? uploadedFileName : 'Choose file or drag & drop (JPEG, PNG)'}
                    </span>
                    <span className="text-[11px] text-slate-400">Passport style portrait preferred</span>
                  </label>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
              </div>

              {/* Campus Name, Starting & Ending Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    BFC Campus Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BFC Rawalpindi, BFC Lahore"
                    value={formData.campusName}
                    onChange={(e) => setFormData({ ...formData, campusName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Starting Year / Class
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2012 / Class 6"
                    value={formData.startingYear}
                    onChange={(e) => setFormData({ ...formData, startingYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ending Year / Class
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2018 / Class 10 (SSC)"
                    value={formData.endingYear}
                    onChange={(e) => setFormData({ ...formData, endingYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
              </div>

              {/* Permanent Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Permanent Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Street address, city, province"
                  value={formData.permanentAddress}
                  onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                />
              </div>

              {/* Last Degree & Present Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Last Degree Acquired
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BS Software Engineering, MBBS, BBA"
                    value={formData.lastDegree}
                    onChange={(e) => setFormData({ ...formData, lastDegree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Present Occupation with Status
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Officer / Engineer at Navy / Corporate"
                    value={formData.presentOccupation}
                    onChange={(e) => setFormData({ ...formData, presentOccupation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                  />
                </div>
              </div>

              {/* Any Other Info */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Any Other Information (Achievements, Willingness to Mentor, etc.)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share notable accolades or how you would like to contribute..."
                  value={formData.otherInfo}
                  onChange={(e) => setFormData({ ...formData, otherInfo: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-900 outline-hidden"
                />
              </div>

              {/* Submit */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl font-bold text-sm text-white bg-blue-950 hover:bg-blue-900 transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Alumni Registration</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
