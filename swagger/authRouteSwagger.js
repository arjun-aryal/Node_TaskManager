
/**
* @swagger
* tags:
* - name: Auth
*   description: Authentication endpoints
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     RegisterInput:
*       type: object
*       properties:
*         name:
*           type: string
*         email:
*           type: string
*           format: email
*         password:
*           type: string
*           format: password
*       required:
*         - name
*         - email
*         - password
*     LoginInput:
*       type: object
*       properties:
*         email:
*           type: string
*           format: email
*         password:
*           type: string
*           format: password
*       required:
*         - email
*         - password
*     UserResponse:
*       type: object
*       properties:
*         id:
*           type: integer
*         username:
*           type: string
*         email:
*           type: string
*           format: email
* /api/auth/register:
*   post:
*     summary: Register a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/RegisterInput'
*     responses:
*       201:
*         description: User created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 user:
*                   $ref: '#/components/schemas/UserResponse'
*       400:
*         description: Validation errors
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errors:
*                   type: array
*                   items:
*                     type: string
*       409:
*         description: User already exists
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
* /api/auth/login:
*   post:
*     summary: Login a user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/LoginInput'
*     responses:
*       200:
*         description: User logged in successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 accessToken:
*                   type: string
*                 user:
*                   $ref: '#/components/schemas/UserResponse'
*                 redirect:
*                   type: string
*       400:
*         description: Validation errors
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errors:
*                   type: array
*                   items:
*                     type: string
*       404:
*         description: Invalid credentials
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       500:
*         description: Internal server error
* /api/auth/logout:
*   post:
*     summary: Logout a user
*     tags: [Auth]
*     responses:
*       200:
*         description: User logged out successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: User logged out successfully
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
* /api/auth/refresh:
*   post:
*     summary: Refresh JWT access token
*     tags: [Auth]
*     requestBody:
*       required: false
*       description: Refresh token is sent automatically via HTTP-only cookie
*     responses:
*       200:
*         description: New access token issued
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 accessToken:
*                   type: string
*                   description: JWT access token
*       401:
*         description: No refresh token found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: No refresh token found
*       403:
*         description: Invalid or expired refresh token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Invalid or expired refresh token
*/
