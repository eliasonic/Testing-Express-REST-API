/**
 * @openapi
 * components:
 *  schemas:
 *      CreateSessionInput:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  default: john.doe@yahoo.com
 *              password:
 *                  type: string
 *                  default: jdpassword
 *      CreateSessionResponse:
 *          type: object
 *          properties:
 *              accessToken:
 *                  type: string
 *              refreshToken:
 *                  type: string
 *      DeleteSessionResponse:
 *          type: object
 *          properties:
 *              accessToken:
 *                  type: null
 *                  default: null
 *              refreshToken:
 *                  type: null
 *                  default: null
 */