# Full-Stack React and Express App

## Overview

This is a full-stack application built using React.js for the frontend and Express.js for the backend. It provides a basic setup to help you understand how to connect a React frontend with an Express backend.

## Technology Stack

### Backend (Express.js)

- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling tool
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing
- **Dotenv**: Loads environment variables from a `.env` file
- **Helmet**: Helps secure Express apps by setting various HTTP headers

### Frontend (React.js)

- **React**: JavaScript library for building user interfaces
- **React Router DOM**: Declarative routing for React.js
- **React Bootstrap**: Bootstrap components for React
- **React Icons**: Popular icons for React
- **Axios**: Promise-based HTTP client for the browser and Node.js
- **Vite**: Build tool that provides a faster and leaner development experience

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.0.0)
- npm or yarn

### Cloning the Repository

To clone the repository, run:

```bash
git clone https://github.com/Mushthaquekpp/ecommerce
cd ecommerce
```

## Setting Up the Backend

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your MongoDB connection string:

   ```env
   MONGO_URL=mongodb://localhost:27017/novanectar
   PORT=8080
   ```

4. Start the Express server:

   ```bash
   npm start
   ```

## Setting Up the Frontend

1. Navigate to the `client` directory:

   ```bash
   cd ../client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application should now be running at [http://localhost:5173](http://localhost:5173).

## Building for Production

To build the frontend for production, run:

```bash
npm run build



```
