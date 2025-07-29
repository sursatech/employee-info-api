# Employee Info API

A RESTful API for managing employee information built with Node.js, Express, TypeScript, and Prisma.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment:**
   Create a `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/employee_db"
   PORT=3000
   ```

3. **Setup database:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name "initial_setup"
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## Database Migrations

**Create a new migration:**
```bash
npm run prisma:migrate -- --name "your_migration_name"
```

**Other useful commands:**
```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open database browser
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees/active` | Get active employees |
| GET | `/employees/department/:dept` | Get employees by department |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Create new employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |

## Employee Model

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