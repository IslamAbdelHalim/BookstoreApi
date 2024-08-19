# Project Title
Bookstore API
## Description
A RESTful API for managing an online bookstore. The API allows users to perform CRUD operations on books, handle user authentication, and manage password recovery.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/yourproject.git
    ```
2. Navigate to the project directory:
    ```sh
    cd yourproject
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables
    '''sh
    DB_CONNECTION_STRING=<your-mongo-url>
    JWT_SECRET=<your-jwt-secret>
    '''

## Usage
1. Start the server:
    ```sh
    npm start
    ```
2. The app will be running at `http://localhost:5000`.

## Features
User authentication and authorization.
CRUD operations for books.
Password recovery feature.
Secure token-based authentication using JWT.
Error handling and validation

## API Endpoints
### Authentication
- POST /api/auth/register - Register a new user.
- POST /api/auth/login - Login a user.
- POST /password/forgot-password - Request a password reset.
- POST /password/reset-password - Reset the password.
- GET /api/auth/user/ - To get all user (only for admin)
- GET /api/auth/user/:id - To get the user by Id (only the user and admin)
- PUT /api/auth/user/:id - To update the user info by Id
- DELETE /api/auth/user/:id - To delete the user info by Id

### Books
- GET /api/books - Get all books.
- POST /api/books - Add a new book (Admin only).
- GET /api/books/:id - Get a single book.
- PUT /api/books/:id - Update a book (Admin only).
- DELETE /api/books/:id - Delete a book (Admin only).

### Author
- GET /api/authors - Get all books.
- POST /api/authors - Add a new book (Admin only).
- GET /api/authors/:id - Get a single book.
- PUT /api/authors/:id - Update a book (Admin only).
- DELETE /api/authors/:id - Delete a book (Admin only).

## Error Handling
The project uses middleware for error handling:
- `notFoundError`: Handles 404 errors.
- `errorHandler`: Handles general errors.

## Environment Variables
The following environment variables need to be set in your .env file:
DB_CONNECTION_STRING=<your-mongo-url>
JWT_SECRET=<your-jwt-secret>

## How To Use
You can interact with the API using tools like Postman or curl. Here are some example requests:
- Register a new user:
  curl -X POST http://localhost:3000/api/v1/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'

- Login a user
  curl -X POST http://localhost:3000/api/v1/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'


## Contributing
1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature
    ```
3. Commit your changes:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature
    ```
5. Open a pull request.

## License
This project is licensed under the MIT License.