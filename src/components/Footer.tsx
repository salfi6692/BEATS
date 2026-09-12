import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, FileText, ExternalLink, ArrowUpRight, Eye, Download } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface FooterProps {
  onOpenProspectus: () => void;
  onOpenAdmission: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenProspectus,
  onOpenAdmission,
  onNavigateSection
}) => {
  const { settings } = useSettings();
  const [viewCount, setViewCount] = useState<number>(14258);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('websiteViews');
      let current = stored ? parseInt(stored, 10) : 14258;
      if (isNaN(current)) current = 14258;
      current += 1;
      localStorage.setItem('websiteViews', current.toString());
      setViewCount(current);
    } catch {
      // ignore in iframe restricted storage
    }
  }, []);

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 border-t border-slate-800 text-left pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={settings.logoUrl}
                alt={settings.siteTitle}
                className="h-14 w-auto object-contain bg-white/5 p-1.5 rounded-lg border border-slate-800"
              />
            </div>
            
            <p className="text-xs text-slate-400 italic leading-relaxed">
              &ldquo;To provide quality and affordable education for equipping the beneficiaries with knowledge and skills for self-sustainability and socio-economic growth.&rdquo;
            </p>

            <p className="text-xs text-slate-400">
              {settings.footerDescription}
            </p>

            {/* Direct Prospectus Link */}
            <div className="pt-2">
              <a
                href={settings.prospectusUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Prospectus</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Official Social Channels
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/profile.php?id=100081027177875"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                  aria-label="Facebook"
                >
                  <span className="font-bold text-xs">f</span>
                </a>
                <a
                  href="https://www.youtube.com/@beats2946"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                  aria-label="YouTube"
                >
                  <span className="font-bold text-xs">▶</span>
                </a>
                <a
                  href="https://twitter.com/bahria_beats"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-sky-500 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                  aria-label="Twitter"
                >
                  <span className="font-bold text-xs">𝕏</span>
                </a>
                <a
                  href="https://www.instagram.com/beatsbf/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                  aria-label="Instagram"
                >
                  <span className="font-bold text-xs">📷</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (Respects visibility) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-1 border-b border-slate-800">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {settings.sections.aboutOverview && (
                <li>
                  <button
                    onClick={() => onNavigateSection('about')}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    About BEATS
                  </button>
                </li>
              )}
              {settings.sections.academicStreams && (
                <li>
                  <button
                    onClick={() => onNavigateSection('academics')}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Academic Streams
                  </button>
                </li>
              )}
              {settings.sections.achievements && (
                <li>
                  <button
                    onClick={() => onNavigateSection('achievements')}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Academic Achievements
                  </button>
                </li>
              )}
              {settings.sections.regionalDirectory && (
                <li>
                  <button
                    onClick={() => onNavigateSection('campuses')}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Campuses Network
                  </button>
                </li>
              )}
              {settings.sections.campusGallery && (
                <li>
                  <button
                    onClick={() => onNavigateSection('gallery')}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Campus Life &amp; Gallery
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenAdmission}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Admissions 2025–26
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Links & External Portals */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-1 border-b border-slate-800">
              Key Institutions
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://bahriafoundation.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Bahria Foundation</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.paknavy.gov.pk/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Pakistan Navy</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://beats.com.pk/higherstudiesscholarship/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Higher Studies Scholarship</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://beats.com.pk/alumni-registration/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Alumni Registration</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://beats.com.pk/admission/#fees-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Fees &amp; Welfare Policy</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Head Office Secretariat & Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider pb-1 border-b border-slate-800">
              Directorate Secretariat
            </h4>
            
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Head Office:</strong>
                  <span>{settings.footerAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Helpline Telephones:</strong>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    <a href={`tel:${settings.admissionPhone}`} className="hover:text-white">{settings.admissionPhone}</a>
                    <a href="tel:+92518153584" className="hover:text-white">+92-51-8153584</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Directorate Email:</strong>
                  <a href={`mailto:${settings.admissionEmail}`} className="hover:text-white block">
                    {settings.admissionEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Visitor Counter & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center flex-wrap gap-3">
            <span>© <strong>Bahria Education And Training System 2026</strong>. All Rights Reserved.</span>
            <span>•</span>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#/admin';
                window.dispatchEvent(new HashChangeEvent('hashchange'));
              }}
              className="text-slate-400 hover:text-amber-400 transition-colors font-medium underline"
            >
              BEATS Admin Portal
            </a>
            <span>•</span>
            <a
              href="/beats-portal-build.zip"
              download="beats-portal-build.zip"
              className="text-amber-400/90 hover:text-amber-300 transition-colors font-semibold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
              title="Download Latest Production Build & Source Archive (.zip)"
            >
              <span>Download Latest Build (.zip)</span>
            </a>
          </div>

          {/* Working View Counter from Original Script */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-400">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Portal Visitors: <strong className="text-white font-mono">{viewCount.toLocaleString()}</strong></span>
          </div>
        </div>

      </div>
    </footer>
  );
};
