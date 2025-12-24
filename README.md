# Stock Tracker App

## Overview
This is a personal stock tracking and financial analysis web application.  
It allows a user to manually record stock purchases, dividends, and cash deposits, then view portfolio analytics such as total value, average price, and unrealized gains/losses.

This project is primarily a learning exercise focused on full-stack web development fundamentals.

---

## Features

- Record stock purchases (supports fractional shares)
- Store all data persistently in a SQLite database
- View portfolio summary with:
  - Total invested amount
  - Current holdings
  - Average price per ticker
  - Current price per ticker (live via API or fallback)
  - Unrealized profit/loss
- Delete or edit purchases

---

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript  
- **Backend**: Node.js with Express.js  
- **Database**: SQLite  
- **Version Control**: Git & GitHub  

---

## Setup (for someone cloning the repo)

1. **Clone the repository**:
   ```bash
   git clone <repo_url>
   cd <project_folder>
  ```

2. **Install dependencies**:

   ```bash
   npm install
  ```

3. **Create a `.env` file** in the root folder to store your API key (optional, for live prices):

   ```
   ALPHA_VANTAGE_API_KEY=YOUR_API_KEY_HERE
   ```

   * If you don’t provide an API key, the app will still run using the last purchase price as a fallback for current prices.
   * **Important:** Do **not** commit `.env` to GitHub. It is included in `.gitignore`.

4. **Start the server**:

   ```bash
   node app.js
   ```

5. **Open the frontend**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view and interact with the app.

---

## Environment Variables

* `ALPHA_VANTAGE_API_KEY` – Optional. Used to fetch real-time stock prices from Alpha Vantage.
* If not provided, the portfolio summary will use the last recorded purchase price as the current price.

---

## Folder Structure (Planned)

```
project-root/
├─ public/         # HTML, CSS, JS frontend
├─ database.db     # SQLite database file
├─ app.js          # Backend server
├─ package.json
├─ .gitignore
├─ .env            # Not committed; stores API key
└─ README.md
```

---

## Future Enhancements

* Real-time stock prices with caching
* Charts and visualizations
* User authentication
* Exporting data (CSV)
* Additional financial metrics

---

## Notes

* The app supports fractional shares.
* CRUD operations for purchases are fully functional.
* Portfolio summary includes **unrealized profit/loss**.
* The app is portable; anyone can clone, set up `.env` if desired, and run the server locally.