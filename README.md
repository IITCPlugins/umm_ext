# IITC Ultimate Mission Maker Extension

An IITC plugin extension that enhances the Ultimate Mission Maker functionality for Ingress Intel Total Conversion.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- [IITC](https://iitc.app/) installed in your browser
- The [Ultimate Mission Maker](https://github.com/menhera/iitc-plugin-ultimate-mission-maker) plugin already installed in IITC

### Install Dependencies

```bash
yarn install
```

## Building

The project uses [IITC Plugin Kit](https://github.com/IITC-CE/iitc-plugin-kit) for building.

### Available Build Scripts

- `yarn build` - Build in development mode (default)
- `yarn build:dev` - Build with debug information
- `yarn build:prod` - Build production version (minified)
- `yarn start` - Start development file server with auto-reload
- `yarn autobuild` - Watch for changes and rebuild automatically
