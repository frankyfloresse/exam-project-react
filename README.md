# Recipe App Project

A simple React application for managing recipes and users, built with React, Redux, and TypeScript.

## Features

- **Authentication** - Login using dummyjson.com credentials
- **Navigation Menu** - Dynamic menu with user logo and links based on auth status
- **Search** - Search recipes/users by text or ID
- **Pagination** - Paginated lists for all data
- **Users**
    - List view with basic info
    - Detailed user profile with recipes
- **Recipes**
    - Browse recipes with tags
    - Detailed recipe view
    - Filter by tags

## Project Structure

```
public/
src/
  ├── api/          # Handles API requests and integrations
  ├── assets/       # Stores static files like images and icons
  ├── components/   # Reusable UI components
  ├── constants/    # Stores constants used throughout the app
  ├── layouts/      # Layout components used to wrap pages
  ├── pages/        # Different views/pages of the app
  ├── redux/        # Redux store, actions, reducers for state management
  ├── routes/       # Handles application routing
  ├── types/        # TypeScript types and interfaces
  ├── utils/        # Utility functions
  ├── validators/   # Validation logic for forms and user input
  ├── index.css     # Global CSS file
  ├── main.tsx      # Entry point for the React app
  └── vite-env.d.ts # TypeScript environment configuration for Vite
```

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```
