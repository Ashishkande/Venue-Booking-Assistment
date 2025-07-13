# 🏨 Mini Venue Booking Dashboard

A full-stack web application that allows venue owners to manage venues and users to book available venues with real-time availability tracking.

---

## 🚀 Project Overview

This Mini Venue Booking Dashboard provides an intuitive interface for both venue owners and users:

### ✅ Key Functionalities

- **Venue Owners:**
  - Add and manage venues
  - Block or unblock dates (mark as unavailable)
  - Track booking status

- **Users:**
  - Browse all available venues
  - Book a venue based on its availability
  - View booking confirmation

Once a venue is booked, its availability automatically updates to avoid double-booking.

---

## 🛠 Tech Stack

| Layer     | Technology         |
|-----------|---------------------|
| Frontend  | React.js, Tailwind CSS |
| Backend   | Express.js (Node.js) |
| Database  | MongoDB              |
| Others    | RESTful API, JSON   |

---

## 📂 Folder Structure

mini-venue-booking-dashboard/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ └── index.js
├── README.md
└── .env


---

## ⚙️ Getting Started

### 🔧 Backend Setup

1. Navigate to the backend directory:

```bash
cd backend

npm install
PORT=5000
MONGO_URI=your_mongodb_connection_string
