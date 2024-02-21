import app from "./app";
import http from 'http'
import connectDB from "./db";
import { swaggerFunc } from "./utils/swagger";

const port = process.env.PORT || 3001

const server = http.createServer(app)

server.listen(port, async () => {
    console.log(`Server is started on port ${port}`)

    await connectDB()

    swaggerFunc(app, port)
})