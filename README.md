# Electric Cars Dashboard

A modern and responsive dashboard built using **React**, **AG Grid**, and **Material-UI** to display and manage electric car data with sorting, filtering, pagination, and detailed car views.

## Features

- **Search** cars by brand or model.
- **AG Grid** integration with:
  - Column sorting and filtering
  - Pagination (10 items per page)
  - Responsive layout with auto row height
- **View** car details in a dedicated page.
- **Delete** entries with modal confirmation and success/failure feedback.
- **Clear filters** instantly with a single click.
- **Quartz theme** for a modern grid appearance.
- BMW branding with logo and a fixed background image.

## Project Structure

```
Electric-Cars-Dashboard
├── public/
├── src/
│   ├── components/
│   │   ├── DataGridComponent.js   # Main table with actions
│   │   └── CarDetails.js          # Individual car detail view
│   ├── Images/
│   │   ├── bmw-logo.svg
│   │   └── bg.webp
│   ├── App.js
│   ├── App.css
│   └── index.js
├── README.md
└── package.json
```

---

## Technologies Used

- **React.js**
- **AG Grid v33+**
- **Material-UI (MUI)**
- **Express.js (Backend)**
- **MongoDB (Mongoose)**

---

## Installation

### Frontend

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/Electric-Cars-Dashboard.git
   cd Electric-Cars-Dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend server:**
   ```bash
   npm start
   ```

### Backend

> Make sure MongoDB is running locally or update the MongoDB URI in your backend config.

1. Navigate to the backend folder (if separate):
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node index.js
   ```

---

## 🔗 API Endpoints

| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| GET    | `/api/cars`         | Get all cars (supports search) |
| GET    | `/api/cars/:id`     | Get details of a specific car |
| DELETE | `/api/cars/:id`     | Delete a car by ID      |

---
