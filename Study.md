# Backend Concepts and Flow

Author: Basu Sharma

This document explains the backend architecture used in the `full-stack-crud` project, focusing on the Spring Boot API, request handling, data flow, persistence, and the main backend components.

It is written for beginners, so it includes basic definitions, simple analogies, and explanation of each layer.

## 1. What is the Backend?

The backend is the server-side part of the application. It is responsible for:

- receiving requests from the frontend
- reading and writing data
- applying business rules
- sending responses back to the frontend

In this project, the backend is a Java Spring Boot application that manages customer data.

## 2. What is a REST API?

REST stands for Representational State Transfer. A REST API is a way for software to communicate over the internet using HTTP.

Common HTTP methods are:

- `GET`: read data
- `POST`: create data
- `PUT`: update data
- `DELETE`: remove data

Each method works on a URL (also called an endpoint). For example, the endpoint `/api/customers` is used to work with customer records.

## 3. Application Overview

The backend is a Spring Boot application located under `backend/`. It exposes a REST API for customer management with standard CRUD operations:

- Create customer
- Read customer(s)
- Update customer
- Delete customer

The backend uses:

- Spring Boot: a Java framework that simplifies building backend applications
- Spring Web MVC: provides the REST API and request routing
- Spring Data JPA: simplifies database interactions
- H2 in-memory database: a simple database that runs in memory for development
- Lombok: reduces boilerplate code like getters and setters

## 4. Main Application Setup

File: `backend/src/main/java/com/example/customer/CustomerCrudApiApplication.java`

This is the application entry point. It includes:

- `@SpringBootApplication`: tells Spring Boot to start here and automatically configure the app.
- `main(...)`: the method where Java starts running the application.
- CORS configuration: allows the frontend application to call the backend from a different address.

### Why is CORS needed?

Web browsers enforce a security rule called Same-Origin Policy. If the frontend is served from `http://localhost:5173` and the backend is `http://localhost:8080`, the browser will block requests unless the backend explicitly allows them.

The CORS settings in this app allow:

- `GET`, `POST`, `PUT`, `DELETE` requests
- any request headers
- frontend apps running on `http://localhost:5173` and `http://localhost:3000`

## 5. Data Model and Persistence

### What is a database?

A database stores application data permanently. In this project, we use an H2 in-memory database, which stores data while the application is running and clears it when the app stops.

### Entity: `Customer`

File: `backend/src/main/java/com/example/customer/entity/Customer.java`

A JPA entity is a Java class mapped to a database table. Each instance of the class becomes a row in the table.

For `Customer`:

- `@Entity` marks the class as a data object managed by JPA.
- `@Table(name = "customers")` names the database table.
- `@Id` and `@GeneratedValue` make `id` the primary key and auto-generated.
- `@Column(nullable = false)` means a field must have a value.
- `@Column(nullable = false, unique = true)` means the email is required and must be different for every customer.

### Database configuration

File: `backend/src/main/resources/application.properties`

The app uses H2 in-memory database with settings:

- `spring.datasource.url=jdbc:h2:mem:testdb`: in-memory database URL
- `spring.jpa.hibernate.ddl-auto=create-drop`: create tables when the app starts and delete them on shutdown
- `spring.h2.console.enabled=true`: enables a web console to view the database during development
- `server.port=8080`: backend server runs on port `8080`

Because this is an in-memory database, data is not saved permanently. It is useful for learning and development.

## 6. Data Transfer Object (DTO)

File: `backend/src/main/java/com/example/customer/dto/CustomerDTO.java`

A DTO is an object used to send data between the frontend and backend.

Why use a DTO?

- It keeps the API separate from the database structure.
- It protects the internal entity model from frontend changes.
- It makes the data format clear and stable.

The `CustomerDTO` contains the same fields as the `Customer` entity:

- `id`
- `firstName`, `lastName`, `email`
- `phone`, `address`, `city`, `state`, `zipCode`

When the frontend sends JSON, Spring converts it into a `CustomerDTO` object. When the backend sends JSON, Spring converts the DTO back to JSON.

## 7. Repository Layer

File: `backend/src/main/java/com/example/customer/repository/CustomerRepository.java`

The repository is the layer that talks to the database.

`CustomerRepository` extends `JpaRepository<Customer, Long>`. This gives you ready-made methods like:

- `findAll()`
- `findById(id)`
- `save(entity)`
- `deleteById(id)`

Custom repository method:

- `findByEmail(String email)`: checks if a customer with the given email already exists.

Think of the repository as a helper that performs database queries so the rest of the application doesn’t need to write SQL directly.

## 8. Service Layer

File: `backend/src/main/java/com/example/customer/service/CustomerService.java`

The service layer contains business logic. It is the middle layer between the controller and repository.

What does business logic mean?

- Rules that the application must follow
- Checks and validations before saving data
- Transforming data from one format to another

In this service:

- `getAllCustomers()`: returns all customers
- `getCustomerById(id)`: returns one customer or throws an error if not found
- `createCustomer(customerDTO)`: checks for duplicate email, saves a new customer, returns saved data
- `updateCustomer(id, customerDTO)`: updates an existing customer
- `deleteCustomer(id)`: deletes a customer if it exists

Important annotations:

- `@Service`: marks this class as a service component in Spring
- `@Transactional`: ensures database operations are done safely in a transaction, so all changes succeed together or fail together

### Conversion methods

The service uses helper methods to convert between `Customer` and `CustomerDTO`:

- `convertToDTO(Customer)`: transforms entity data into a DTO
- `convertToEntity(CustomerDTO)`: transforms DTO data into an entity

This makes the controller code simpler and keeps the conversion logic in one place.

## 9. Controller Layer

File: `backend/src/main/java/com/example/customer/controller/CustomerController.java`

The controller is the layer that handles HTTP requests and responses.

It defines endpoints under `/api/customers` and maps HTTP requests to Java methods.

Endpoints:

- `GET /api/customers`: list all customers
- `GET /api/customers/{id}`: get one customer by ID
- `POST /api/customers`: create a new customer
- `PUT /api/customers/{id}`: update an existing customer
- `DELETE /api/customers/{id}`: delete a customer

How it works:

1. The client sends a request to the URL.
2. Spring finds the matching controller method.
3. The controller calls the service to perform the operation.
4. The controller returns the result in a `ResponseEntity`.

`ResponseEntity` is a wrapper that gives control over:

- the HTTP status code (`200`, `201`, `404`, etc.)
- the response body

Common responses in this app:

- `200 OK`: request succeeded and data is returned
- `201 Created`: new resource was created
- `204 No Content`: deletion succeeded, no response body
- `404 Not Found`: requested customer was not found
- `400 Bad Request`: request data is invalid or business rule failed

## 10. Request Flow

This is the path a request follows in the backend:

1. Frontend sends an HTTP request to a backend endpoint.
2. Spring dispatches the request to the matching controller method.
3. The controller calls the service layer.
4. The service performs validation and business logic.
5. The service calls the repository to read or write from the database.
6. The repository executes database queries using JPA.
7. The service converts entity results to DTOs.
8. The controller returns the DTO response to the client.

### Example: creating a customer

- Frontend sends `POST /api/customers` with JSON body.
- Spring converts the JSON to a `CustomerDTO`.
- Controller receives the DTO and passes it to the service.
- Service checks if the email already exists.
- If valid, repository saves a new `Customer` entity.
- Service converts the saved entity to `CustomerDTO`.
- Controller responds with `201 Created` and the customer data.

## 11. JSON and HTTP

### What is JSON?

JSON stands for JavaScript Object Notation. It is a text format for sending data over the web.

Example JSON for a customer:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "1234567890"
}
```

The frontend sends JSON in the request body. The backend reads the JSON and turns it into Java objects.

### HTTP basics

HTTP is the protocol used by web browsers and servers to communicate. It has:

- a method (`GET`, `POST`, `PUT`, `DELETE`)
- a URL
- headers (metadata about the request)
- a body (data sent with the request)

The backend responds with:

- a status code (such as `200` or `404`)
- headers
- a JSON body when data is returned

## 12. Error Handling

This backend uses simple runtime exception handling in the controller:

- Missing customer → `404 Not Found`
- Duplicate email or invalid request during create → `400 Bad Request`

In a more advanced project, you would add global exception handling using `@ControllerAdvice` and custom error responses.

## 13. How Backend and Frontend Connect

The frontend calls the API on `http://localhost:8080` using paths like `/api/customers`.

CORS is required because the frontend typically runs on ports like `5173` or `3000` while the backend runs on `8080`.

The flow is:

- Frontend UI user action → API call
- Backend controller → service → repository
- Database stores or returns customer data
- Backend response returns JSON → frontend updates UI

## 14. Beginner-Friendly Summary

- The backend is the server side that stores and manages data.
- A REST API lets the frontend ask the backend for data using HTTP.
- Controllers handle HTTP requests and choose what to do.
- Services contain the rules and real work of the app.
- Repositories talk to the database.
- Entities are the database records.
- DTOs are safe objects sent over the network.
- The H2 database is temporary and good for learning.
- CORS lets the frontend and backend talk when they are on different ports.

---

This file summarizes the backend design, how data moves through the application, and how CRUD operations are implemented in `full-stack-crud`. It is written so a beginner can understand the main concepts and how each part works together.
