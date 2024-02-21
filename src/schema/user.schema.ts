/**
 * @openapi
 * components:
 *  schemas:
 *      CreateUserInput:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  default: John Doe
 *              email:
 *                  type: string
 *                  default: john.doe@yahoo.com
 *              password:
 *                  type: string
 *                  default: jdpassword
 *      CreateUserResponse:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              createdAt:
 *                  type: string
 */