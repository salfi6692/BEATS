import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { GalleryPhotoItem } from '../types/settings';

export const CampusGallery: React.FC = () => {
  const { settings } = useSettings();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);

  const categories = ['All', 'Campus Life', 'Academics', 'Facilities', 'Ceremony'];

  const photos = settings.galleryPhotos && settings.galleryPhotos.length > 0
    ? settings.galleryPhotos
    : [];

  const filteredItems = activeFilter === 'All'
    ? photos
    : photos.filter(item => item.category === activeFilter);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto || photos.length === 0) return;
    const currentIndex = photos.findIndex(i => i.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto || photos.length === 0) return;
    const currentIndex = photos.findIndex(i => i.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-blue-900" />
            <span>Visual Tour &amp; Student Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {settings.galleryHeading || 'Life at Bahria Foundation Colleges'}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {settings.gallerySubheading || 'Moments of academic rigor, athletic competitions, character-building assemblies, and experiential science learning across our nationwide campuses.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Camera className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">No photos found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 cursor-pointer bg-slate-900 aspect-4/3 flex flex-col justify-end"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Top category tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 text-blue-900 backdrop-blur-xs shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* View button */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-4 text-left">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 font-light">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white flex items-center justify-center cursor-pointer transition-colors border border-slate-700"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo frame with prev / next */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-full max-w-full object-contain"
              />

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-blue-900 text-white flex items-center justify-center cursor-pointer transition-colors border border-slate-700"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-blue-900 text-white flex items-center justify-center cursor-pointer transition-colors border border-slate-700"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption bar */}
            <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex items-start justify-between gap-4 text-left">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-900 text-amber-300 border border-blue-700 mb-1.5">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
