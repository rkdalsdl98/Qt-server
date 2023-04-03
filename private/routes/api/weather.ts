/**
 * 어플리케이션에 전송될 요청 결과
 */
type ReturnType = 'success' | 'failed' | 'not found'

/**
 * 날씨 정보 인터페이스
 */
interface WeatherData {
    tempture : any,
    wind : any,
    weather : {}
}
/**
 * 최종적으로 어플리케이션에 전송될 오브젝트 인터페이스
 */
interface ResultObj {
    weatherData : WeatherData,
    result : ReturnType
}


import express, { Router, Request, Response } from "express";
import dotenv from 'dotenv'
import { APIProcess, StandardRequestTime } from "./index";

dotenv.config()

const API_KEY : string | undefined = process.env.OPEN_WEATHER_API_KEY

const weatherHandler = async (req : Request, res : Response) : Promise<void> => {
    if(req.body) {
        const {latitude, longitude} = req.body

        const controller = new AbortController()
        const { signal } = controller
        let timeOver : boolean = true

        const shortTime : StandardRequestTime = 5000
        
        /**
         * 날씨 정보 요청 시간 초과 체크
         */
        setTimeout(() => {
            if(timeOver) {
                const resultObj : ResultObj = {
                    weatherData : {
                        tempture: '',
                        wind: '',
                        weather: {}
                    },
                    result : 'not found'
                }
                res.status(400).json({weatherData: resultObj, message: '날씨 정보를 가져오는데 실패했습니다', code: 400})
                controller.abort()
                const apiProcess : APIProcess = '시간초과'
                console.log('날씨 요청 처리 결과:', apiProcess)
            }
        }, shortTime)

        /* OpenWeather Api 정보 요청 */
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`, {signal})
        .then(data => data.json())
        .then(json => {
            timeOver = false
            const resultObj : ResultObj = {
                weatherData : {
                    tempture: json.main,
                    wind: json.wind,
                    weather: json.weather[0]
                },
                result : 'success'
            }

            res.status(200).json(resultObj)
            const apiProcess : APIProcess = '정상'
            console.log('날씨 요청 처리 결과:', apiProcess)
        })
        .catch(e => {
            const resultObj : ResultObj = {
                weatherData : {
                    tempture: '',
                    wind: '',
                    weather: {}
                },
                result : 'failed'
            }
            res.status(400).json({weatherData: resultObj, message: 'API 요청 실패', code: 400})
            const apiProcess : APIProcess = '실패'
            console.log('날씨 요청 처리 결과:', apiProcess)
        })
    } else {
        const resultObj : ResultObj = {
            weatherData : {
                tempture: '',
                wind: '',
                weather: {}
            },
            result : 'not found'
        }
        res.status(404).json({weatherData: resultObj, message: '확인 할 수 있는 위치가 아닙니다', code: 404})
        const apiProcess : APIProcess = '비정상 요청'
        console.log('날씨 요청 처리 결과:', apiProcess)
    }
}

try {
    const router : Router = express.Router()

    router.post('/', weatherHandler)

    module.exports = router
    console.log('날씨 정보 요청 정상 대기 중')
} catch(e) {
    console.log(e)
}