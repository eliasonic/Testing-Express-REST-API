/**
 * @openapi
 * components:
 *  schemas:
 *      ProductInput:
 *          type: object
 *          required:
 *              - name
 *              - quantity
 *              - price
 *          properties:
 *              name:
 *                  type: string
 *                  default: jacket
 *              quantity:
 *                  type: number
 *                  default: 1
 *              price:
 *                  type: number
 *                  default: 75
 *      ArrayProductResponse:
 *          type: array
 *          items: 
 *            type: object
 *            properties:
 *              _id:
 *                  type: string
 *              userId:
 *                  type: string
 *              name:
 *                  type: string
 *              quantity:
 *                  type: number
 *              price:
 *                  type: number
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *              __v:
 *                  type: number
 *      ProductResponse:
 *          type: object
 *          properties:
 *            _id:
 *                type: string
 *            userId:
 *                type: string
 *            name:
 *                type: string
 *            quantity:
 *                type: number
 *            price:
 *                type: number
 *            createdAt:
 *                type: string
 *            updatedAt:
 *                type: string
 *            __v:
 *                type: number
 *                  
 */