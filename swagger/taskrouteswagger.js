

/**
* @swagger
* tags:
* - name: Task
*   description: Task management endpoints
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     TaskInput:
*       type: object
*       properties:
*         title:
*           type: string
*         description:
*           type: string
*         status:
*           type: string
*           enum: [TODO, IN_PROGRESS, COMPLETED, BLOCKED]
*         priority:
*           type: string
*           enum: [LOW, MEDIUM, HIGH, URGENT]
*         due_date:
*           type: string
*           format: date-time
*         labels:
*           type: array
*           items:
*             type: string
*       required:
*         - title
*         - status
*         - priority
*     TaskResponse:
*       type: object
*       properties:
*         id:
*           type: integer
*         title:
*           type: string
*         description:
*           type: string
*         status:
*           type: string
*         priority:
*           type: string
*         due_date:
*           type: string
*           format: date-time
*         created_by:
*           type: integer
*         created_at:
*           type: string
*           format: date-time
*         updated_at:
*           type: string
*           format: date-time
*         user:
*           type: object
*           properties:
*             id:
*               type: integer
*             name:
*               type: string
*         task_labels:
*           type: array
*           items:
*             type: object
*             properties:
*               label:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                   name:
*                     type: string
*                   color:
*                     type: string
* /api/task:
*   post:
*     summary: Create a new task
*     tags: [Task]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TaskInput'
*     responses:
*       201:
*         description: Task created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 task:
*                   $ref: '#/components/schemas/TaskResponse'
*       400:
*         description: Validation error
*       500:
*         description: Internal server error
*   get:
*     summary: Get all tasks
*     tags: [Task]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: page
*         in: query
*         schema:
*           type: integer
*       - name: status
*         in: query
*         schema:
*           type: string
*           enum: [TODO, IN_PROGRESS, COMPLETED, BLOCKED]
*       - name: priority
*         in: query
*         schema:
*           type: string
*           enum: [LOW, MEDIUM, HIGH, URGENT]
*     responses:
*       200:
*         description: List of tasks
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 page:
*                   type: integer
*                 limit:
*                   type: integer
*                 total:
*                   type: integer
*                 totalPages:
*                   type: integer
*                 tasks:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/TaskResponse'
* /api/task/{id}:
*   get:
*     summary: Get a task by ID
*     tags: [Task]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Task details
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 task:
*                   $ref: '#/components/schemas/TaskResponse'
*       400:
*         description: Invalid task ID
*       403:
*         description: Unauthorized access
*       404:
*         description: Task not found
*   put:
*     summary: Update a task fully
*     tags: [Task]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/TaskInput'
*     responses:
*       200:
*         description: Task fully updated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 task:
*                   $ref: '#/components/schemas/TaskResponse'
*       400:
*         description: Validation error
*       403:
*         description: Unauthorized access
*       404:
*         description: Task not found
*       500:
*         description: Internal server error
*   patch:
*     summary: Partially update a task
*     tags: [Task]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               description:
*                 type: string
*               status:
*                 type: string
*                 enum: [TODO, IN_PROGRESS, COMPLETED, BLOCKED]
*               priority:
*                 type: string
*                 enum: [LOW, MEDIUM, HIGH, URGENT]
*               due_date:
*                 type: string
*                 format: date-time
*               labels:
*                 type: array
*                 items:
*                   type: string
*     responses:
*       200:
*         description: Task partially updated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 task:
*                   $ref: '#/components/schemas/TaskResponse'
*       400:
*         description: Validation error
*       403:
*         description: Unauthorized access
*       404:
*         description: Task not found
*       500:
*         description: Internal server error
*   delete:
*     summary: Delete a task
*     tags: [Task]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Task deleted successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Task deleted successfully
*       403:
*         description: Unauthorized access
*       404:
*         description: Task not found
*       500:
*         description: Internal server error
*/
