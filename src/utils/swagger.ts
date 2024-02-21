import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import { version } from '../../package.json'
import { Express, Request, Response } from 'express'

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API Docs',
            version
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes.ts', './src/schema/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)


function swaggerFunc(app: Express, port: string | number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    console.log(`Docs available at http://localhost:${port}/docs`)
}

export { swaggerFunc }