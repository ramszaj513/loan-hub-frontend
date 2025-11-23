# LoanHub Frontend

A modern, fast, and beautiful frontend for LoanHub, built with React, Vite, and Tailwind CSS.

## Major Dependencies

- **React** 19
- **Vite** (build tool)
- **Tailwind CSS** 4 (utility-first CSS framework)
- **shadcn/ui** (headless UI components, based on Radix UI)
- **react-router-dom** 7 (routing)
- **@react-oauth/google** (Google OAuth integration)
- **lucide-react** (icon set)

## Package Manager

This project uses **npm** as the package manager.

## Getting Started

### 1. Clone the repository

```sh
git clone 
cd loan-hub-frontend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add your Google OAuth client ID:

```
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 4. Run the development server

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 5. Build for production

```sh
npm run build
```

### 6. Preview the production build

```sh
npm run preview
```

## Linting

```sh
npm run lint
```

---

For more details, see the code and comments in the repository.
