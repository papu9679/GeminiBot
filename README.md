# GeminiBot

GeminiBot is a full-stack AI chat application built with React and Google Gemini. The frontend provides a clean conversational interface with Markdown response rendering, while the Express backend keeps the Gemini API key on the server and sends the conversation history to Gemini.

## Features

- Chat with Google Gemini through a browser-based interface
- Send a full conversation history for contextual replies
- Render bot responses with Markdown and GitHub Flavored Markdown
- Loading and error states in the chat interface
- Responsive layout powered by Tailwind CSS
- Express API with CORS and JSON request handling

## Project Structure

```text
GeminiBot/
├── backend/
│   ├── index.js                 # Express server
│   ├── routes/geminiRoute.js    # Gemini API route
│   └── services/geminiService.js  # Google Gemini integration
└── frontend/
    └── src/
        ├── App.jsx              # Chat interface
        ├── index.css            # Global styles
        └── main.jsx             # React entry point
```

## Requirements

- Node.js 18 or newer
- A Google Gemini API key

## Setup

### 1. Configure the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the API server:

```bash
node index.js
```

The backend runs on `http://localhost:3000`.

### 2. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will print the local frontend URL, typically `http://localhost:5173`.

## API

### `POST /gemini/ask`

Accepts either a question string or an array of chat messages.

Example request:

```json
{
	"question": [{ "role": "user", "text": "Explain recursion simply." }]
}
```

Example response:

```json
{
	"message": "Recursion is ..."
}
```

The backend maps frontend `user` messages to Gemini `user` messages and `bot` messages to Gemini `model` messages before calling the Gemini API.

## Available Scripts

### Frontend

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

### Backend

Run `node index.js` to start the Express server. The backend does not currently define automated test scripts.

## Notes

- Keep `GEMINI_API_KEY` private and do not commit `.env` files.
- The frontend currently sends requests to the deployed backend URL configured in `frontend/src/App.jsx`. Update that URL when running the backend locally or when deploying a different API instance.
