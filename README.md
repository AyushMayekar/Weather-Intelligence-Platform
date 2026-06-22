# 🌦️ Weather Intelligence Platform

A full-stack weather application that delivers real-time weather insights, air quality analysis, intelligent recommendations, interactive maps, and weather history management.

---

## ✨ Features

### Core Features

- Search weather by city or postal code
- Fetch weather using browser geolocation
- Display current weather conditions
- View a 5-day forecast
- Visualize locations on an interactive map
- View air quality index (AQI)
- Generate weather-based recommendations
- Provide travel readiness insights

### Data Management

- Store weather searches automatically
- View search history
- Update search records
- Delete search records
- Export data as CSV
- Export data as JSON

### User Experience

- Responsive design
- Light and dark mode
- Form validation
- Error handling
- Loading states
- Empty states

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- React Leaflet
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express.js
- Prisma ORM
- Zod Validation

### Database

- SQLite

### External APIs

- Open-Meteo Geocoding API
- Open-Meteo Forecast API
- Open-Meteo Air Quality API
- OpenStreetMap

---

## 🏗️ Architecture

```text
React + Vite Frontend
        ↓
Axios API Client
        ↓
Express REST API
        ↓
Prisma ORM
        ↓
SQLite Database
        ↓
Open-Meteo APIs
```
## 📂 Project Structure
```
weather-intelligence-platform/
├── frontend/
├── backend/
├── README.md
```
## ⚙️ Installation
Clone the repository
```git clone <repository-url>
cd weather-intelligence-platform
```
Backend Setup
```
cd backend
npm install
```
Create .env:
```
PORT=5000
DATABASE_URL="file:./dev.db"
FRONTEND_URL=http://localhost:5173
```
Initialize Prisma:
```
npx prisma migrate dev --name init
npx prisma generate
```
Start backend:
```
npm run dev
```
Frontend Setup
```
cd frontend
npm install
```
Start frontend:
```
npm run dev
```
Open:
```
http://localhost:5173
```
## 🔌 API Endpoints
Weather
```
POST /api/weather
POST /api/weather/coordinates
```
History
```
GET    /api/history
GET    /api/history/:id
PUT    /api/history/:id
DELETE /api/history/:id
```
Export
```
GET /api/export/csv
GET /api/export/json
```
Health Check
```
GET /api/health
```
🗄️ Database Schema
WeatherSearch
```
Field Type
id String
location String
latitude Float
longitude Float
startDate DateTime
endDate DateTime
temperature Float
feelsLike Float
humidity Int
windSpeed Float
weatherCode Int
airQualityIndex Int
recommendation String
createdAt DateTime
updatedAt DateTime
```

👨‍💻 Developer
Ayush Mayekar
