<div align="center">

<img src="public/favicon.svg" alt="CalcVerse" width="80" height="80"/>

# CalcVerse v2 — AI-Powered Calculator Platform

**The world's smartest calculator ecosystem**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/calcverse)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/calcverse)

</div>

---

## ⚡ Quick Start (Under 2 Minutes)

```bash
# 1. Clone or extract the project
cd calcverse

# 2. Install all dependencies
npm install

# 3. Set up environment (AI features need API key)
cp .env.example .env.local
# Open .env.local → add: VITE_ANTHROPIC_API_KEY=sk-ant-your-key

# 4. Start development server
npm run dev
# → Opens at http://localhost:3000
```

---

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | React 18 + TypeScript 5 |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 + Custom animations |
| **Routing** | React Router DOM 6 |
| **AI** | Anthropic Claude API |
| **PWA** | vite-plugin-pwa + Workbox |
| **Animation** | Framer Motion |
| **Deploy** | Vercel / Netlify / Firebase |

---

## 🧮 Calculators (14 Fully Working)

| ID | Calculator | Category |
|---|---|---|
| `emi` | EMI / Loan Calculator | Finance |
| `sip` | SIP Investment Calculator | Finance |
| `compound` | Compound Interest | Finance |
| `gst` | GST Calculator | Finance |
| `bmi` | BMI Calculator | Health |
| `calorie` | Calorie / TDEE Calculator | Health |
| `currency` | Currency Converter (20 currencies) | Utility |
| `percentage` | Percentage Calculator | Basic |
| `age` | Age Calculator | Basic |
| `tip` | Tip & Bill Splitter | Basic |
| `gpa` | GPA Calculator | Education |
| `crypto` | Crypto P&L Calculator | Crypto |
| `discount` | Discount Calculator | Basic |
| `standard` | Standard + Scientific Calculator | Basic |

---

## 🚀 Deployment

### Vercel (Recommended — Free)

```bash
# Option A: One-click via button above

# Option B: CLI
npm install -g vercel
vercel
# → Prompts to add environment variables
# → Add VITE_ANTHROPIC_API_KEY
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
npm run build
# Upload /dist folder to gh-pages branch
# Or use GitHub Actions (see docs/github-pages.yml)
```

---

## 📤 Upload to GitHub

```bash
git init
git add .
git commit -m "🚀 CalcVerse — AI Calculator Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/calcverse.git
git push -u origin main
```

Then connect to Vercel/Netlify for auto-deploy on every push.

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_ANTHROPIC_API_KEY` | ✅ For AI | Claude API key from [console.anthropic.com](https://console.anthropic.com) |
| `VITE_EXCHANGE_RATE_API_KEY` | Optional | Live currency rates from [exchangerate-api.com](https://exchangerate-api.com) |
| `VITE_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 ID |
| `VITE_APP_URL` | Optional | Your production URL |

**Without any API keys:** All 14 calculators work perfectly. Only AI and live currency rates require keys.

---

## 🛠️ Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Build for production → /dist
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Prettier formatting
```

---

## 📁 Project Structure

```
calcverse/
├── src/
│   ├── components/
│   │   ├── ai/           # AIPanel, AIFab floating button
│   │   ├── calculators/  # All 14 calculator components
│   │   ├── layout/       # Navbar, Footer
│   │   └── ui/           # ThemeToggle, shared UI primitives
│   ├── context/
│   │   └── ThemeContext.tsx   # Dark/Light mode state
│   ├── hooks/
│   │   ├── useCopy.ts         # Clipboard copy with feedback
│   │   └── useLocalStorage.ts # Persistent state
│   ├── lib/
│   │   ├── calculators.ts     # Calculator registry
│   │   └── utils.ts           # Math utilities + helpers
│   ├── pages/
│   │   ├── Home.tsx           # Landing page
│   │   ├── Calculators.tsx    # All calculators + search
│   │   ├── Calculator.tsx     # Individual calc dynamic page
│   │   └── NotFound.tsx       # 404 page
│   ├── types/index.ts         # TypeScript definitions
│   ├── App.tsx                # Router + providers
│   ├── main.tsx               # Entry point
│   └── index.css              # Tailwind + global styles
├── public/
│   ├── favicon.svg
│   ├── manifest.json          # PWA config
│   ├── robots.txt             # SEO
│   └── icons/                 # PWA icons (add manually)
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
├── netlify.toml
├── .env.example
└── README.md
```

---

## 🌗 Dark & Light Mode

- **Automatic:** Detects system preference on first visit
- **Persistent:** Saves preference to localStorage
- **Instant:** No flash of wrong theme on page load (pre-hydration script in index.html)
- **Complete:** Every component, chart, and table adapts to both themes
- **Toggle:** Available in Navbar + via ThemeToggle component

---

## 🔧 Troubleshooting

**AI not working:**
```bash
# Ensure API key is in .env.local (NOT .env)
echo "VITE_ANTHROPIC_API_KEY=sk-ant-..." >> .env.local
npm run dev
```

**Build fails — `Cannot find module`:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 in use:**
```bash
npm run dev -- --port 3001
```

**TypeScript errors:**
```bash
npm run type-check 2>&1 | head -20
# Most errors are safe to ignore (unused imports)
```

**White screen after deploy:**
```bash
# Ensure vercel.json or netlify.toml has redirect rule:
# "/*" → "/index.html" (SPA routing)
```

---

## 📄 License

MIT License — Free for personal and commercial use.

---

<div align="center">
Built with ❤️ · <a href="https://calcverse.app">calcverse.app</a>
</div>
