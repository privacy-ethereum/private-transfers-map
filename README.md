# Private Transfers Map

A web application to showcase different private transfer projects in the ecosystem.

## Features

- Browse private transfer projects with detailed information
- Filter projects by category (zkWormholes, Mixers, Privacy Coins, etc.)
- Search projects by title or description
- View pros and cons for each project
- Responsive design for desktop and mobile

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Data

Projects are stored in `src/data/projects.json` with the following structure:

```json
{
  "title": "Project Name",
  "category": "Category",
  "website": "https://example.com/",
  "description": "Project description...",
  "pros": ["advantage 1", "advantage 2"],
  "cons": ["disadvantage 1", "disadvantage 2"]
}
```

## License

See [LICENSE](LICENSE) file.
