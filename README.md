# MERN Todo Application

This is a full-stack application built with React on the frontend and Express on the backend. It includes user authentication and a feature-rich todo list, allowing users to create, update, and delete tasks.

## Table of Contents

- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

---

## Installation

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    npm run dev
    ```

   By default, the backend will be running on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm run dev
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

   By default, the frontend will be running on `http://localhost:5173`.

---

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Sign up or log in using your credentials to access the todo list features.
3. Add, update, or delete tasks to manage your to-do list efficiently.

---

## Features

- **User Authentication**:
  - Secure signup and login functionality.
  - JWT-based authentication and cookie handling for session management.

- **Protected Routes**:
  - Restricts access to authenticated users only.

- **Todo List Management**:
  - Create, read, update, and delete tasks.
  - User-specific tasks stored securely in the database.

- **Responsive Design**:
  - Optimized for both desktop and mobile views.

---

## Technologies Used

- **Frontend**:
  - React
  - CSS

- **Backend**:
  - Node.js
  - Express

- **Database**:
  - MongoDB

- **Authentication**:
  - JSON Web Tokens (JWT)
  - Cookies for secure session handling

---

## Contributing

We welcome contributions to enhance this project. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature:
    ```sh
    git checkout -b feature-branch
    ```

3. Make your changes and commit them with a meaningful message:
    ```sh
    git commit -m 'Add feature: detailed description'
    ```

4. Push your changes to your fork:
    ```sh
    git push origin feature-branch
    ```

5. Open a pull request to the main repository and describe your changes.

## UI Previews

### Signup Page
![signup](https://i.postimg.cc/9fdcByzn/3t.png)

### Login Page
![Login Page](https://i.postimg.cc/rpX8Wfy4/2t.png)

### Home
![Home](https://i.postimg.cc/G2bdg9yh/1t.png)

### Todos
![Todos](https://i.postimg.cc/6TJHz48M/4t.png)

