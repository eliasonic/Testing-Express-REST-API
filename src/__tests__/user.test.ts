import mongoose from 'mongoose'
import * as UserService from '../service/user.service'
import * as AuthenticateService from '../utils/authenticateUser'
import * as SessionService from '../service/session.service'
import { createSession } from '../controllers/sessionController'
import supertest from 'supertest'
import app from '../app'

const userInput = {
    name: 'John Doe',
    email: 'john.doe@yahoo.com',
    password: 'jdpassword'
}

const userPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'John Doe',
    email: 'john.doe@yahoo.com',
    createdAt: '2024-02-14T05:50:43.055+00:00',
    updatedAt: '2024-02-14T05:50:43.055+00:00',
    __v: 0
}

const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    userId: userPayload._id,
    userAgent: 'a user agent',
    valid: true,
    createdAt: '2024-02-14T05:50:43.055+00:00',
    updatedAt: '2024-02-14T05:50:43.055+00:00',
    __v: 0
}

describe('User', () => {

    describe('Create User Route', () => {
        describe('given the user data is valid', () => {
            it('should return a 201 and the user', async () => {
                const createUserServiceMock = jest
                .spyOn(UserService, 'createUserService')
                // @ts-ignore
                .mockReturnValueOnce(userPayload)

                const { statusCode, body } = await supertest(app).post('/users').send(userInput)

                expect(statusCode).toBe(201)

                expect(body).toEqual({
                    id: userPayload._id,
                    name: 'John Doe',
                    email: 'john.doe@yahoo.com',
                    createdAt: '2024-02-14T05:50:43.055+00:00'
                })

                expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
            })
        })

        describe('given the create user service throws', () => {
            it('should return a 500', async () => {
                const createUserServiceMock = jest
                .spyOn(UserService, 'createUserService')
                // @ts-ignore
                .mockRejectedValueOnce('Oh no, error occured!')

                const { statusCode } = await supertest(app).post('/users').send(userInput)

                expect(statusCode).toBe(500)

                expect(createUserServiceMock).toHaveBeenCalled()
            })
        })
    })

    describe('Create user session handler', () => {
        describe('given the login data is valid', () => {
            it('should return access and refresh tokens', async () => {
                jest
                    .spyOn(AuthenticateService, 'authenticateUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload)

                jest
                    .spyOn(SessionService, 'createSessionService')
                    // @ts-ignore
                    .mockReturnValueOnce(sessionPayload)

                const req = {
                    body: {
                        email: 'john.doe@yahoo.com',
                        password: 'jdpassword'
                    },
                    get: () => { return 'a user agent' }
                }

                const status = jest.fn()
                const json = jest.fn()

                const res = { 
                    status, 
                    json 
                }

                const next = jest.fn()

                // @ts-ignore
                await createSession(req, res, next)

                expect(status).toHaveBeenCalledWith(200)

                expect(json).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String)
                })
            })
        })
    })
})