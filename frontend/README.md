# Frontend Application

This is the frontend for the application, built with React and Vite. It provides a user interface for interacting with the backend API to manage employee data.

## Features

*   **User Authentication:**
    *   Responsive landing page.
    *   User signup, login, and password reset via modals.
    *   Authenticated routes protected from public access.
*   **Employee Dashboard:**
    *   A central dashboard page after login.
*   **Employee Management:**
    *   View a list of all employees.
    *   View detailed information for a single employee.
    *   Add new employees via a dedicated form.
    *   Edit existing employee information.
    *   Delete employees.
*   **Styling:**
    *   Styled with TailwindCSS for a modern, utility-first design.

## Prerequisites

*   Node.js (latest LTS version recommended)
*   npm (comes with Node.js)

## Installation

1.  **Navigate to the `frontend` directory from the project root.**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage (Development)

To start the development server, run the following command:

```bash
npm run dev
```

This will start the Vite development server, and you can view the application in your browser at `http://localhost:5173` (Vite's default port). The server will automatically reload when you make changes to the code.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production. The output will be in the `dist` directory.
*   `npm run lint`: Lints the source code using ESLint to check for errors and style issues.
*   `npm run preview`: Serves the production build locally to preview it before deployment.

## Connecting to the Backend

This frontend application is designed to communicate with the backend API. The API URL is currently hardcoded in the source code to point to `http://localhost:8000`.

**For development, you must have the backend server running simultaneously.** Please follow the instructions in the [backend README](../backend/README.md) to set up and run the backend server.

## Deployment

To deploy this application, you first need to build it:
```bash
npm run build
```
This will create a `dist` directory with static files. You can then deploy this `dist` directory to any static hosting service, such as Netlify, Vercel, or GitHub Pages.

Make sure to configure your production environment so that the frontend can communicate with your deployed backend API. This might involve updating the hardcoded URL before building or configuring a reverse proxy to forward API requests from the frontend's domain to the backend server.
