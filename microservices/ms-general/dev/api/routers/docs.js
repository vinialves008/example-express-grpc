/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: leannegraham@email.com
 *         password:
 *           type: string
 *           description: The user's password. Must be at least 8 characters long, one uppercase letter, one lowercase letter and a number
 *           example: Aa123456
 *     Fieldmessage:
 *       type: object
 *       properties:
 *         fieldname:
 *           type: string
 *         message:
 *           type: string
 *     BadRequest:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: .
 *           example: 400
 *         message:
 *           type: string
 *           description: .
 *           example: Não foi possível salvar
 *         path:
 *           type: string
 *           description: .
 *           example: /
 *         errors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Fieldmessage'
 */