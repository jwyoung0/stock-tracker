# Stock Tracker App

## Overview
This project is a personal stock tracking and financial analysis web application.  
The goal is to allow a user to manually record stock purchases, dividends, and cash deposits, then view basic portfolio analytics such as total value and gains.

This project is primarily a learning exercise focused on full-stack web development fundamentals.

---

## Goals (MVP)
The minimum viable product (MVP) will allow a user to:

- Record stock purchases (ticker, shares, price, date)
- Record dividends and cash deposits
- Store all data persistently in a database
- View a basic dashboard showing:
  - Total invested amount
  - Current holdings
  - Simple gain/loss calculations

No user accounts or real-time stock prices are included in the MVP.

---

## Tech Stack
Planned technologies for this project:

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **Database**: SQLite
- **Version Control**: Git & GitHub

---

## Architecture Overview
The application follows a simple three-layer architecture:

### Frontend
- Provides forms for user input
- Sends data to the backend using HTTP requests
- Displays results returned from the server

### Backend
- Handles routing and request validation
- Performs financial calculations
- Reads from and writes to the database

### Database
- Stores all persistent financial data
- Uses simple relational tables for structured data

---

## Planned Database Schema
Initial tables may include:

- **purchases**
  - id
  - ticker
  - shares
  - price
  - date

- **dividends**
  - id
  - purchase_id
  - amount
  - date

- **deposits**
  - id
  - amount
  - date

---

## Planned Folder Structure
The following structure is planned as the project develops:

---

## Future Features (Post-MVP)
Possible enhancements after the MVP:

- Real-time stock prices via an external API
- Charts and visualizations
- User authentication
- Exporting data (CSV)
- Improved financial metrics

---

## Status
🚧 Project is in early planning and setup stage.
