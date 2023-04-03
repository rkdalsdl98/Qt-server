/**
 * 어플리케이션에 전송될 요청 결과
 */
type ReturnType = 'success' | 'failed'

import { getAllCourse } from '../../ts/database/datacenter'

import express, { Router, Request, Response } from 'express'
import { DocumentData } from 'firebase/firestore/lite'

const courselistHandler = async (req: Request, res: Response) : Promise<void> => {
    try {
        const courselist : DocumentData[] = await getAllCourse()
        
        if(courselist.length < 1) {
            const result : ReturnType = 'failed'
            res.status(404).json({result, courselist})
            console.log('코스 리스트 요청 처리 결과:', result)
        } else {
            const result : ReturnType = 'success'
            res.status(200).json({result, courselist})
            console.log('코스 리스트 요청 처리 결과:', result)
        }
    } catch(e) {
        console.log(e)
    }
}

try {
    const router : Router = express.Router()
    router.get('/', courselistHandler)

    module.exports = router
    console.log('코스 리스트 요청 정상 대기 중')
} catch(e) {
    console.log(e)
}