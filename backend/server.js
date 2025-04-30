const express = require('express');
const session = require('express-session');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Replace these with your Google API credentials
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:5000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));

// Scopes for Google Search Console readonly access
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

// Route to start OAuth flow
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
  res.redirect(authUrl);
});

// OAuth2 callback route
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('No code provided');
  }
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    // Redirect to frontend dashboard after successful login
    res.redirect('http://localhost:3000/dashboard');
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Authentication failed');
  }
});

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.tokens) {
    oauth2Client.setCredentials(req.session.tokens);
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

// API route to get Search Console data (placeholder)
app.get('/api/search-console-data', isAuthenticated, async (req, res) => {
  // TODO: Implement fetching data from Google Search Console API
  res.json({ message: 'Search Console data will be here' });
});

// Serve frontend static files in production (optional)
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
