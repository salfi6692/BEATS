#!/usr/bin/env python3
"""
Bahria Education & Training System (BEATS) - cPanel public_html Packager
Compiles the application, ensures media folder and .htaccess are packaged,
and creates cpanel-public-html.zip and beats-portal-build.zip in root and public/
"""

import os
import shutil
import subprocess
import zipfile
import sys
import json

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root_dir)
    print("Building application for cPanel deployment...")

    # 1. Ensure public/media directory exists
    os.makedirs(os.path.join(root_dir, 'public', 'media'), exist_ok=True)

    # 2. Run npm run build
    build_res = subprocess.run(['npm', 'run', 'build'], check=False)
    if build_res.returncode != 0:
        print("Build failed with return code", build_res.returncode, file=sys.stderr)
        sys.exit(build_res.returncode)

    dist_dir = os.path.join(root_dir, 'dist')
    if not os.path.exists(dist_dir):
        print("dist directory not found!", file=sys.stderr)
        sys.exit(1)

    # Ensure .htaccess is in dist
    htaccess_src = os.path.join(root_dir, 'public', '.htaccess')
    htaccess_dest = os.path.join(dist_dir, '.htaccess')
    if os.path.exists(htaccess_src):
        shutil.copy2(htaccess_src, htaccess_dest)

    # Ensure site-settings.json is in dist
    settings_src = os.path.join(root_dir, 'public', 'site-settings.json')
    settings_dest = os.path.join(dist_dir, 'site-settings.json')
    if os.path.exists(settings_src):
        shutil.copy2(settings_src, settings_dest)

    # Ensure api folder (PHP scripts) is in dist
    api_src = os.path.join(root_dir, 'public', 'api')
    api_dest = os.path.join(dist_dir, 'api')
    if os.path.exists(api_src):
        os.makedirs(api_dest, exist_ok=True)
        for item in os.listdir(api_src):
            s = os.path.join(api_src, item)
            d = os.path.join(api_dest, item)
            if os.path.isfile(s):
                shutil.copy2(s, d)

    # Ensure default media folder and configured mediaUploadPath are copied to dist
    upload_paths = ['media']
    try:
        if os.path.exists(settings_src):
            with open(settings_src, 'r', encoding='utf-8') as f:
                s_json = json.load(f)
                custom_path = s_json.get('mediaUploadPath', '')
                if custom_path:
                    clean_custom = '/'.join([p for p in custom_path.replace('\\', '/').strip('/').split('/') if p and p not in ('.', '..')])
                    if clean_custom and clean_custom not in upload_paths:
                        upload_paths.append(clean_custom)
    except Exception as e:
        print("Notice: could not parse mediaUploadPath from settings:", e)

    for upath in upload_paths:
        src_path = os.path.join(root_dir, 'public', upath)
        dest_path = os.path.join(dist_dir, upath)
        os.makedirs(src_path, exist_ok=True)
        os.makedirs(dest_path, exist_ok=True)
        if os.path.exists(src_path):
            for root, dirs, files in os.walk(src_path):
                rel = os.path.relpath(root, src_path)
                target_sub = dest_path if rel == '.' else os.path.join(dest_path, rel)
                os.makedirs(target_sub, exist_ok=True)
                for f in files:
                    shutil.copy2(os.path.join(root, f), os.path.join(target_sub, f))

    zip_names = ['cpanel-public-html.zip', 'beats-portal-build.zip']

    for zname in zip_names:
        zip_path = os.path.join(root_dir, zname)
        print(f"Creating {zname}...")
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(dist_dir):
                for file in files:
                    # Do not include other zip archives inside the package
                    if file.endswith('.zip') or file.endswith('.tar.gz'):
                        continue
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, dist_dir)
                    zipf.write(full_path, rel_path)

        # Copy to public directory and dist directory for immediate browser download
        public_dest = os.path.join(root_dir, 'public', zname)
        shutil.copy2(zip_path, public_dest)
        dist_dest = os.path.join(dist_dir, zname)
        shutil.copy2(zip_path, dist_dest)
        print(f"Copied {zname} to public/ and dist/ ({os.path.getsize(zip_path)} bytes)")

    print("cPanel public_html package successfully generated!")

if __name__ == '__main__':
    main()
