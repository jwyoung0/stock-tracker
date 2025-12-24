Perfect! Here’s the updated README with **Tech Stack** and **Screenshot Example** sections included:

````markdown
# 📈 Stock Portfolio Tracker

A simple web app to track your stock purchases and portfolio performance in real time.  
View your holdings, add or delete purchases, and see current prices along with unrealized gains/losses.

## Features

- Add and delete stock purchases
- View portfolio summary with:
  - Total invested
  - Shares held
  - Average price
  - Total cost
  - Current price
  - Unrealized P/L
- Live price updates from Finnhub

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **API:** Finnhub (for stock prices)
- **Data storage:** Local JSON or backend API

## Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your **Finnhub API key**:

   ```env
   FINNHUB_API_KEY=your_api_key_here
   ```

4. Start the app:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Screenshot Example

![Portfolio Tracker Screenshot](./screenshot.png)
*Example of portfolio summary with current prices and unrealized gains/losses.*

## Notes

* You **must have a Finnhub API key** to fetch current stock prices. Get one for free at [Finnhub.io](https://finnhub.io/).
* The app currently uses a simple local JSON store (or backend API) for purchases.

## License

MIT License

```
