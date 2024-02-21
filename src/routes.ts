import { Express } from "express"
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./controllers/productController"
import { requireUser } from "./middlewares/requireUser"
import { createUser } from "./controllers/userController"
import { createSession, getSessions, deleteSession } from "./controllers/sessionController"

const routes = (app: Express) => {
    /**
     * @openapi
     * '/healthcheck':
     *  get:
     *      tags:
     *          - Healthcheck
     *      description: Responds if the app is up and running
     *      responses:
     *          200:
     *              description: App is up and running
     */
    app.get('/healthcheck', (req, res) => {
        res.sendStatus(200)
    })

    /**
     * @openapi
     * '/users':
     *  post:
     *      tags:
     *          - User
     *      summary: Create a new user
     *      requestBody:
     *          required: true
     *          content: 
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/CreateUserInput'
     *      responses:
     *          201:
     *              description: User created
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/CreateUserResponse'
     *          500:
     *              description: Something went wrong
     */
    app.post('/users', createUser)

    /**
     * @openapi
     * '/sessions':
     *  post:
     *      tags:
     *          - Session
     *      summary: Create a session
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/CreateSessionInput'
     *      responses:
     *          200:
     *              description: Success
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/CreateSessionResponse'
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Something went wrong
     *  delete:
     *      tags:
     *          - Session
     *      summary: Delete a session
     *      responses:
     *          200:
     *              description: Success
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/DeleteSessionResponse'
     *          403:
     *              description: Forbidden
     *          500:
     *              description: Something went wrong
     */
    app.post('/sessions', createSession)

    app.get('/sessions', requireUser, getSessions)

    app.delete('/sessions', requireUser, deleteSession)

    /**
     * @openapi
     * '/products':
     *  post:
     *      tags:
     *          - Product
     *      summary: Create a product
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/ProductInput'
     *      responses:
     *          201:
     *              description: Created
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ProductResponse'
     *          400:
     *              description: Bad request
     *          403:
     *              description: Forbidden
     *          500:
     *              description: Something went wrong
     *  get:
     *      tags:
     *          - Product
     *      summary: Get all products
     *      responses:
     *          200:
     *              description: Success
     *              content: 
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ArrayProductResponse'
     *          500:
     *              description: Something went wrong
     */
    app.post('/products', requireUser, createProduct)

    app.get('/products', getProducts)

    /**
     * @openapi
     * '/products/{id}':
     *  get:
     *      tags:
     *          - Product
     *      summary: Get a single product using the id
     *      parameters:
     *          - name: id
     *            in: path
     *            description: The id of the product
     *            required: true
     *      responses:
     *          200:
     *              description: Success
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ProductResponse'
     *          404:
     *              description: Product not found
     *          500:
     *              description: Something went wrong
     *  put:
     *      tags:
     *          - Product
     *      summary: Update a product
     *      parameters:
     *          - name: id
     *            in: path
     *            description: The id of the product
     *            required: true
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/ProductInput'
     *      responses:
     *          200:
     *              description: Success
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ProductResponse'
     *          403:
     *              description: Forbidden
     *          404:
     *              description: Product not found
     *          500:
     *              description: Something went wrong
     */
    app.get('/products/:id', getProductById)

    app.put('/products/:id', requireUser, updateProduct)

    app.delete('/products/:id', requireUser, deleteProduct)

}

export default routes