type ReturnType = 'success' | 'failed' | 'not found'

import express, { Router, Request, Response } from 'express'
import { update } from '../../ts/database/datacenter'
import { UserUpdateDto } from './dto/user.dto'

const updateHandler = async (req: Request, res: Response) : Promise<void> => {
    if(req.body) {
        const updateData : UserUpdateDto = req.body.data
        const userId : string = req.body.id
        try {
            await update(userId, updateData)
            const result : ReturnType = 'success'
            
            res.status(200).json({result})
            console.log('업데이트 요청 처리 결과: ', result)
        } catch(e) {
            const result : ReturnType = 'failed'
            res.status(400).json({result, message: '유저정보를 업데이트 하는데 실패했습니다.'})
            console.log('업데이트 요청 처리 결과: ', result, e)
        }
    } else {
        const result : ReturnType = 'failed'
        res.status(400).json({result, message: '유저정보를 로드하는데 실패했습니다.'})
        console.log('업데이트 요청 처리 결과: ', result)
    }
}

try {
    const router : Router = express.Router()

    router.patch('/', updateHandler)

    module.exports = router
    console.log('업데이트 요청 정상 대기 중')
} catch(e) {
    console.log(e)
}