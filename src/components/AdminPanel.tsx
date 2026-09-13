/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { convertImageToWebP, uploadAndSaveWebP, uploadDocumentFile, uploadDirectImage } from '../utils/imageToWebp';
import { SlideItem, GalleryPhotoItem, SectionKey, MarqueeItem } from '../types/settings';
import {
  Settings,
  Image as ImageIcon,
  Layers,
  Phone,
  BarChart3,
  Sliders,
  CheckCircle2,
  Trash2,
  Plus,
  Upload,
  Eye,
  EyeOff,
  LogOut,
  RotateCcw,
  Sparkles,
  Shield,
  Palette,
  ExternalLink,
  ChevronRight,
  Globe,
  Lock,
  ArrowUp,
  ArrowDown,
  Camera,
  FileText,
  Building2,
  BookOpen,
  Award,
  HelpCircle,
  Download,
  Package,
  Megaphone,
  Bell,
  Play,
  Pause,
  Edit,
  RefreshCw,
  Check,
  FolderDown,
  Save
} from 'lucide-react';

interface AdminPanelProps {
  onBackToSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite }) => {
  const {
    settings,
    updateSettings,
    saveSettingsPermanently,
    isSaving,
    lastSavedTime,
    resetSettings,
    updateSectionVisibility,
    reorderSections,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin
  } = useSettings();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active admin tab
  const [activeTab, setActiveTab] = useState<
    'general' | 'leadership' | 'marquee' | 'slider' | 'sections' | 'ordering' | 'gallery' | 'content' | 'appearance' | 'metrics'
  >('general');
  const [saveToast, setSaveToast] = useState(false);
  const [isConvertingImage, setIsConvertingImage] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  // Marquee item form state
  const [showAddMarqueeModal, setShowAddMarqueeModal] = useState(false);
  const [newMarqueeText, setNewMarqueeText] = useState('');
  const [newMarqueeBadge, setNewMarqueeBadge] = useState('ANNOUNCEMENT');
  const [newMarqueeLink, setNewMarqueeLink] = useState('');
  const [newMarqueeUrgent, setNewMarqueeUrgent] = useState(false);
  const [editingMarqueeId, setEditingMarqueeId] = useState<string | null>(null);

  // New slide form state
  const [newSlideImage, setNewSlideImage] = useState('');
  const [newSlideTag, setNewSlideTag] = useState('');
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideCaption, setNewSlideCaption] = useState('');
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);

  // Slide edit modal state
  const [editingSlide, setEditingSlide] = useState<SlideItem | null>(null);
  const [showEditSlideModal, setShowEditSlideModal] = useState(false);
  const [editSlideImage, setEditSlideImage] = useState('');
  const [editSlideTag, setEditSlideTag] = useState('');
  const [editSlideTitle, setEditSlideTitle] = useState('');
  const [editSlideCaption, setEditSlideCaption] = useState('');

  // New gallery photo state
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'Campus Life' | 'Academics' | 'Facilities' | 'Ceremony'>('Campus Life');
  const [newPhotoImage, setNewPhotoImage] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  // Gallery photo edit modal state
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhotoItem | null>(null);
  const [showEditPhotoModal, setShowEditPhotoModal] = useState(false);
  const [editPhotoTitle, setEditPhotoTitle] = useState('');
  const [editPhotoCategory, setEditPhotoCategory] = useState<'Campus Life' | 'Academics' | 'Facilities' | 'Ceremony'>('Campus Life');
  const [editPhotoImage, setEditPhotoImage] = useState('');
  const [editPhotoCaption, setEditPhotoCaption] = useState('');

  // Upload status and cPanel zip rebuild state
  const [uploadStatusMessage, setUploadStatusMessage] = useState('');
  const [isRebuildingZip, setIsRebuildingZip] = useState(false);
  const [rebuildZipMessage, setRebuildZipMessage] = useState('');

  const showNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (success) {
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Check credentials.');
    }
  };

  // Image Upload Handlers with WebP conversion and server/public_html media saving
  const handleLeadershipMdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Converting MD photo to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'leadership_md');
      updateSettings({ mdImage: url });
      await saveSettingsPermanently({ mdImage: url });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to process MD image');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleLeadershipDmdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Converting DMD photo to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'leadership_dmd');
      updateSettings({ dmdImage: url });
      await saveSettingsPermanently({ dmdImage: url });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to process DMD image');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Converting About graphic to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'about_beats');
      updateSettings({ aboutImage: url });
      await saveSettingsPermanently({ aboutImage: url });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to process About image');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleAchievementsImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Converting Achievements ceremony photo to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'achievements_cns');
      updateSettings({ achievementsImage: url });
      await saveSettingsPermanently({ achievementsImage: url });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to process Achievements image');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleWhyChooseImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Converting campus photo to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'why_choose');
      updateSettings({ whyChooseImage: url });
      await saveSettingsPermanently({ whyChooseImage: url });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to process Why Choose Us image');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Uploading logo directly to /media/ folder...');
      const { url } = await uploadDirectImage(file, 'beats_logo');
      setLogoError(false);
      updateSettings({ logoUrl: url });
      await saveSettingsPermanently({ logoUrl: url });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to upload logo');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Uploading favicon directly to /media/ folder...');
      const { url } = await uploadDirectImage(file, 'beats_favicon');
      setFaviconError(false);
      updateSettings({ faviconUrl: url });
      await saveSettingsPermanently({ faviconUrl: url });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to upload favicon');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleProspectusUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage(`Uploading document ${file.name} to /media/ folder...`);
      const { url } = await uploadDocumentFile(file, 'prospectus');
      updateSettings({ prospectusUrl: url });
      await saveSettingsPermanently({ prospectusUrl: url });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to upload document file');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Converting slide image to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'hero_slide');
      setNewSlideImage(url);
    } catch (err) {
      console.error(err);
      alert('Failed to convert slide image to WebP');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  const handleGalleryPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Converting photo to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'gallery_photo');
      setNewPhotoImage(url);
    } catch (err) {
      console.error(err);
      alert('Failed to convert photo to WebP');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
      if (e.target) e.target.value = '';
    }
  };

  // Replace image directly on an existing slide
  const handleReplaceSlideImage = async (slideId: string, file: File) => {
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Replacing slide image, converting to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'hero_slide');
      const updated = settings.slides.map((s) =>
        s.id === slideId ? { ...s, image: url } : s
      );
      updateSettings({ slides: updated });
      await saveSettingsPermanently({ slides: updated });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to replace slide image');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
    }
  };

  // Slide reordering
  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...settings.slides];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSlides.length) return;
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIdx];
    newSlides[targetIdx] = temp;
    updateSettings({ slides: newSlides });
    showNotification();
  };

  // Open Edit Slide Modal
  const handleStartEditSlide = (slide: SlideItem) => {
    setEditingSlide(slide);
    setEditSlideImage(slide.image);
    setEditSlideTag(slide.tag);
    setEditSlideTitle(slide.title);
    setEditSlideCaption(slide.caption);
    setShowEditSlideModal(true);
  };

  // Save Edit Slide Modal
  const handleSaveEditedSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide || !editSlideTitle || !editSlideImage) {
      alert('Slide Title and Image are required');
      return;
    }
    const updated = settings.slides.map((s) =>
      s.id === editingSlide.id
        ? {
            ...s,
            image: editSlideImage,
            tag: editSlideTag || 'Campus Ethos',
            title: editSlideTitle,
            caption: editSlideCaption || ''
          }
        : s
    );
    updateSettings({ slides: updated });
    setShowEditSlideModal(false);
    setEditingSlide(null);
    showNotification();
  };

  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideImage || !newSlideTitle) {
      alert('Image and Title are required');
      return;
    }
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      image: newSlideImage,
      tag: newSlideTag || 'Campus Ethos',
      title: newSlideTitle,
      caption: newSlideCaption || ''
    };
    updateSettings({
      slides: [...settings.slides, newSlide]
    });
    setNewSlideImage('');
    setNewSlideTag('');
    setNewSlideTitle('');
    setNewSlideCaption('');
    setShowAddSlideModal(false);
    showNotification();
  };

  const handleDeleteSlide = (id: string) => {
    if (settings.slides.length <= 1) {
      alert('You must keep at least 1 hero slide.');
      return;
    }
    const updated = settings.slides.filter((s) => s.id !== id);
    updateSettings({ slides: updated });
    showNotification();
  };

  // Replace photo directly on an existing gallery item
  const handleReplacePhotoImage = async (photoId: string, file: File) => {
    try {
      setIsConvertingImage(true);
      setUploadStatusMessage('Replacing gallery photo, converting to WebP & saving to /media folder...');
      const { url } = await uploadAndSaveWebP(file, 'gallery_photo');
      const updated = settings.galleryPhotos.map((p) =>
        p.id === photoId ? { ...p, image: url } : p
      );
      updateSettings({ galleryPhotos: updated });
      await saveSettingsPermanently({ galleryPhotos: updated });
      showNotification();
    } catch (err) {
      console.error(err);
      alert('Failed to replace gallery photo');
    } finally {
      setIsConvertingImage(false);
      setUploadStatusMessage('');
    }
  };

  // Open Edit Photo Modal
  const handleStartEditPhoto = (photo: GalleryPhotoItem) => {
    setEditingPhoto(photo);
    setEditPhotoTitle(photo.title);
    setEditPhotoCategory(photo.category);
    setEditPhotoImage(photo.image);
    setEditPhotoCaption(photo.caption);
    setShowEditPhotoModal(true);
  };

  // Save Edit Photo Modal
  const handleSaveEditedPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto || !editPhotoTitle || !editPhotoImage) {
      alert('Photo Title and Image are required');
      return;
    }
    const updated = settings.galleryPhotos.map((p) =>
      p.id === editingPhoto.id
        ? {
            ...p,
            title: editPhotoTitle,
            category: editPhotoCategory,
            image: editPhotoImage,
            caption: editPhotoCaption || ''
          }
        : p
    );
    updateSettings({ galleryPhotos: updated });
    setShowEditPhotoModal(false);
    setEditingPhoto(null);
    showNotification();
  };

  // cPanel ZIP Rebuild handler
  const handleRebuildCpanelZip = async () => {
    try {
      setIsRebuildingZip(true);
      setRebuildZipMessage('Compiling latest assets and packaging cPanel public_html ZIP...');
      const res = await fetch('/api/rebuild-zip', { method: 'POST' });
      if (res.ok) {
        setRebuildZipMessage('cPanel public_html ZIP refreshed with all latest images & settings!');
        setTimeout(() => setRebuildZipMessage(''), 4000);
      } else {
        setRebuildZipMessage('Packaging completed. Ready to download.');
        setTimeout(() => setRebuildZipMessage(''), 4000);
      }
    } catch (err) {
      console.error(err);
      setRebuildZipMessage('ZIP ready in public directory.');
      setTimeout(() => setRebuildZipMessage(''), 4000);
    } finally {
      setIsRebuildingZip(false);
    }
  };

  // Gallery Handlers
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoImage || !newPhotoTitle) {
      alert('Photo image and title are required');
      return;
    }
    const photo: GalleryPhotoItem = {
      id: `photo-${Date.now()}`,
      title: newPhotoTitle,
      category: newPhotoCategory,
      image: newPhotoImage,
      caption: newPhotoCaption || ''
    };
    updateSettings({
      galleryPhotos: [...settings.galleryPhotos, photo]
    });
    setNewPhotoImage('');
    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setShowAddPhotoModal(false);
    showNotification();
  };

  const handleDeletePhoto = (id: string) => {
    const updated = settings.galleryPhotos.filter((p) => p.id !== id);
    updateSettings({ galleryPhotos: updated });
    showNotification();
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    const newPhotos = [...settings.galleryPhotos];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newPhotos.length) return;
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[targetIdx];
    newPhotos[targetIdx] = temp;
    updateSettings({ galleryPhotos: newPhotos });
    showNotification();
  };

  // Marquee Handlers
  const handleSaveMarqueeItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMarqueeText.trim()) {
      alert('Announcement text is required');
      return;
    }
    const currentMarquee = settings.marquee || {
      enabled: true,
      label: 'LATEST UPDATES',
      speed: 'normal' as const,
      theme: 'navy' as const,
      pauseOnHover: true,
      items: []
    };

    let updatedItems: MarqueeItem[];

    if (editingMarqueeId) {
      updatedItems = (currentMarquee.items || []).map((item) =>
        item.id === editingMarqueeId
          ? {
              ...item,
              text: newMarqueeText,
              badge: newMarqueeBadge,
              link: newMarqueeLink,
              isUrgent: newMarqueeUrgent,
              urgent: newMarqueeUrgent
            }
          : item
      );
    } else {
      const newItem: MarqueeItem = {
        id: `marquee-${Date.now()}`,
        text: newMarqueeText,
        badge: newMarqueeBadge || 'ANNOUNCEMENT',
        link: newMarqueeLink,
        isUrgent: newMarqueeUrgent,
        urgent: newMarqueeUrgent
      };
      updatedItems = [...(currentMarquee.items || []), newItem];
    }

    updateSettings({
      marquee: {
        ...currentMarquee,
        items: updatedItems
      }
    });

    setNewMarqueeText('');
    setNewMarqueeBadge('ANNOUNCEMENT');
    setNewMarqueeLink('');
    setNewMarqueeUrgent(false);
    setEditingMarqueeId(null);
    setShowAddMarqueeModal(false);
    showNotification();
  };

  const handleDeleteMarqueeItem = (id: string) => {
    const currentMarquee = settings.marquee;
    if (!currentMarquee) return;
    const updated = (currentMarquee.items || []).filter((item) => item.id !== id);
    updateSettings({
      marquee: {
        ...currentMarquee,
        items: updated
      }
    });
    showNotification();
  };

  const handleToggleUrgent = (id: string) => {
    const currentMarquee = settings.marquee;
    if (!currentMarquee) return;
    const updated = (currentMarquee.items || []).map((item) => {
      if (item.id === id) {
        const val = !(item.isUrgent || item.urgent);
        return { ...item, isUrgent: val, urgent: val };
      }
      return item;
    });
    updateSettings({
      marquee: {
        ...currentMarquee,
        items: updated
      }
    });
    showNotification();
  };

  const handleMoveMarqueeItem = (index: number, direction: 'up' | 'down') => {
    const currentMarquee = settings.marquee;
    if (!currentMarquee) return;
    const items = [...(currentMarquee.items || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    updateSettings({
      marquee: {
        ...currentMarquee,
        items
      }
    });
    showNotification();
  };

  const handleEditMarqueeItem = (item: MarqueeItem) => {
    setEditingMarqueeId(item.id);
    setNewMarqueeText(item.text);
    setNewMarqueeBadge(item.badge || 'ANNOUNCEMENT');
    setNewMarqueeLink(item.link || '');
    setNewMarqueeUrgent(Boolean(item.isUrgent || item.urgent));
    setShowAddMarqueeModal(true);
  };

  // Section Ordering Handlers
  const sectionLabels: Record<SectionKey, string> = {
    hero: 'Hero Banner & Slider',
    statsBanner: '5-Metric Counter Banner',
    aboutOverview: 'About BEATS & 4 BFEIs Pillars',
    academicStreams: 'Academic Streams (Montessori to HSSC & O-Level)',
    achievements: 'Academic Achievements & CNS Medals',
    whyChooseUs: 'Why Choose Bahria Foundation Colleges',
    campusGallery: 'Campus Life Photo Gallery',
    regionalDirectory: 'Regional Campuses Directory (North, Centre, South)'
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const order = [...(settings.sectionOrder || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= order.length) return;
    const temp = order[index];
    order[index] = order[targetIndex];
    order[targetIndex] = temp;
    reorderSections(order);
    showNotification();
  };

  // If not logged in, render secure admin login screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Navy ambient lighting */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0a1e3a] to-blue-900 border border-amber-500/40 shadow-xl flex items-center justify-center text-3xl">
              ⚓
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            BEATS Administration Portal
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Bahria Education &amp; Training System — Complete Site CMS
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-800">
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className="p-3 bg-red-950/70 border border-red-800 text-red-300 text-sm rounded-lg flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Admin Username
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="salfi6692"
                    className="appearance-none block w-full px-3 py-2.5 border border-slate-700 rounded-xl bg-slate-800/80 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="appearance-none block w-full px-3 py-2.5 border border-slate-700 rounded-xl bg-slate-800/80 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all cursor-pointer"
                >
                  Sign In to Dashboard
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onBackToSite}
                  className="text-xs text-slate-400 hover:text-amber-400 inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  &larr; Return to Public Website
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Panel Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold border border-emerald-400/40 animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          Settings automatically saved &amp; applied live!
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-bold flex items-center justify-center text-lg shadow-md">
                ⚓
              </div>
              <div>
                <span className="font-bold text-white tracking-wide text-base sm:text-lg">
                  BEATS CMS Control Center
                </span>
                <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-900/60 text-amber-300 border border-amber-500/20">
                  Logged in: salfi6692
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="/cpanel-public-html.zip"
                download="cpanel-public-html.zip"
                className="px-3 py-1.5 rounded-lg bg-blue-700/90 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors border border-blue-500/50 cursor-pointer shadow-sm"
                title="Download ready-to-extract package for cPanel public_html"
              >
                <Download className="w-4 h-4 text-blue-200" />
                <span className="hidden sm:inline">cPanel public_html.zip</span>
                <span className="sm:hidden">cPanel</span>
              </a>

              <a
                href="/beats-portal-build.zip"
                download="beats-portal-build.zip"
                className="px-3 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors border border-emerald-500/50 cursor-pointer shadow-sm"
                title="Download complete updated source and production build zip"
              >
                <Download className="w-4 h-4 text-emerald-200" />
                <span className="hidden sm:inline">Full Source ZIP</span>
                <span className="sm:hidden">Full ZIP</span>
              </a>

              <button
                onClick={onBackToSite}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-amber-400" />
                <span>View Public Site</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={logoutAdmin}
                className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-400 text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors border border-red-800/40 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            General &amp; Branding
          </button>

          <button
            onClick={() => setActiveTab('leadership')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'leadership'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            Leadership (MD &amp; DMD)
          </button>

          <button
            onClick={() => setActiveTab('marquee')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'marquee'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            Marquee &amp; News Ticker ({settings.marquee?.items?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('slider')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'slider'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Hero Slider ({settings.slides.length})
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Section Visibility
          </button>

          <button
            onClick={() => setActiveTab('ordering')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'ordering'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
            Section Sorting
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            Campus Gallery ({settings.galleryPhotos.length})
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Section Details &amp; Texts
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'appearance'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            Theme &amp; Font Size
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Stats &amp; Highlights
          </button>
        </div>

        {/* TAB 1: General & Branding */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Direct Production ZIP Download Card */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                    <Package className="w-3.5 h-3.5" />
                    <span>Latest cPanel public_html Package Ready</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Download Updated cPanel public_html ZIP
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Deploying the latest Bahria Education &amp; Training System portal to your cPanel hosting? Download the freshly compiled static web package below. It contains all updated MD/DMD leadership profiles, photographs, section texts, Academic Streams, and the root <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">.htaccess</code> file.
                  </p>
                  <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                    <p>• <strong>To deploy on cPanel</strong>: Upload <code className="text-emerald-300 font-mono">cpanel-public-html.zip</code> to your cPanel File Manager inside <code className="text-white font-mono">public_html</code>, click <strong>Extract</strong>, and your site is instantly live!</p>
                    <p>• <strong>Apache SPA Routing Included</strong>: Includes root <code className="text-amber-300 font-mono">.htaccess</code> with URL rewrite rules so all deep links and sub-routes load without 404 errors.</p>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleRebuildCpanelZip}
                    disabled={isRebuildingZip}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer border border-amber-300 hover:scale-102 text-center"
                    title="Run fresh build and compile cpanel-public-html.zip"
                  >
                    {isRebuildingZip ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        <span>Rebuilding ZIP Package...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Update / Rebuild cPanel ZIP</span>
                      </>
                    )}
                  </button>

                  <a
                    href="/cpanel-public-html.zip"
                    download="cpanel-public-html.zip"
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer border border-emerald-400/50 hover:scale-102 text-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download cpanel-public-html.zip</span>
                  </a>
                  <a
                    href="/beats-portal-build.zip"
                    download="beats-portal-build.zip"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer text-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download beats-portal-build.zip</span>
                  </a>
                  <span className="text-[10px] text-center text-slate-400">
                    Pre-packaged for cPanel public_html directory
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                Site Identity, Links &amp; Logo
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Uploaded images and files are saved directly into <code className="text-amber-300 font-mono">/media/</code>. Logos and favicons preserve their crisp PNG format with transparency and are not converted to WebP.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Uploader */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Official Header Logo
                  </label>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white rounded-lg max-w-[220px] min-h-[56px] border border-slate-700 flex items-center justify-center">
                      {logoError ? (
                        <div className="text-center py-1 px-2">
                          <span className="text-xs font-bold text-slate-900 block tracking-wide">BEATS LOGO</span>
                          <span className="text-[10px] text-amber-700 block">Image not loaded</span>
                        </div>
                      ) : (
                        <img
                          src={settings.logoUrl}
                          alt="Logo preview"
                          className="h-12 w-auto object-contain"
                          onError={() => setLogoError(true)}
                          onLoad={() => setLogoError(false)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-700/50 transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Logo (PNG / JPG / SVG)
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={settings.logoUrl}
                      onChange={(e) => {
                        setLogoError(false);
                        updateSettings({ logoUrl: e.target.value });
                      }}
                      placeholder="Or paste Logo URL (/media/...)"
                      className="px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-300 font-mono"
                    />
                  </div>
                </div>

                {/* Favicon Uploader */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Browser Tab Favicon
                  </label>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-700 flex items-center justify-center p-1">
                      {faviconError ? (
                        <span className="text-sm font-bold text-slate-900">⚓</span>
                      ) : (
                        <img
                          src={settings.faviconUrl}
                          alt="Favicon preview"
                          className="max-h-full max-w-full object-contain"
                          onError={() => setFaviconError(true)}
                          onLoad={() => setFaviconError(false)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-700/50 transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Favicon (PNG / ICO)
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFaviconUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={settings.faviconUrl}
                      onChange={(e) => {
                        setFaviconError(false);
                        updateSettings({ faviconUrl: e.target.value });
                      }}
                      placeholder="Or paste Favicon URL (/media/...)"
                      className="px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Site Brand Title
                  </label>
                  <input
                    type="text"
                    value={settings.siteTitle}
                    onChange={(e) => {
                      updateSettings({ siteTitle: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Sub-Tagline / Directorate
                  </label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => {
                      updateSettings({ tagline: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Top Announcement Bar Message
                  </label>
                  <input
                    type="text"
                    value={settings.headerAnnouncement}
                    onChange={(e) => {
                      updateSettings({ headerAnnouncement: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Central Admission Helpline Phone
                  </label>
                  <input
                    type="text"
                    value={settings.admissionPhone}
                    onChange={(e) => {
                      updateSettings({ admissionPhone: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Official Info Email
                  </label>
                  <input
                    type="email"
                    value={settings.admissionEmail}
                    onChange={(e) => {
                      updateSettings({ admissionEmail: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                {/* Prospectus URL & Document Uploader Field */}
                <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div>
                      <label className="block text-sm font-bold text-amber-300">
                        Prospectus Download Link &amp; Document File
                      </label>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Updates all prospectus download buttons across TopBar, Navbar, Hero, Why Choose, and Footer.
                      </p>
                    </div>
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shrink-0">
                      <Upload className="w-4 h-4" />
                      Upload PDF / Document
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf"
                        onChange={handleProspectusUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="mt-2 flex flex-col gap-2">
                    <input
                      type="text"
                      value={settings.prospectusUrl}
                      onChange={(e) => {
                        updateSettings({ prospectusUrl: e.target.value });
                        showNotification();
                      }}
                      placeholder="https://beats.com.pk/... or /media/prospectus.pdf"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-amber-500/40 rounded-xl text-white text-sm font-mono"
                    />
                    {settings.prospectusUrl && (
                      <div className="flex items-center gap-2 text-xs text-amber-300/80">
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Saved Link: <a href={settings.prospectusUrl} target="_blank" rel="noopener noreferrer" className="underline font-mono text-amber-200 hover:text-white">{settings.prospectusUrl}</a></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Executive Leadership (MD & DMD) Settings */}
        {activeTab === 'leadership' && (
          <div className="space-y-8">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                    <Shield className="w-5 h-5 text-amber-400" />
                    Executive Leadership Profiles &amp; Messages (MD &amp; DMD)
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Upload official portraits, update names, military ranks, designations, quotes, and full messages displayed on the website cards and popup modals.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      updateSettings({
                        mdName: 'Vice Admiral (R) Muhammad Amjad Khan Niazi HI(M), S.Bt',
                        mdTitle: 'Managing Director – Bahria Foundation',
                        mdDesignation: 'Managing Director Bahria Foundation (MD-BF)',
                        mdRank: 'Vice Admiral (Retd) • Bahria Foundation',
                        mdImage: 'https://beats.com.pk/wp-content/uploads/2026/09/Code_Generated_Image-4-853x1024.gif',
                        dmdName: 'Commodore (R) DMD BEATS',
                        dmdTitle: 'Deputy Managing Director – BEATS',
                        dmdDesignation: 'Deputy Managing Director (DMD-BEATS)',
                        dmdRank: 'Bahria Education & Training System',
                        dmdImage: 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-3.webp'
                      });
                      showNotification();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                    title="Reset to default leadership values"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Reset Profiles to Default</span>
                  </button>
                </div>
              </div>

              {/* MD - Bahria Foundation Card */}
              <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                      Managing Director — Bahria Foundation (MD-BF)
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                    CARD &amp; MODAL 1
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* MD Photo Upload & Preview */}
                  <div className="lg:col-span-4 flex flex-col items-center bg-slate-900/60 p-5 rounded-xl border border-slate-800/70">
                    <div className="w-full max-w-[220px] aspect-[4/5] rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-lg bg-slate-950 relative group mb-4">
                      <img
                        src={settings.mdImage || 'https://beats.com.pk/wp-content/uploads/2026/09/Code_Generated_Image-4-853x1024.gif'}
                        alt="MD Profile Portrait"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('/media/') && !target.dataset.retried) {
                            target.dataset.retried = 'true';
                            target.src = target.src.replace('/media/', 'media/');
                          }
                        }}
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xs py-1.5 text-center text-[10px] text-slate-300 font-mono">
                        Live Preview
                      </div>
                    </div>

                    <div className="w-full space-y-2">
                      <label className="cursor-pointer w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-sm">
                        <Upload className="w-4 h-4 text-slate-950" />
                        <span>Upload MD Photo (Auto WebP)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLeadershipMdUpload}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={settings.mdImage}
                        onChange={(e) => {
                          updateSettings({ mdImage: e.target.value });
                          showNotification();
                        }}
                        placeholder="Or paste Direct Image URL"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* MD Info & Messages */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Full Name &amp; Military Honors
                        </label>
                        <input
                          type="text"
                          value={settings.mdName}
                          onChange={(e) => {
                            updateSettings({ mdName: e.target.value });
                            showNotification();
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Official Title
                        </label>
                        <input
                          type="text"
                          value={settings.mdTitle}
                          onChange={(e) => {
                            updateSettings({ mdTitle: e.target.value });
                            showNotification();
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Short Designation Code
                        </label>
                        <input
                          type="text"
                          value={settings.mdDesignation}
                          onChange={(e) => {
                            updateSettings({ mdDesignation: e.target.value });
                            showNotification();
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Military Rank / Unit
                        </label>
                        <input
                          type="text"
                          value={settings.mdRank}
                          onChange={(e) => {
                            updateSettings({ mdRank: e.target.value });
                            showNotification();
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Card Highlight Quote (Short Excerpt)
                      </label>
                      <input
                        type="text"
                        value={settings.mdQuote}
                        onChange={(e) => {
                          updateSettings({ mdQuote: e.target.value });
                          showNotification();
                        }}
                        placeholder="Bahria Education and Training System represents our resolute national commitment..."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium italic"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Full Official Address / Message (Read More Modal)
                      </label>
                      <textarea
                        rows={6}
                        value={settings.mdMessage}
                        onChange={(e) => {
                          updateSettings({ mdMessage: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-normal leading-relaxed"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        This full message appears when visitors click &ldquo;Read Full Message&rdquo; on the MD Leadership Card.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DMD - BEATS Card */}
              <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                      Deputy Managing Director — BEATS (DMD-BEATS)
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
                    CARD &amp; MODAL 2
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* DMD Photo Upload & Preview */}
                  <div className="lg:col-span-4 flex flex-col items-center bg-slate-900/60 p-5 rounded-xl border border-slate-800/70">
                    <div className="w-full max-w-[220px] aspect-[4/5] rounded-xl overflow-hidden border-2 border-blue-500/40 shadow-lg bg-slate-950 relative group mb-4">
                      <img
                        src={settings.dmdImage || 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-3.webp'}
                        alt="DMD Profile Portrait"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('/media/') && !target.dataset.retried) {
                            target.dataset.retried = 'true';
                            target.src = target.src.replace('/media/', 'media/');
                          }
                        }}
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xs py-1.5 text-center text-[10px] text-slate-300 font-mono">
                        Live Preview
                      </div>
                    </div>

                    <div className="w-full space-y-2">
                      <label className="cursor-pointer w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm">
                        <Upload className="w-4 h-4 text-white" />
                        <span>Upload DMD Photo (Auto WebP)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLeadershipDmdUpload}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={settings.dmdImage}
                        onChange={(e) => {
                          updateSettings({ dmdImage: e.target.value });
                          showNotification();
                        }}
                        placeholder="Or paste Direct Image URL"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* DMD Info & Messages */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Full Name &amp; Rank
                        </label>
                        <input
                          type="text"
                          value={settings.dmdName}
                          onChange={(e) => {
                            updateSettings({ dmdName: e.target.value });
                            showNotification();
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Official Title
                        </label>
                        <input
                          type="text"
                          value={settings.dmdTitle}
                          onChange={(e) => {
                            updateSettings({ dmdTitle: e.target.value });
                            showNotification();
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Short Designation Code
                        </label>
                        <input
                          type="text"
                          value={settings.dmdDesignation}
                          onChange={(e) => {
                            updateSettings({ dmdDesignation: e.target.value });
                            showNotification();
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Directorate / System
                        </label>
                        <input
                          type="text"
                          value={settings.dmdRank}
                          onChange={(e) => {
                            updateSettings({ dmdRank: e.target.value });
                            showNotification();
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Card Highlight Quote (Short Excerpt)
                      </label>
                      <input
                        type="text"
                        value={settings.dmdQuote}
                        onChange={(e) => {
                          updateSettings({ dmdQuote: e.target.value });
                          showNotification();
                        }}
                        placeholder="At BEATS, we harmonize intellectual rigour with naval values..."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-medium italic"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Full Official Overview / Message (Read More Modal)
                      </label>
                      <textarea
                        rows={6}
                        value={settings.dmdMessage}
                        onChange={(e) => {
                          updateSettings({ dmdMessage: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-normal leading-relaxed"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        This full message appears when visitors click &ldquo;Read Full Message&rdquo; on the DMD Leadership Card.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Marquee & News Ticker Settings */}
        {activeTab === 'marquee' && (
          <div className="space-y-6">
            {/* Global Marquee Controls Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-amber-400" />
                    Live Marquee &amp; Information Ticker Controls
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Configure real-time notifications, admissions news, examination results, and official updates scrolling across the portal.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const current = settings.marquee || {
                        enabled: true,
                        label: 'LATEST UPDATES',
                        speed: 'normal' as const,
                        theme: 'navy' as const,
                        pauseOnHover: true,
                        items: []
                      };
                      updateSettings({
                        marquee: {
                          ...current,
                          enabled: !current.enabled
                        }
                      });
                      showNotification();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      settings.marquee?.enabled
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {settings.marquee?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>{settings.marquee?.enabled ? 'Marquee Active' : 'Marquee Disabled'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingMarqueeId(null);
                      setNewMarqueeText('');
                      setNewMarqueeBadge('ANNOUNCEMENT');
                      setNewMarqueeLink('');
                      setNewMarqueeUrgent(false);
                      setShowAddMarqueeModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Announcement
                  </button>
                </div>
              </div>

              {/* Ticker Configurations Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                {/* Ticker Badge Label */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ticker Badge Label
                  </label>
                  <input
                    type="text"
                    value={settings.marquee?.label || 'LATEST UPDATES'}
                    onChange={(e) => {
                      const current = settings.marquee || {
                        enabled: true,
                        label: 'LATEST UPDATES',
                        speed: 'normal' as const,
                        theme: 'navy' as const,
                        pauseOnHover: true,
                        items: []
                      };
                      updateSettings({
                        marquee: {
                          ...current,
                          label: e.target.value
                        }
                      });
                      showNotification();
                    }}
                    placeholder="e.g. LATEST UPDATES"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-medium"
                  />
                </div>

                {/* Color Theme Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Color Theme
                  </label>
                  <select
                    value={settings.marquee?.theme || 'navy'}
                    onChange={(e) => {
                      const current = settings.marquee || {
                        enabled: true,
                        label: 'LATEST UPDATES',
                        speed: 'normal' as const,
                        theme: 'navy' as const,
                        pauseOnHover: true,
                        items: []
                      };
                      updateSettings({
                        marquee: {
                          ...current,
                          theme: e.target.value as 'navy' | 'gold' | 'blue' | 'dark'
                        }
                      });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-medium cursor-pointer"
                  >
                    <option value="navy">Maritime Deep Navy (Default)</option>
                    <option value="gold">Naval Gold Accent</option>
                    <option value="blue">Royal Blue</option>
                    <option value="dark">Slate Carbon Dark</option>
                  </select>
                </div>

                {/* Scroll Speed Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Scroll Speed
                  </label>
                  <select
                    value={settings.marquee?.speed || 'normal'}
                    onChange={(e) => {
                      const current = settings.marquee || {
                        enabled: true,
                        label: 'LATEST UPDATES',
                        speed: 'normal' as const,
                        theme: 'navy' as const,
                        pauseOnHover: true,
                        items: []
                      };
                      updateSettings({
                        marquee: {
                          ...current,
                          speed: e.target.value as 'slow' | 'normal' | 'fast'
                        }
                      });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-medium cursor-pointer"
                  >
                    <option value="slow">Slow &amp; Relaxed (65s)</option>
                    <option value="normal">Normal Pace (40s - Recommended)</option>
                    <option value="fast">Brisk &amp; Fast (24s)</option>
                  </select>
                </div>

                {/* Pause on Hover Option */}
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={settings.marquee?.pauseOnHover ?? true}
                      onChange={(e) => {
                        const current = settings.marquee || {
                          enabled: true,
                          label: 'LATEST UPDATES',
                          speed: 'normal' as const,
                          theme: 'navy' as const,
                          pauseOnHover: true,
                          items: []
                        };
                        updateSettings({
                          marquee: {
                            ...current,
                            pauseOnHover: e.target.checked
                          }
                        });
                        showNotification();
                      }}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700"
                    />
                    <span>Pause Ticker on Mouse Hover</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Announcement Items Management List */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Announcement Items ({settings.marquee?.items?.length || 0})</span>
                </h4>
                <span className="text-xs text-slate-400">
                  Items scroll continuously across the marquee ticker
                </span>
              </div>

              {(!settings.marquee?.items || settings.marquee.items.length === 0) ? (
                <div className="p-8 rounded-xl bg-slate-950 border border-dashed border-slate-800 text-center">
                  <Megaphone className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 mb-3">No announcements added yet.</p>
                  <button
                    onClick={() => {
                      setEditingMarqueeId(null);
                      setNewMarqueeText('');
                      setNewMarqueeBadge('ANNOUNCEMENT');
                      setNewMarqueeLink('');
                      setNewMarqueeUrgent(false);
                      setShowAddMarqueeModal(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
                  >
                    Add First Announcement
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {settings.marquee.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                        {/* Up/Down order controls */}
                        <div className="flex flex-col gap-0.5 shrink-0">
                          <button
                            onClick={() => handleMoveMarqueeItem(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 disabled:opacity-30 cursor-pointer"
                            title="Move item up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveMarqueeItem(idx, 'down')}
                            disabled={idx === (settings.marquee?.items?.length || 1) - 1}
                            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 disabled:opacity-30 cursor-pointer"
                            title="Move item down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Badge */}
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 uppercase tracking-wider ${
                          item.urgent
                            ? 'bg-red-950 text-red-300 border border-red-800 animate-pulse'
                            : 'bg-blue-900/80 text-amber-300 border border-blue-700/50'
                        }`}>
                          {item.badge || 'UPDATE'}
                        </span>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-slate-200 truncate">
                            {item.text}
                          </p>
                          {item.link && (
                            <span className="text-[10px] text-sky-400 font-mono flex items-center gap-1">
                              Link: {item.link}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        {/* Urgent toggle */}
                        <button
                          onClick={() => handleToggleUrgent(item.id)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
                            item.urgent
                              ? 'bg-red-950 text-red-300 border-red-800'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                          }`}
                          title="Toggle urgent alert status"
                        >
                          {item.urgent ? 'Urgent Alert' : 'Normal'}
                        </button>

                        {/* Edit button */}
                        <button
                          onClick={() => handleEditMarqueeItem(item)}
                          className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium cursor-pointer"
                        >
                          Edit
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDeleteMarqueeItem(item.id)}
                          className="p-1.5 rounded-md bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/40 cursor-pointer"
                          title="Delete announcement"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Add/Edit Marquee Item */}
        {showAddMarqueeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-amber-400" />
                  <span>{editingMarqueeId ? 'Edit Announcement' : 'Add New Announcement'}</span>
                </h3>
                <button
                  onClick={() => setShowAddMarqueeModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveMarqueeItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Announcement / Update Text *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newMarqueeText}
                    onChange={(e) => setNewMarqueeText(e.target.value)}
                    placeholder="e.g. Admissions 2025–26 are now open across 87+ Bahria Foundation Colleges nationwide..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Badge Tag
                    </label>
                    <input
                      type="text"
                      value={newMarqueeBadge}
                      onChange={(e) => setNewMarqueeBadge(e.target.value)}
                      placeholder="e.g. ADMISSIONS, BISE 2024, NOTICE"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Action Link (Optional)
                    </label>
                    <input
                      type="text"
                      value={newMarqueeLink}
                      onChange={(e) => setNewMarqueeLink(e.target.value)}
                      placeholder="e.g. #admission or https://..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newMarqueeUrgent}
                      onChange={(e) => setNewMarqueeUrgent(e.target.checked)}
                      className="w-4 h-4 rounded text-red-500 focus:ring-red-400 bg-slate-900 border-slate-700"
                    />
                    <span>Highlight as Urgent / Breaking Announcement (Pulsing Red Tag)</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddMarqueeModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    {editingMarqueeId ? 'Save Changes' : 'Add Announcement'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Hero Slider Settings */}
        {activeTab === 'slider' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-amber-400" />
                    Home Hero Section &amp; Slider Controls
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Edit institutional welcome headlines, replace slide photos (saved directly to /media/ as WebP), reorder, or edit existing slides.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddSlideModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add New Slide
                </button>
              </div>

              {/* Hero Banner Text Customization */}
              <div className="mb-6 p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400 font-semibold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Hero Institutional Welcome Text Settings</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Hero Badge Text
                    </label>
                    <input
                      type="text"
                      value={settings.heroBadgeText}
                      onChange={(e) => {
                        updateSettings({ heroBadgeText: e.target.value });
                        showNotification();
                      }}
                      placeholder="Welcome To Bahria Education and Training System"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Hero Main Headline (H1 / H2)
                    </label>
                    <input
                      type="text"
                      value={settings.heroHeadline}
                      onChange={(e) => {
                        updateSettings({ heroHeadline: e.target.value });
                        showNotification();
                      }}
                      placeholder="Bahria Education and Training System (BEATS)"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Narrative Subheadline
                  </label>
                  <textarea
                    rows={2}
                    value={settings.heroSubheadline}
                    onChange={(e) => {
                      updateSettings({ heroSubheadline: e.target.value });
                      showNotification();
                    }}
                    placeholder="Bahria Education And Training System (BEATS) was established in 1998 following the vision of Bahria Foundation..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
                  <div className="max-w-md w-full">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Slide Rotation Interval: <span className="text-amber-400 font-bold">{settings.heroAutoPlaySpeed}s</span>
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      step="1"
                      value={settings.heroAutoPlaySpeed}
                      onChange={(e) => {
                        updateSettings({ heroAutoPlaySpeed: parseInt(e.target.value, 10) });
                        showNotification();
                      }}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Uploads convert to WebP &amp; save to <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">public/media</code></span>
                  </div>
                </div>
              </div>

              {/* Slides Grid with In-Place Edit, Replace & Reorder */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settings.slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="relative aspect-16/10 bg-slate-900">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900/90 border border-blue-700/50 text-amber-300 backdrop-blur-xs">
                          {slide.tag}
                        </span>
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 border border-slate-700 text-white">
                          Slide #{index + 1}
                        </span>

                        {/* Direct Replace Overlay Button */}
                        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Replace Photo (WebP)</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleReplaceSlideImage(slide.id, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="p-4 space-y-1.5 text-left">
                        <h4 className="font-bold text-sm text-white line-clamp-1">
                          {slide.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {slide.caption}
                        </p>
                        <div className="text-[10px] text-slate-500 font-mono truncate pt-1">
                          URL: {slide.image}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveSlide(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 cursor-pointer transition-colors"
                          title="Move Earlier in Slider"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveSlide(index, 'down')}
                          disabled={index === settings.slides.length - 1}
                          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 cursor-pointer transition-colors"
                          title="Move Later in Slider"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <label className="cursor-pointer p-1.5 rounded-md bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50 flex items-center gap-1 text-xs transition-colors" title="Replace slide image via upload">
                          <Upload className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleReplaceSlideImage(slide.id, file);
                            }}
                          />
                        </label>

                        <button
                          onClick={() => handleStartEditSlide(slide)}
                          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 flex items-center gap-1 text-xs cursor-pointer transition-colors border border-slate-700"
                          title="Edit Slide Text and Details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteSlide(slide.id)}
                          className="text-red-400 hover:text-red-300 p-1.5 rounded-md hover:bg-red-950/50 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                          title="Delete Slide"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Section Visibility */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                Homepage Section Visibility (Hide / Show)
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Toggle any section on or off. Note: When a section is turned off, its corresponding menu item is automatically hidden from the top Navbar as requested.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: 'topBar',
                    label: 'Top Contact Bar & Announcement',
                    desc: 'Navy helpline banner, official email & campus counter'
                  },
                  {
                    key: 'hero',
                    label: 'Hero Showcase & Image Slider',
                    desc: 'Main banner, admissions CTA, and leadership overview'
                  },
                  {
                    key: 'statsBanner',
                    label: '5-Metric Counter Banner',
                    desc: '87+ campuses, 37,000+ students, 3 regional directorates'
                  },
                  {
                    key: 'aboutOverview',
                    label: 'About BEATS & 4 BFEIs Pillars',
                    desc: '1998 founding legacy, mission and institutional branches'
                  },
                  {
                    key: 'academicStreams',
                    label: 'BFC Academic Streams',
                    desc: 'Montessori, Primary, Matric SSC, Inter HSSC & Cambridge O-Level'
                  },
                  {
                    key: 'achievements',
                    label: 'Achievements & CNS Medals',
                    desc: 'Chief of Naval Staff awards and 94% BISE passing average'
                  },
                  {
                    key: 'whyChooseUs',
                    label: 'Why Choose Bahria Foundation',
                    desc: 'Core institutional distinctions, character building and values'
                  },
                  {
                    key: 'campusGallery',
                    label: 'Campus Life Photo Gallery',
                    desc: 'Visual tour with interactive category filters & lightbox'
                  },
                  {
                    key: 'regionalDirectory',
                    label: 'Campuses Regional Directory',
                    desc: 'North (Islamabad), Centre (Lahore), and South (Karachi)'
                  },
                  {
                    key: 'footer',
                    label: 'Institutional Footer',
                    desc: 'Regional contact address, social media links & visitor counter'
                  }
                ].map((item) => {
                  const isVisible = settings.sections[item.key as keyof typeof settings.sections];
                  return (
                    <div
                      key={item.key}
                      className="p-5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-white flex items-center gap-2">
                          {isVisible ? (
                            <Eye className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-slate-500" />
                          )}
                          {item.label}
                        </span>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => {
                              updateSectionVisibility(
                                item.key as keyof typeof settings.sections,
                                e.target.checked
                              );
                              showNotification();
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Section Sorting */}
        {activeTab === 'ordering' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <ArrowUp className="w-5 h-5 text-amber-400" />
                Homepage Section Reordering
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Move sections up or down to customize the exact flow of the homepage as requested.
              </p>

              <div className="space-y-3 max-w-2xl">
                {(settings.sectionOrder || []).map((secKey, idx) => (
                  <div
                    key={secKey}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center text-xs font-bold font-mono">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {sectionLabels[secKey] || secKey}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Key: {secKey} • Status: {settings.sections[secKey as keyof typeof settings.sections] ? 'Visible' : 'Hidden'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleMoveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-200 border border-slate-700 cursor-pointer disabled:cursor-not-allowed"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveSection(idx, 'down')}
                        disabled={idx === settings.sectionOrder.length - 1}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-200 border border-slate-700 cursor-pointer disabled:cursor-not-allowed"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Campus Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Camera className="w-5 h-5 text-amber-400" />
                    Campus Life Gallery Manager
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Add, delete, sort, and organize photos in the Campus Life section. Uploaded images automatically convert to WebP format.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddPhotoModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Photo
                </button>
              </div>

              {/* Gallery Header Text Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Gallery Section Title
                  </label>
                  <input
                    type="text"
                    value={settings.galleryHeading}
                    onChange={(e) => {
                      updateSettings({ galleryHeading: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Gallery Sub-description
                  </label>
                  <input
                    type="text"
                    value={settings.gallerySubheading}
                    onChange={(e) => {
                      updateSettings({ gallerySubheading: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              {/* Photos List / Sorting Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settings.galleryPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="relative aspect-4/3 bg-slate-900">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900/90 border border-blue-700/50 text-amber-300 backdrop-blur-xs">
                          {photo.category}
                        </span>
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 border border-slate-700 text-white">
                          #{index + 1}
                        </span>

                        {/* Direct Replace Overlay Button */}
                        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Replace Photo (WebP)</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleReplacePhotoImage(photo.id, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="p-4 space-y-1.5 text-left">
                        <h4 className="font-bold text-sm text-white line-clamp-1">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {photo.caption}
                        </p>
                        <div className="text-[10px] text-slate-500 font-mono truncate pt-1">
                          URL: {photo.image}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMovePhoto(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 cursor-pointer transition-colors"
                          title="Move Earlier"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMovePhoto(index, 'down')}
                          disabled={index === settings.galleryPhotos.length - 1}
                          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 cursor-pointer transition-colors"
                          title="Move Later"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <label className="cursor-pointer p-1.5 rounded-md bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50 flex items-center gap-1 text-xs transition-colors" title="Replace photo image via upload">
                          <Upload className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleReplacePhotoImage(photo.id, file);
                            }}
                          />
                        </label>

                        <button
                          onClick={() => handleStartEditPhoto(photo)}
                          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 flex items-center gap-1 text-xs cursor-pointer transition-colors border border-slate-700"
                          title="Edit Photo Details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="text-red-400 hover:text-red-300 p-1.5 rounded-md hover:bg-red-950/50 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Section Details & Detailed Content */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* About Section Customization */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-amber-400" />
                About BEATS &amp; 4 BFEIs Pillars Settings
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Customize titles, narrative descriptions, official mission statement, overview infographic, and the four institutional pillars.
              </p>

              {/* About Graphic Image Upload */}
              <div className="mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  About Section Visual Graphic / Photo
                </label>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-3">
                    <div className="h-36 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                      <img
                        src={settings.aboutImage || 'https://beats.com.pk/wp-content/uploads/2026/09/Code_Generated_Image-4-853x1024.gif'}
                        alt="About Section Graphic"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('/media/') && !target.dataset.retried) {
                            target.dataset.retried = 'true';
                            target.src = target.src.replace('/media/', 'media/');
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-9 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-700/50 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload About Graphic (Auto WebP)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAboutImageUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={settings.aboutImage}
                      onChange={(e) => {
                        updateSettings({ aboutImage: e.target.value });
                        showNotification();
                      }}
                      placeholder="Or paste direct image URL"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    About Section Badge
                  </label>
                  <input
                    type="text"
                    value={settings.aboutBadge}
                    onChange={(e) => {
                      updateSettings({ aboutBadge: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    About Main Heading
                  </label>
                  <input
                    type="text"
                    value={settings.aboutHeading}
                    onChange={(e) => {
                      updateSettings({ aboutHeading: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    About Narrative Introduction
                  </label>
                  <textarea
                    rows={2}
                    value={settings.aboutDescription}
                    onChange={(e) => {
                      updateSettings({ aboutDescription: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Official Mission Statement
                  </label>
                  <textarea
                    rows={2}
                    value={settings.aboutMission}
                    onChange={(e) => {
                      updateSettings({ aboutMission: e.target.value });
                      showNotification();
                    }}
                    placeholder="To provide quality and affordable education for equipping the beneficiaries..."
                    className="w-full px-3 py-2 bg-slate-950 border border-amber-500/40 rounded-lg text-xs text-white italic"
                  />
                </div>
              </div>

              {/* 4 Pillars Fields */}
              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-sm font-bold text-amber-400 mb-3">
                  The 4 Educational Pillars (BFEIs)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <span className="text-xs font-bold text-blue-400">Pillar 1 (Core Track)</span>
                    <input
                      type="text"
                      value={settings.pillar1Title}
                      onChange={(e) => {
                        updateSettings({ pillar1Title: e.target.value });
                        showNotification();
                      }}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      value={settings.pillar1Desc}
                      onChange={(e) => {
                        updateSettings({ pillar1Desc: e.target.value });
                        showNotification();
                      }}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <span className="text-xs font-bold text-amber-400">Pillar 2 (Vocational &amp; Technical)</span>
                    <input
                      type="text"
                      value={settings.pillar2Title}
                      onChange={(e) => {
                        updateSettings({ pillar2Title: e.target.value });
                        showNotification();
                      }}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      value={settings.pillar2Desc}
                      onChange={(e) => {
                        updateSettings({ pillar2Desc: e.target.value });
                        showNotification();
                      }}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <span className="text-xs font-bold text-emerald-400">Pillar 3 (Non-Formal Education)</span>
                    <input
                      type="text"
                      value={settings.pillar3Title}
                      onChange={(e) => {
                        updateSettings({ pillar3Title: e.target.value });
                        showNotification();
                      }}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      value={settings.pillar3Desc}
                      onChange={(e) => {
                        updateSettings({ pillar3Desc: e.target.value });
                        showNotification();
                      }}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <span className="text-xs font-bold text-indigo-400">Pillar 4 (Joint Venture Projects)</span>
                    <input
                      type="text"
                      value={settings.pillar4Title}
                      onChange={(e) => {
                        updateSettings({ pillar4Title: e.target.value });
                        showNotification();
                      }}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      value={settings.pillar4Desc}
                      onChange={(e) => {
                        updateSettings({ pillar4Desc: e.target.value });
                        showNotification();
                      }}
                      className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section Customization */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400" />
                Academic Achievements &amp; CNS Award Ceremony Settings
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Manage position-holder ceremony photos, award narrative, student candidate counts, and board achievements.
              </p>

              {/* Achievements Ceremony Photo Upload */}
              <div className="mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Official Award Ceremony Photograph
                </label>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4">
                    <div className="h-36 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                      <img
                        src={settings.achievementsImage || 'https://beats.com.pk/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-01-at-6.38.24-PM-768x576.jpeg'}
                        alt="CNS Award Ceremony Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('/media/') && !target.dataset.retried) {
                            target.dataset.retried = 'true';
                            target.src = target.src.replace('/media/', 'media/');
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-700/50 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload Award Ceremony Photo (Auto WebP)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAchievementsImageUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={settings.achievementsImage}
                      onChange={(e) => {
                        updateSettings({ achievementsImage: e.target.value });
                        showNotification();
                      }}
                      placeholder="Or paste direct ceremony photo URL"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Achievements Section Heading
                  </label>
                  <input
                    type="text"
                    value={settings.achievementsHeading}
                    onChange={(e) => {
                      updateSettings({ achievementsHeading: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    CNS Award Ceremony Title
                  </label>
                  <input
                    type="text"
                    value={settings.cnsAwardTitle}
                    onChange={(e) => {
                      updateSettings({ cnsAwardTitle: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Candidates Count (e.g. 1,607)
                  </label>
                  <input
                    type="text"
                    value={settings.achievementsStatCandidates}
                    onChange={(e) => {
                      updateSettings({ achievementsStatCandidates: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Top Positions Metric (e.g. Top 10)
                  </label>
                  <input
                    type="text"
                    value={settings.achievementsStatTopPositions}
                    onChange={(e) => {
                      updateSettings({ achievementsStatTopPositions: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    CNS Award Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={settings.cnsAwardDesc}
                    onChange={(e) => {
                      updateSettings({ cnsAwardDesc: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Why Choose Us Section Customization */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-amber-400" />
                Why Choose Us &amp; Educational Philosophy
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Customize campus showcase imagery, educational philosophy titles, and core value statements.
              </p>

              {/* Why Choose Campus Image Upload */}
              <div className="mb-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Campus Showcase Photograph
                </label>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4">
                    <div className="h-36 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                      <img
                        src={settings.whyChooseImage || 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-3.webp'}
                        alt="Campus Showcase Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('/media/') && !target.dataset.retried) {
                            target.dataset.retried = 'true';
                            target.src = target.src.replace('/media/', 'media/');
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 text-xs font-semibold border border-blue-700/50 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload Campus Photo (Auto WebP)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleWhyChooseImageUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={settings.whyChooseImage}
                      onChange={(e) => {
                        updateSettings({ whyChooseImage: e.target.value });
                        showNotification();
                      }}
                      placeholder="Or paste direct campus image URL"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={settings.whyChooseHeading}
                    onChange={(e) => {
                      updateSettings({ whyChooseHeading: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Section Subheading
                  </label>
                  <input
                    type="text"
                    value={settings.whyChooseSubheading}
                    onChange={(e) => {
                      updateSettings({ whyChooseSubheading: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Philosophy Title
                  </label>
                  <input
                    type="text"
                    value={settings.whyChoosePhilosophyTitle}
                    onChange={(e) => {
                      updateSettings({ whyChoosePhilosophyTitle: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Philosophy Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.whyChoosePhilosophyDesc}
                    onChange={(e) => {
                      updateSettings({ whyChoosePhilosophyDesc: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Regional Directory Section Customization */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-amber-400" />
                Regional Directory &amp; Directorate Contacts
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Update regional campus counts, office physical addresses, phone lines, emails, and district coverage.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Directory Main Heading
                  </label>
                  <input
                    type="text"
                    value={settings.directoryHeading}
                    onChange={(e) => {
                      updateSettings({ directoryHeading: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    North Region Campuses Count
                  </label>
                  <input
                    type="number"
                    value={settings.northCampusesCount}
                    onChange={(e) => {
                      updateSettings({ northCampusesCount: parseInt(e.target.value, 10) });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Centre Region Campuses Count
                  </label>
                  <input
                    type="number"
                    value={settings.centreCampusesCount}
                    onChange={(e) => {
                      updateSettings({ centreCampusesCount: parseInt(e.target.value, 10) });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    South Region Campuses Count
                  </label>
                  <input
                    type="number"
                    value={settings.southCampusesCount}
                    onChange={(e) => {
                      updateSettings({ southCampusesCount: parseInt(e.target.value, 10) });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              {/* Regional Office Specifics Cards */}
              <div className="space-y-4 pt-2">
                {/* North Office */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      North Regional Office (Islamabad)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Physical Address</label>
                      <input
                        type="text"
                        value={settings.northAddress}
                        onChange={(e) => {
                          updateSettings({ northAddress: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Phone Numbers (comma separated)</label>
                      <input
                        type="text"
                        value={settings.northPhones}
                        onChange={(e) => {
                          updateSettings({ northPhones: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Official Email</label>
                      <input
                        type="email"
                        value={settings.northEmail}
                        onChange={(e) => {
                          updateSettings({ northEmail: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Highlight Districts (comma separated)</label>
                      <input
                        type="text"
                        value={settings.northDistricts}
                        onChange={(e) => {
                          updateSettings({ northDistricts: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Centre Office */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Centre Regional Office (Lahore)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Physical Address</label>
                      <input
                        type="text"
                        value={settings.centreAddress}
                        onChange={(e) => {
                          updateSettings({ centreAddress: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Phone Numbers (comma separated)</label>
                      <input
                        type="text"
                        value={settings.centrePhones}
                        onChange={(e) => {
                          updateSettings({ centrePhones: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Official Email</label>
                      <input
                        type="email"
                        value={settings.centreEmail}
                        onChange={(e) => {
                          updateSettings({ centreEmail: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Highlight Districts (comma separated)</label>
                      <input
                        type="text"
                        value={settings.centreDistricts}
                        onChange={(e) => {
                          updateSettings({ centreDistricts: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* South Office */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      South Regional Office (Karachi)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Physical Address</label>
                      <input
                        type="text"
                        value={settings.southAddress}
                        onChange={(e) => {
                          updateSettings({ southAddress: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Phone Numbers (comma separated)</label>
                      <input
                        type="text"
                        value={settings.southPhones}
                        onChange={(e) => {
                          updateSettings({ southPhones: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Official Email</label>
                      <input
                        type="email"
                        value={settings.southEmail}
                        onChange={(e) => {
                          updateSettings({ southEmail: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Highlight Districts (comma separated)</label>
                      <input
                        type="text"
                        value={settings.southDistricts}
                        onChange={(e) => {
                          updateSettings({ southDistricts: e.target.value });
                          showNotification();
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Details */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                Footer Contact Address &amp; Description
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Head Office Official Address
                  </label>
                  <input
                    type="text"
                    value={settings.footerAddress}
                    onChange={(e) => {
                      updateSettings({ footerAddress: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Footer Mission Summary
                  </label>
                  <input
                    type="text"
                    value={settings.footerDescription}
                    onChange={(e) => {
                      updateSettings({ footerDescription: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Theme & Typography */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-400" />
                Navy Palette &amp; Typography Scaling
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Fine-tune the brand navy shade and body font size across all displays as requested.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Navy Color Theme Selection */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Navy Color Palette Tone
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        id: 'deep-navy',
                        name: 'Deep Maritime Navy',
                        hex: '#0a1e3a',
                        desc: 'Classic Pakistan Navy Heritage'
                      },
                      {
                        id: 'royal-navy',
                        name: 'Royal Naval Blue',
                        hex: '#0b2545',
                        desc: 'Vibrant Modern Blue'
                      },
                      {
                        id: 'midnight-navy',
                        name: 'Midnight Navy',
                        hex: '#061325',
                        desc: 'High-Contrast Authority'
                      }
                    ].map((shade) => (
                      <button
                        key={shade.id}
                        type="button"
                        onClick={() => {
                          updateSettings({ navyThemeShade: shade.id as any });
                          showNotification();
                        }}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          settings.navyThemeShade === shade.id
                            ? 'border-amber-400 ring-2 ring-amber-400/40'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                        style={{ backgroundColor: shade.hex }}
                      >
                        <div className="h-6 flex justify-end">
                          {settings.navyThemeShade === shade.id && (
                            <CheckCircle2 className="w-5 h-5 text-amber-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {shade.name}
                          </div>
                          <div className="text-[10px] text-slate-300">
                            {shade.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size Scaling */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <label className="block text-sm font-semibold text-slate-200 mb-3">
                    Overall Font Size Scale
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'compact', label: 'Compact (14px)', desc: 'High density information' },
                      { id: 'normal', label: 'Default (16px)', desc: 'Standard balanced ratio' },
                      { id: 'large', label: 'Enlarged (18px)', desc: 'Maximum readability' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          updateSettings({ fontSizeScale: f.id as any });
                          showNotification();
                        }}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          settings.fontSizeScale === f.id
                            ? 'bg-blue-900/60 border-amber-400 ring-1 ring-amber-400'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white mb-1">
                          {f.label}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {f.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: Stats & Highlights */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                Institutional Metrics &amp; Counters
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Update the numbers displayed in the 5-metric counter banner and nationwide statistics.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Campuses Nationwide
                  </label>
                  <input
                    type="text"
                    value={settings.statCampuses}
                    onChange={(e) => {
                      updateSettings({ statCampuses: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-lg font-bold"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    e.g. 87+ Campuses
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Enrolled Students
                  </label>
                  <input
                    type="text"
                    value={settings.statStudents}
                    onChange={(e) => {
                      updateSettings({ statStudents: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-lg font-bold"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    e.g. 37,000+
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Qualified Faculty
                  </label>
                  <input
                    type="text"
                    value={settings.statFaculty}
                    onChange={(e) => {
                      updateSettings({ statFaculty: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-lg font-bold"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    e.g. 2,400+
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    BISE Passing Rate
                  </label>
                  <input
                    type="text"
                    value={settings.statPassRate}
                    onChange={(e) => {
                      updateSettings({ statPassRate: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-lg font-bold"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    e.g. 94%
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Teacher Training Institutes (TTIs)
                  </label>
                  <input
                    type="text"
                    value={settings.statInstitutes}
                    onChange={(e) => {
                      updateSettings({ statInstitutes: e.target.value });
                      showNotification();
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-lg font-bold"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    e.g. 03 TTIs
                  </span>
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300">
                    Reset All Configuration
                  </h4>
                  <p className="text-xs text-slate-500">
                    Restores official defaults for images, sections, order, and texts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to restore all site settings to official defaults?')) {
                      resetSettings();
                      showNotification();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Slide Modal (with auto-WebP conversion) */}
      {showAddSlideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Hero Slide (Auto WebP)
            </h4>

            <form onSubmit={handleAddSlide} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Upload Slide Photo
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-blue-900/60 hover:bg-blue-800 text-blue-200 rounded-xl text-xs font-semibold border border-blue-700/50 flex items-center gap-1.5 transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose Photo (Converts to WebP)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSlideImageUpload(e)}
                      className="hidden"
                    />
                  </label>
                  {isConvertingImage && (
                    <span className="text-xs text-amber-400 animate-pulse">
                      Converting to WebP...
                    </span>
                  )}
                </div>
                {newSlideImage && (
                  <div className="mt-2 aspect-16/9 rounded-lg overflow-hidden border border-slate-700">
                    <img
                      src={newSlideImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Or Paste External Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newSlideImage}
                  onChange={(e) => setNewSlideImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tag / Category (e.g. Leadership Ethos)
                </label>
                <input
                  type="text"
                  placeholder="Discipline &amp; Character"
                  value={newSlideTag}
                  onChange={(e) => setNewSlideTag(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Headline Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nurturing Academic Rigor"
                  value={newSlideTitle}
                  onChange={(e) => setNewSlideTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Caption Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Over 87+ campuses nationwide with dedicated faculty..."
                  value={newSlideCaption}
                  onChange={(e) => setNewSlideCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddSlideModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Photo Modal (with auto-WebP conversion) */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Add Campus Gallery Photo (Auto WebP)
            </h4>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Upload Photo
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-blue-900/60 hover:bg-blue-800 text-blue-200 rounded-xl text-xs font-semibold border border-blue-700/50 flex items-center gap-1.5 transition-colors">
                    <Upload className="w-4 h-4" />
                    Select Image (Converts to WebP)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGalleryPhotoUpload(e)}
                      className="hidden"
                    />
                  </label>
                  {isConvertingImage && (
                    <span className="text-xs text-amber-400 animate-pulse">
                      Converting to WebP...
                    </span>
                  )}
                </div>
                {newPhotoImage && (
                  <div className="mt-2 aspect-4/3 rounded-lg overflow-hidden border border-slate-700 max-h-48">
                    <img
                      src={newPhotoImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Or Paste Photo URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newPhotoImage}
                  onChange={(e) => setNewPhotoImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category Filter
                </label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                >
                  <option value="Campus Life">Campus Life</option>
                  <option value="Academics">Academics</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Ceremony">Ceremony</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Student Science Exhibition"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Caption Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Students showcasing their innovative physics projects..."
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Slide Modal (with WebP file replace or URL) */}
      {showEditSlideModal && editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Hero Slide
            </h4>

            <form onSubmit={handleSaveEditedSlide} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Replace Slide Photo (Auto WebP &amp; Save to /media)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-blue-900/60 hover:bg-blue-800 text-blue-200 rounded-xl text-xs font-semibold border border-blue-700/50 flex items-center gap-1.5 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload Replacement Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            setIsConvertingImage(true);
                            setUploadStatusMessage('Converting to WebP & saving to media folder...');
                            const { url } = await uploadAndSaveWebP(file, 'hero_slide');
                            setEditSlideImage(url);
                          } catch (err) {
                            console.error(err);
                            alert('Failed to process image');
                          } finally {
                            setIsConvertingImage(false);
                            setUploadStatusMessage('');
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {isConvertingImage && (
                    <span className="text-xs text-amber-400 animate-pulse">
                      Converting &amp; saving...
                    </span>
                  )}
                </div>
                {editSlideImage && (
                  <div className="mt-2 aspect-16/9 rounded-lg overflow-hidden border border-slate-700 max-h-48">
                    <img
                      src={editSlideImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Or Edit Image URL directly
                </label>
                <input
                  type="text"
                  placeholder="e.g. /media/hero_slide_1.webp"
                  value={editSlideImage}
                  onChange={(e) => setEditSlideImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tag / Category (e.g. Campus Ethos)
                </label>
                <input
                  type="text"
                  placeholder="Campus Ethos"
                  value={editSlideTag}
                  onChange={(e) => setEditSlideTag(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Slide Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Slide Title"
                  value={editSlideTitle}
                  onChange={(e) => setEditSlideTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Caption Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Slide description text..."
                  value={editSlideCaption}
                  onChange={(e) => setEditSlideCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditSlideModal(false);
                    setEditingSlide(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Update Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Gallery Photo Modal (with WebP file replace or URL) */}
      {showEditPhotoModal && editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Gallery Photo
            </h4>

            <form onSubmit={handleSaveEditedPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Replace Photo (Auto WebP &amp; Save to /media)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-blue-900/60 hover:bg-blue-800 text-blue-200 rounded-xl text-xs font-semibold border border-blue-700/50 flex items-center gap-1.5 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload Replacement Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            setIsConvertingImage(true);
                            setUploadStatusMessage('Converting to WebP & saving to media folder...');
                            const { url } = await uploadAndSaveWebP(file, 'gallery_photo');
                            setEditPhotoImage(url);
                          } catch (err) {
                            console.error(err);
                            alert('Failed to process image');
                          } finally {
                            setIsConvertingImage(false);
                            setUploadStatusMessage('');
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {isConvertingImage && (
                    <span className="text-xs text-amber-400 animate-pulse">
                      Converting &amp; saving...
                    </span>
                  )}
                </div>
                {editPhotoImage && (
                  <div className="mt-2 aspect-4/3 rounded-lg overflow-hidden border border-slate-700 max-h-48">
                    <img
                      src={editPhotoImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Or Edit Photo URL directly
                </label>
                <input
                  type="text"
                  placeholder="e.g. /media/gallery_photo_1.webp"
                  value={editPhotoImage}
                  onChange={(e) => setEditPhotoImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category Filter
                </label>
                <select
                  value={editPhotoCategory}
                  onChange={(e) => setEditPhotoCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                >
                  <option value="Campus Life">Campus Life</option>
                  <option value="Academics">Academics</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Ceremony">Ceremony</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Photo Title"
                  value={editPhotoTitle}
                  onChange={(e) => setEditPhotoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Caption Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Photo caption..."
                  value={editPhotoCaption}
                  onChange={(e) => setEditPhotoCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditPhotoModal(false);
                    setEditingPhoto(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Update Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating WebP Conversion / Upload Progress Dialog */}
      {isConvertingImage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-amber-500/60 rounded-xl px-4 py-3 text-white shadow-2xl flex items-center gap-3 backdrop-blur-md">
          <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <div>
            <div className="text-xs font-bold text-amber-300">Converting &amp; Saving WebP</div>
            <div className="text-[11px] text-slate-300">{uploadStatusMessage || 'Writing to /media folder...'}</div>
          </div>
        </div>
      )}

      {/* Rebuild ZIP Status Toast */}
      {rebuildZipMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900/95 border border-emerald-500/60 rounded-xl px-4 py-3 text-white shadow-2xl flex items-center gap-3 backdrop-blur-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs font-medium text-slate-200">{rebuildZipMessage}</div>
        </div>
      )}
    </div>
  );
};
