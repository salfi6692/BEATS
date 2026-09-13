/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Converts an uploaded image File to optimized WebP base64 data URL
 * using an HTML5 offscreen Canvas.
 */
export async function convertImageToWebP(file: File, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to WebP format
        try {
          const webpDataUrl = canvas.toDataURL('image/webp', quality);
          // If browser doesn't support webp export, it falls back to png
          resolve(webpDataUrl);
        } catch {
          // Fallback to original read
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image for WebP conversion'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Creates a clean, safe filename with .webp extension
 */
export function sanitizeWebpFilename(originalName: string, prefix?: string): string {
  // Remove file extension
  let baseName = originalName.replace(/\.[^/.]+$/, '').trim();
  // Sanitize characters
  baseName = baseName
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  if (prefix) {
    const cleanPrefix = prefix
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_')
      .replace(/_+/g, '_');
    baseName = `${cleanPrefix}_${baseName}`;
  }

  if (!baseName) {
    baseName = `media_${Date.now()}`;
  }

  // Append short timestamp suffix if name is generic to avoid collision
  const shortTimestamp = Math.floor(Date.now() / 1000).toString().slice(-4);
  return `${baseName}_${shortTimestamp}.webp`;
}

/**
 * Converts image to WebP and physically uploads/saves it into the server's public/media directory.
 * Returns the final URL (/media/filename.webp) and filename.
 */
export async function uploadAndSaveWebP(
  file: File,
  filenamePrefix?: string,
  quality = 0.85
): Promise<{ url: string; filename: string }> {
  // 1. Convert to WebP base64
  const webpDataUrl = await convertImageToWebP(file, quality);
  const filename = sanitizeWebpFilename(file.name, filenamePrefix);

  // 2. Upload to server endpoint to save into public/media
  try {
    const payload = JSON.stringify({
      filename,
      base64: webpDataUrl
    });

    let res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });

    if (!res.ok) {
      // Fallback try upload.php for cPanel Apache environments
      res = await fetch('api/upload.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      });
    }

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        // Return clean URL path for media
        const finalUrl = data.url.startsWith('/') ? data.url : `/${data.url}`;
        return {
          url: finalUrl,
          filename: data.filename || filename
        };
      }
    }
  } catch (err) {
    console.warn('Media upload to server failed, falling back to base64 WebP URL:', err);
  }

  // Graceful fallback to dataUrl so user sees image immediately even if server is offline
  return {
    url: webpDataUrl,
    filename
  };
}

/**
 * Calculates human-readable file size
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Uploads any document/file (e.g. PDF, Word, Excel) to the server's public/media directory.
 * Preserves the original file extension and returns the clean URL (/media/filename.ext).
 */
export async function uploadDocumentFile(
  file: File,
  filenamePrefix = 'doc'
): Promise<{ url: string; filename: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64DataUrl = e.target?.result as string;
      const originalExt = file.name.split('.').pop() || 'pdf';
      let baseName = file.name.replace(/\.[^/.]+$/, '').trim();
      baseName = baseName
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_+|_+$/g, '');

      if (filenamePrefix) {
        baseName = `${filenamePrefix}_${baseName}`;
      }

      const shortTimestamp = Math.floor(Date.now() / 1000).toString().slice(-4);
      const filename = `${baseName || 'document'}_${shortTimestamp}.${originalExt}`;

      try {
        const payload = JSON.stringify({
          filename,
          base64: base64DataUrl
        });

        let res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload
        });

        if (!res.ok) {
          res = await fetch('api/upload.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload
          });
        }

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.url) {
            const finalUrl = data.url.startsWith('/') ? data.url : `/${data.url}`;
            resolve({
              url: finalUrl,
              filename: data.filename || filename
            });
            return;
          }
        }
      } catch (err) {
        console.warn('Document server upload failed, falling back to data URL:', err);
      }

      resolve({
        url: base64DataUrl,
        filename
      });
    };
    reader.onerror = () => reject(new Error('Failed to read document file'));
    reader.readAsDataURL(file);
  });
}
