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
        } catch (err) {
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
