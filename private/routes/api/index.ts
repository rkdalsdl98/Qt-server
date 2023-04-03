/**
 * 요청 응답 대기 시간 범위
 * 
 * short, default, long
 */
export type StandardRequestTime = 5000 | 10000 | 20000
export type APIProcess = '정상' | '실패' | '비정상 요청' | '시간초과'

import express, { Router } from "express";
import cors from 'cors'

try {
    const router : Router = express.Router()
    const apiCorsOptions: cors.CorsOptions = {
        origin: '*',
        methods: 'POST',
        optionsSuccessStatus: 200
    }

    router.use(cors(apiCorsOptions))
    router.use('/weather', require('./weather'))

    module.exports = router
    console.log('API 라우터 정상적으로 열림')
} catch(e) {
    console.log(e)
}