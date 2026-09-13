import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function mediaUploaderPlugin(): Plugin {
  return {
    name: 'media-uploader-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];

        // 1. Explicitly serve /media/ files with proper image MIME types
        // This guarantees dynamically uploaded WebP images load immediately without falling back to index.html
        if (url && (url.startsWith('/media/') || url.startsWith('media/'))) {
          const mediaFilename = path.basename(url);
          const candidateDirs = [
            path.resolve(process.cwd(), 'public/media'),
            path.resolve(process.cwd(), 'dist/media')
          ];
          for (const dir of candidateDirs) {
            const filePath = path.join(dir, mediaFilename);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.webp': 'image/webp',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.ico': 'image/x-icon',
                '.gif': 'image/gif',
                '.pdf': 'application/pdf',
                '.doc': 'application/msword',
                '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                '.txt': 'text/plain',
                '.json': 'application/json'
              };
              res.statusCode = 200;
              res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
        }

        // 2. Save settings to disk (site-settings.json)
        if ((url === '/api/save-settings' || url === '/api/save-settings.php') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              const incoming = parsed.settings || parsed;

              const publicSettingsPath = path.resolve(process.cwd(), 'public/site-settings.json');
              let existing = {};
              if (fs.existsSync(publicSettingsPath)) {
                try {
                  existing = JSON.parse(fs.readFileSync(publicSettingsPath, 'utf8'));
                } catch {}
              }

              const settingsToSave = {
                ...existing,
                ...incoming,
                updatedAt: (incoming.updatedAt && incoming.updatedAt > 0) ? incoming.updatedAt : Date.now()
              };
              const jsonStr = JSON.stringify(settingsToSave, null, 2);

              fs.writeFileSync(publicSettingsPath, jsonStr, 'utf8');

              const distDir = path.resolve(process.cwd(), 'dist');
              if (fs.existsSync(distDir)) {
                fs.writeFileSync(path.join(distDir, 'site-settings.json'), jsonStr, 'utf8');
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                message: 'Settings saved permanently to disk (site-settings.json)',
                updatedAt: settingsToSave.updatedAt
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err?.message || 'Failed to save settings' }));
            }
          });
          return;
        }

        // 3. Read site settings from disk
        if (url === '/api/settings' && req.method === 'GET') {
          const publicSettingsPath = path.resolve(process.cwd(), 'public/site-settings.json');
          if (fs.existsSync(publicSettingsPath)) {
            const data = fs.readFileSync(publicSettingsPath, 'utf8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Settings not yet initialized' }));
            return;
          }
        }

        if (url === '/api/rebuild-zip' && req.method === 'POST') {
          import('child_process').then(({ execSync }) => {
            try {
              execSync('python3 scripts/package-cpanel.py', { stdio: 'inherit' });
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                message: 'cPanel ZIP refreshed with all latest changes and media files!'
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err?.message }));
            }
          });
          return;
        }

        if ((url === '/api/upload' || url === '/api/upload.php') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              let filename = (parsed.filename || `upload_${Date.now()}.png`).trim();
              
              // Sanitize filename: replace spaces & unsafe chars with hyphens/underscores
              filename = filename.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
              
              // Detect format from data if extension missing or unknown
              const rawData = parsed.base64 || parsed.dataUrl || '';
              if (!filename.match(/\.(png|webp|jpg|jpeg|gif|svg|ico|pdf|doc|docx)$/i)) {
                if (rawData.startsWith('data:image/png')) {
                  filename = filename.replace(/\.[^/.]+$/, '') + '.png';
                } else if (rawData.startsWith('data:image/webp')) {
                  filename = filename.replace(/\.[^/.]+$/, '') + '.webp';
                } else if (rawData.startsWith('data:image/svg')) {
                  filename = filename.replace(/\.[^/.]+$/, '') + '.svg';
                } else if (rawData.startsWith('data:image/x-icon') || rawData.startsWith('data:image/vnd.microsoft.icon')) {
                  filename = filename.replace(/\.[^/.]+$/, '') + '.ico';
                } else if (rawData.startsWith('data:application/pdf')) {
                  filename = filename.replace(/\.[^/.]+$/, '') + '.pdf';
                } else {
                  filename = filename.replace(/\.[^/.]+$/, '') + '.png';
                }
              }

              let base64Data = rawData;
              if (base64Data.includes(',')) {
                base64Data = base64Data.split(',')[1];
              }

              const mediaDir = path.resolve(process.cwd(), 'public/media');
              if (!fs.existsSync(mediaDir)) {
                fs.mkdirSync(mediaDir, { recursive: true });
              }

              const filePath = path.join(mediaDir, filename);
              const buffer = Buffer.from(base64Data, 'base64');
              fs.writeFileSync(filePath, buffer);

              // Mirror to dist/media if dist exists
              const distMediaDir = path.resolve(process.cwd(), 'dist/media');
              if (fs.existsSync(distMediaDir)) {
                fs.writeFileSync(path.join(distMediaDir, filename), buffer);
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                url: `/media/${filename}`,
                filename: filename,
                size: buffer.length
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: err?.message || 'Failed to save media upload'
              }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), mediaUploaderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
