import { useState, useEffect } from 'react'
import useSound from 'use-sound'
import notificacion from '../../assets/notification.mp3'
import { TimerDisplay } from './TimerDisplay'
import { TimerControls } from './TimerControlls'
import { TimerForm } from './TimerForm'

const Timer = () => {
  const [timerValue, setTimerValue] = useState(0)
  const [timerIsRunning, setTimerIsRunning] = useState(false)
  const [inputHours, setInputHours] = useState(0)
  const [inputMinutes, setInputMinutes] = useState(25)
  const [inputSeconds, setInputSeconds] = useState(0)
  const [playSound] = useSound(notificacion)

  useEffect(() => {
    let interval

    if (timerIsRunning && timerValue > 0) {
      interval = setInterval(() => setTimerValue((prev) => prev - 1), 1000)
    } else if (timerValue === 0 && timerIsRunning) {
      playSound()
      setTimerIsRunning(false)
      setTimeout(() => {
        setTimerValue(0)
        setInputHours(0)
        setInputMinutes(0)
        setInputSeconds(0)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [timerIsRunning, timerValue, playSound])

  const handleStart = (e) => {
    e.preventDefault()

    if (timerIsRunning) return

    const hours = parseInt(inputHours) || 0
    const minutes = parseInt(inputMinutes) || 0
    const seconds = parseInt(inputSeconds) || 0

    setTimerValue(hours * 3600 + minutes * 60 + seconds)
    setTimerIsRunning(true)
  }

  const handleStop = () => {
    if (!timerIsRunning) return
    setTimerIsRunning(false)
  }

  const handleReset = () => {
    setTimerIsRunning(false)
    setTimerValue(0)
    setInputHours(0)
    setInputMinutes(0)
    setInputSeconds(0)
  }

  return (
    <article className="grid place-items-center w-full gap-6">
      <h1 className="text-4xl font-bold mb-6 text-white">Timer</h1>
      <TimerForm
        handleStart={handleStart}
        inputHours={inputHours}
        setInputHours={setInputHours}
        inputMinutes={inputMinutes}
        setInputMinutes={setInputMinutes}
        inputSeconds={inputSeconds}
        setInputSeconds={setInputSeconds}
      />

      <TimerDisplay timerValue={timerValue} />
      <TimerControls handleStop={handleStop} handleReset={handleReset} />
    </article>
  )
}

export default Timer
