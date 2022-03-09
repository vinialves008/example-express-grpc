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
 *     State:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         initials:
 *           type: string
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         street:
 *           type: string
 *         zipCode:
 *           type: string
 *         neighborhood:
 *           type: string
 *         numberHouse:
 *           type: string
 *         complement:
 *           type: string
 *         referencePoint:
 *           type: string
 *         city:
 *           type: object
 *           $ref: '#/components/schemas/City'
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         default:
 *           type: boolean
 *         updatedAt:
 *           type: date
 *         createdAt:
 *           type: date
 *         active:
 *           type: boolean
 *     ContactNewDTO:
 *       type: object
 *       properties:
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         default:
 *           type: boolean
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