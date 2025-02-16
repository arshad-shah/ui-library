# UI Library

A modern React component library built with TypeScript and TailwindCSS, offering a collection of accessible and customizable UI components.

[![NPM Version](https://img.shields.io/npm/v/@arshad-shah/ui-library)](https://www.npmjs.com/package/@arshad-shah/ui-library)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/arshad-shah/ui-library)

## Features

- 🎨 Built with TailwindCSS for flexible styling
- ♿ Accessible components with Radix UI primitives
- 📦 Tree-shakeable with ESM support
- 🔥 Framer Motion animations
- 🎯 TypeScript support
- 📚 Storybook documentation

## Components

- Alert
- Button
- Checkbox
- Dropdown
- Empty State
- Error State
- Label
- Password Requirements
- Progress Bar

## Installation

```bash
# Using pnpm (recommended)
pnpm add @arshad-shah/ui-library

# Using npm
npm install @arshad-shah/ui-library

# Using yarn
yarn add @arshad-shah/ui-library
```

### Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "tailwindcss": "^3.0.0"
}
```

## Setup

1. Install the package and its peer dependencies

2. Add the library to your Tailwind CSS configuration:

```js
// tailwind.config.js
module.exports = {
  content: [
    // ...
    './node_modules/@arshad-shah/ui-library/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}
```

## Usage

```jsx
import { Button } from '@arshad-shah/ui-library'

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  )
}
```

## Development

```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm storybook

# Build the library
pnpm build

# Run tests
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Versioning

This library follows [Semantic Versioning](https://semver.org/). We use [Changesets](https://github.com/changesets/changesets) to manage versions and changelogs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide Icons](https://lucide.dev/) for beautiful icons

---
Created and maintained by [Arshad Shah](https://github.com/arshad-shah)