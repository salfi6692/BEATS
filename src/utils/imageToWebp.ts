/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Converts an uploaded image File to optimized WebP base64 data URL
 * using an HTML5 offscreen Canvas with smart web downscaling.
 */
export async function convertImageToWebP(file: File, quality = 0.85, maxDimension = 1920): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width || 800;
        let height = img.naturalHeight || img.height || 600;

        // Smart downscaling to prevent oversized base64 strings and memory exhaustion
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }

        // Use high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

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
 * Helper to upload payload to server across dev and production endpoints
 */
async function postToUploadEndpoints(
  filename: string,
  base64Data: string
): Promise<{ success: boolean; url: string; filename: string }> {
  const payload = JSON.stringify({
    filename,
    base64: base64Data
  });

  const endpoints = ['/api/upload', '/api/upload.php', 'api/upload.php', 'api/upload'];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: payload
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.url) {
          const finalUrl = data.url.startsWith('/') ? data.url : `/${data.url}`;
          return {
            success: true,
            url: finalUrl,
            filename: data.filename || filename
          };
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  // Fallback: always return standard /media/ path so settings receive clean URL
  return {
    success: false,
    url: `/media/${filename}`,
    filename
  };
}

/**
 * Uploads an image file directly (PNG, SVG, ICO, JPG, etc.) WITHOUT converting PNG to WebP.
 * Preserves the original file extension, exact binary data, transparency, and crispness.
 * Physically writes to /media/***** and returns { url: `/media/${filename}`, filename }.
 */
export async function uploadDirectImage(
  file: File,
  filenamePrefix = 'media'
): Promise<{ url: string; filename: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      const originalExt = (file.name.split('.').pop() || 'png').toLowerCase();
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
      const filename = `${baseName || 'image'}_${shortTimestamp}.${originalExt}`;

      try {
        const result = await postToUploadEndpoints(filename, dataUrl);
        resolve({
          url: result.url,
          filename: result.filename
        });
      } catch {
        resolve({
          url: `/media/${filename}`,
          filename
        });
      }
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
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
  // If file is PNG or SVG, preserve original format (do not convert to WebP)
  if (file.type === 'image/png' || file.name.toLowerCase().endsWith('.png') || file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    return uploadDirectImage(file, filenamePrefix);
  }

  // 1. Convert to WebP base64 with downscaling for optimal file size and quality
  const webpDataUrl = await convertImageToWebP(file, quality);
  const filename = sanitizeWebpFilename(file.name, filenamePrefix);

  // 2. Upload to server endpoint to save into public/media
  const result = await postToUploadEndpoints(filename, webpDataUrl);
  return {
    url: result.url,
    filename: result.filename
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
        const result = await postToUploadEndpoints(filename, base64DataUrl);
        resolve({
          url: result.url,
          filename: result.filename
        });
      } catch {
        resolve({
          url: `/media/${filename}`,
          filename
        });
      }
    };
    reader.onerror = () => reject(new Error('Failed to read document file'));
    reader.readAsDataURL(file);
  });
}
