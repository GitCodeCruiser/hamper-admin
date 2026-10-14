# Hogani Jets Admin - Agent Guidelines

Welcome to the Hogani Jets Admin project. This repository is a Next.js-based admin panel designed for managing aviation services, specifically aircraft listings, categories, and related data.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Material UI (MUI) v7 & Tailwind CSS
- **State Management**: Zustand (primary) & Redux Toolkit (legacy/specific modules)
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Text Editors**: CKEditor 5 & Tiptap
- **Icons**: Lucide React & Iconify

## 📂 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/module/`: Core business logic grouped by module (e.g., `dashboard`, `auth`, `seo`).
  - `components/`: Module-specific components.
  - `pages/`: Page-level components/views.
  - `validation/`: Zod schemas for the module.
- `src/api/`: API hooks (`hooks/`) and endpoint definitions.
- `src/components/`: Shared/Common components.
- `src/lib/functions/`: Helper utilities and validation functions.
- `src/ui/`: Custom UI components (e.g., CkEditor, specific inputs).

## 📝 Coding Standards & Patterns

### 1. Validation Logic

- Always use Zod for form validation.
- Schema files are located in `src/module/<module>/validation/index.zod.ts`.
- **Numeric Fields**: Use `numberFieldSchema` (preprocess to handle strings/nulls) for fields that require float support.
- **Input Constraints**: Use helper functions from `src/lib/functions/validation.ts` (e.g., `handleAmountKeys` for floats, `handleIntegerKeys` for whole numbers) in `onKeyDown` to restrict user input.

### 2. Component Development

- Prefer MUI components for layout (`Grid`, `Box`, `Stack`).
- Use `InputFieldCommon` for standard text/number inputs.
- Ensure all form fields are controlled using `Controller` from `react-hook-form`.

### 3. State & Data

- Use TanStack Query for server state management.
- Keep client state in Zustand where possible.

## ✈️ Aircraft Module specifics

- **Measurement Units**: Always display units in labels (e.g., Range (nm), Service Ceiling (ft)).
- **Float Support**: Ensure numeric aircraft specs (like weights, dimensions, rates) support decimal values.

## 🚀 Common Commands

- `yarn dev`: Start the development server on port 14596.
- `yarn build`: Build the production application.
- `yarn format`: Run linting and prettier formatting.
