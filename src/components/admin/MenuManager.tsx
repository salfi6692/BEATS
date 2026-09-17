import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { MenuItem, CustomPage, NavDropdownItem } from '../../types/settings';
import { 
  Menu, 
  Plus, 
  Trash2, 
  Edit, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  FileText, 
  Check, 
  X, 
  Layers, 
  FolderPlus,
  Sparkles,
  AlertTriangle,
  Link as LinkIcon
} from 'lucide-react';

interface MenuManagerProps {
  onOpenPageDesigner?: (pageId?: string) => void;
  onNavigateToRoute?: (route: string) => void;
}

export const MenuManager: React.FC<MenuManagerProps> = ({ 
  onOpenPageDesigner,
  onNavigateToRoute 
}) => {
  const { settings, updateSettings, saveSettingsPermanently } = useSettings();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<MenuItem | null>(null);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);

  // Form state for adding/editing a menu item
  const [itemLabel, setItemLabel] = useState('');
  const [itemRoute, setItemRoute] = useState('');
  const [itemHasDropdown, setItemHasDropdown] = useState(false);
  const [itemSubItems, setItemSubItems] = useState<NavDropdownItem[]>([]);
  const [autoCreatePage, setAutoCreatePage] = useState(true);
  const [pageSubtitle, setPageSubtitle] = useState('');
  const [pageBadge, setPageBadge] = useState('New Department');

  // Sub-item input state
  const [newSubLabel, setNewSubLabel] = useState('');
  const [newSubRoute, setNewSubRoute] = useState('');

  const menuItems = settings.menuItems || [];
  const customPages = settings.customPages || [];

  const handleStartAdd = () => {
    setEditingItemId(null);
    setItemLabel('');
    setItemRoute('');
    setItemHasDropdown(false);
    setItemSubItems([]);
    setAutoCreatePage(true);
    setPageSubtitle('');
    setPageBadge('Institutional Page');
    setShowAddModal(true);
  };

  const handleStartEdit = (item: MenuItem) => {
    setEditingItemId(item.id);
    setItemLabel(item.label);
    setItemRoute(item.route);
    setItemHasDropdown(Boolean(item.hasDropdown));
    setItemSubItems(item.items || []);
    setAutoCreatePage(false);
    setShowAddModal(true);
  };

  const handleAddSubItem = () => {
    if (!newSubLabel.trim()) return;
    const subItem: NavDropdownItem = {
      id: `sub-${Date.now()}`,
      label: newSubLabel.trim(),
      route: newSubRoute.trim() || itemRoute
    };
    setItemSubItems([...itemSubItems, subItem]);
    setNewSubLabel('');
    setNewSubRoute('');
  };

  const handleRemoveSubItem = (id: string) => {
    setItemSubItems(itemSubItems.filter((s) => s.id !== id));
  };

  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemLabel.trim()) {
      alert('Menu Item Label is required');
      return;
    }

    // Determine route / slug
    let finalRoute = itemRoute.trim();
    if (!finalRoute) {
      finalRoute = itemLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    let updatedCustomPages = [...customPages];
    let createdPageId: string | undefined = undefined;

    // Auto-create a standard format custom page if requested
    if (!editingItemId && autoCreatePage) {
      const pageId = `page-${finalRoute}-${Date.now()}`;
      createdPageId = pageId;

      const newPage: CustomPage = {
        id: pageId,
        slug: finalRoute,
        title: itemLabel.trim(),
        subtitle: pageSubtitle.trim() || `Official academic and operational program under Bahria Foundation.`,
        badge: pageBadge.trim() || 'Institutional Portal',
        bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
        published: true,
        metaDescription: `${itemLabel.trim()} - Bahria Education & Training System`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        blocks: [
          {
            id: `b-${Date.now()}-1`,
            type: 'heading',
            title: itemLabel.trim(),
            subtitle: `Welcome to the official ${itemLabel.trim()} section.`,
            level: 'h2',
            align: 'left',
            badge: pageBadge.trim() || 'Institutional Overview'
          },
          {
            id: `b-${Date.now()}-2`,
            type: 'text',
            content: `Bahria Education and Training System (BEATS) continuously expands its institutional initiatives across all nationwide regions. This page provides standardized documentation, guidelines, and operational frameworks for students, parents, and faculty.`
          },
          {
            id: `b-${Date.now()}-3`,
            type: 'callout',
            calloutType: 'quote',
            content: `Quality education coupled with discipline remains the hallmark of Bahria Foundation institutions.`,
            quoteAuthor: 'BEATS Directorate General'
          },
          {
            id: `b-${Date.now()}-4`,
            type: 'buttons',
            buttons: [
              {
                id: `btn-1`,
                label: 'Admissions & Inquiries',
                url: '/admission',
                variant: 'gold'
              },
              {
                id: `btn-2`,
                label: 'Campuses Network',
                url: '/campuses',
                variant: 'primary'
              }
            ]
          }
        ]
      };

      updatedCustomPages.push(newPage);
    }

    let updatedMenuItems: MenuItem[];

    if (editingItemId) {
      updatedMenuItems = menuItems.map((item) => {
        if (item.id === editingItemId) {
          return {
            ...item,
            label: itemLabel.trim(),
            route: finalRoute,
            hasDropdown: itemHasDropdown,
            items: itemHasDropdown ? itemSubItems : []
          };
        }
        return item;
      });
    } else {
      const newItem: MenuItem = {
        id: `menu-${Date.now()}`,
        label: itemLabel.trim(),
        route: finalRoute,
        hasDropdown: itemHasDropdown,
        visible: true,
        order: menuItems.length + 1,
        pageId: createdPageId,
        isCustom: autoCreatePage,
        items: itemHasDropdown ? itemSubItems : []
      };
      updatedMenuItems = [...menuItems, newItem];
    }

    updateSettings({
      menuItems: updatedMenuItems,
      customPages: updatedCustomPages
    });
    await saveSettingsPermanently({
      menuItems: updatedMenuItems,
      customPages: updatedCustomPages
    });

    setShowAddModal(false);
    setEditingItemId(null);
  };

  const handlePromptDelete = (item: MenuItem) => {
    setDeleteCandidate(item);
  };

  const executeDeleteItem = async (id: string) => {
    const itemToDelete = menuItems.find((item) => item.id === id);
    if (!itemToDelete) return;

    const updatedMenuItems = menuItems.filter((item) => item.id !== id);

    // Identify linked page
    const pageIdToDelete = itemToDelete.pageId;
    const cleanRoute = (itemToDelete.route || '').replace(/^#?\/?/, '').toLowerCase();

    const matchingPage = customPages.find(
      (p) =>
        (pageIdToDelete && p.id === pageIdToDelete) ||
        (cleanRoute && p.slug.toLowerCase() === cleanRoute)
    );

    // Filter out the associated page
    const updatedCustomPages = customPages.filter((p) => {
      if (pageIdToDelete && p.id === pageIdToDelete) return false;
      if (cleanRoute && p.slug.toLowerCase() === cleanRoute) return false;
      return true;
    });

    const pageIdsToAdd = [
      ...(pageIdToDelete ? [pageIdToDelete] : []),
      ...(matchingPage ? [matchingPage.id, matchingPage.slug] : []),
      ...(cleanRoute ? [cleanRoute] : [])
    ].filter(Boolean);

    const menuIdsToAdd = [
      id,
      itemToDelete.route,
      cleanRoute
    ].filter(Boolean);

    const deletedPageIds = Array.from(new Set([
      ...(settings.deletedPageIds || []).filter(Boolean),
      ...pageIdsToAdd
    ]));

    const deletedMenuItemIds = Array.from(new Set([
      ...(settings.deletedMenuItemIds || []).filter(Boolean),
      ...menuIdsToAdd
    ]));

    const payload = {
      menuItems: updatedMenuItems,
      customPages: updatedCustomPages,
      deletedPageIds,
      deletedMenuItemIds
    };

    updateSettings(payload);
    await saveSettingsPermanently(payload);
    setDeleteCandidate(null);
    setDeleteNotice(`"${itemToDelete.label}" and its associated page were successfully removed.`);
    setTimeout(() => setDeleteNotice(null), 4000);
  };

  const handleToggleVisible = async (id: string) => {
    // Only toggles visibility in the navigation bar; the page remains untouched and fully preserved
    const updated = menuItems.map((item) => {
      if (item.id === id) {
        return { ...item, visible: !item.visible };
      }
      return item;
    });
    updateSettings({ menuItems: updated });
    await saveSettingsPermanently({ menuItems: updated });
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= menuItems.length) return;

    const itemsCopy = [...menuItems];
    const temp = itemsCopy[index];
    itemsCopy[index] = itemsCopy[targetIdx];
    itemsCopy[targetIdx] = temp;

    // re-assign order numbers
    const reordered = itemsCopy.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));

    updateSettings({ menuItems: reordered });
    await saveSettingsPermanently({ menuItems: reordered });
  };

  return (
    <div className="space-y-6">
      {/* Delete Feedback Toast */}
      {deleteNotice && (
        <div className="p-3.5 bg-emerald-950/70 border border-emerald-700/50 rounded-xl text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{deleteNotice}</span>
          </div>
          <button
            onClick={() => setDeleteNotice(null)}
            className="p-1 hover:bg-emerald-900/50 rounded text-emerald-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Menu className="w-3.5 h-3.5" />
            <span>Navbar &amp; Page Linkage Architecture</span>
          </div>
          <h3 className="text-xl font-bold text-white">Main Navigation Menu Items</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add, update, reorder, or delete primary menu links and dropdowns. Adding a new item can automatically generate a standard-format page!
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-md shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Menu Item</span>
        </button>
      </div>

      {/* Menu Items Table / List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Current Main Menu Links ({menuItems.length})
          </span>
          <span className="text-xs text-slate-500">
            Changes update desktop navbar &amp; mobile drawer live
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {menuItems.map((item, index) => {
            const hasCustomPage = customPages.some(
              (p) => p.slug.toLowerCase() === item.route.toLowerCase() || p.id === item.pageId
            );

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  item.visible === false ? 'opacity-50 bg-slate-950/40' : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Order controls */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveOrder(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-20 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(index, 'down')}
                      disabled={index === menuItems.length - 1}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-20 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/60 text-amber-400 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {item.label}
                      </h4>
                      {item.hasDropdown && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-900/60 text-blue-300 border border-blue-700/50">
                          Dropdown ({item.items?.length || 0})
                        </span>
                      )}
                      {hasCustomPage && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          Custom Page
                        </span>
                      )}
                      {item.visible === false && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950/70 text-amber-300 border border-amber-800/50 flex items-center gap-1">
                          <EyeOff className="w-2.5 h-2.5" />
                          Hidden from Navbar (Page Preserved)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>Route: <code className="text-amber-300 font-mono">/{item.route}</code></span>
                      {item.items && item.items.length > 0 && (
                        <span className="text-slate-500">
                          • Sub-items: {item.items.map((s) => s.label).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Open in Page Designer if it's a custom page or option */}
                  {hasCustomPage && onOpenPageDesigner && (
                    <button
                      onClick={() => {
                        const matched = customPages.find(
                          (p) => p.slug.toLowerCase() === item.route.toLowerCase() || p.id === item.pageId
                        );
                        onOpenPageDesigner(matched?.id);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-800/50 transition-colors"
                      title="Edit this page layout, blocks, headings and text"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Design Page</span>
                    </button>
                  )}

                  {/* Preview Route on Site */}
                  {onNavigateToRoute && (
                    <button
                      onClick={() => onNavigateToRoute(item.route)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Preview page live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}

                  {/* Toggle Visibility: Hides from navbar only, does NOT delete page */}
                  <button
                    onClick={() => handleToggleVisible(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.visible !== false
                        ? 'bg-blue-950 text-blue-300 hover:bg-blue-900'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-800/40 hover:bg-amber-900/60'
                    }`}
                    title={item.visible !== false ? 'Hide from Navbar (Page remains safe)' : 'Show in Navbar'}
                  >
                    {item.visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                    title="Edit Item Details"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  {/* Delete: Removes menu item AND deletes associated page */}
                  <button
                    onClick={() => handlePromptDelete(item)}
                    className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-400 transition-colors border border-red-900/40 cursor-pointer"
                    title="Delete Menu Item & Associated Page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Menu className="w-5 h-5 text-amber-400" />
                <span>{editingItemId ? 'Edit Navigation Item' : 'Add New Navigation Item'}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMenuItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Menu Label *
                </label>
                <input
                  type="text"
                  required
                  value={itemLabel}
                  onChange={(e) => setItemLabel(e.target.value)}
                  placeholder="e.g. Maritime Heritage, STEM Labs, Research"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Route / URL Slug
                </label>
                <input
                  type="text"
                  value={itemRoute}
                  onChange={(e) => setItemRoute(e.target.value)}
                  placeholder="e.g. maritime-heritage (leave empty to auto-slugify)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-hidden"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Can link to existing routes (about, admission, academics, contact) or a custom slug.
                </p>
              </div>

              {/* Automatic Standard Format Page Creation */}
              {!editingItemId && (
                <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 space-y-3">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoCreatePage}
                      onChange={(e) => setAutoCreatePage(e.target.checked)}
                      className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-950 focus:ring-amber-500"
                    />
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <FolderPlus className="w-4 h-4" />
                      Auto-Create Standard Format Page in Page Designer
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-300">
                    When enabled, a standard BEATS institutional page will be automatically initialized with header banner, headings, intro text, callouts, and action buttons. You can customize all blocks anytime in the Page Designer.
                  </p>

                  {autoCreatePage && (
                    <div className="space-y-2 pt-2 border-t border-blue-900/50">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          Page Subtitle
                        </label>
                        <input
                          type="text"
                          value={pageSubtitle}
                          onChange={(e) => setPageSubtitle(e.target.value)}
                          placeholder="e.g. Promoting maritime discipline and innovative technical skills"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          Category Badge Tag
                        </label>
                        <input
                          type="text"
                          value={pageBadge}
                          onChange={(e) => setPageBadge(e.target.value)}
                          placeholder="e.g. Institutional Ethos, Academic Wing"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Dropdown toggle */}
              <div className="space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemHasDropdown}
                    onChange={(e) => setItemHasDropdown(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-950 focus:ring-amber-500"
                  />
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-400" />
                    Enable Dropdown Sub-Menu
                  </span>
                </label>

                {itemHasDropdown && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <span className="text-xs font-bold text-slate-300 block">
                      Sub-Menu Items ({itemSubItems.length})
                    </span>

                    <div className="space-y-2">
                      {itemSubItems.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between gap-2 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs"
                        >
                          <div>
                            <span className="font-semibold text-white">{sub.label}</span>
                            <span className="text-slate-500 ml-2 font-mono">({sub.route || 'default'})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSubItem(sub.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-800">
                      <input
                        type="text"
                        placeholder="Sub-item label"
                        value={newSubLabel}
                        onChange={(e) => setNewSubLabel(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Route / URL"
                        value={newSubRoute}
                        onChange={(e) => setNewSubRoute(e.target.value)}
                        className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddSubItem}
                        className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md cursor-pointer"
                >
                  {editingItemId ? 'Save Changes' : 'Create Menu Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Item & Page Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-900/60 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-red-950/80 border border-red-800/80 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Menu Item &amp; Page</h3>
                <p className="text-xs text-red-300/80">Permanent removal action</p>
              </div>
            </div>

            <p className="text-sm text-slate-300">
              Are you sure you want to delete <strong className="text-white font-bold">"{deleteCandidate.label}"</strong>?
            </p>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span>Removes <code className="text-amber-300 font-mono">/{deleteCandidate.route}</code> from top navbar &amp; mobile menu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span>Permanently deletes its associated custom page and layout</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeDeleteItem(deleteCandidate.id)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors shadow-lg shadow-red-950/50 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
