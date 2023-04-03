import express, { Router } from 'express'
import cors from 'cors'

try {
    const router : Router = express.Router()
    const apiCorsOptions: cors.CorsOptions = {
        origin: '*',
        methods: 'POST',
        optionsSuccessStatus: 200
    }

    router.use(cors(apiCorsOptions))
    router.use('/list', require('./courselist'))

    module.exports = router
    console.log('코스 라우터 정상적으로 열림')
} catch(e) {
    console.log(e)
}