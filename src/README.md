# QuickHire Backend API

A RESTful API for a simple job board application built with NestJS, PostgreSQL, and TypeORM.

---

## Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT + Passport
- **Validation:** class-validator
- **Documentation:** Swagger UI

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- npm

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/quickhire-backend.git
cd quickhire-backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Create environment file**
```bash
cp .env.example .env
```

**4. Update `.env` with your credentials**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=quickhire
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@quickhire.com
ADMIN_PASSWORD=admin123
```

**5. Create the database**
```sql
CREATE DATABASE quickhire;
```

**6. Run the server**
```bash
npm run start:dev
```

On first startup, an admin account will be seeded automatically using the credentials from your `.env` file.

---

## API Documentation

Swagger UI available at:
```
http://localhost:3000/api/docs
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register a new user | Public |
| POST | /api/auth/login | Login and get JWT token | Public |

### Jobs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/jobs | Get all jobs | Public |
| GET | /api/jobs/:id | Get single job | Public |
| POST | /api/jobs | Create a job | Admin only |
| DELETE | /api/jobs/:id | Delete a job | Admin only |

### Query Parameters for GET /api/jobs

| Param | Description | Example |
|-------|-------------|---------|
| search | Search by title or company | ?search=developer |
| category | Filter by category | ?category=Engineering |
| location | Filter by location | ?location=Dhaka |

### Applications

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/applications | Submit a job application | Public |
| GET | /api/applications | Get all applications | Admin only |
| GET | /api/applications/job/:job_id | Get applications by job | Admin only |

---

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

**Login to get token:**
```json
POST /api/auth/login
{
  "email": "admin@quickhire.com",
  "password": "admin123"
}
```

---

## Response Format

### Success
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Jobs fetched successfully",
  "data": [...]
}
```

### Error
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Job with ID 999 not found",
  "path": "/api/jobs/999",
  "timestamp": "2026-03-02T00:00:00.000Z"
}
```

---

## Database Models

### Job
| Field | Type | Required |
|-------|------|----------|
| id | integer (auto-increment) | ✅ |
| title | varchar | ✅ |
| company | varchar | ✅ |
| location | varchar | ✅ |
| category | varchar | ✅ |
| description | text | ✅ |
| salary | varchar | ❌ |
| jobType | varchar | ❌ |
| created_at | timestamp | ✅ |

### Application
| Field | Type | Required |
|-------|------|----------|
| id | integer (auto-increment) | ✅ |
| job_id | integer (foreign key) | ✅ |
| name | varchar | ✅ |
| email | varchar | ✅ |
| resume_link | varchar | ✅ |
| cover_note | text | ❌ |
| created_at | timestamp | ✅ |

### User
| Field | Type | Required |
|-------|------|----------|
| id | integer (auto-increment) | ✅ |
| email | varchar | ✅ |
| password | varchar (hashed) | ✅ |
| role | enum (admin/user) | ✅ |
| created_at | timestamp | ✅ |

---

## Project Structure
```
src/
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── interceptors/
│       └── response.interceptor.ts
├── auth/
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── dto/
│   │   ├── register.dto.ts
│   │   └── login.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── repositories/
│   │   └── user.repository.ts
│   ├── seed/
│   │   └── admin.seed.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── jobs/
│   ├── dto/
│   │   ├── create-job.dto.ts
│   │   └── query-job.dto.ts
│   ├── entities/
│   │   └── job.entity.ts
│   ├── repositories/
│   │   └── job.repository.ts
│   ├── jobs.controller.ts
│   ├── jobs.service.ts
│   └── jobs.module.ts
├── applications/
│   ├── dto/
│   │   └── create-application.dto.ts
│   ├── entities/
│   │   └── application.entity.ts
│   ├── repositories/
│   │   └── application.repository.ts
│   ├── applications.controller.ts
│   ├── applications.service.ts
│   └── applications.module.ts
├── app.module.ts
└── main.ts
```

---

## Author

Shawon Kumar Modak — [GitHub](https://github.com/shawonkumar01)