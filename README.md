# SEO Dashboard Web Application

This project is a web application to integrate Google Search Console data using Google OAuth 2.0 for authentication and display SEO organic data in a dashboard.

## Technology Stack

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- OAuth 2.0 with Google for authentication
- Chart.js for charts
- CSV download functionality (placeholder)

## Setup Instructions

### Google API Credentials

You need to create OAuth 2.0 credentials in the Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create a new OAuth 2.0 Client ID for a Web application.
3. Add authorized redirect URI: `http://localhost:5000/oauth2callback`
4. Copy the Client ID and Client Secret.

Add these credentials in `backend/server.js` by replacing the placeholders:

```js
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:5000/oauth2callback';
```

### Backend Setup

1. Navigate to the `backend` folder.
2. Run `npm install express express-session googleapis cors`.
3. Start the server: `node server.js`.
4. The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `frontend` folder.
2. Run `npm install`.
3. Start the React app: `npm start`.
4. The frontend will run on `http://localhost:3000`.

### Usage

- Open `http://localhost:3000` in your browser.
- Click "Conectar com Google" to authenticate.
- After successful login, you will be redirected to the dashboard.
- The dashboard currently shows placeholder data and UI.
- Implement real data fetching in backend `/api/search-console-data` route.

## Security and Privacy

- OAuth 2.0 flow follows best practices with offline access and session management.
- No user data is stored without consent.
- Tokens are stored in session only.

## Next Steps

- Implement fetching real data from Google Search Console API in backend.
- Enhance frontend dashboard with real data and CSV download.
- Add more filters and SEO recommendations logic.
- Deploy to Firebase Hosting or Vercel as needed.

---

If you need help creating Google API credentials or further customization, feel free to ask.
