import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { 
  FileSpreadsheet, 
  Save, 
  RefreshCw, 
  Check, 
  GraduationCap, 
  Shield, 
  Award, 
  Phone, 
  MapPin, 
  Globe, 
  Share2,
  BookOpen,
  Info
} from 'lucide-react';

export const PagePoliciesSettings: React.FC = () => {
  const { settings, updateSettings, saveSettingsPermanently, isSaving } = useSettings();

  const [savedToast, setSavedToast] = useState(false);

  // Form State
  const [socialFacebook, setSocialFacebook] = useState(settings.socialFacebook || '');
  const [socialTwitter, setSocialTwitter] = useState(settings.socialTwitter || '');
  const [socialYoutube, setSocialYoutube] = useState(settings.socialYoutube || '');
  const [socialLinkedin, setSocialLinkedin] = useState(settings.socialLinkedin || '');
  const [socialInstagram, setSocialInstagram] = useState(settings.socialInstagram || '');

  const [admissionNotes, setAdmissionNotes] = useState(settings.admissionNotes || '');
  const [admissionBankInfo, setAdmissionBankInfo] = useState(settings.admissionBankInfo || '');
  const [campusLifeHouseColors, setCampusLifeHouseColors] = useState(settings.campusLifeHouseColors || '');
  const [scholarshipMaxPerStudent, setScholarshipMaxPerStudent] = useState(settings.scholarshipMaxPerStudent || '');
  const [contactGoogleMapQuery, setContactGoogleMapQuery] = useState(settings.contactGoogleMapQuery || '');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const updates = {
      socialFacebook,
      socialTwitter,
      socialYoutube,
      socialLinkedin,
      socialInstagram,
      admissionNotes,
      admissionBankInfo,
      campusLifeHouseColors,
      scholarshipMaxPerStudent,
      contactGoogleMapQuery
    };

    updateSettings(updates);
    await saveSettingsPermanently(updates);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Site-Wide Page Regulations &amp; Connectivity</span>
          </div>
          <h3 className="text-xl font-bold text-white">Institutional Page Policies &amp; Social Links</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure admission voucher rules, house system colors, scholarship caps, and official social portals across all pages.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50 shrink-0"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Policies to Disk'}</span>
        </button>
      </div>

      {savedToast && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Page policies and social channels saved permanently!</span>
        </div>
      )}

      {/* Social Media & Official Channels */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Share2 className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Official Social Media &amp; Public Portals
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Facebook Page URL</label>
            <input
              type="text"
              value={socialFacebook}
              onChange={(e) => setSocialFacebook(e.target.value)}
              placeholder="https://facebook.com/BahriaFoundationOfficial"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Twitter / X Handle URL</label>
            <input
              type="text"
              value={socialTwitter}
              onChange={(e) => setSocialTwitter(e.target.value)}
              placeholder="https://twitter.com/BahriaFdn"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">YouTube Channel URL</label>
            <input
              type="text"
              value={socialYoutube}
              onChange={(e) => setSocialYoutube(e.target.value)}
              placeholder="https://youtube.com/@BahriaFoundation"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">LinkedIn Corporate Page</label>
            <input
              type="text"
              value={socialLinkedin}
              onChange={(e) => setSocialLinkedin(e.target.value)}
              placeholder="https://linkedin.com/company/bahria-foundation"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-1">Instagram Profile URL</label>
            <input
              type="text"
              value={socialInstagram}
              onChange={(e) => setSocialInstagram(e.target.value)}
              placeholder="https://instagram.com/bahriafoundation"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Admission Page Policies */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Admission Page Policies &amp; Banking Instructions
          </h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Admission Verification Rules &amp; Special Notes
            </label>
            <textarea
              rows={3}
              value={admissionNotes}
              onChange={(e) => setAdmissionNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Designated Fee Collection Banks &amp; Procedures
            </label>
            <input
              type="text"
              value={admissionBankInfo}
              onChange={(e) => setAdmissionBankInfo(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Campus Life & House System Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Shield className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Campus Life House System
          </h4>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            BEATS House Names &amp; Assigned Colors
          </label>
          <input
            type="text"
            value={campusLifeHouseColors}
            onChange={(e) => setCampusLifeHouseColors(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            Standard: Jinnah (Crimson Red), Iqbal (Emerald Green), Tippu (Navy Blue), Zafar (Golden Yellow)
          </p>
        </div>
      </div>

      {/* Scholarship Page Policy */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Award className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Scholarship Grant Limits &amp; Provisions
          </h4>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Maximum Higher Education Grant Statement
          </label>
          <input
            type="text"
            value={scholarshipMaxPerStudent}
            onChange={(e) => setScholarshipMaxPerStudent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Contact & Map Coordinates */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <MapPin className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Contact Desk Coordinates &amp; Map Search
          </h4>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Google Maps Search Query for Head Office
          </label>
          <input
            type="text"
            value={contactGoogleMapQuery}
            onChange={(e) => setContactGoogleMapQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-lg disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save All Page Policies'}</span>
        </button>
      </div>
    </form>
  );
};
