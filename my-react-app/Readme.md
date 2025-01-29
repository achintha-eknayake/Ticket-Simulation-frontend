# Real-Time Event Ticketing System

A full-stack web application built using **Spring Boot** (Java) for the backend and **React** for the frontend. This system simulates a real-time ticketing platform with support for multithreading, vendors, and customers. The application includes a configuration panel, vendor and customer management, and a real-time dashboard.

## Features

- **Real-Time Simulation**: Vendors release tickets, and customers retrieve them in real-time.
- **Thread Management**: Start, stop, and manage vendor/customer threads.
- **Custom Configuration**: Set the ticket pool size, release rate, and retrieval rate.
- **H2 Database Integration**: An in-memory database for storing configuration and entity details.
- **Real-Time Dashboard**: Real-time ticket availability updates by polling.
- **REST APIs**: Provides endpoints for managing configuration, vendors, customers, and threads.
- **Dynamic UI**: Configuration management, vendor/customer forms, and a real-time dashboard.
- **Axios for API Requests**: Communicates with the backend to fetch and update data.
- **Custom CSS Styling**: Ensures a clean and intuitive user experience.


## Technology Stack

### Backend
- **Spring Boot**: REST APIs and WebSocket communication.
- **H2 Database**: In-memory database for persistence.
- **Java Concurrency**: Multithreaded ticket pool simulation.
- **Maven**: Dependency management and build tool.
- **Swagger**: API documentation and testing.
- **Lombok**: Reduces boilerplate code in Java classes.
- **Jackson**: JSON serialization and deserialization.

### Frontend
- **React**: Dynamic and responsive user interface.
- **Axios**: For making API requests.
- **CSS**: Custom styles for a clean and intuitive UI.
- **npm**: Package manager for Node.js.
- **recharts**: Real-time charting library.

## Prerequisites

### Software Requirements

Before you begin, ensure you have the following installed on your system:

- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Development Environment

- IntelliJ IDE (recommended)
- Git
- Postman (for API testing)

### System Requirements
- Minimum 8GB RAM

## Backend Folder Structure

```plaintext
src
└── main
    └── java
        └── org
            └── ticketsimulation
                ├── config
                │   └── WebConfig
                ├── controller
                │   ├── ConfigurationController
                │   ├── CustomerController
                │   ├── ResetDatabaseController
                │   ├── ThreadController
                │   ├── TicketPoolController
                │   └── VendorController
                ├── dto
                │   └── TicketDTO
                ├── fileHandlerUtility
                │   └── JsonFileHandler
                ├── model
                │   ├── Configuration
                │   ├── Customer
                │   ├── Ticket
                │   ├── TicketPool
                │   └── Vendor
                ├── repository
                │   ├── CustomerRepository
                │   └── VendorRepository
                ├── service
                │   ├── CustomerService
                │   ├── TicketPoolService
                │   └── VendorService
                └── thread
                    ├── CustomerThread
                    ├── VendorThread
                    └── TicketSimulationApplication

```

## Front end Folder Structure

```plaintext
src
├── assets
│   ├── components
│   │   ├── ConfigurationForm.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── CustomerList.jsx
│   │   ├── ResetButton.jsx
│   │   ├── ThreadControlButtons.jsx
│   │   ├── TicketPoolDashboard.jsx
│   │   ├── VendorForm.jsx
│   │   └── VendorList.jsx
│   └── styles
│       ├── ResetButton.css
│       ├── TicketPoolDashboard.css
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

```


## Getting Started

### Backend Setup

1. **Navigate to Backend Directory**:
    ```bash
    cd backend
    ```

2. **Build the Project**:
    ```bash
    mvn clean install
    ```

3. **Run the Application**:
    ```bash
    mvn spring-boot:run
    ```

4. **Access the Backend**:
   - API Documentation (if Swagger is enabled): `http://localhost:8080/swagger-ui.html`
   - H2 Console: `http://localhost:8080/h2-console`


### Frontend Setup

1. **Navigate to Frontend Directory**:
    ```bash
    cd frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Development Server**:
    ```bash
    npm start
    ```

4. **Access the Frontend**:
    - Open your browser at `http://localhost:3000`


## User Interface Controls

### Configuration Dashboard

- **Global Settings**: Configure simulation parameters (Default value = previous value)
- **Set system constraints**: 
- **Save/Update Configuration**

### Vendor Management Panel
- **Add Vendor**: Register new ticket vendors
- **Vendor List**: View and manage registered vendors

### Customer Management Panel
- **Add Customer**: Register new customers
- **Customer List**: View registered customer profiles

### Simulation Control Center
- **Start Simulation**: Initiate ticket simulation
- **Pause Simulation**: Temporarily halt ongoing simulation
- **Reset Simulation**: Clear all current simulation data
- **Real-time Dashboard**:
   - Ticket pool status
   - Current simulation metrics
   - Performance graphs

### Visualization Features
- Interactive line charts for ticket distribution
- Real-time update indicators

## APIs

### Configuration API
- **GET** `/api/configuration`: Fetch current configuration.
- **PUT** `/api/configuration`: Update configuration.

### Vendor API
- **GET** `/api/vendors`: Fetch all vendors.
- **POST** `/api/vendors`: Add a new vendor.

### Customer API
- **GET** `/api/customers`: Fetch all customers.
- **POST** `/api/customers`: Add a new customer.

### Thread Management API
- **POST** `/api/threads/start`: Start all threads.
- **POST** `/api/threads/stop`: Stop all threads.

### Ticket pool Management API
- **GET**:`/api/ticket-pool` Real-time ticket availability updates.



## Testing

### Backend
Run unit tests for the backend:
```bash
  mvn test
```

### Frontend
Run tests for the frontend:
```bash
  npm test
```

## Resetting the H2 Database

To reset the database:
1. Stop the backend server.
2. Restart the backend server.

## Deployment

### Backend
1. Package the Spring Boot application:
    ```bash
    mvn clean package
    ```
2. Deploy the generated `.jar` file to your preferred server.

### Frontend
1. Build the React app:
    ```bash
    npm run build
    ```
2. Serve the `build` folder using a static file server like Nginx, Apache, or a cloud provider.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- **Spring Boot Documentation**: [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
- **React Documentation**: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)

---

