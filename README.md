# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)


# ListMate – Shopping List Application

## 1. Project Overview

ListMate is a shopping list management application built with React, TypeScript, and Redux Toolkit. It helps users organise their shopping by creating lists, adding items, managing categories, and searching and sorting their shopping items.

## 2. Main Objectives

- Allow users to register and log in.
- Create, view, and delete shopping lists.
- Add and delete shopping items.
- Organise items by category.
- Store item details such as quantity, notes, and image URL.
- Search and sort shopping items.
- Save application data using a JSON Server API.
- Provide a responsive and user-friendly interface.

## 3. Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Router
- JSON Server
- CSS
- Git and GitHub
- Figma for UI/UX design

## 4. Pseudocode

```text
START APPLICATION

Display login page

IF user has an account
    Allow user to log in
ELSE
    Allow user to register
END IF

IF authentication is successful
    Open home dashboard

    Load shopping lists and items

    WHILE user is using the application
        Allow user to create a shopping list
        Allow user to select a shopping list
        Allow user to add shopping items
        Allow user to edit or delete items
        Allow user to delete shopping lists
        Allow user to filter items by category
        Allow user to search for items
        Allow user to sort items
        Save changes to the API
        Update the displayed information
    END WHILE

    Allow user to view and update their profile
    Allow user to log out
END IF

END APPLICATION
```

## 5. Step-by-Step Implementation Plan

1. **Plan the application:** Identify the main features and user requirements.
2. **Design the interface:** Create the Login, Register, Home Dashboard, and Profile screens in Figma.
3. **Set up the project:** Create the React and TypeScript project and install the required dependencies.
4. **Build the authentication pages:** Develop the registration and login interfaces and authentication logic.
5. **Set up state management:** Configure Redux Toolkit to manage authentication, shopping lists, and shopping items.
6. **Develop shopping lists:** Implement functionality to create, view, and delete shopping lists.
7. **Develop shopping items:** Allow users to add and delete items and store their quantity, category, and notes.
8. **Implement search and filtering:** Add search, category filtering, and sorting functionality.
9. **Connect the API:** Use JSON Server to persist application data.
10. **Build the profile page:** Provide a place for users to view and manage their profile information.
11. **Apply responsive styling:** Test the interface on mobile, tablet, and desktop screen sizes.
12. **Test the application:** Check authentication, CRUD operations, filtering, API requests, and error handling.
13. **Document the project:** Maintain this README with the setup instructions, pseudocode, design link, and project details.
14. **Use GitHub:** Commit changes on feature branches and submit a Pull Request for review.

## 6. Figma Design

**Figma design link:** [https://www.figma.com/design/2B1nUVxrVjyddb5SA1nvLX/MY-LIST?node-id=0-1&t=UYT0iJTBmHAZ8png-1]

 7. Running the Project

Clone the repository:

```bash
git clone https://github.com/tshepang123-dot/myListProject.git
```

Navigate to the project directory:

```bash
cd myListProject
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

If JSON Server is required, open a second terminal and use the server command defined in `package.json`.

## 8. Repository

GitHub: https://github.com/tshepang123-dot/myListProject

## 9. Future Improvements

- Add item editing and completion status.
- Improve profile management.
- Add secure authentication and user-specific data access.
- Improve form validation and error handling.
- Add more automated tests.


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
