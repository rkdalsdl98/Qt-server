import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'

dotenv.config()

const SERVER_PORT: string|undefined = process.env.PORT
const app: Express = express()
const corsOptions: cors.CorsOptions = {
    origin: 'https://adminpage.com',
    methods: 'GET,POST,PATCH,DELETE',
    optionsSuccessStatus: 200
}

app.disable('x-powered-by')

app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet())

app.use('/api', require('./routes/api'))
app.use('/user', require('./routes/user'))
app.use('/record', require('./routes/record'))
app.use('/course', require('./routes/course'))
app.use('/shop', require('./routes/shop'))

app.listen(SERVER_PORT, async function () {
    console.log(`
    ####오이시쿠 나래 오이시쿠 나래############
           QT 서버 개방 포트: ${SERVER_PORT}
    ######모에 모에#################큥!#######
    `)
})