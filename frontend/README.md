# RecipeVault

RecipeVault is a full-stack web application for managing your personal recipe collection. Users can register, log in, and securely store, view, and organize their recipes with ingredients and step-by-step instructions.

## Features

- User registration and authentication (JWT-based)
- Add, view, and manage your own recipes
- Each recipe supports ingredients and step-by-step instructions
- Light/Dark theme toggle
- Responsive Vue 3 frontend with Vite
- SQLite database backend with Express.js API

## Project Structure

```
backend/
  db.sqlite           # SQLite database file
  init_db.sql         # SQL schema for database initialization
  package.json        # Backend dependencies
  server.js           # Express.js API server

frontend/
  index.html          # Main HTML entry
  package.json        # Frontend dependencies and scripts
  vite.config.js      # Vite configuration
  src/
    App.vue           # Main Vue app
    main.js           # App entry point
    router.js         # Vue Router setup
    auth.js           # Auth helpers
    style.css         # Global styles
    assets/
      theme.css       # Theme variables
    components/
      ThemeToggle.vue # Theme toggle button
    views/
      AddRecipe.vue
      Dashboard.vue
      LoginRegister.vue
      RecipeDetail.vue
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Backend Setup

1. Install dependencies:

   ```sh
   cd backend
   npm install
   ```

2. Initialize the SQLite database:

   ```sh
   sqlite3 db.sqlite < init_db.sql
   ```

3. Start the backend server:

   ```sh
   node server.js
   ```

   The backend will run at [http://localhost:3001](http://localhost:3001).

### Frontend Setup

1. Install dependencies:

   ```sh
   cd frontend
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

   The frontend will run at [http://localhost:5173](http://localhost:5173) (default Vite port).

## Usage

- Register a new account or log in with an existing one.
- Add new recipes, including ingredients and instructions.
- View your recipe collection and details.
- Toggle between light and dark themes.

## Tech Stack

- **Frontend:** Vue 3, Vite, Vue Router, Axios
- **Backend:** Express.js, SQLite, bcryptjs, jsonwebtoken
- **Database:** SQLite

## License

This project is licensed under the ISC License.

---