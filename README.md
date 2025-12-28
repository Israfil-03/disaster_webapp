# Aadhyapath - Disaster Management System

**Aadhyapath** (First Path) is a comprehensive, real-time disaster management platform designed to bridge the gap between citizens, relief authorities, and volunteers. It facilitates rapid incident reporting, efficient resource allocation, and real-time alerts to minimize the impact of calamities.

## 🚀 Key Features

*   **Real-time Alerts:** Authorities can broadcast hazard alerts (Flood, Cyclone, etc.) with precise location and severity data.
*   **Incident Reporting:** Citizens can report incidents with descriptions and location data. Reports are verified by authorities before being broadcast publicly.
*   **Interactive Map:** A visual dashboard using Leaflet to display alerts, incident reports, and available resources (shelters, hospitals, food supplies).
*   **Volunteer Management:** Dedicated portal for volunteers to register, list skills, and for authorities to coordinate their deployment.
*   **Resource Coordination:** Tracking and management of essential relief resources.
*   **Disaster Education:** Preparedness guides and safety instructions for various types of disasters.
*   **Role-Based Access:** Distinct interfaces and capabilities for Citizens, Authorities, NDRF (National Disaster Response Force), and NGOs.
*   **Real-time Communication:** Integrated chat and notification system using Socket.io.

## 🛠️ Technology Stack

**Frontend:**
*   React (Vite)
*   Tailwind CSS (Styling)
*   Leaflet & React-Leaflet (Maps)
*   Socket.io Client (Real-time updates)

**Backend:**
*   Node.js & Express
*   PostgreSQL (Database)
*   Prisma (ORM)
*   Socket.io (Real-time server)
*   JWT & Bcrypt (Authentication)

## ⚙️ Local Development Setup

### Prerequisites
*   Node.js (v18+ recommended)
*   PostgreSQL (running locally or a cloud instance)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd disaster_webapp
```

### 2. Server Setup
Navigate to the server directory, install dependencies, and configure the environment.

```bash
cd server
npm install
```

**Configuration:**
Create a `.env` file in the `server` directory based on `.env.example`:
```bash
cp .env.example .env
```
Update `DATABASE_URL` in `.env` with your PostgreSQL connection string.

**Database Setup:**
Run the migrations and seed the database with initial data (users, alerts, etc.).
```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

**Start Server:**
```bash
npm run dev
```
The server will start on `http://localhost:3000` (or your defined PORT).

### 3. Client Setup
Open a new terminal, navigate to the client directory, and install dependencies.

```bash
cd client
npm install
```

**Configuration:**
Create a `.env` file in the `client` directory based on `.env.example`:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` points to your running backend (e.g., `http://localhost:3000`).

**Start Client:**
```bash
npm run dev
```
The application will run at `http://localhost:5173`.

## 🔐 Environment Variables

### Server (`server/.env`)
| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string (e.g., `postgresql://user:pass@localhost:5432/aadhyapath?schema=public`) |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `PORT` | Port for the backend server (default: 3000) |
| `NODE_ENV` | Environment mode (`development` or `production`) |

### Client (`client/.env`)
| Variable | Description |
| :--- | :--- |
| `VITE_API_URL` | URL of the backend API (e.g., `http://localhost:3000`) |

## 📦 Deployment

This project is configured for deployment on [Render](https://render.com).
*   **Web Service 1 (Backend):** Points to `server` directory. Run `npm install && npm run prisma:generate` for build, and `npm start` for start.
*   **Web Service 2 (Frontend):** Points to `client` directory as a Static Site.

See `render.yaml` for the complete Infrastructure-as-Code configuration.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
