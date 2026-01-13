const DB_NAME = 'SmartCityModelCache';
const STORE_NAME = 'models';
const DB_VERSION = 1;

export const clearModelCache = async (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject('Error opening database');
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const deleteRequest = store.delete(url);
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject('Error deleting from cache');
    };
  });
};

export const getCachedModelUrl = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject('Error opening database');

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = async (event: any) => {
      const db = event.target.result;
      
      try {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const getRequest = store.get(url);

        getRequest.onsuccess = async () => {
          if (getRequest.result) {
            console.log('Model loaded from IndexedDB cache');
            resolve(URL.createObjectURL(getRequest.result));
          } else {
            console.log('Model not in cache, fetching...', url);
            try {
              const response = await fetch(url);
              if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
              
              // Clone response to get blob for cache and for return
              const blob = await response.blob();
              
              const writeTransaction = db.transaction([STORE_NAME], 'readwrite');
              const writeStore = writeTransaction.objectStore(STORE_NAME);
              writeStore.put(blob, url);
              
              console.log('Model cached to IndexedDB');
              resolve(URL.createObjectURL(blob));
            } catch (err) {
              console.error('Fetch error:', err);
              reject(err);
            }
          }
        };
        
        getRequest.onerror = () => reject('Error reading from cache');
      } catch (err) {
        // Fallback if store doesn't exist or other DB error
        console.error('DB Error:', err);
        // Try direct fetch if DB fails
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            resolve(URL.createObjectURL(blob));
        } catch (fetchErr) {
            reject(fetchErr);
        }
      }
    };
  });
};
