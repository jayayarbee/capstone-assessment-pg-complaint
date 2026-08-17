# ResidentCare — Apartment / PG Complaint Management System

ResidentCare is a web-based **Apartment / PG Complaint Management System** developed as part of the **Full Stack Development Major Capstone Assessment**.

The system allows residents to submit complaints related to apartment/PG facilities, view and manage submitted complaints, search and filter complaints, and track the current status of their complaints.

---

## Faculty-Provided Assessment Instructions

The project was selected from the list of project use cases shared by the faculty.

> **Pick any one project use case from the list of use cases shared by your faculty and complete the project.**

Since the frontend and backend have not yet been connected, the following three parts have been prepared separately:

1. **HTML, CSS, and JavaScript — Frontend**
2. **APIs — Backend**
3. **SQL Commands — Including `CREATE`, `INSERT`, `UPDATE`, and `DELETE` operations**

The ResidentCare project follows these requirements by implementing the selected **Apartment / PG Complaint Management** use case with the frontend, backend APIs, and SQL commands prepared separately.

---

# Selected Problem Statement

## Problem Statement 4 — Apartment / PG Complaint Management

Residents of apartments and PG accommodations frequently face issues related to:

- Electricity
- Plumbing
- Water supply
- Internet
- Housekeeping
- Maintenance
- Other facilities

ResidentCare provides a digital system that allows residents to report issues and track the status of their complaints.

---

# Features

## Frontend

- Responsive web interface
- Complaint submission form
- Complaint listing
- Individual complaint details
- Edit complaint
- Delete complaint
- Search complaints
- Filter complaints by category
- Filter complaints by status
- Complaint priority levels
- Complaint status tracking
- Client-side form validation
- Success and error messages
- Dynamic rendering using JavaScript DOM manipulation
- Browser `localStorage` for frontend data persistence

## Backend

- REST API using Node.js and Express.js
- Create complaints
- Retrieve all complaints
- Retrieve individual complaints
- Update complaints
- Update complaint status
- Delete complaints
- Search and filter complaints
- Request validation
- Error handling
- JSON request and response handling
- Appropriate HTTP status codes

## SQL

A separate SQL schema is included to demonstrate:

- `CREATE`
- `INSERT`
- `UPDATE`
- `DELETE`
- Primary keys
- Foreign keys
- Constraints
- Sample data
- Verification queries

---

# Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- CSS Grid
- Flexbox
- Responsive Design
- LocalStorage

## Backend

- Node.js
- Express.js
- REST API
- JSON

## Database

- SQL

## Development and Testing

- Visual Studio Code
- Postman
- Git
- GitHub

---

# Project Structure

```text
ResidentCare/
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   └── schema.sql
│
└── README.md
