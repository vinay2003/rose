// Storage utility for local persistence using LocalStorage and IndexedDB

const DB_NAME = 'OurLittleWorldDB';
const DB_VERSION = 1;
const AUDIO_STORE = 'audio_tracks';
const PHOTO_STORE = 'photos_store';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(AUDIO_STORE)) {
        db.createObjectStore(AUDIO_STORE);
      }
      if (!db.objectStoreNames.contains(PHOTO_STORE)) {
        db.createObjectStore(PHOTO_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save audio blob to IndexedDB
export async function saveAudioBlob(key: string, blob: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE, 'readwrite');
    const store = tx.objectStore(AUDIO_STORE);
    const req = store.put(blob, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Get audio blob from IndexedDB
export async function getAudioBlob(key: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(AUDIO_STORE, 'readonly');
      const store = tx.objectStore(AUDIO_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Failed to load audio blob from IndexedDB', e);
    return null;
  }
}

// Delete audio blob
export async function deleteAudioBlob(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(AUDIO_STORE, 'readwrite');
      const store = tx.objectStore(AUDIO_STORE);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Failed to delete audio blob', e);
  }
}

// Generic LocalStorage helpers with type safety
export function getLocalItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(`our_little_world_${key}`);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key ${key}:`, error);
    return defaultValue;
  }
}

export function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`our_little_world_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving localStorage key ${key}:`, error);
  }
}

export function removeLocalItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`our_little_world_${key}`);
  } catch (error) {
    console.error(`Error removing localStorage key ${key}:`, error);
  }
}
