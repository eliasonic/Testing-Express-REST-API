import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from 'supertest'
import app from "../app";
import { signJwt } from "../utils/jwt";

const userId = new mongoose.Types.ObjectId().toString()
let productId: string 

const productInput = {
    name: 'jacket',
    price: 50
}

const userPayload = {
    userId,
    email: 'john.doe@yahoo.com'
}

describe('Product', () => {
    beforeAll(async () => {
        // const mongoServer = await MongoMemoryServer.create()
        // await mongoose.connect(mongoServer.getUri())

        await mongoose.connect('mongodb://127.0.0.1:27017/testDB')
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe('Create Product Route', () => {
        describe('given the user is not logged in', () => {
            it('should return a 403', async () => {
                await supertest(app).post('/products').send(productInput).expect(403)
            })
        })

        describe('given the user is logged in', () => {
            it('should return a 201 and create the product', async () => {
                const accessToken = signJwt(userPayload, '5m')

                const { statusCode, body } = await supertest(app)
                .post('/products')
                .set('Authorization', `Bearer ${accessToken}` )
                .send(productInput)

                expect(statusCode).toBe(201)

                // console.log(body)
                productId = body._id

                expect(body).toEqual({
                    _id: expect.any(String),
                    userId,
                    name: 'jacket',
                    price: 50,
                    quantity: 0,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    __v: 0
                })
            }) 
        })
    })

    describe('Get Product Route', () => {
        describe('given the product does not exist', () => {
            it('should return a 404', async () => {
                const id = new mongoose.Types.ObjectId().toString()  // random ObjectId

                const { statusCode } = await supertest(app).get(`/products/${id}`)

                expect(statusCode).toBe(404)
            })
        })

        describe('given the product does exist', () => {
            it('should return a 200 and the product', async () => {
                const id = productId
                // console.log(id)

                const { statusCode, body } = await supertest(app).get(`/products/${id}`)

                expect(statusCode).toBe(200)

                expect(body).toEqual({
                    _id: productId,
                    userId,
                    name: 'jacket',
                    price: 50,
                    quantity: 0,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    __v: 0
                })
            })
        })
    })  
})