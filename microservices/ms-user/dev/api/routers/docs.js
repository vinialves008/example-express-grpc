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
 *     UserNewDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: leannegraham@email.com
 *         birthDate:
 *           type: date
 *           description: The user's date of birth.
 *           example: 1990-01-01
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: Aa123456
 *         address:
 *           type: object
 *           $ref: '#/components/schemas/AddressNewDTO'
 *     AddressNewDTO:
 *       type: object
 *       properties:
 *         zipCode:
 *           type: string
 *         street:
 *           type: string
 *         neighborhood:
 *           type: string
 *         numberHouse:
 *           type: string
 *         complement:
 *           type: string
 *         referencePoint:
 *           type: string
 *         cityId:
 *           type: number
 */