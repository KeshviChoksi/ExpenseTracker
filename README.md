#  Expense Tracker

A full-stack expense tracker built with vanilla JavaScript, Node.js, Express, and MongoDB.

## Tech Stack
- **Frontend:** HTML, CSS, Bootstrap 5, Vanilla JavaScript (ESM)
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Features
- Add expenses with title, amount, category, and date
- Filter expenses by category
- Delete expenses
- Running total updates automatically
- Responsive card grid layout

## How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Then open `.env` and replace with your MongoDB connection string.

### 3. Start the server
```bash
npm start
```

### 4. Open in browser
```
http://localhost:3000
```

## Project Structure
```
expenseiq/
├── index.html          # Main HTML page
├── css/
│   └── main.css        # Custom styles
├── js/
│   └── main.js         # Frontend JavaScript
├── server/
│   ├── server.js       # Express server
│   └── routes/
│       └── expenses.js # API routes
├── .env.example        # Environment variable template
└── package.json
```

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/expenses | Get all expenses |
| POST | /api/expenses | Add new expense |
| DELETE | /api/expenses/:id | Delete an expense |
| GET | /api/expenses/summary | Get total by category |
