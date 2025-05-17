# 🏨 Hotel Sky - Booking Website with Admin Portal

Hotel Sky is a modern hotel website that allows users to browse room offerings, features, and services — and book rooms via a user-friendly interface. It also includes a secure **Admin Login** system that redirects to an **Admin Portal** for future management features.

---

## 📁 Project Structure
HotelBooking/
├── Admin/
│ ├── adminLogin.html
│ ├── adminPortal.html
│ ├── adminStyle.css
│ └── adminScript.js
├── database
  └── db.js
├── images/
│ └── ... (hotel, room, and banner images)
├── index.html
├── style.css
├── script.js
├── server.js (or index.js)
└── README.md


---

## 🌐 Features

### ✅ Front-End (User Side)
- Responsive home page with:
  - Hero carousel
  - Room types
  - Services
  - Features
- Room booking form with:
  - Customer info
  - Date selection
  - Adult & child count
  - Special requests

### ✅ Admin Login
- Modern styled login form
- Password visibility toggle
- Redirects to `adminPortal.html` on login

### ✅ Admin Portal
- Placeholder for future admin features
- Accessible only via login redirect

---

## 🧑‍💻 Technologies Used

- **HTML5**  
- **CSS3 / Responsive Design**
- **JavaScript** (with jQuery for interactions)
- **Node.js + Express** (for server/static file handling)
- **Font Awesome** (for icons)
- **PostgreSQL** (for storing info)

---

## ⚙️ How to Run the Project

### 1. Clone the repository:
```sh
git clone https://github.com/yourusername/HotelBooking.git
cd HotelBooking
```
### 2. Install dependencies
```sh
npm install
```
### 3. Start the server
```sh
node index.js
```
### 4. Create table in postgres

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    adults INTEGER NOT NULL CHECK (adults >= 1),
    children INTEGER DEFAULT 0 CHECK (children >= 0),
    room_type VARCHAR(50) NOT NULL CHECK (room_type IN ('standard', 'deluxe', 'executive', 'presidential')),
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### Visit http://localhost:3000 to access the main page.