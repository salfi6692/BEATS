import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function mediaUploaderPlugin(): Plugin {
  const handleApiRequest = (req: any, res: any, next: any) => {
    const rawUrl = req.url || '';
    const url = rawUrl.split('?')[0];

    // Handle CORS for all /api endpoints
    if (url && (url.startsWith('/api/') || url === '/api' || url.startsWith('api/'))) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
      }
    }

    // 1. Explicitly serve static media files with proper MIME types
    // Supports /media/ as well as any custom directory (e.g. /abc/media/, /uploads/, etc.)
    const ext = path.extname(url).toLowerCase();
    const isMediaExt = ['.webp', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.gif', '.pdf', '.doc', '.docx'].includes(ext);
    if (url && (isMediaExt || url.startsWith('/media/') || url.startsWith('media/')) && !url.startsWith('/api') && !url.startsWith('/@') && !url.startsWith('/src')) {
      const cleanRelPath = url.replace(/^\/+/, '');
      const candidateDirs = [
        path.resolve(process.cwd(), 'public'),
        path.resolve(process.cwd(), 'dist')
      ];
      for (const baseDir of candidateDirs) {
        const filePath = path.resolve(baseDir, cleanRelPath);
        if (filePath.startsWith(baseDir) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
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
          res.setHeader('Access-Control-Allow-Origin', '*');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }
    }

    // 2. Save settings to disk (site-settings.json)
    if ((url === '/api/save-settings' || url === '/api/save-settings.php' || url === 'api/save-settings' || url === 'api/save-settings.php') && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: any) => {
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
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({
            success: true,
            message: 'Settings saved permanently to disk (site-settings.json)',
            updatedAt: settingsToSave.updatedAt
          }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ success: false, error: err?.message || 'Failed to save settings' }));
        }
      });
      return;
    }

    // 3. Read site settings from disk
    if ((url === '/api/settings' || url === '/api/get-settings' || url === '/api/get-settings.php' || url === 'api/settings') && req.method === 'GET') {
      const publicSettingsPath = path.resolve(process.cwd(), 'public/site-settings.json');
      if (fs.existsSync(publicSettingsPath)) {
        const data = fs.readFileSync(publicSettingsPath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(data);
        return;
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
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
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({
            success: true,
            message: 'cPanel ZIP refreshed with all latest changes and media files!'
          }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ success: false, error: err?.message }));
        }
      });
      return;
    }

    // 4. Media file upload endpoint
    if ((url === '/api/upload' || url === '/api/upload.php' || url === 'api/upload' || url === 'api/upload.php') && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          let filename = (parsed.filename || `upload_${Date.now()}.webp`).trim();
          
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
              filename = filename.replace(/\.[^/.]+$/, '') + '.webp';
            }
          }

          let base64Data = rawData;
          if (base64Data.includes(',')) {
            base64Data = base64Data.split(',')[1];
          }

          // Dynamic upload location (e.g. /media, /abc/media, /uploads)
          const rawUploadPath = (parsed.uploadPath || '/media').toString();
          const segments = rawUploadPath
            .replace(/\\/g, '/')
            .split('/')
            .filter((s: string) => s && s !== '..' && s !== '.')
            .map((s: string) => s.replace(/[^a-zA-Z0-9_\-]/g, '_'));
          const cleanUploadRelPath = segments.length > 0 ? segments.join('/') : 'media';
          const uploadUrlPrefix = `/${cleanUploadRelPath}`;

          const mediaDir = path.resolve(process.cwd(), 'public', cleanUploadRelPath);
          if (!fs.existsSync(mediaDir)) {
            fs.mkdirSync(mediaDir, { recursive: true });
          }

          const filePath = path.join(mediaDir, filename);
          const buffer = Buffer.from(base64Data, 'base64');
          fs.writeFileSync(filePath, buffer);

          // Mirror to dist if dist folder exists
          const distDir = path.resolve(process.cwd(), 'dist');
          if (fs.existsSync(distDir)) {
            const distMediaDir = path.resolve(distDir, cleanUploadRelPath);
            if (!fs.existsSync(distMediaDir)) {
              fs.mkdirSync(distMediaDir, { recursive: true });
            }
            fs.writeFileSync(path.join(distMediaDir, filename), buffer);
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({
            success: true,
            url: `${uploadUrlPrefix}/${filename}`,
            filename: filename,
            size: buffer.length
          }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({
            success: false,
            error: err?.message || 'Failed to save media upload'
          }));
        }
      });
      return;
    }
    next();
  };

  return {
    name: 'media-uploader-api',
    configureServer(server) {
      server.middlewares.use(handleApiRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApiRequest);
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
