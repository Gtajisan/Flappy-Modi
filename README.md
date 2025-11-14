# Flappy Modi
[![IMG-20251114-105703.jpg](https://i.postimg.cc/28gQZGqg/IMG-20251114-105703.jpg)](https://postimg.cc/7fMJvgnN)

A web-based Flappy Bird style game featuring responsive design and cross-platform compatibility. Built with modern web technologies for optimal performance and smooth gameplay.

## Author

**Gtajisan (Farhan)**  
Email: ffjisan804@gmail.com

# Website 
game: [tap here](https://flappy-modi.onrender.com/)
## Features

- HTML5 Canvas rendering for smooth 60 FPS gameplay
- Responsive design that works on desktop and mobile devices
- Touch and keyboard controls for cross-platform support
- High score persistence using localStorage
- Sound effects with mute toggle functionality
- Procedurally generated obstacles with increasing difficulty
- Real-time collision detection
- Clean, modern UI with game state management

## Technology Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Zustand
- **UI Components**: Radix UI

## Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd flappy-modi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be generated in the `dist/public` directory.

## Deployment

### GitHub Pages

1. Update the `vite.config.ts` base path if needed
2. Build the project:
```bash
npm run build
```

3. Deploy the `dist/public` folder to GitHub Pages:
```bash
# Using gh-pages package
npm install -g gh-pages
gh-pages -d dist/public
```

4. Configure GitHub repository settings to serve from the gh-pages branch

### Vercel

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Deploy directly from the command line:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments:
- Visit [vercel.com](https://vercel.com)
- Import your repository
- Vercel will automatically detect Vite and configure build settings
- Deploy with one click

### Alternative Deployment Options

The production build can be deployed to any static hosting service:
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Game Controls

### Desktop
- **Space Bar**: Jump/Flap
- **Arrow Up**: Jump/Flap
- **Mouse Click**: Jump/Flap

### Mobile
- **Tap Screen**: Jump/Flap

### Audio
- **Mute Button**: Toggle sound effects and background music (top-right corner)

## Game Mechanics

- Navigate through pipes by clicking or pressing space to flap
- Each successful pipe passed awards 1 point
- Collision with pipes, ground, or ceiling ends the game
- High scores are automatically saved to your browser
- Game difficulty remains consistent for fair scoring

## Project Structure

```
flappy-modi/
├── client/
│   ├── public/
│   │   └── sounds/          # Audio assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── FlappyGame.tsx    # Main game engine
│   │   │   ├── GameMenu.tsx      # Start screen
│   │   │   ├── GameUI.tsx        # In-game HUD
│   │   │   ├── GameOver.tsx      # Game over screen
│   │   │   └── ui/               # Reusable UI components
│   │   ├── lib/
│   │   │   ├── stores/      # Zustand state management
│   │   │   └── utils.ts     # Utility functions
│   │   ├── App.tsx          # Root component
│   │   ├── main.tsx         # Application entry point
│   │   └── index.css        # Global styles
│   └── index.html           # HTML template
├── server/                  # Express server (development)
├── package.json
├── vite.config.ts          # Vite configuration
└── README.md
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking

### Code Quality

The project uses:
- TypeScript for type safety
- ESLint for code linting (configurable)
- Prettier for code formatting (configurable)

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Canvas-based rendering for optimal performance
- RequestAnimationFrame for smooth 60 FPS
- Efficient collision detection algorithms
- Minimal re-renders using React best practices
- Asset preloading for instant gameplay

## Known Issues

None at this time. Please report issues via email or create an issue in the repository.

## Future Enhancements

- Multiple difficulty levels
- Character customization options
- Online leaderboard integration
- Achievement system
- Progressive Web App (PWA) support
- Additional game modes

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Credits

- Original concept inspired by Flappy Bird by Dong Nguyen
- Developed by Gtajisan (Farhan)
- Sound effects from public domain sources

## Contact

For questions, suggestions, or bug reports:
- Email: ffjisan804@gmail.com
- GitHub: [@Gtajisan](https://github.com/Gtajisan)

---

Built with modern web technologies for the best gaming experience.
