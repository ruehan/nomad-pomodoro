

type Time = {
    minutes: number
    seconds: number
}

type Countdown = {
    minutes: number
    seconds: number
    formatted: string
    isActive: boolean
    isInactive: boolean
    isRunning: boolean
    isPaused: boolean
    pause: VoidFunction
    resume: VoidFunction
    reset: (time?: Time) => void
    init: (time?: Time) => void
}

export type {Countdown, Time}