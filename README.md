# Task Manager API

A RESTful API for managing tasks and user workflows built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- CRUD operations for tasks
- Task status tracking
- Due date management
- User-specific task lists

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm, pnpm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lucy-sees/task-management-system.git
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - User login

### Tasks
- GET `/api/tasks` - Get all tasks for authenticated user
- POST `/api/tasks` - Create a new task
- GET `/api/tasks/:id` - Get specific task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

## Request & Response Examples

### Register User
```json
POST /api/users/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Create Task
```json
POST /api/tasks
{
  "title": "Complete project",
  "description": "Finish the API documentation",
  "status": "pending",
  "dueDate": "2024-12-31T23:59:59Z"
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "error": "Error message description"
}
```

## Testing

Run tests using:
```bash
npm test
```

## Development

Start the development server:
```bash
npm run dev
```

## Production

Start the production server:
```bash
npm start
```

## License

[MIT](https://github.com/lucy-sees/Task-Management-System/blob/53166b0357c79a6f7949a5f130d5d3862259f0d2/LICENSE)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request