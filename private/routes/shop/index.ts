type ReturnType = 'success' | 'failed' | 'empty'

import express, { Router, Request, Response } from "express";
import cors from 'cors'


import { getAllItems } from "../../ts/database/datacenter";
import { DocumentData } from "firebase/firestore/lite";

async function handleShop(req: Request, res: Response) {
    try {
        const shopItems : DocumentData[] | null = await getAllItems()
        if(shopItems) {
            const result : ReturnType = 'success'
            res.status(200).json({result, shopItems})
            console.log('상점 리스트 요청 처리 결과:', result)
        } else {
            const result : ReturnType = 'empty'
            res.status(200).json({result, shopItems: []})
            console.log('상점 리스트 요청 처리 결과:', result)
        }
    } catch(e) {
        const result : ReturnType = 'failed'
        res.status(400).json({result, shopItems: null})
        console.log('상점 리스트 요청 처리 결과:', result, e)
    }
}

try {
    const router : Router = express.Router()
    const apiCorsOptions: cors.CorsOptions = {
        origin: '*',
        methods: 'POST',
        optionsSuccessStatus: 200
    }

    router.use(cors(apiCorsOptions))
    router.get('/', handleShop)
    
    module.exports = router
    console.log('상점 라우터 정상적으로 열림')
} catch(e) {
    console.log(e)
}