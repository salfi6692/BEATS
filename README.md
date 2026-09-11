# Bahria Education & Training System (BEATS) – Bahria Foundation

Official institutional web portal and administrative control suite for **Bahria Education & Training System (BEATS)** under the aegis of Bahria Foundation (Pakistan Navy).

---

## 🚀 Quick Start (Running Locally from ZIP)

This project is built using modern **React 19 + TypeScript + Vite + Tailwind CSS v4**.

### Step 1: Install Dependencies
Open your terminal in this project folder and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Ready Build (`dist/`)

To compile the latest optimized production bundle:
```bash
npm run build
```

The output is saved inside the `dist/` folder:
- **`dist/index.html`**: Production entry point.
- **`dist/assets/`**: Minified CSS and JavaScript bundles.
- **`.htaccess`**: Ready for Apache/cPanel with URL rewrite rules for SPA routing.

### How to Preview the Built Site Locally:
```bash
npx serve dist
```
Or use any local web server extension (e.g. Live Server in VS Code, Python `python3 -m http.server --directory dist`).

---

## 🔐 Administrative Access

- **Admin Login Route**: Navigate to `/#admin` or click **Admin Login** in the top bar / footer.
- **Username**: `salfi6692`
- **Password**: `Bilal@123`

### Admin Features Available:
1. **Hero Slider Customizer**: Add/edit slides, upload custom photos with automatic WebP compression, adjust slide speed.
2. **Campus Gallery Manager**: Upload campus pictures, categorize by Academics/Ceremonies/Campus Life, and reorder.
3. **Section Visibility & Ordering**: Toggle and re-order homepage sections dynamically.
4. **Prospectus & Contact Centralization**: Update the prospectus download link and campus counts globally.
5. **Theme Customization**: Switch between Naval Blue color palettes and typography sizes.
