# Burgers Frontend

Welcome to the **Burgers Frontend** project! This application is a fully functional menu and cart system for a burger shop, built with React, TypeScript, and TailwindCSS. The project includes features like internationalization, responsive design, cart management, and more.

## Table of Contents

- [Features](#features)
- [Assumptions](#assumptions)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [How to Run the Project](#how-to-run-the-project)
- [Process and Choices](#process-and-choices)

---

## Features

- **Dynamic Menu:** Users can view and interact with categories and items dynamically loaded from a mock service.
- **Cart Management:** Add, remove, and update items in the cart.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Internationalization (i18n):** Supports English (EN) and Brazilian Portuguese (PT-BR).
- **Currency Conversion:** Prices are displayed in USD or BRL depending on the selected language.
- **Custom Scrollbars:** Styled scrollbars for better user experience.
- **Toast Notifications:** Success notifications on actions like finishing an order.

---

## Assumptions

- The menu data is fetched from a mock API (`getMenu` service).
- Prices are stored in BRL by default and converted to USD based on a fixed exchange rate.
- Only three routes are implemented: Home ("/"), Login ("/login"), and Contact ("/contact").
- Login and Contact pages are placeholders with an "Under Construction" message.

---

## Folder Structure

```plaintext
src/
├── components/       # Reusable components like Cart, Header, and LanguageToggle
├── contexts/         # Context APIs for menu and language management
├── i18n/             # Internationalization setup and locale files
├── locales/          # JSON files for EN and PT translations
├── pages/            # Route components: Home, Login, and Contact
├── routes/           # Application routes configuration
├── services/         # Mock API services
├── types/            # TypeScript types for the project
├── utils/            # Utility functions (e.g., currency formatting)
├── App.tsx           # Main application component
├── index.tsx         # Entry point of the application
```

---

## Technologies Used

- **React**: For building the UI.
- **TypeScript**: Ensures type safety throughout the project.
- **TailwindCSS**: For styling and responsive design.
- **React Router**: For routing between pages.
- **i18next**: For internationalization.
- **React Hot Toast**: For toast notifications.
- **LocalStorage**: To persist cart data across sessions.

---

## How to Run the Project

### Prerequisites
- Node.js (>= 16.x)
- npm or yarn

### Steps
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd burgers-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

4. Open your browser and navigate to:
    ```plaintext
    http://localhost:3000
    ```

---

## Process and Choices

1. **Componentization**: Components like `Cart`, `Menu`, and `Header` are modular and reusable. This ensures a clean and maintainable codebase.

2. **Responsive Design**: Used TailwindCSS's utility classes to handle responsive behavior effectively, such as collapsing the navbar into a dropdown for mobile devices.

3. **State Management**: Context APIs were implemented for managing the menu and language state, simplifying the app's structure.

4. **Internationalization**: i18n integration allows seamless switching between languages and formats prices based on the selected language.

5. **Error Handling**: Incorporated basic error handling for the menu service and provided fallback UIs (e.g., "Item not found" message).

6. **Mock Data**: Used a mock API service to simulate fetching menu data, making the project self-contained and easy to run.

