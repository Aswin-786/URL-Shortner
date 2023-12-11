# URL-Shortner

## Overview

This project implements an authenticated URL shortener using Node.js (Nest.js) on the backend and React for the frontend. It allows users to securely register, log in, and shorten URLs, accessible only to authenticated users.

## Technologies Used

- **Backend**:
  - Nest.js: Framework for building efficient and scalable Node.js server-side applications.
  - MongoDB: Database for storing user information and shortened URLs.
  - JWT: Token-based authentication for securing routes.

- **Frontend**:
  - React: Frontend framework for building a user-friendly interface.

## Features

- **Authentication**:
  - Secure user registration, login, and logout routes.
  - Hashed password storage for enhanced security.
  - JWT-based token authentication for protected routes.

- **URL Shortening**:
  - Routes to create and retrieve shortened URLs, accessible only to authenticated users.

## Usage

### Backend Setup

1. Install dependencies: `npm install`
2. Configure environment variables (e.g., MongoDB URI, JWT secret, JWT expiry)
3. Run the server: `npm run start:dev`

### Frontend Setup

1. Install dependencies: `npm install`
2. Run: `npm start`
   
## Folder Structure

- `/backend`: Backend source code
  - `/src/auth`: Authentication logic
  - `/src/url`: URL shortening logic
  - `/controllers`, `/services`, `/models`: Nest.js standard structure
  
- `/client`: Frontend Source code
  - `/public`, `/src`: React  source files


## Documentation and Learning Resources

Referred to the official [Nest.js documentation](https://docs.nestjs.com),
ChatGPT.

## AI-Assistence

ChatGPT was used as an aid in improving code quality, offering insights, suggestions, and learning assistance for Nest.js. While not solely dependent on ChatGPT, it significantly contributed to code quality enhancement and learning during development.

