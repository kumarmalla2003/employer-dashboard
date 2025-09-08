# Backend API

This is the backend server for the application, built with Python, Tornado, and MySQL. It provides a RESTful API for user authentication and employee data management.

## Features

*   **User Authentication:**
    *   User signup (`/api/signup`)
    *   User login and session management (`/api/login`)
    *   User logout (`/api/logout`)
    *   Password reset (`/api/reset-password`)
    *   Authentication status check (`/api/check-auth`)
*   **Employee Management (CRUD):**
    *   Create new employees (`POST /api/employees`)
    *   Read a list of all employees (`GET /api/employees`)
    *   Read a single employee's details (`GET /api/employees/{id}`)
    *   Update an employee's information (`PUT /api/employees/{id}`)
    *   Delete an employee (`DELETE /api/employees/{id}`)

## Prerequisites

*   Python 3.13+
*   A running MySQL database server.
*   `uv` (can be installed with `pip install uv`)

## Installation

1.  **Clone the repository and navigate to the `backend` directory.**

2.  **Create and activate a virtual environment:**
    `uv` can create and manage the virtual environment for you.
    ```bash
    uv venv
    source .venv/bin/activate  # On Windows, use `.venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    This project uses `uv` for package management. Sync the environment with the dependencies in `pyproject.toml`.
    ```bash
    uv pip sync pyproject.toml
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your actual database credentials.
    ```env
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    TORNADO_COOKIE_SECRET=a_very_strong_and_secret_key_for_cookie_signing
    ```

5.  **Set up the database:**
    You need to create the database specified in your `.env` file. You also need to create the `users` and `employees` tables. Here are the recommended schemas based on the application code:

    **`users` table:**
    ```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL
    );
    ```

    **`employees` table:**
    ```sql
    CREATE TABLE employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        department VARCHAR(255),
        designation VARCHAR(255),
        salary DECIMAL(10, 2),
        hireDate DATE,
        dateOfBirth DATE,
        address TEXT,
        city VARCHAR(255),
        state VARCHAR(255),
        postalCode VARCHAR(20),
        country VARCHAR(255),
        emergencyContactName VARCHAR(255),
        emergencyContactPhone VARCHAR(50),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    ```

## Usage

Once the installation and configuration are complete, you can run the server using `uv`:

```bash
uv run python main.py
```

The server will start and listen on `http://localhost:8000`.

## Development and Contribution

Currently, there are no automated tests for this project. If you'd like to contribute, please consider adding tests for the API endpoints.

To contribute:
1.  Follow the installation steps.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Submit a pull request.

## Deployment

There are no specific deployment scripts or configurations included in this project. To deploy this application, you would need to:
1.  Set up a production-ready environment with Python and a MySQL database.
2.  Install the dependencies as described in the installation section.
3.  Set the environment variables for your production database.
4.  Use a process manager (like `systemd` or `supervisor`) to run the `main.py` script as a background service.
5.  It is highly recommended to run the application behind a reverse proxy like Nginx or Apache for better performance, security, and load balancing.
