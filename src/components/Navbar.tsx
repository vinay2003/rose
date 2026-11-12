import React, { useState, useEffect } from 'react';
import {
  Heart,
  Edit3,
  Eye,
  Menu,
  X,
  Sparkles,
  Download,
  ArrowLeft,
  Camera,
  MessageSquare,
  Music,
  Mail,
  Clock,
  Gift,
  Smile,
  BookOpen,
} from 'lucide-react';

interface NavbarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenBackup: () => void;
  onReturnToWelcome: () => void;
}

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  isEditMode,
  onToggleEditMode,
  onOpenBackup,
  onReturnToWelcome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('daily-letter');

  const navItems: NavItem[] = [
    {
      id: 'daily-letter',
      label: 'Daily Letter',
      shortLabel: 'Letter',
      href: '#daily-letter',
      icon: <Sparkles className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      id: 'our-story',
      label: 'Our Story',
      shortLabel: 'Story',
      href: '#our-story',
      icon: <BookOpen className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      id: 'memories',
      label: 'Memories',
      shortLabel: 'Memories',
      href: '#memories',
      icon: <Camera className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      id: 'little-things',
      label: 'Little Things',
      shortLabel: 'Notes',
      href: '#little-things',
      icon: <Smile className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: 'conversations',
      label: 'Conversations',
      shortLabel: 'Chat',
      href: '#conversations',
      icon: <MessageSquare className="w-3.5 h-3.5 text-violet-500" />,
    },
    {
      id: 'special-song',
      label: 'Special Song',
      shortLabel: 'Song',
      href: '#special-song',
      icon: <Music className="w-3.5 h-3.5 text-sky-500" />,
    },
    {
      id: 'open-when',
      label: 'Open When',
      shortLabel: 'Envelopes',
      href: '#open-when',
      icon: <Mail className="w-3.5 h-3.5 text-emerald-500" />,
    },
    {
      id: 'timeline',
      label: 'Timeline',
      shortLabel: 'Timeline',
      href: '#timeline',
      icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
    },
    {
      id: 'promise',
      label: 'Promises',
      shortLabel: 'Promises',
      href: '#promise',
      icon: <Heart className="w-3.5 h-3.5 text-rose-600" />,
    },
    {
      id: 'surprise',
      label: 'Surprise',
      shortLabel: 'Surprise',
      href: '#surprise',
      icon: <Gift className="w-3.5 h-3.5 text-pink-500" />,
    },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onReturnToWelcome}
            title="Return to Welcome Screen"
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:bg-rose-200 transition-all duration-300 shadow-2xs">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif-romantic font-semibold text-base text-stone-900 tracking-tight group-hover:text-rose-600 transition-colors block leading-tight">
                Our Little World
              </span>
              <span className="text-[10px] text-rose-500 font-medium tracking-widest uppercase block">
                Vinay &amp; Rose ❤️
              </span>
            </div>
          </button>
        </div>

        {/* Desktop / Tablet Scrollable Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-2 max-w-[55vw] lg:max-w-[62vw] xl:max-w-none">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-rose-600 hover:bg-rose-50/80'
                }`}
              >
                {item.icon}
                <span className="hidden xl:inline">{item.label}</span>
                <span className="xl:hidden">{item.shortLabel}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Edit / View Mode Toggle */}
          <button
            onClick={onToggleEditMode}
            id="toggle-edit-mode-btn"
            title={isEditMode ? "Switch to Rose's View Mode" : 'Turn on Edit Mode'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              isEditMode
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs hover:bg-amber-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            {isEditMode ? (
              <>
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Editing</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden sm:inline">View</span>
              </>
            )}
          </button>

          {/* Backup Button */}
          <button
            onClick={onOpenBackup}
            id="backup-btn"
            title="Backup & Export"
            className="p-2 rounded-full text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-5 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-xs font-semibold'
                      : 'bg-stone-50 text-stone-700 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-stone-500">
            <button
              onClick={() => {
                onReturnToWelcome();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-rose-600 font-medium py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Welcome</span>
            </button>
            <span className="flex items-center gap-1 text-rose-400 font-medium text-[11px]">
              <Sparkles className="w-3 h-3" />
              <span>Vinay &amp; Rose Forever</span>
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
