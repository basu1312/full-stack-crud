# Backend - Spring Boot Customer CRUD API

RESTful API for managing customer information built with Spring Boot and Gradle.

## Quick Start

### Prerequisites

- Java 17+
- Gradle (included via wrapper)

### Build and Run

```bash
# Navigate to backend directory
cd backend

# Build the project
./gradlew build

# Run the application
./gradlew bootRun
```

The API will be available at `http://localhost:8080`

## Project Structure

```
backend/
├── src/main/
│   ├── java/com/example/customer/
│   │   ├── CustomerCrudApiApplication.java  # Main application class
│   │   ├── controller/
│   │   │   └── CustomerController.java      # REST endpoints
│   │   ├── service/
│   │   │   └── CustomerService.java         # Business logic
│   │   ├── repository/
│   │   │   └── CustomerRepository.java      # Data access
│   │   ├── entity/
│   │   │   └── Customer.java                # JPA entity
│   │   └── dto/
│   │       └── CustomerDTO.java             # Data transfer object
│   └── resources/
│       └── application.properties           # Configuration
├── build.gradle                             # Gradle configuration
└── settings.gradle                          # Gradle settings
```

## API Endpoints

### Get All Customers

```http
GET /api/customers

Response: 200 OK
[
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
]
```

### Get Customer by ID

```http
GET /api/customers/{id}

Response: 200 OK
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  ...
}
```

### Create Customer

```http
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

Response: 201 Created
{
  "id": 1,
  "firstName": "John",
  ...
}
```

### Update Customer

```http
PUT /api/customers/{id}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  ...
}

Response: 200 OK
{
  "id": 1,
  "firstName": "Jane",
  ...
}
```

### Delete Customer

```http
DELETE /api/customers/{id}

Response: 204 No Content
```

## Architecture

### Layers

1. **Controller Layer** - Handles HTTP requests/responses
2. **Service Layer** - Contains business logic and validation
3. **Repository Layer** - Handles database operations
4. **Entity Layer** - JPA entities representing database tables
5. **DTO Layer** - Data transfer objects for API communication

### Key Features

- ✅ RESTful API design
- ✅ Input validation
- ✅ Exception handling
- ✅ CORS support for frontend integration
- ✅ Transaction management
- ✅ Lombok for reducing boilerplate code

## Dependencies

- **spring-boot-starter-web** - Web and REST API support
- **spring-boot-starter-data-jpa** - Database access with JPA
- **spring-boot-starter-validation** - Input validation
- **h2database** - Embedded relational database
- **lombok** - Code generation library

## Configuration

### Application Properties

```properties
spring.application.name=customer-crud-api
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.jpa.hibernate.ddl-auto=create-drop
server.port=8080
```

## CORS Configuration

The application is configured to allow CORS requests from:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Create React App)

To modify CORS settings, edit the `corsConfigurer()` method in `CustomerCrudApiApplication.java`.

## Gradle Tasks

```bash
./gradlew build      # Build the project
./gradlew test       # Run tests
./gradlew bootRun    # Run the application
./gradlew clean      # Clean build artifacts
./gradlew tasks      # List available tasks
```

## Troubleshooting

### Port Already in Use

```bash
# Change server port in application.properties
server.port=8081
```

### Database Issues

```bash
# Reset database by removing H2 files or restarting the application
# (H2 is in-memory, data persists only during session)
```

### Gradle Build Issues

```bash
./gradlew clean build --refresh-dependencies
```

## Next Steps

1. Run the backend: `./gradlew bootRun`
2. Navigate to frontend directory and run: `npm run dev`
3. Open `http://localhost:5173` in your browser
4. Start managing customers!

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Gradle Documentation](https://gradle.org/docs/)
- [H2 Database](http://www.h2database.com/)
