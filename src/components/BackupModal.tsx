import React, { useRef, useState } from 'react';
import { Download, Upload, X, Check, AlertCircle } from 'lucide-react';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
  onImport: (jsonData: any) => void;
  onResetAll: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  onExport,
  onImport,
  onResetAll,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus(null);
    setErrorStatus(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        onImport(parsed);
        setImportStatus('Backup successfully restored!');
      } catch (err) {
        console.error('Import parse error:', err);
        setErrorStatus('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
          Backup & Keepsake
        </h3>
        <p className="text-xs text-stone-500 mb-6">
          Save all your memories, love notes, chat quotes, envelopes, and timeline to a file so they are never lost.
        </p>

        {importStatus && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{importStatus}</span>
          </div>
        )}

        {errorStatus && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorStatus}</span>
          </div>
        )}

        <div className="space-y-3">
          {/* Export */}
          <button
            onClick={onExport}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 transition-colors cursor-pointer text-left"
          >
            <div>
              <span className="font-semibold text-sm block">Export Backup (.json)</span>
              <span className="text-xs text-rose-700/80">
                Download a file of all your memories and texts
              </span>
            </div>
            <Download className="w-5 h-5 text-rose-500 shrink-0" />
          </button>

          {/* Import */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 text-stone-900 border border-stone-200 transition-colors cursor-pointer text-left"
          >
            <div>
              <span className="font-semibold text-sm block">Restore From Backup</span>
              <span className="text-xs text-stone-500">
                Upload a previously saved .json backup file
              </span>
            </div>
            <Upload className="w-5 h-5 text-stone-500 shrink-0" />
          </button>

          {/* Reset */}
          <div className="pt-4 border-t border-stone-100">
            <button
              onClick={() => {
                if (
                  confirm(
                    'Are you sure you want to reset all content back to initial defaults? (Make sure to export a backup first!)'
                  )
                ) {
                  onResetAll();
                  onClose();
                }
              }}
              className="w-full py-2 text-xs text-stone-400 hover:text-red-600 transition-colors"
            >
              Reset website to defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
