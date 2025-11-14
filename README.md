# 🚀 Flappy Modi

<p align="center">
  <img src="https://i.postimg.cc/28gQZGqg/IMG-20251114-105703.jpg" width="350"/>
</p>

A modern **Flappy Bird–style web game** built with **React + TypeScript**, optimized for smooth gameplay, responsive UI, and cross-platform support.

---

## 👨‍💻 Author

**Gtajisan (Farhan)**
📧 Email: **[ffjisan804@gmail.com](mailto:ffjisan804@gmail.com)**

🌐 **Play Now:**
👉 **[https://flappy-modi.onrender.com/](https://flappy-modi.onrender.com/)**

---

## ⭐ Features

* 🎮 Smooth 60 FPS gameplay (HTML5 Canvas)
* 📱 Fully responsive (Desktop + Mobile)
* 🖱️ Keyboard, mouse, and touch controls
* 💾 High score saved using `localStorage`
* 🔊 Sound effects + Mute toggle
* 🔀 Procedurally generated pipes
* ⚠️ Real-time collision detection
* 🧩 Clean UI with game states (Menu, Play, Game Over)

---

## 🧰 Tech Stack

| Category          | Tools                  |
| ----------------- | ---------------------- |
| **Frontend**      | React 18.3, TypeScript |
| **Styling**       | Tailwind CSS           |
| **State**         | Zustand                |
| **UI Components** | Radix UI               |
| **Build Tool**    | Vite                   |
| **Backend (dev)** | Express                |

---

## 📦 Installation

### ✔ Prerequisites

* Node.js **18+**
* npm / yarn

### ▶ Setup Instructions

```bash
git clone <repository-url>
cd flappy-modi

npm install
npm run dev
```

Then open:

```
http://localhost:5000
```

---

## 🏗 Production Build

```bash
npm run build
```

Your production files will be in `dist/public`.

---

## 🚀 Deployment Guide

### 📌 GitHub Pages

1. Update `vite.config.ts` → `base` path (if needed)
2. Build project:

```bash
npm run build
```

3. Deploy:

```bash
npm install -g gh-pages
gh-pages -d dist/public
```

4. Select **gh-pages** branch in GitHub settings.

---

### ▲ Vercel Deployment

```bash
npm install -g vercel
vercel
```

Or:

* Go to **vercel.com**
* Import GitHub repo
* Auto-build + deploy

---

### 🌐 Other Hosting Options

* Netlify
* Cloudflare Pages
* Firebase Hosting
* AWS S3 + CloudFront
* Render

---

## 🎮 Game Controls

### 🖥 Desktop

* **Space / Arrow Up** → Jump
* **Mouse Click** → Jump

### 📱 Mobile

* **Tap screen** → Jump

### 🔊 Audio

* **Speaker icon** (top-right) → Mute/Unmute

---

## 🕹 Game Mechanics

* Fly through pipes
* +1 point each pipe passed
* Collision = Game Over
* Auto-save high score
* Balanced difficulty (fair scoring)

---

## 🗂 Project Structure

```
flappy-modi/
├── client/
│   ├── public/
│   │   └── sounds/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FlappyGame.tsx
│   │   │   ├── GameMenu.tsx
│   │   │   ├── GameUI.tsx
│   │   │   ├── GameOver.tsx
│   │   │   └── ui/
│   │   ├── lib/
│   │   │   ├── stores/
│   │   │   └── utils.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🔧 Development Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Build for production     |
| `npm run start` | Run production server    |
| `npm run check` | TypeScript type-checking |

---

## 🌍 Browser Support

* Chrome 90+
* Firefox 88+
* Safari 14+
* Edge 90+
* All modern mobile browsers

---

## ⚡ Performance Optimizations

* Canvas-based rendering
* `requestAnimationFrame` loop
* Optimized collision detection
* Minimal React re-renders
* Preloaded assets

---

## 🐞 Known Issues

None currently. Report issues via email or GitHub.

---

## 🚧 Future Plans

* Difficulty levels
* Character skins
* Online leaderboard
* Achievements
* PWA support
* Extra game modes

---

## 📜 License

MIT — free for personal & commercial use.

---

## 🙌 Credits

* Inspired by **Flappy Bird** by Dong Nguyen
* Developed by **Gtajisan (Farhan)**
* Sounds from public domain resources

---

## 📬 Contact

* **Email:** [ffjisan804@gmail.com](mailto:ffjisan804@gmail.com)
* **GitHub:** [https://github.com/Gtajisan](https://github.com/Gtajisan)

---

