import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  BarChart2, 
  HelpCircle, 
  Settings, 
  Info, 
  Eye, 
  Sun,
  Moon,
  Menu, 
  X, 
  ChevronLeft, 
  PlusCircle, 
  Library
} from 'lucide-react';
import { ViewState, ReaderSettings, ThemeMode } from '../types';
import { IslamicStarIcon } from './IslamicPattern';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onBack?: () => void;
  canGoBack: boolean;
  settings: ReaderSettings;
  onSelectThemeMode: (mode: ThemeMode) => void;
  onOpenAddModal: () => void;
  onOpenSettings: () => void;
  completedCount: number;
  totalChapters: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onBack,
  canGoBack,
  settings,
  onSelectThemeMode,
  onOpenAddModal,
  onOpenSettings,
  completedCount,
  totalChapters
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', view: { type: 'home' } as ViewState, icon: Library },
    { label: '50 Pembahasan', view: { type: 'curriculum' } as ViewState, icon: BookOpen },
    { label: 'Pencarian', view: { type: 'search' } as ViewState, icon: Search },
    { label: 'Penanda Buku', view: { type: 'bookmarks' } as ViewState, icon: Bookmark },
    { label: 'Progres', view: { type: 'progress' } as ViewState, icon: BarChart2 },
    { label: 'Kuis Akidah', view: { type: 'quiz' } as ViewState, icon: HelpCircle },
    { label: 'Referensi', view: { type: 'references' } as ViewState, icon: BookOpen },
    { label: 'Tentang', view: { type: 'about' } as ViewState, icon: Info },
  ];

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const isCurrentActive = (view: ViewState) => {
    return currentView.type === view.type;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/90 dark:bg-[#0c1311]/90 backdrop-blur-md border-b border-emerald-900/10 dark:border-emerald-500/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Left Brand and Optional Back Button */}
          <div className="flex items-center gap-3">
            {canGoBack && currentView.type !== 'home' && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition border border-emerald-200 dark:border-emerald-800/50 shadow-xs"
                title="Kembali ke halaman sebelumnya"
              >
                <ChevronLeft size={18} />
                <span className="hidden sm:inline">Kembali</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick({ type: 'home' })}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 flex items-center justify-center text-amber-300 shadow-md border border-amber-500/30 group-hover:scale-105 transition-transform">
                <IslamicStarIcon size={22} className="text-amber-300" />
              </div>
              <div>
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-emerald-950 dark:text-emerald-100 flex items-center gap-1.5">
                  Maktabah Ahlu Sunnah
                </span>
                <p className="text-[11px] sm:text-xs text-emerald-800/80 dark:text-emerald-400 font-medium line-clamp-1">
                  Perpustakaan Digital Ilmu Akidah Islam
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isCurrentActive(item.view);
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    active
                      ? 'bg-emerald-800 text-amber-200 shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            
            {/* Quick Add Button */}
            <button
              onClick={onOpenAddModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs transition"
              title="Tambah Materi Pembahasan Baru"
            >
              <PlusCircle size={15} />
              <span>+ Tambah Materi</span>
            </button>

            {/* Quick Search */}
            <button
              onClick={() => handleNavClick({ type: 'search' })}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition"
              title="Pencarian Materi Akidah"
            >
              <Search size={18} />
            </button>

            {/* 3-Mode Theme Selector: Terang, Gelap, Nyaman */}
            <div className="flex items-center bg-stone-100/90 dark:bg-stone-900/90 p-0.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
              <button
                type="button"
                onClick={() => onSelectThemeMode('terang')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg transition font-medium ${
                  settings.themeMode === 'terang'
                    ? 'bg-white text-emerald-900 font-bold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Mode Terang (Putih Gading)"
              >
                <Sun size={14} className={settings.themeMode === 'terang' ? 'text-amber-600' : ''} />
                <span className="hidden lg:inline text-[11px]">Terang</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectThemeMode('gelap')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg transition font-medium ${
                  settings.themeMode === 'gelap'
                    ? 'bg-emerald-950 text-amber-200 font-bold shadow-xs border border-emerald-800'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Mode Gelap (Malam Temaram)"
              >
                <Moon size={14} className={settings.themeMode === 'gelap' ? 'text-amber-400' : ''} />
                <span className="hidden lg:inline text-[11px]">Gelap</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectThemeMode('nyaman')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg transition font-medium ${
                  settings.themeMode === 'nyaman'
                    ? 'bg-amber-100 text-amber-950 font-bold shadow-xs border border-amber-300'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
                title="Mode Nyaman (Kertas Hangat Sepia)"
              >
                <Eye size={14} className={settings.themeMode === 'nyaman' ? 'text-amber-700' : ''} />
                <span className="hidden lg:inline text-[11px]">Nyaman</span>
              </button>
            </div>

            {/* Settings Modal Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition"
              title="Pengaturan Tampilan & Cadangan Data"
            >
              <Settings size={18} />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition"
              title="Menu Navigasi"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#faf8f5] dark:bg-[#0c1311] border-b border-emerald-900/10 dark:border-emerald-500/20 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2">
          
          {/* Progress pill in mobile */}
          <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/60 rounded-xl flex items-center justify-between border border-emerald-200/50 dark:border-emerald-800/40 mb-3">
            <div>
              <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                Progres Belajar Anda
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">
                {completedCount} dari {totalChapters} Bab Selesai
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-700 text-white">
              {Math.round((completedCount / (totalChapters || 1)) * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const active = isCurrentActive(item.view);
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? 'bg-emerald-800 text-amber-200 shadow-xs'
                      : 'bg-stone-100/70 dark:bg-stone-900/60 text-stone-800 dark:text-stone-200 hover:bg-emerald-100 dark:hover:bg-emerald-950/80'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3-Mode Theme Selector in Mobile */}
          <div className="pt-1 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Pilih Mode Tampilan
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onSelectThemeMode('terang')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition ${
                  settings.themeMode === 'terang'
                    ? 'bg-white text-emerald-950 border-emerald-600 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                }`}
              >
                <Sun size={15} className="text-amber-600" />
                <span>Terang</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectThemeMode('gelap')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition ${
                  settings.themeMode === 'gelap'
                    ? 'bg-emerald-950 text-amber-200 border-emerald-600 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                }`}
              >
                <Moon size={15} className="text-amber-400" />
                <span>Gelap</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectThemeMode('nyaman')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition ${
                  settings.themeMode === 'nyaman'
                    ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                }`}
              >
                <Eye size={15} className="text-amber-700" />
                <span>Nyaman</span>
              </button>
            </div>
          </div>

          <div className="pt-1 flex gap-2">
            <button
              onClick={() => {
                onOpenAddModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-xs"
            >
              <PlusCircle size={16} />
              <span>+ Tambah Materi</span>
            </button>
            <button
              onClick={() => {
                onOpenSettings();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl text-xs font-semibold bg-stone-200 text-stone-800 flex items-center justify-center"
              title="Pengaturan"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
