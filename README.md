# Collaborative Whiteboard

A simple real-time whiteboard app for drawing and collaboration.

## Features

- Draw with pen, shapes, text
- Real-time sync using WebSocket
- Join rooms via shared links
- Save board as image or PDF
- Undo, redo, clear canvas

## How to Run

1. Clone the repo
2. Create a `.env` file in the `backend` folder and add your MongoDB URI:
   MONGODB_URI=your_mongodb_connection_string

arduino
Copy
Edit

3. Install and run backend:
   cd backend
   npm install
   npm run dev

arduino
Copy
Edit

4. Install and run frontend:
   npm install
   npm run dev

yaml
Copy
Edit

## Deployment

- Backend: Railway (add `MONGODB_URI` as env variable)
- Frontend: Vercel

---

That's it. No clutter.
