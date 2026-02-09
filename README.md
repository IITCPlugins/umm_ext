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
- `yarn build:prod` - Build production version
- `yarn start` - Start development file server with auto-reload
- `yarn autobuild` - Watch for changes and rebuild automatically
- `yarn merge` - Merge `dist/iitc.user.js` and `dist/editor.user.js` into `dist/iitc-ultimate-mission-maker.user.js`

### Workflow - IITC-Plugin

For rapid development, use Firefox with Violentmonkey to enable automatic script reloading:

1. Run `yarn autobuild` to start the development server and watch for file changes
2. Open `https://localhost:8100` in your browser and install `iitc.user.js`
3. As you edit source files, the script rebuilds automatically

**Note:** The autobuild command rebuilds only the individual bundles. To create the final merged userscript, run `yarn merge-userscripts` separately after building.

## Plugin Structure

### Architecture Overview

The plugin is organized into modular components across two main parts:

#### Part 1: IITC Intel Map Editor (`src/`)

- **`src/Main.ts`** - Main entry point and plugin initialization; coordinates submodules
- **`src/State/`** - Data management layer
  - `State.ts` - Central data container for mission data
  - `Missions.ts` - Mission collection and operations (split, merge, validate)
  - `Mission.ts` - Individual mission representation
  - `Portals.ts` - Portal collection and validation
  - `StateMigration.ts` - Handles data format versioning and migrations
- **`src/UI/`** - User interface and rendering
  - `ButtonBar.ts` - Toolbar controls and sidebar updates
  - `RenderPath.ts` - Path visualization and drag-and-drop editing
  - `RenderNumbers.ts` - Mission number markers on the map
  - `EditWaypoint.ts` - Portal-specific objective editor
  - `Notification.ts` - Toast notifications
  - `Dialog/` - Modal dialogs for mission management
- **`src/Edits.ts`** - Mission editing operations (add portal, undo, split, merge, reverse)
- **`src/ImportExport.ts`** - JSON import/export functionality for mission data

#### Part 2: Mission Editor/Creator (`src_MissionEditor/`)

- **`src_MissionEditor/Main.ts`** - Mission editor integration for the MAT (Mission Author Tool) interface
