import express, { Router } from 'express'
import cors from 'cors'

try {
    const router : Router = express.Router()
    const loginCorsOptions: cors.CorsOptions = {
        origin: '*',
        methods: 'POST',
        optionsSuccessStatus: 200
    }

    router.use(cors(loginCorsOptions))
    router.use('/login', require('./login'))
    router.use('/update', require('./update'))

    module.exports = router
    console.log('유저 라우터 정상적으로 열림')
} catch(e) {
    console.log(e)
}