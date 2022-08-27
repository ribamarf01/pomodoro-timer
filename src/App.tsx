import { FormEvent, useEffect, useState } from 'react'

import DarkmodeToggle from './DarkmodeToggle'
import ResetPomodoroButton from './ResetPomodoroButton'

interface TimerNumbers {
  studyTime: number
  intervalTime: number
}

const TIMERS: TimerNumbers = { intervalTime: 5, studyTime: 25 }

enum Phase { STUDY, INTERVAL }
enum Mode { TIMER, CONFIG }

const App = () => {

  const sound = new Audio("/bell.mp3")
  sound.volume = 0.1

  const [cicle, setCicle] = useState(1)
  const [phase, setPhase] = useState<Phase>(Phase.STUDY)
  const [mode, setMode] = useState<Mode>(Mode.TIMER)

  const [enough, setEnough] = useState(false)

  const [form, setForm] = useState<{ st: number, it: number }>({ st: TIMERS.studyTime, it: TIMERS.intervalTime })

  const [pause, setPause] = useState(true)
  const [studyTime, setStudyTime] = useState<number>(TIMERS.studyTime * 60) // 25 minutes default
  const [intervalTime, setIntervalTime] = useState<number>(0) // 5 minutes default

  useEffect(() => {
    let interval = setInterval(() => {
      if (Phase.STUDY === phase) {
        if (studyTime !== 0) {
          if (!pause) setStudyTime(studyTime - 1)
        } else {
          setPhase(Phase.INTERVAL)
          setPause(true)
          setIntervalTime(form.it)
          sound.play()
        }
      } else {
        if (intervalTime !== 0) {
          if (!pause) setIntervalTime(intervalTime - 1)
        } else {
          setPhase(Phase.STUDY)
          setPause(true)
          setCicle(cicle + 1)
          setStudyTime(form.st)
          sound.play()
          if (cicle > 4) setEnough(true)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [studyTime, intervalTime, pause])

  const tickTimer = () => {
    setPause(!pause)
  }

  const changeMode = () => {
    if (mode === Mode.TIMER) setMode(Mode.CONFIG)
    else setMode(Mode.TIMER)
  }

  const setTimer = (e: FormEvent) => {
    e.preventDefault()

    setStudyTime(form.st * 60)
    setIntervalTime(form.it * 60)
    setMode(Mode.TIMER)
  }

  const resetConfig = () => {
    setStudyTime(TIMERS.studyTime * 60)
    setIntervalTime(0)
    setMode(Mode.TIMER)
  }

  const reset = () => {
    setStudyTime(form.st * 60)
    setIntervalTime(form.it * 60)
    setMode(Mode.TIMER)
    setPhase(Phase.STUDY)
    setEnough(false)
  }

  const formatClock = (timeUnit: number) => {
    const minutes = Math.floor(timeUnit / 60) > 10 ? Math.floor(timeUnit / 60) : "0" + Math.floor(timeUnit / 60)
    const seconds = timeUnit % 60 >= 10 ? timeUnit % 60 : "0" + timeUnit % 60
    return `${minutes}:${seconds}`
  }

  return <main className='font-poppins bg-mint-cream dark:bg-slate-800 min-w-full min-h-screen dark:text-white text-gray-700 flex flex-col justify-center items-center gap-y-8 p-8 transition-colors duration-300'>
    <h1 className='text-7xl font-extrabold tracking-wide flex items-center'>Pomotimer</h1>

    {mode === Mode.TIMER ? <div className='w-full flex flex-col items-center justify-center flex-1 gap-y-8'>
      <div className='text-7xl font-extrabold flex flex-col items-center justify-center p-4 gap-y-4 border-b-8 border-t-8 dark:border-gray-300 border-gray-600 xl:w-1/3 md:w-2/3 w-full'>
        {phase === Phase.STUDY ? <>
          <span className='text-4xl text-center'>
            { !enough ?
              <p className='flex flex-col items-center gap-y-2'>
                <span>Attention.</span>
                <span>Too much study may be dangerous!</span>
              </p>
              : "Study time!"
            }
          </span>
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          <span>{formatClock(studyTime)}</span>
        </>
          : <>
            <span className='text-4xl '>Take a coffee break!!!</span>
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            <span>{formatClock(intervalTime)}</span>
          </>
        }
      </div>

      <div className='flex flex-col items-center gap-2'>
        {!pause ?
          <button
            onClick={() => tickTimer()}
            className='text-5xl font-extrabold track-wider cursor-pointer hover:text-gray-600 duration-300 transition-colors'
          >
            Stop
          </button>
          :
          <button
            onClick={() => tickTimer()}
            className='text-5xl font-extrabold track-wider cursor-pointer hover:text-gray-400 duration-300 transition-colors'
          >
            Start
          </button>}

        <span className=''>Current cicle: {cicle}/4</span>
      </div>
    </div> : <form onSubmit={e => setTimer(e)} className='flex p-4 gap-y-4 flex-1 flex-col items-center justify-center'>
      <span className='text-4xl font-bold'>Configure Timer</span>

      <span>Study time: (Minutes)</span>
      <input
        value={form?.st} onChange={e => setForm({ ...form, st: Number(e.target.value) })}
        className='text-2xl text-center rounded-md py-2 w-36 text-black' placeholder='Minutes' type="text"
      />

      <span>Interval time: (Minutes)</span>
      <input
        value={form?.it} onChange={e => setForm({ ...form, it: Number(e.target.value) })}
        className='text-2xl text-center rounded-md py-2 w-36 text-black' placeholder='Minutes' type="text"
      />

      <button
        type='submit'
        className='text-3xl font-extrabold track-wider cursor-pointer hover:text-gray-400 duration-300 transition-colors'
      >
        Set config
      </button>

      <button
        onClick={() => resetConfig()}
        className='text-3xl font-extrabold track-wider cursor-pointer hover:text-gray-400 duration-300 transition-colors'
      >
        Reset config
      </button>

    </form>
    }

    {mode === Mode.TIMER ? <button
      onClick={() => changeMode()}
      className='text-xl hover:text-gray-400 cursor-pointer duration-300 transition-colors'
    >
      Customize timer
    </button> : <button
      onClick={() => changeMode()}
      className='text-xl hover:text-gray-400 cursor-pointer duration-300 transition-colors'
    >
      Go back
    </button>

    }

    <DarkmodeToggle />
    <ResetPomodoroButton handle={reset} />

  </main>

}

export default App