# ATHLETIQ EVENT

This is a web application designed for managing sport event reservations in a back-office context. It allows users to create and manage events, handle participants, and download participant data. The application is built with **React** on the frontend and **NestJS** on the backend.

## Features

- **Authentication**: Login and registration functionality
- **Event Management**: Create, view, and manage events
- **Participants Management**: Add, update, and remove participants for events
- **CSV Export**: Download participant data in CSV format
- **Protected Routes**: Only authenticated users can access event and participant management

## Tech Stack

- **Frontend**: React (with Vite), Redux Toolkit, React Router, Tailwind CSS
- **Backend**: NestJS, Mongoose (MongoDB)
- **Authentication**: JWT (JSON Web Tokens) for user authentication
- **State Management**: Redux Toolkit to manage authentication state
- **Icons**: Lucide Icons
- **CSV Export**: react-csv library

## Prerequisites

Before getting started, ensure you have:

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for containerization)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sport-event-reservation.git
cd sport-event-reservation
```

### 2. Install Dependencies

#### Frontend
Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

#### Backend
Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Environment Setup

Create `.env` files for both frontend and backend:

#### Backend `.env` Example:
```
PORT=5000
DB_URI=mongodb://localhost:27017/sport-events
JWT_SECRET=your_secret_key
```

#### Frontend `.env` Example:
```
REACT_APP_API_URL=http://localhost:5000
```

### 4. Running the Application

#### Frontend
To run the frontend application:

```bash
cd frontend
npm run dev
```
This starts the development server on `http://localhost:3000`.

#### Backend
To run the backend application:

```bash
cd backend
npm run start:dev
```
This starts the backend server on `http://localhost:5000`.

### Docker Setup (Optional)

#### 1. Build Docker images
```bash
docker-compose build
```

#### 2. Start services
```bash
docker-compose up
```
This starts both frontend and backend services.

## Usage

- **Login / Register**: Navigate to `/` or `/register`
- **Dashboard**: View and manage events after login
- **Manage Participants**: Click on events to add, update, or remove participants
- **CSV Export**: Download participant data via export button

## License

This project is licensed under the MIT License - see the LICENSE file for details.
