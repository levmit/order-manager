# Order Management Service

This is a **KOA-based Node.js service** that implements a user purchase order management system using **XState**. The service exposes REST APIs to manage and query the state of purchase orders. It is built with **TypeScript**, includes **Jest unit and integration tests**, and is containerized using **Docker**.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Running the Service](#running-the-service)
   - [Locally](#locally)
   - [Using Docker](#using-docker)
5. [API Endpoints](#api-endpoints)
6. [Testing](#testing)
   - [Unit Tests](#unit-tests)
   - [Integration Tests](#integration-tests)
7. [Logging](#logging)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **State Machine**: Manage purchase order states using **XState**.
- **REST APIs**: Expose endpoints to get and transition order states.
- **TypeScript**: Written in TypeScript for type safety and better developer experience.
- **Testing**: Includes **Jest unit and integration tests** with 100% coverage.
- **Docker Support**: Containerized for easy deployment.
- **Logging**: Logs all incoming requests for debugging and monitoring.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **KOA**: Web framework for building REST APIs.
- **XState**: State machine library for managing order states.
- **TypeScript**: Programming language.
- **Jest**: Testing framework.
- **Docker**: Containerization.
- **Yarn 4**: Package manager.

---

## Setup

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/) (v18 or higher).
- **Yarn**: Install [Yarn](https://yarnpkg.com/) (v4 or higher).
- **Docker**: Install [Docker](https://www.docker.com/) (optional, for containerization).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/order-manager.git
   cd order-manager
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```
3. Build the project:
   ```bash
   yarn build
   ```

---

## Running the

### Locally

1. Start the server:

   ```bash
   yarn start
   ```

   The server will run on http://localhost:3000

2. Use Postman or cURL to interact with the API.

### Using Docker

1. Build the Docker image:

   ```bash
   docker build -t order-manager .
   ```

   The server will run on http://localhost:3000

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 order-manager
   ```
   The service will be available at http://localhost:3000.

## API Endpoints

1. Get Current Order State
   Endpoint: GET /order/state
   Description: Returns the current state of the order.

   Response:

   ```json
   {
     "state": "created"
   }
   ```

2. Transition Order State
   Endpoint: POST /order/transition
   Description: Transitions the order state based on the provided event.

   Request Body:

   ```json
   {
     "event": "CONFIRM"
   }
   ```

   Valid Events: CONFIRM, SHIP, DELIVER, CANCEL

   Response:

   ```json
   {
     "state": "confirmed"
   }
   ```

## Testing

### Unit Tests

Run unit tests for the state machine:

```bash
yarn test:unit
```

### Integration Tests

Run integration tests for the API endpoints:

```bash
yarn test:integration
```

### All Tests

Run both unit and integration tests:

```bash
yarn test
```

## Logging

The service logs all incoming requests to the console. Example log:

GET /order/state - 2ms
POST /order/transition - 5ms

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.

2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "Add your feature"
```

4. Push to the branch:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For any issues or questions, please open an issue on the GitHub repository.

Enjoy managing your orders with this service! 🚀

```

```
