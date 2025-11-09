# UNED Group Links

A React-based web application for managing and organizing useful links for UNED groups. Built with React 18, Chakra UI, and Cordova for multi-platform support.

## Features

- Modern React 18 with Chakra UI components
- Responsive design with Tailwind CSS
- PWA support with service workers
- Cordova integration for mobile deployment
- Docker support for easy development

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose (optional, for containerized development)
- For Cordova builds: Android SDK, iOS development tools

## Getting Started

### Option 1: Using Docker (Recommended)

```bash
# Build and run with docker-compose
docker-compose up

# Or build the image manually
docker build -t uned-group-links .
docker run -p 3000:3000 uned-group-links
```

The application will be available at http://localhost:3000

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will open in your browser at http://localhost:3000

### Production Build

```bash
# Create production build
npm run build
```

The build output will be in the `build/` directory.

## Cordova Builds

For mobile platform builds:

```bash
# Android
cordova build android
cordova run android

# iOS
cordova build ios
cordova run ios

# Browser (for testing)
cordova build browser
cordova run browser
```

## Project Structure

```
uned-group-links/
├── public/              # Static files
├── src/
│   ├── assets/         # Images, fonts, and static assets
│   ├── components/     # React components
│   ├── pages/          # Page components
│   └── theme/          # Chakra UI theme configuration
├── config/             # Webpack and build configuration
├── scripts/            # Build and development scripts
├── Dockerfile          # Docker configuration
└── docker-compose.yml  # Docker Compose configuration
```

## Technologies Used

- **React 18** - UI library
- **Chakra UI** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **React Router** - Routing
- **Webpack 5** - Module bundler
- **Cordova** - Mobile app framework
- **Docker** - Containerization

## License

MIT License - see LICENSE file for details

## Author

Alexandros Kourtis
- Email: alexandros.kourtis@acg.edu
- Website: https://alexkourtis.me
