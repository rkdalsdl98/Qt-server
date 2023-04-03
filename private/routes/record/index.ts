/**
 * 수동으로 코스좌표를 찍기위한 라우터 이므로
 * 테스트를 위해 basedir변수를 본인의 환경에 맞게 설정해주어야 함.
 */

type RecordProcess = '성공' | '실패' | '비정상 요청' | '기록실패'

const BASEDIR : string = 'C:/Users/win102201/Desktop/Project/Qt_Server/Records/record.txt'

import express, { Router, Request, Response } from "express";
import cors from 'cors'
import fs from 'fs'

try {
    const router : Router = express.Router()
    const apiCorsOptions: cors.CorsOptions = {
        origin: '*',
        methods: 'POST',
        optionsSuccessStatus: 200
    }

    router.use(cors(apiCorsOptions))

    router.post('/', (req : Request, res : Response) : void => {
        try {
            if(req.body) {
                const { title, direction, speed } = req.body
                const recordText : string | undefined = `[${title}]:${direction}:${speed}\n`
                fs.appendFileSync(BASEDIR, '\ufeff' + recordText, {encoding: 'utf8'})
                
                const result : RecordProcess = '성공'
                res.status(200).json({code: 200, result})
                console.log(`기록 저장 요청 결과:`, result)
            } else {
                const result : RecordProcess = '비정상 요청'
                res.status(404).json({code: 404, message: '몸통이 비었잖아...', result})
                console.log(`기록 저장 요청 결과:`, result)
            }
        } catch(e) {
            const result : RecordProcess = '실패'
            console.log(`기록 저장 요청 결과:`, result)
            console.log(e)
        }
    })

    module.exports = router
    console.log('Record 라우터 정상적으로 열림')
} catch(e) {
    console.log(e)
}