

/**
* @swagger
* tags:
* - name: Label
*   description: Label management endpoints
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     LabelInput:
*       type: object
*       properties:
*         name:
*           type: string
*         color:
*           type: string
*       required:
*         - name
*         - color
*     LabelResponse:
*       type: object
*       properties:
*         id:
*           type: integer
*         name:
*           type: string
*         color:
*           type: string
* /api/label:
*   post:
*     summary: Create a new label
*     tags: [Label]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/LabelInput'
*     responses:
*       201:
*         description: Label created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/LabelResponse'
*       400:
*         description: Validation error
*       500:
*         description: Internal server error
*   get:
*     summary: Get all labels
*     tags: [Label]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of labels
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/LabelResponse'
*       500:
*         description: Internal server error
* /api/label/{id}:
*   put:
*     summary: Update a label completely
*     tags: [Label]
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
*             $ref: '#/components/schemas/LabelInput'
*     responses:
*       200:
*         description: Label updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/LabelResponse'
*       404:
*         description: Label not found
*       500:
*         description: Internal server error
*   patch:
*     summary: Partially update a label
*     tags: [Label]
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
*               name:
*                 type: string
*               color:
*                 type: string
*     responses:
*       200:
*         description: Label updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/LabelResponse'
*       404:
*         description: Label not found
*       500:
*         description: Internal server error
*   delete:
*     summary: Delete a label
*     tags: [Label]
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
*         description: Label deleted successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Label deleted successfully
*       404:
*         description: Label not found
*       500:
*         description: Internal server error
*/
