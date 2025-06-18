const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const db = new sqlite3.Database('./db.sqlite');
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'super_secret_change_this';

// Auth helpers
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
}
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Register
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const hash = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], function(err) {
    if (err) return res.status(400).json({ error: 'User exists' });
    res.json({ id: this.lastID });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  });
});

// Get recipes for user
app.get('/api/recipes', auth, (req, res) => {
  db.all('SELECT * FROM recipes WHERE user_id = ?', [req.user.id], (err, recipes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(recipes);
  });
});

// Get single recipe with ingredients and steps
app.get('/api/recipes/:id', auth, (req, res) => {
  const recipeId = req.params.id;
  db.get('SELECT * FROM recipes WHERE id = ? AND user_id = ?', [recipeId, req.user.id], (err, recipe) => {
    if (!recipe) return res.status(404).json({ error: 'Not found' });
    db.all('SELECT name FROM ingredients WHERE recipe_id = ?', [recipeId], (e, ingredients) => {
      db.all('SELECT step_number, description FROM steps WHERE recipe_id = ? ORDER BY step_number', [recipeId], (sErr, steps) => {
        res.json({ ...recipe, ingredients, steps });
      });
    });
  });
});

// Add recipe
app.post('/api/recipes', auth, (req, res) => {
  const { title, description, cooking_time, servings, ingredients, steps } = req.body;
  db.run(
    'INSERT INTO recipes (user_id, title, description, cooking_time, servings) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, title, description, cooking_time, servings],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      const recipeId = this.lastID;
      // Ingredients
      if (ingredients && ingredients.length) {
        ingredients.forEach(ing => {
          db.run('INSERT INTO ingredients (recipe_id, name) VALUES (?, ?)', [recipeId, ing.name]);
        });
      }
      // Steps
      if (steps && steps.length) {
        steps.forEach((step, i) => {
          db.run('INSERT INTO steps (recipe_id, step_number, description) VALUES (?, ?, ?)', [recipeId, i + 1, step.description]);
        });
      }
      res.json({ id: recipeId });
    }
  );
});

// Start server
app.listen(3001, () => console.log('Backend running on http://localhost:3001'));