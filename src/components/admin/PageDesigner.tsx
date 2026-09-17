import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { CustomPage, PageBlock, PageBlockType } from '../../types/settings';
import { uploadAndSaveWebP } from '../../utils/imageToWebp';
import { CustomPageView } from '../../pages/CustomPageView';
import { 
  FileText, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Heading as HeadingIcon, 
  Type, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Link as LinkIcon, 
  Grid, 
  HelpCircle, 
  Quote, 
  Eye, 
  Save, 
  ExternalLink, 
  Upload, 
  RefreshCw, 
  Check, 
  Sparkles,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  Shield,
  Award,
  BookOpen,
  GraduationCap,
  Users,
  Anchor,
  Lock,
  Layout,
  Layers
} from 'lucide-react';

interface PageDesignerProps {
  initialPageId?: string;
  onNavigateToRoute?: (route: string) => void;
}

export const PageDesigner: React.FC<PageDesignerProps> = ({ 
  initialPageId,
  onNavigateToRoute 
}) => {
  const { settings, updateSettings, saveSettingsPermanently, isSaving } = useSettings();
  const customPages = settings.customPages || [];

  const [selectedPageId, setSelectedPageId] = useState<string>(
    initialPageId || (customPages[0]?.id ?? '')
  );

  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewHideSidebar, setPreviewHideSidebar] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingImageBlockId, setUploadingImageBlockId] = useState<string | null>(null);

  // Active page state for editing
  const selectedPage = customPages.find((p) => p.id === selectedPageId) || customPages[0];

  // Local copy of page being edited
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);

  // Sync editing page whenever selected page changes
  useEffect(() => {
    if (selectedPage) {
      setEditingPage(JSON.parse(JSON.stringify(selectedPage)));
    }
  }, [selectedPageId, customPages.length]);

  if (!editingPage) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">No Pages Available in System</h3>
        <p className="text-sm max-w-md mx-auto mb-6">
          Create your first custom page or restore default settings to customize headings, text boxes, images, and videos.
        </p>
        <button
          onClick={() => handleCreateNewPage()}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm cursor-pointer shadow-md"
        >
          Create First Page
        </button>
      </div>
    );
  }

  // Separate into core institutional pages and custom pages for organized list
  const corePages = customPages.filter((p) => p.isCorePage);
  const customCreatedPages = customPages.filter((p) => !p.isCorePage);

  const handleCreateNewPage = async () => {
    const title = prompt('Enter New Page Title (e.g. Maritime Heritage, Robotics Lab, Sports Facilities):');
    if (!title || !title.trim()) return;

    const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newPageId = `page-${slug}-${Date.now()}`;

    const newPage: CustomPage = {
      id: newPageId,
      slug,
      title: title.trim(),
      subtitle: 'Official institutional department and facility overview under Bahria Foundation.',
      badge: 'Academic Wing',
      bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
      published: true,
      isCorePage: false,
      useCustomLayout: true,
      metaDescription: `${title.trim()} - Bahria Education & Training System`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      blocks: [
        {
          id: `b-${Date.now()}-1`,
          type: 'heading',
          title: title.trim(),
          subtitle: `Overview and academic objectives of ${title.trim()}.`,
          level: 'h2',
          align: 'left',
          badge: 'Overview'
        },
        {
          id: `b-${Date.now()}-2`,
          type: 'text',
          content: `Bahria Education and Training System (BEATS) establishes high-standard facilities across our nationwide campuses. Content can be customized directly using the visual block designer.`
        }
      ]
    };

    const updatedPages = [...customPages, newPage];
    updateSettings({ customPages: updatedPages });
    await saveSettingsPermanently({ customPages: updatedPages });
    setSelectedPageId(newPageId);
  };

  const handleDeletePage = async (pageId: string) => {
    const target = customPages.find((p) => p.id === pageId);
    if (!target) return;

    if (!window.confirm(`Are you sure you want to permanently delete "${target.title}"?\n\nThis will remove the page from the website and also remove any main navigation menu items linking to it.`)) {
      return;
    }

    const updatedPages = customPages.filter((p) => p.id !== pageId);

    // Also remove any linked navigation menu items
    const cleanSlug = target.slug.toLowerCase();
    const currentMenuItems = settings.menuItems || [];
    const updatedMenuItems = currentMenuItems.filter((m) => {
      if (m.pageId && m.pageId === pageId) return false;
      const cleanRoute = (m.route || '').replace(/^#?\/?/, '').toLowerCase();
      if (cleanRoute && cleanRoute === cleanSlug) return false;
      return true;
    });

    const deletedPageIds = Array.from(new Set([
      ...(settings.deletedPageIds || []),
      target.id,
      target.slug,
      cleanSlug
    ]));

    const removedMenuItems = currentMenuItems.filter((m) => !updatedMenuItems.some((um) => um.id === m.id));
    const deletedMenuItemIds = Array.from(new Set([
      ...(settings.deletedMenuItemIds || []),
      ...removedMenuItems.map((m) => m.id),
      ...removedMenuItems.map((m) => m.route)
    ]));

    const newSettingsPayload = {
      customPages: updatedPages,
      menuItems: updatedMenuItems,
      deletedPageIds,
      deletedMenuItemIds
    };

    updateSettings(newSettingsPayload);
    await saveSettingsPermanently(newSettingsPayload);

    if (updatedPages.length > 0) {
      setSelectedPageId(updatedPages[0].id);
    } else {
      setSelectedPageId('');
      setEditingPage(null);
    }
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    const updatedPages = customPages.map((p) =>
      p.id === editingPage.id
        ? {
            ...editingPage,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : p
    );
    updateSettings({ customPages: updatedPages });
    await saveSettingsPermanently({ customPages: updatedPages });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Block management
  const handleAddBlock = (type: PageBlockType) => {
    const newBlockId = `b-${Date.now()}`;
    let newBlock: PageBlock;

    switch (type) {
      case 'heading':
        newBlock = {
          id: newBlockId,
          type: 'heading',
          title: 'Section Heading Title',
          subtitle: 'Optional descriptive subtitle explaining this section in depth.',
          level: 'h2',
          align: 'left',
          badge: 'Highlights'
        };
        break;
      case 'text':
        newBlock = {
          id: newBlockId,
          type: 'text',
          content: 'Enter detailed informational text or paragraphs here. You can paste announcements, curriculum overviews, or campus guidelines.'
        };
        break;
      case 'image':
        newBlock = {
          id: newBlockId,
          type: 'image',
          imageUrl: 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-5.webp',
          imageAlt: 'Institutional Campus View',
          caption: 'Students and faculty during academic sessions at Bahria Foundation.',
          imageWidth: 'wide'
        };
        break;
      case 'video':
        newBlock = {
          id: newBlockId,
          type: 'video',
          videoTitle: 'Campus Tour & Documentary',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          videoCaption: 'Watch student activities, marching parades, and science experiments.'
        };
        break;
      case 'buttons':
        newBlock = {
          id: newBlockId,
          type: 'buttons',
          buttons: [
            {
              id: `btn-${Date.now()}-1`,
              label: 'Apply for Admission',
              url: '/admission',
              variant: 'gold'
            },
            {
              id: `btn-${Date.now()}-2`,
              label: 'Contact Regional Directorate',
              url: '/contact',
              variant: 'primary'
            }
          ]
        };
        break;
      case 'features':
        newBlock = {
          id: newBlockId,
          type: 'features',
          featuresColumns: 3,
          features: [
            { id: `f-${Date.now()}-1`, icon: 'Shield', title: 'Naval Discipline', description: 'Instilling ethical character, self-reliance, and team leadership.' },
            { id: `f-${Date.now()}-2`, icon: 'BookOpen', title: 'FBISE & Cambridge', description: 'Accredited federal and international curricula.' },
            { id: `f-${Date.now()}-3`, icon: 'Award', title: 'Top Board Positions', description: '94% average matriculation and intermediate passing rates nationwide.' }
          ]
        };
        break;
      case 'accordion':
        newBlock = {
          id: newBlockId,
          type: 'accordion',
          faqItems: [
            {
              id: `faq-${Date.now()}-1`,
              question: 'What are the admission eligibility requirements?',
              answer: 'Admissions require submission of candidate B-form, previous academic transcripts, and passing the entrance evaluation test.'
            },
            {
              id: `faq-${Date.now()}-2`,
              question: 'Is transportation provided to students across campuses?',
              answer: 'Yes, designated school bus routes cover major residential sectors and connecting arterial routes for student safety.'
            }
          ]
        };
        break;
      case 'callout':
        newBlock = {
          id: newBlockId,
          type: 'callout',
          calloutType: 'quote',
          content: 'There is no doubt that the future of our state will and must greatly depend upon the type of education we give to our children.',
          quoteAuthor: 'Quaid-e-Azam Muhammad Ali Jinnah'
        };
        break;
    }

    setEditingPage({
      ...editingPage,
      blocks: [...editingPage.blocks, newBlock]
    });
  };

  const handleUpdateBlock = (blockId: string, updates: Partial<PageBlock>) => {
    setEditingPage({
      ...editingPage,
      blocks: editingPage.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b))
    });
  };

  const handleDeleteBlock = (blockId: string) => {
    setEditingPage({
      ...editingPage,
      blocks: editingPage.blocks.filter((b) => b.id !== blockId)
    });
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= editingPage.blocks.length) return;

    const copy = [...editingPage.blocks];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    setEditingPage({
      ...editingPage,
      blocks: copy
    });
  };

  // Image Upload helper for blocks or banner
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    blockId?: string,
    isBanner = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (blockId) setUploadingImageBlockId(blockId);
      const uploadPath = settings.mediaUploadPath || '/media';
      const { url } = await uploadAndSaveWebP(file, isBanner ? 'page_banner' : 'page_image', 0.85, uploadPath);

      if (isBanner) {
        setEditingPage({ ...editingPage, bannerImage: url });
      } else if (blockId) {
        handleUpdateBlock(blockId, { imageUrl: url });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to upload and convert image');
    } finally {
      if (blockId) setUploadingImageBlockId(null);
    }
  };

  if (!editingPage) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">BEATS Page Designer</h3>
              <p className="text-xs text-slate-400">
                Design custom pages, add blocks, headings, images, and videos.
              </p>
            </div>
          </div>
          <button
            onClick={handleCreateNewPage}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Page Selected</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            You can create a brand new custom page anytime and link it to the main navigation menu.
          </p>
          <button
            onClick={handleCreateNewPage}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm inline-flex items-center gap-2 cursor-pointer transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">BEATS Page Designer</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-700/40">
                Visual Live Editor
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Customize headings, text boxes, images, videos, accordions, and buttons with 100% accurate live preview.
            </p>
          </div>
        </div>

        {/* Page Switcher & Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Page Dropdown with Optgroups for Core and Custom Pages */}
          <div className="relative">
            <select
              value={selectedPageId}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 pr-8 focus:border-amber-500 focus:outline-hidden appearance-none cursor-pointer max-w-[260px] sm:max-w-[320px] truncate"
            >
              {corePages.length > 0 && (
                <optgroup label="⭐ Core Institutional Pages (Built-in)">
                  {corePages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (/{p.slug})
                    </option>
                  ))}
                </optgroup>
              )}
              {customCreatedPages.length > 0 && (
                <optgroup label="📄 Custom Designed Pages">
                  {customCreatedPages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (/{p.slug})
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={handleCreateNewPage}
            className="px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Create another new page"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Page</span>
          </button>

          <button
            onClick={handleSavePage}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSaving ? 'Saving...' : 'Save Page'}</span>
          </button>

          {onNavigateToRoute && (
            <button
              onClick={() => onNavigateToRoute(editingPage.slug)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs transition-colors cursor-pointer"
              title="View live page on public site"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}

          {/* View mode toggle */}
          <div className="hidden lg:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('editor')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'editor' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'split' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'preview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Page "{editingPage.title}" saved successfully! Live website and preview are fully synchronized.</span>
        </div>
      )}

      {/* Main Designer Layout (Split / Editor / Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Page Metadata & Block Editor */}
        {(viewMode === 'editor' || viewMode === 'split') && (
          <div className={viewMode === 'split' ? 'lg:col-span-6 space-y-6' : 'lg:col-span-12 space-y-6'}>
            {/* Page Header & Meta Settings Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Page Details &amp; Top Banner
                  </span>
                  {editingPage.isCorePage ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Core Institutional Route</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/40 text-blue-300 border border-blue-700/30">
                      Custom Page
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDeletePage(editingPage.id)}
                  className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-900/40 hover:bg-red-900/50 transition-colors cursor-pointer"
                  title="Permanently delete this page and remove its navigation menu item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Page</span>
                </button>
              </div>

              {/* Core Page Custom Layout Activation Notice */}
              {editingPage.isCorePage && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="flex items-center gap-2 font-bold cursor-pointer text-amber-300">
                      <input
                        type="checkbox"
                        checked={Boolean(editingPage.useCustomLayout)}
                        onChange={(e) => setEditingPage({ ...editingPage, useCustomLayout: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <span>Use this Custom Designed Layout on Live Website</span>
                    </label>
                    <p className="text-[11px] text-slate-300 mt-1">
                      When checked, website visitors viewing /{editingPage.slug} will see your custom designed blocks below instead of the hardcoded default template.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Page Title *</label>
                  <input
                    type="text"
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    value={editingPage.slug}
                    readOnly={editingPage.isCorePage}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-mono ${
                      editingPage.isCorePage ? 'opacity-60 cursor-not-allowed' : 'focus:border-amber-500 focus:outline-hidden'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Header Badge Tag</label>
                  <input
                    type="text"
                    value={editingPage.badge || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, badge: e.target.value })}
                    placeholder="e.g. Maritime Ethos, STEM Labs, Directorate"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Publication Status</label>
                  <select
                    value={editingPage.published ? 'published' : 'draft'}
                    onChange={(e) => setEditingPage({ ...editingPage, published: e.target.value === 'published' })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Admin Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingPage.subtitle || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, subtitle: e.target.value })}
                  placeholder="Short introductory summary for the top institutional banner"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Header Banner Background Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingPage.bannerImage || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, bannerImage: e.target.value })}
                    placeholder="https://... or upload local WebP"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                  <label className="px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Banner</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, undefined, true)}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Block Action Insertion Toolbar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Add Content Blocks to Page ({editingPage.blocks?.length || 0} blocks)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleAddBlock('heading')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <HeadingIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white">Heading</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('text')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Type className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white">Text Box</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('image')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white">Image</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('video')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <VideoIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white">Video</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('buttons')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <LinkIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white">Buttons</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('features')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Grid className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white">Feature Grid</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('accordion')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white">Accordion</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('callout')}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Quote className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white">Callout Box</span>
                </button>
              </div>
            </div>

            {/* Blocks Drag/Order & Individual Configuration List */}
            <div className="space-y-4">
              {editingPage.blocks.map((block, index) => (
                <div
                  key={block.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 relative group transition-colors hover:border-slate-700"
                >
                  {/* Block Header Toolbar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[11px]">
                        {index + 1}
                      </span>
                      <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                        {block.type} Block
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveBlock(index, 'down')}
                        disabled={index === editingPage.blocks.length - 1}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlock(block.id)}
                        className="p-1 text-red-400 hover:text-red-300 cursor-pointer ml-1"
                        title="Remove Block"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Block Form Fields by Type */}
                  {block.type === 'heading' && (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Heading Title</label>
                          <input
                            type="text"
                            value={block.title || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Badge Tag</label>
                          <input
                            type="text"
                            value={block.badge || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { badge: e.target.value })}
                            placeholder="Optional badge"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Subtitle / Descriptor</label>
                        <input
                          type="text"
                          value={block.subtitle || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { subtitle: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="flex gap-4 text-xs">
                        <label className="flex items-center gap-1 text-slate-300">
                          <span>Alignment:</span>
                          <select
                            value={block.align || 'left'}
                            onChange={(e) => handleUpdateBlock(block.id, { align: e.target.value as any })}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-white"
                          >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                          </select>
                        </label>
                        <label className="flex items-center gap-1 text-slate-300">
                          <span>Size:</span>
                          <select
                            value={block.level || 'h2'}
                            onChange={(e) => handleUpdateBlock(block.id, { level: e.target.value as any })}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-white"
                          >
                            <option value="h1">H1 (Large)</option>
                            <option value="h2">H2 (Medium)</option>
                            <option value="h3">H3 (Small)</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  )}

                  {block.type === 'text' && (
                    <div className="space-y-1 pt-1">
                      <label className="block text-[11px] font-bold text-slate-400">Paragraph Content</label>
                      <textarea
                        rows={4}
                        value={block.content || ''}
                        onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                        placeholder="Enter text paragraphs, institutional overviews, guidelines..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-hidden"
                      />
                    </div>
                  )}

                  {block.type === 'image' && (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={block.imageUrl || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { imageUrl: e.target.value })}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                          />
                          <label className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingImageBlockId === block.id ? 'Converting...' : 'Upload'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, block.id, false)}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Caption</label>
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { caption: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Display Width</label>
                          <select
                            value={block.imageWidth || 'wide'}
                            onChange={(e) => handleUpdateBlock(block.id, { imageWidth: e.target.value as any })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          >
                            <option value="normal">Normal (Center max 650px)</option>
                            <option value="wide">Wide (Center max 900px)</option>
                            <option value="full">Full Container Width</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {block.type === 'video' && (
                    <div className="space-y-2 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Video URL (YouTube embed or MP4 link)
                        </label>
                        <input
                          type="text"
                          value={block.videoUrl || ''}
                          onChange={(e) => handleUpdateBlock(block.id, { videoUrl: e.target.value })}
                          placeholder="https://www.youtube.com/embed/... or https://youtu.be/..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Video Title</label>
                          <input
                            type="text"
                            value={block.videoTitle || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { videoTitle: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Caption</label>
                          <input
                            type="text"
                            value={block.videoCaption || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { videoCaption: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {block.type === 'buttons' && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 block">Button Actions</span>
                      {block.buttons?.map((btn, btnIdx) => (
                        <div key={btn.id} className="flex flex-wrap sm:flex-nowrap gap-2 items-center bg-slate-950 p-2 rounded-lg text-xs">
                          <input
                            type="text"
                            value={btn.label}
                            onChange={(e) => {
                              const updatedBtns = [...(block.buttons || [])];
                              updatedBtns[btnIdx].label = e.target.value;
                              handleUpdateBlock(block.id, { buttons: updatedBtns });
                            }}
                            className="w-full sm:w-1/3 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                            placeholder="Label"
                          />
                          <input
                            type="text"
                            value={btn.url}
                            onChange={(e) => {
                              const updatedBtns = [...(block.buttons || [])];
                              updatedBtns[btnIdx].url = e.target.value;
                              handleUpdateBlock(block.id, { buttons: updatedBtns });
                            }}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                            placeholder="URL (/route or https://)"
                          />
                          <select
                            value={btn.variant}
                            onChange={(e) => {
                              const updatedBtns = [...(block.buttons || [])];
                              updatedBtns[btnIdx].variant = e.target.value as any;
                              handleUpdateBlock(block.id, { buttons: updatedBtns });
                            }}
                            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                          >
                            <option value="gold">Gold (Primary)</option>
                            <option value="primary">Navy</option>
                            <option value="secondary">Slate</option>
                            <option value="outline">Outline</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedBtns = block.buttons?.filter((_, i) => i !== btnIdx);
                              handleUpdateBlock(block.id, { buttons: updatedBtns });
                            }}
                            className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedBtns = [
                            ...(block.buttons || []),
                            {
                              id: `btn-${Date.now()}`,
                              label: 'New Action',
                              url: '/admission',
                              variant: 'gold' as const
                            }
                          ];
                          handleUpdateBlock(block.id, { buttons: updatedBtns });
                        }}
                        className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 pt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Button</span>
                      </button>
                    </div>
                  )}

                  {/* Feature Grid Block Editor */}
                  {block.type === 'features' && (
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <label className="text-slate-300 flex items-center gap-2">
                          <span className="font-bold text-slate-400">Grid Columns:</span>
                          <select
                            value={block.featuresColumns || 3}
                            onChange={(e) => handleUpdateBlock(block.id, { featuresColumns: parseInt(e.target.value) as 2 | 3 | 4 })}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                          >
                            <option value={2}>2 Columns</option>
                            <option value={3}>3 Columns</option>
                            <option value={4}>4 Columns</option>
                          </select>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newFeature = {
                              id: `f-${Date.now()}`,
                              icon: 'Shield',
                              title: 'New Feature Card',
                              description: 'Explanation of academic pillar or institutional standard.'
                            };
                            handleUpdateBlock(block.id, {
                              features: [...(block.features || []), newFeature]
                            });
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Feature Card</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {block.features?.map((feat, fIdx) => (
                          <div key={feat.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-1">
                                <select
                                  value={feat.icon || 'Shield'}
                                  onChange={(e) => {
                                    const copy = [...(block.features || [])];
                                    copy[fIdx].icon = e.target.value;
                                    handleUpdateBlock(block.id, { features: copy });
                                  }}
                                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-semibold"
                                >
                                  <option value="Shield">Shield (Discipline)</option>
                                  <option value="Anchor">Anchor (Naval)</option>
                                  <option value="Award">Award (Excellence)</option>
                                  <option value="BookOpen">Book (Academics)</option>
                                  <option value="GraduationCap">Cap (Faculty)</option>
                                  <option value="Users">Users (Community)</option>
                                </select>
                                <input
                                  type="text"
                                  value={feat.title}
                                  onChange={(e) => {
                                    const copy = [...(block.features || [])];
                                    copy[fIdx].title = e.target.value;
                                    handleUpdateBlock(block.id, { features: copy });
                                  }}
                                  placeholder="Feature Card Title"
                                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-bold text-xs"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = block.features?.filter((_, i) => i !== fIdx);
                                  handleUpdateBlock(block.id, { features: copy });
                                }}
                                className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                                title="Delete Feature Card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={feat.description}
                              onChange={(e) => {
                                const copy = [...(block.features || [])];
                                copy[fIdx].description = e.target.value;
                                handleUpdateBlock(block.id, { features: copy });
                              }}
                              placeholder="Feature description text..."
                              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accordion / FAQ Block Editor */}
                  {block.type === 'accordion' && (
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-400">Accordion Items &amp; FAQs</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newFaq = {
                              id: `faq-${Date.now()}`,
                              question: 'Frequently Asked Question Title?',
                              answer: 'Detailed response and explanation for students and parents.'
                            };
                            handleUpdateBlock(block.id, {
                              faqItems: [...(block.faqItems || []), newFaq]
                            });
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Accordion Item</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {block.faqItems?.map((faq, faqIdx) => (
                          <div key={faq.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                            <div className="flex items-center justify-between gap-2">
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => {
                                  const copy = [...(block.faqItems || [])];
                                  copy[faqIdx].question = e.target.value;
                                  handleUpdateBlock(block.id, { faqItems: copy });
                                }}
                                placeholder="Question / Collapsible Title"
                                className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-bold text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = block.faqItems?.filter((_, i) => i !== faqIdx);
                                  handleUpdateBlock(block.id, { faqItems: copy });
                                }}
                                className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                                title="Delete Question"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={faq.answer}
                              onChange={(e) => {
                                const copy = [...(block.faqItems || [])];
                                copy[faqIdx].answer = e.target.value;
                                handleUpdateBlock(block.id, { faqItems: copy });
                              }}
                              placeholder="Answer content..."
                              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {block.type === 'callout' && (
                    <div className="space-y-2 pt-1">
                      <div className="flex gap-3 text-xs">
                        <label className="text-slate-300 flex items-center gap-1">
                          <span>Style:</span>
                          <select
                            value={block.calloutType || 'quote'}
                            onChange={(e) => handleUpdateBlock(block.id, { calloutType: e.target.value as any })}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                          >
                            <option value="quote">Quote Box</option>
                            <option value="info">Info Notice</option>
                            <option value="gold">Gold Accent</option>
                            <option value="navy">Navy Executive</option>
                          </select>
                        </label>
                      </div>
                      <textarea
                        rows={2}
                        value={block.content || ''}
                        onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                        placeholder="Quote content or notice text..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      />
                      {block.calloutType === 'quote' && (
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Quote Author</label>
                          <input
                            type="text"
                            value={block.quoteAuthor || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { quoteAuthor: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Column: 100% Identical Canonical Live Preview */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={viewMode === 'split' ? 'lg:col-span-6 space-y-4' : 'lg:col-span-12 space-y-4'}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
              {/* Preview Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-amber-400" />
                    Exact Public Page Preview
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    /{editingPage.slug}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Device switchers: Desktop, Tablet, Mobile */}
                  <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800">
                    <button
                      onClick={() => setDevicePreview('desktop')}
                      className={`px-2.5 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                        devicePreview === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Desktop View"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Desktop</span>
                    </button>
                    <button
                      onClick={() => setDevicePreview('tablet')}
                      className={`px-2.5 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                        devicePreview === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Tablet View"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Tablet</span>
                    </button>
                    <button
                      onClick={() => setDevicePreview('mobile')}
                      className={`px-2.5 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                        devicePreview === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                      title="Mobile Phone View"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mobile</span>
                    </button>
                  </div>

                  {/* Sidebar Toggle */}
                  <button
                    onClick={() => setPreviewHideSidebar(!previewHideSidebar)}
                    className={`px-3 py-1.5 text-xs rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      previewHideSidebar
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-blue-900/40 text-blue-200 border-blue-700/50'
                    }`}
                    title="Toggle Helpline & Highlights Institutional Sidebar"
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span>{previewHideSidebar ? 'Canvas Only' : 'Full Layout'}</span>
                  </button>
                </div>
              </div>

              {/* Viewport Frame rendering the canonical CustomPageView */}
              <div className="overflow-x-auto pb-2 flex justify-center bg-slate-950 rounded-xl p-2 sm:p-4 border border-slate-800 min-h-[600px]">
                <div
                  className={`transition-all duration-300 w-full bg-slate-50 rounded-xl overflow-hidden shadow-2xl border border-slate-300 ${
                    devicePreview === 'mobile'
                      ? 'max-w-[390px]'
                      : devicePreview === 'tablet'
                      ? 'max-w-[768px]'
                      : 'max-w-full'
                  }`}
                >
                  <CustomPageView
                    page={editingPage}
                    onNavigateHome={() => {}}
                    onNavigateRoute={onNavigateToRoute}
                    isPreview={true}
                    hideSidebar={previewHideSidebar}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
