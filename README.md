

A backend API for managing tasks and labels, built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**. Includes authentication (JWT), task CRUD operations, label management, pagination, filtering, and Swagger API documentation.

---

## Features

- User registration and login with JWT authentication
- Task CRUD operations
- Label CRUD operations
- Task filtering and sorting (by status, priority, due_date)
- Pagination for task listing
- Swagger API documentation
- CORS configured for development

---

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT for authentication
- Swagger for API docs

---

## Prerequisites

- Node.js >= 18
- PostgreSQL database
- npm or yarn

---

## Setup

### 1. Clone the repository

```bash 

git clone git@github.com:arjun-aryal/Node_TaskManager.git

cd Node_TaskManager

```

### 2. Install dependencies

```bash

npm install

```

### 3. Configure environment variables

Create a `.env` file in the root directory:

``` bash
#Server
PORT=5000 
NODE_ENV=development

#DB
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE 

#JWT
JWT_SECRET=your_jwt_secret 
ACCESS_TOKEN_EXPIRES_IN=3h
REFRESH_TOKEN_EXPIRES_IN=7d 


```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev --name init
```

Optional: Generate Prisma client if not auto-generated:

```bash
npx prisma generate

```




### 5. Run the development server

``` bash
npm run dev
```

Server will start at `http://localhost:5000`  

### 6. Swagger Docs:

Swagger docs available at `http://localhost:5000/api-docs`

---

## Scripts


In `package.json`:

```bash 
scripts": {   "
	dev": "nodemon src/index.js",   
	"start": "node src/index.js",   
	"generate": "prisma generate",   
	"migrate": "prisma migrate dev" 
	}

```

---

## Endpoints

### **Auth**

|Endpoint|Method|Description|
|---|---|---|
|`/api/auth/register`|POST|Register a new user|
|`/api/auth/login`|POST|Login user|
|`/api/auth/logout`|POST|Logout user|
|`/api/auth/refresh`|POST|Refresh access token|

### **Tasks**

|Endpoint|Method|Description|
|---|---|---|
|`/api/task`|POST|Create a new task|
|`/api/task`|GET|Get all tasks|
|`/api/task/:id`|GET|Get single task by ID|
|`/api/task/:id`|PUT|Update task fully|
|`/api/task/:id`|PATCH|Update task partially|
|`/api/task/:id`|DELETE|Delete task|

### **Labels**

|Endpoint|Method|Description|
|---|---|---|
|`/api/label`|POST|Create label|
|`/api/label`|GET|Get all labels|
|`/api/label/:id`|PUT|Update label fully|
|`/api/label/:id`|PATCH|Update label partially|
|`/api/label/:id`|DELETE|Delete label|

---
## API Testing

You can test the API using **Postman**.
### Postman Setup

1. Import the collection: `Task Management.postman_collection.json` (provided in the repo).
2. Set environment variables in Postman:
    - `baseUrl` = `http://localhost:5000/api`
3. Use endpoints for tasks, labels, and authentication.

**Included endpoints:**

- **Auth:** `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/refresh`
- **Tasks:** `/task/` (CRUD + filtering + pagination)
- **Labels:** `/label/` (CRUD)

### Example Requests

### 1. Register

- **URL:** `{{url}}/auth/register`
- **Method:** POST
  - **Body:** JSON (raw)

    ```json     
    {
    "name": "John Doe",     
    "email": "john@example.com",     
    "password": "password123" 
    }
    ```
    
- **Response:**
    
    - 201: Returns created user details and success message
    - 400: Validation errors
    - 409: User already exists
        

---

### 2. Login

- **URL:** `{{url}}/auth/login`
- **Method:** POST
- **Body:** JSON (raw)
    
    ```json
    {    
     "email": "john@example.com",   
     "password": "password123" 
     }
    ```
    
- **Response:**
    
    - 200: Returns JWT access token, user info, and sets refresh token cookie
    - 400: Validation errors
    - 404: Invalid credentials

---

### **1. Create Task**

- **POST** `/api/task`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Body (JSON):**
    

```json
{
  "title": "Complete Q4 Report",
  "description": "Finish the financial report for Q4",
  "status": "TODO",
  "priority": "HIGH",
  "due_date": "2025-11-15T17:00:00.000Z",
  "labels": ["Work", "Finance"]
}

```

- **Response (201):**


```json 
{   
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Complete Q4 Report",
    "description": "Finish the financial report for Q4",
    "status": "TODO",
    "priority": "HIGH",
    "due_date": "2025-11-15T17:00:00.000Z",
    "created_by": 1,
    "user": { "id": 1, "username": "Arjun" },
    "labels": [
      { "id": 1, "name": "Work", "color": "#3c29ebff" },
      { "id": 2, "name": "Finance", "color": "#3c29ebff" }
    ]
  }
}

```

---

### **2. Get All Tasks**

- **GET** `/api/task`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Query Parameters (Optional):**
    - `page` (default: 1)
    - `status` (TODO, IN_PROGRESS, COMPLETED, BLOCKED)
    - `priority` (LOW, MEDIUM, HIGH, URGENT)
- **Response (200):**
    

```json 

{
  "page": 1,
  "limit": 25,
  "total": 50,
  "totalPages": 2,
  "tasks": [
    {
      "id": 1,
      "title": "Complete Q4 Report",
      "description": "Finish the financial report for Q4",
      "status": "TODO",
      "priority": "HIGH",
      "due_date": "2025-11-15T17:00:00.000Z",
      "created_by": 1,
      "user": { "id": 1, "username": "Arjun" },
      "labels": [
        { "id": 1, "name": "Work", "color": "#3c29ebff" },
        { "id": 2, "name": "Finance", "color": "#3c29ebff" }
      ]
    }
  ]
}

```

---

### **1. Create Label**

- **POST** `/api/label`
- **Headers:**  
    `Authorization: Bearer <accessToken>`  
    `Content-Type: application/json`
- **Body (JSON):**
    ```json
    {
  "name": "Work",
  "color": "#3c29ebff"
}

    ```

- **Response (201):**

``` json
{
  "message": "Label created Successfully",
  "label": {
    "id": 1,
    "name": "Work",
    "color": "#3c29ebff"
  }
}

```

---

### **2. Get All Labels**

- **GET** `/api/label`
- **Headers:**  
    `Authorization: Bearer <accessToken>`
- **Response (200):**


```json
{
  "labels": [
    {
      "id": 1,
      "name": "Work",
      "color": "#3c29ebff"
    },
    {
      "id": 2,
      "name": "Personal",
      "color": "#ff5733"
    }
  ]
}

```