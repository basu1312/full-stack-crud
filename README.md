# Full-Stack Customer CRUD Application

A modern full-stack web application for managing customer information with a Spring Boot backend and React frontend.

## Project Structure

```
full-stack-crud/
├── backend/                 # Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/customer/
│   │   │   │   ├── controller/     # REST endpoints
│   │   │   │   ├── service/        # Business logic
│   │   │   │   ├── repository/     # Data access
│   │   │   │   ├── entity/         # JPA entities
│   │   │   │   ├── dto/            # Data transfer objects
│   │   │   │   └── CustomerCrudApiApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   ├── build.gradle         # Gradle configuration
│   └── settings.gradle
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── services/        # API client service
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js       # Vite configuration
│   └── package.json
└── README.md
```

## Tech Stack

### Backend

- **Java 17** - Programming language
- **Spring Boot 3.1.0** - Framework
- **Gradle** - Build tool
- **Spring Data JPA** - ORM
- **H2 Database** - In-memory database
- **Lombok** - Code generation

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **React Query** - Server state management
- **Zod** - Schema validation
- **Axios** - HTTP client

## Features

- ✅ Create new customers
- ✅ Read customer details
- ✅ Update customer information
- ✅ Delete customers
- ✅ Real-time form validation with Zod
- ✅ Optimistic UI updates with React Query
- ✅ Responsive design
- ✅ Error handling

## Getting Started

### Prerequisites

- Java 17+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Build the project:

```bash
./gradlew build
```

3. Run the application:

```bash
./gradlew bootRun
```

The API will be available at `http://localhost:8080/api/customers`

**API Endpoints:**

- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

4. Build for production:

```bash
npm run build
```

## API Request/Response Examples

### Create Customer

```bash
POST /api/customers
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701"
}
```

### Response

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701"
}
```

## Data Validation

The application uses Zod for schema validation on the frontend:

```javascript
CustomerSchema = {
  firstName: string (1-50 chars) - required
  lastName: string (1-50 chars) - required
  email: string (valid email format) - required
  phone: string - optional
  address: string - optional
  city: string - optional
  state: string - optional
  zipCode: string - optional
}
```

## Development

### Frontend Code Structure

- **Components/** - Reusable UI components
  - `CustomerForm.jsx` - Form for creating/editing customers
  - `CustomerList.jsx` - Table displaying all customers

- **Hooks/** - Custom React Query hooks
  - `useCustomer.js` - Customer data management hooks

- **Services/** - API communication
  - `customerAPI.js` - API client with validation

- **Schemas/** - Validation schemas
  - `customerSchema.js` - Zod customer schema

- **Pages/** - Page-level components
  - `CustomerPage.jsx` - Main customer management page

## CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Create React App)

## Database

The application uses H2 in-memory database. Data will be reset on application restart.

To view the H2 database console:

1. Start the backend
2. Visit `http://localhost:8080/h2-console`
3. JDBC URL: `jdbc:h2:mem:testdb`
4. Username: `sa`
5. Password: (leave empty)

## Troubleshooting

### Port 8080 is already in use

```bash
# Change backend port in: backend/src/main/resources/application.properties
server.port=8081
```

### Port 5173 is already in use

```bash
# Change frontend port in: frontend/vite.config.js
server: {
  port: 5174
}
```

### CORS errors

Make sure both backend and frontend are running on the configured ports.

## Scripts

### Backend

- `./gradlew build` - Build the project
- `./gradlew bootRun` - Run the application
- `./gradlew test` - Run tests
- `./gradlew clean` - Clean build artifacts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Future Enhancements

- Add authentication & authorization
- Add pagination to customer list
- Add search/filter functionality
- Add data export (CSV, PDF)
- Add unit and integration tests
- Add deployment configurations
- Add Docker support

## License

MIT License - feel free to use this project as a starting point for your applications.
