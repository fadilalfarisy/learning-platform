import bodyParser from 'body-parser'
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './src/routes/index.js'
import config from './src/config/config.js'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//config
const { PORT, MONGO_URI } = config

try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    console.log('connect to db')
} catch (error) {
    console.log(error)
};

const app = express()

//middleware
app.use(cookieParser()); //allow to access cookie
app.use(bodyParser.urlencoded({ extended: false })) //allow request with format x-www-form-urlencoded
app.use(bodyParser.json()) //allow request with format json

//api
app.use('/api', router)
app.get('/', (req, res) => {
    res.status(200).json({
        code: 200,
        status: 'OK',
        data: {
            message: 'server running'
        }
    })
})
app.get('*', (req, res) => {
    res.status(404).json({
        code: 404,
        status: 'NOT_FOUND',
        errors: {
            path: 'invalid path'
        }
    })
})

//error handlers
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        code: 500,
        status: 'INTERNAL_SERVER_ERROR'
    });
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))