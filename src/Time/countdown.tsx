import {format as formatTime} from "date-fns"
import {useEffect, useRef, useState} from "react"

import {
    calculateInitialTime,
    calculateRemainingMinutes,
    calculateRemainingSeconds,
} from "./time"

import {Countdown, Time} from "./type"

type useCountdownParams = {
    minutes?: number
    seconds?: number
    format?: string
    onCompleted?: VoidFunction
    stop? : boolean
}

const CountDown = ({
    minutes = 0,
    seconds = 0,
    format = "mm:ss",
    onCompleted,
    stop = true,
}: useCountdownParams = {}): CountDown => {
    const id = useRef(0)

    const [remainingTime, setRemainingTime] = useState(
        calculateInitialTime({minutes, seconds}),
    )

    const [isActive, setIsActive] = useState(false)
    const [isInactive, setIsInactive] = useState(true)
    const [isRunning, setIsRunning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(
        () => {
           if(stop !== true){
                id.current = window.setInterval(calculateRemainingTime, 1000)

                setIsActive(true)
                setIsInactive(false)
                setIsRunning(true)
                setIsPaused(false)

                return () => window.clearInterval(id.current)
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const calculateRemainingTime = () => {

        setRemainingTime(time => {
            if (time - 1000 <= 0) {
                window.clearInterval(id.current)
                onCompleted?.()

                setIsActive(false)
                setIsInactive(true)
                setIsRunning(false)
                setIsPaused(false)

                return 0
            }

            return time - 1000
        })
        
    }

    const pause = (): void => {
        if (isPaused || isInactive) {
            return
        }

        window.clearInterval(id.current)

        setIsActive(true)
        setIsInactive(false)
        setIsRunning(false)
        setIsPaused(true)
    }

    const resume = (): void => {
        if (isRunning) {
            return
        }

        id.current = window.setInterval(calculateRemainingTime, 1000)

        setIsActive(true)
        setIsInactive(false)
        setIsRunning(true)
        setIsPaused(false)

    }

    const reset = (time: Time = {minutes, seconds}) => {
        window.clearInterval(id.current)
        id.current = window.setInterval(calculateRemainingTime, 1000)

        setIsActive(true)
        setIsInactive(false)
        setIsRunning(true)
        setIsPaused(false)

        setRemainingTime(calculateInitialTime(time))
    }

    const init= (time: Time = {minutes, seconds}) => {
        setRemainingTime(calculateInitialTime(time))
    }

    const countdown: Countdown = {
        minutes: calculateRemainingMinutes(remainingTime),
        seconds: calculateRemainingSeconds(remainingTime),
        formatted: formatTime(remainingTime, format),
        isActive,
        isInactive,
        isRunning,
        isPaused,
        pause,
        resume,
        reset,
        init
    }

    return countdown
}

export default CountDown