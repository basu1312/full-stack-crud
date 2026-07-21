# Quick Start Guide

## Prerequisites

- Java 17+ installed
- Node.js 16+ installed
- npm or yarn

## Running the Application

### Terminal 1 - Backend (Spring Boot)

```bash
cd full-stack-crud/backend
./gradlew bootRun
```

Backend runs on: http://localhost:8080

### Terminal 2 - Frontend (React)

```bash
cd full-stack-crud/frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## Features to Try

1. **Create a Customer**
   - Click "+ New Customer" button
   - Fill in the form (first name, last name, email required)
   - Click "Save Customer"

2. **View Customers**
   - All customers are displayed in a table
   - See details like name, email, phone, city

3. **Edit a Customer**
   - Click "Edit" button on any customer row
   - Modify the fields
   - Click "Save Customer"

4. **Delete a Customer**
   - Click "Delete" button on any customer row
   - Confirm the deletion

## API Endpoints Reference

```
GET    /api/customers          - Get all customers
GET    /api/customers/{id}     - Get customer by ID
POST   /api/customers          - Create new customer
PUT    /api/customers/{id}     - Update customer
DELETE /api/customers/{id}     - Delete customer
```

## Database Console

After starting the backend, view the H2 database:

- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:testdb
- Username: sa
- Password: (leave empty)

## Troubleshooting

**Backend fails to start:**

- Check if port 8080 is free
- Ensure Java 17+ is installed

**Frontend won't connect to backend:**

- Make sure backend is running
- Check CORS configuration in backend
- Verify proxy settings in vite.config.js

**Port conflicts:**

- Backend: Change `server.port` in `backend/src/main/resources/application.properties`
- Frontend: Change `port` in `frontend/vite.config.js`

## Next Steps

- Add authentication
- Implement pagination
- Add search/filter functionality
- Deploy to cloud (Azure, AWS, etc.)
- Add Docker support
