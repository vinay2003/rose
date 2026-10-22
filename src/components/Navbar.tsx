import React, { useState } from 'react';
import { Heart, Edit3, Eye, Menu, X, Sparkles, Download, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenBackup: () => void;
  onReturnToWelcome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isEditMode,
  onToggleEditMode,
  onOpenBackup,
  onReturnToWelcome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Memories', href: '#memories' },
    { label: 'Little Things', href: '#little-things' },
    { label: 'Conversations', href: '#conversations' },
    { label: 'Special Song', href: '#special-song' },
    { label: 'Open When', href: '#open-when' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Promise', href: '#promise' },
    { label: 'Surprise', href: '#surprise' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToWelcome}
            title="Return to Welcome Screen"
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:bg-rose-200 transition-all duration-300">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <span className="font-serif-romantic font-semibold text-lg text-stone-900 tracking-tight group-hover:text-rose-600 transition-colors">
                Our Little World
              </span>
              <span className="block text-[10px] text-rose-400 font-medium tracking-widest uppercase">
                Vinay & Rose
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-rose-600 hover:bg-rose-50/80 rounded-full transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Edit Mode Toggle */}
          <button
            onClick={onToggleEditMode}
            id="toggle-edit-mode-btn"
            title={isEditMode ? 'Switch to Rose\'s View' : 'Turn on Edit Mode to add/edit items'}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
              isEditMode
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs hover:bg-amber-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            {isEditMode ? (
              <>
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                <span>Edit Mode (Active)</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden sm:inline">View Mode</span>
                <span className="sm:hidden">View</span>
              </>
            )}
          </button>

          {/* Backup / Export Button */}
          <button
            onClick={onOpenBackup}
            id="backup-btn"
            title="Backup & Restore memories"
            className="p-2 rounded-full text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-rose-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-lg">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs text-stone-500">
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
            <span className="flex items-center gap-1 text-rose-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>For Rose, with love</span>
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
