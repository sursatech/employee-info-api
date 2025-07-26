# Employee Info API

A RESTful API for managing employee information built with Node.js, Express, TypeScript, and Prisma.

## Features

- CRUD operations for employees
- Employee management with fields: name, email, position, department, salary, hire date, and active status
- Filter employees by department
- Get active employees only
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/employee_db"
   ```

4. Set up the database:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## API Endpoints

### Employees

- `GET /employees` - Get all employees
- `GET /employees/active` - Get active employees only
- `GET /employees/department/:department` - Get employees by department
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Employee Model

```typescript
{
  id: number
  name: string
  email: string (unique)
  position: string
  department: string
  salary: number
  hireDate: Date
  isActive: boolean
}
```

## Development

The API runs on port 3001 by default. Make sure your frontend application is configured to connect to `http://localhost:3001`. 