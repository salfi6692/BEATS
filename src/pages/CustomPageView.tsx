import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { CustomPage, PageBlock } from '../types/settings';
import { useSettings } from '../context/SettingsContext';
import { 
  Anchor, 
  Shield, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Users, 
  ExternalLink, 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  Info, 
  Quote, 
  Phone, 
  Download,
  CheckCircle2,
  Play
} from 'lucide-react';

export interface CustomPageViewProps {
  page: CustomPage;
  onNavigateHome: () => void;
  onNavigateRoute?: (route: string) => void;
  onOpenAdmission?: () => void;
  onOpenProspectus?: () => void;
  isPreview?: boolean;
  hideSidebar?: boolean;
}

export const CustomPageView: React.FC<CustomPageViewProps> = ({
  page,
  onNavigateHome,
  onNavigateRoute,
  onOpenAdmission,
  onOpenProspectus,
  isPreview = false,
  hideSidebar = false
}) => {
  const { settings } = useSettings();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Helper to get Lucide icon dynamically
  const renderIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'shield':
        return <Shield className="w-6 h-6 text-amber-500" />;
      case 'award':
        return <Award className="w-6 h-6 text-amber-500" />;
      case 'bookopen':
      case 'book':
        return <BookOpen className="w-6 h-6 text-amber-500" />;
      case 'graduationcap':
        return <GraduationCap className="w-6 h-6 text-amber-500" />;
      case 'users':
        return <Users className="w-6 h-6 text-amber-500" />;
      case 'anchor':
      default:
        return <Anchor className="w-6 h-6 text-amber-500" />;
    }
  };

  const handleLinkClick = (url: string, isExternal?: boolean) => {
    if (isPreview) {
      // In preview mode within the Page Designer, do not leave the editor
      return;
    }
    if (isExternal || url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (url.startsWith('#/') || url.startsWith('/')) {
      const cleanRoute = url.replace(/^#\//, '').replace(/^\//, '');
      if (onNavigateRoute) {
        onNavigateRoute(cleanRoute);
      } else {
        window.location.hash = `#/${cleanRoute}`;
      }
    } else if (onNavigateRoute) {
      onNavigateRoute(url);
    }
  };

  const renderBlock = (block: PageBlock) => {
    switch (block.type) {
      case 'heading': {
        const alignClass = 
          block.align === 'center' ? 'text-center' : block.align === 'right' ? 'text-right' : 'text-left';

        return (
          <div key={block.id} className={`my-6 sm:my-8 ${alignClass}`}>
            {block.badge && (
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full mb-3 shadow-xs">
                {block.badge}
              </span>
            )}
            {block.level === 'h1' ? (
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {block.title}
              </h1>
            ) : block.level === 'h3' ? (
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                {block.title}
              </h3>
            ) : (
              <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {block.title}
              </h2>
            )}
            {block.subtitle && (
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {block.subtitle}
              </p>
            )}
          </div>
        );
      }

      case 'text':
        return (
          <div key={block.id} className="my-5 leading-relaxed text-slate-700 text-sm sm:text-base whitespace-pre-line space-y-4">
            <p>{block.content}</p>
          </div>
        );

      case 'image': {
        const widthClass = 
          block.imageWidth === 'full' ? 'w-full' : block.imageWidth === 'wide' ? 'max-w-4xl mx-auto' : 'max-w-2xl mx-auto';

        return (
          <figure key={block.id} className={`my-8 ${widthClass}`}>
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-md bg-slate-100 group">
              <img
                src={block.imageUrl || 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg'}
                alt={block.imageAlt || page.title}
                className="w-full h-auto max-h-[550px] object-cover transition-transform duration-500 group-hover:scale-101"
              />
            </div>
            {block.caption && (
              <figcaption className="mt-2 text-center text-xs sm:text-sm text-slate-500 italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      case 'video': {
        // Parse YouTube URL or render iframe
        let embedUrl = block.videoUrl || '';
        if (embedUrl.includes('youtube.com/watch?v=')) {
          const videoId = embedUrl.split('watch?v=')[1]?.split('&')[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (embedUrl.includes('youtu.be/')) {
          const videoId = embedUrl.split('youtu.be/')[1]?.split('?')[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        return (
          <div key={block.id} className="my-8 max-w-4xl mx-auto">
            {block.videoTitle && (
              <div className="flex items-center gap-2 mb-3">
                <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  {block.videoTitle}
                </h4>
              </div>
            )}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={block.videoTitle || 'Institutional Video'}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                  <Play className="w-12 h-12 text-slate-600 mb-2" />
                  <p className="text-sm">Video URL not provided</p>
                </div>
              )}
            </div>
            {block.videoCaption && (
              <p className="mt-2 text-xs sm:text-sm text-slate-500 italic text-center">
                {block.videoCaption}
              </p>
            )}
          </div>
        );
      }

      case 'buttons':
        return (
          <div key={block.id} className="my-8 flex flex-wrap items-center gap-3">
            {block.buttons?.map((btn) => {
              let styleClass = 'bg-[#0B1E3F] text-white hover:bg-blue-900 shadow-sm border border-blue-900';
              if (btn.variant === 'gold') {
                styleClass = 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm font-bold border border-amber-400';
              } else if (btn.variant === 'secondary') {
                styleClass = 'bg-slate-800 text-white hover:bg-slate-700 shadow-xs border border-slate-700';
              } else if (btn.variant === 'outline') {
                styleClass = 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-300 shadow-xs';
              }

              return (
                <button
                  key={btn.id}
                  onClick={() => handleLinkClick(btn.url, btn.isExternal)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${styleClass}`}
                >
                  <span>{btn.label}</span>
                  {btn.isExternal ? (
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                  )}
                </button>
              );
            })}
          </div>
        );

      case 'features': {
        const gridCols =
          block.featuresColumns === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : block.featuresColumns === 4
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 md:grid-cols-3';

        return (
          <div key={block.id} className={`my-8 grid ${gridCols} gap-4 sm:gap-6`}>
            {block.features?.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                    {renderIcon(f.icon)}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">{f.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      }

      case 'accordion':
        return (
          <div key={block.id} className="my-8 space-y-3 max-w-4xl">
            {block.faqItems?.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-200/90 rounded-xl overflow-hidden bg-white shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'callout': {
        const isQuote = block.calloutType === 'quote';
        const isGold = block.calloutType === 'gold';
        const isNavy = block.calloutType === 'navy';

        let boxStyle = 'bg-blue-50/60 border-blue-200 text-blue-950';
        if (isQuote) {
          boxStyle = 'bg-amber-50/50 border-amber-300 text-slate-900 border-l-4';
        } else if (isGold) {
          boxStyle = 'bg-amber-500/10 border-amber-500/40 text-amber-950 border-l-4';
        } else if (isNavy) {
          boxStyle = 'bg-slate-900 text-slate-100 border-slate-800 shadow-lg';
        }

        return (
          <div
            key={block.id}
            className={`my-6 p-5 sm:p-6 rounded-2xl border ${boxStyle} relative overflow-hidden`}
          >
            {isQuote ? (
              <div className="flex gap-4">
                <Quote className="w-8 h-8 text-amber-500 shrink-0 opacity-80" />
                <div className="space-y-2">
                  <blockquote className="text-sm sm:text-base italic font-serif leading-relaxed">
                    "{block.content}"
                  </blockquote>
                  {block.quoteAuthor && (
                    <cite className="block text-xs sm:text-sm font-sans font-bold text-slate-700 not-italic">
                      — {block.quoteAuthor}
                    </cite>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex gap-3 items-start">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  {block.content}
                </div>
              </div>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Standard Institutional Header Banner */}
      <section className="relative bg-gradient-to-br from-[#061224] via-[#0B1E3F] to-slate-950 text-white pt-10 pb-12 overflow-hidden border-b border-blue-900/40 shadow-inner">
        {page.bannerImage && (
          <div className="absolute inset-0 z-0 opacity-15">
            <img
              src={page.bannerImage}
              alt={page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061224] via-[#0B1E3F]/90 to-[#061224]" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: page.title }
            ]}
          />

          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                {page.badge || 'Bahria Education & Training System'}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {page.title}
              </h1>
              {page.subtitle && (
                <p className="mt-3 text-sm sm:text-lg text-slate-300 leading-relaxed">
                  {page.subtitle}
                </p>
              )}
            </div>

            {/* Quick Action Buttons in Banner */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {onOpenAdmission && (
                <button
                  onClick={onOpenAdmission}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-md shadow-amber-950/20 cursor-pointer"
                >
                  Apply Online
                </button>
              )}
              {onOpenProspectus && (
                <button
                  onClick={onOpenProspectus}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Prospectus</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className={`grid grid-cols-1 ${hideSidebar ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-8`}>
          {/* Main Content Column */}
          <div className={`${hideSidebar ? 'w-full' : 'lg:col-span-8'} bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs`}>
            {page.blocks && page.blocks.length > 0 ? (
              page.blocks.map(renderBlock)
            ) : (
              <div className="py-16 text-center text-slate-500">
                <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-700">Page Content Coming Soon</h3>
                <p className="text-sm text-slate-500 mt-1">
                  This page has been created and can be configured with headings, text, images, and videos in the Admin Panel Page Designer.
                </p>
              </div>
            )}
          </div>

          {/* Institutional Sidebar Column */}
          {!hideSidebar && (
            <div className="lg:col-span-4 space-y-6">
              {/* Admission Helpline Card */}
              <div className="bg-gradient-to-br from-[#0B1E3F] to-slate-950 rounded-2xl p-6 text-white border border-blue-900 shadow-md">
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 block mb-1">
                  Official Helpline
                </span>
                <h4 className="text-lg font-bold mb-2">Have Admissions or Transfer Inquiries?</h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Connect with the BEATS Directorate secretariat for guidance regarding campus admissions, fee vouchers, and migration.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href={`tel:${settings.admissionPhone}`} className="hover:text-amber-300 font-bold">
                      {settings.admissionPhone}
                    </a>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-800 flex gap-2">
                  {onOpenAdmission && (
                    <button
                      onClick={onOpenAdmission}
                      className="w-full py-2 text-xs font-bold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      Start Admission Form
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Institutional Key Highlights */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                  BEATS Network Overview
                </h4>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>87+ Educational Institutions across Pakistan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>~37,000 enrolled students nationwide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>FBISE &amp; Cambridge O-Level curricula</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>03 Dedicated Teacher Training Institutes (TTIs)</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
