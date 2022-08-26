import { useEffect, useState } from 'react'

interface TimerNumbers {
  studyTime: number
  intervalTime: number
}

const TIMERS: TimerNumbers = { intervalTime: 5, studyTime: 5 }

enum Phase { STUDY, INTERVAL }

const App = () => {

  const [cicle, setCicle] = useState(1)
  const [phase, setPhase] = useState<Phase>(Phase.STUDY)
  const [pause, setPause] = useState(true)

  const [studyTime, setStudyTime] = useState<number>(TIMERS.studyTime) // 25 minutes default
  const [intervalTime, setIntervalTime] = useState<number>(0) // 5 minutes default

  useEffect(() => {
    let interval = setInterval(() => {
      if (Phase.STUDY === phase) {
        if (studyTime !== 0) {
          if(!pause) setStudyTime(studyTime - 1)
        } else {
          setPhase(Phase.INTERVAL)
          setPause(true)
          setIntervalTime(TIMERS.intervalTime)
        }
      } else {
        if (intervalTime !== 0) {
          if(!pause) setIntervalTime(intervalTime - 1)
        } else {
          setPhase(Phase.STUDY)
          setPause(true)
          setCicle(cicle + 1)
          setStudyTime(TIMERS.studyTime)
        }
      }
    }, 1000)

  return () => clearInterval(interval)
  }, [studyTime, intervalTime, pause])

  const tickTimer = () => {
    setPause(!pause)
  }

  const formatClock = (timeUnit: number) => {
    const minutes = Math.floor(timeUnit / 60) > 10 ? Math.floor(timeUnit / 60) : "0" + Math.floor(timeUnit / 60)
    const seconds = timeUnit % 60 > 10 ? timeUnit % 60 : "0" + timeUnit % 60
    return `${minutes}:${seconds}`
  }

  return <main className='font-poppins bg-slate-800 min-w-full min-h-screen text-white flex flex-col justify-center items-center gap-y-8'>
    <h1 className='text-5xl font-extrabold tracking-wide'>PomoTimer: {phase === Phase.STUDY ? "Study time" : "Interval"}</h1>
    <div className='text-9xl font-extrabold flex flex-col items-center'>
      { phase === Phase.STUDY ? <>
        <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        <span>{formatClock(studyTime)}</span>
        </>
        : <>
        <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
        <span>{formatClock(intervalTime)}</span>
        </>
      }
    </div>

    <div className='flex flex-col items-center gap-2'>
    { !pause ? 
      <button
        onClick={() => tickTimer()}
        className='text-5xl font-extrabold track-wider cursor-pointer'
      >
        Stop
      </button> 
      : 
      <button
        onClick={() => tickTimer()}
        className='text-5xl font-extrabold track-wider cursor-pointer'
      >
        Start
      </button> }

      <span className=''>Current cicle: { cicle }/4</span>
    </div>



  </main>

}

export default App