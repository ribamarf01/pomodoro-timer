import { useState, useEffect } from 'react'

const DarkmodeToggle = () => {

  const [theme, setTheme] = useState(localStorage.getItem('data-theme') === 'dark' ? 'dark' : 'light')

  useEffect(() => {
    const root = window.document.documentElement

    if(theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('data-theme', 'dark')  
    } else {
      root.classList.remove('dark')
      localStorage.setItem('data-theme', 'light')
    }

  }, [theme])
  
  return <div className="absolute right-8 top-8 border-2 p-1 rounded-xl dark:text-white dark:border-white border-gray-900 hover:bg-gray-900 hover:text-white hover:dark:bg-white hover:dark:text-black transition-all duration-200 cursor-pointer">
    { theme === 'dark' ?
      <svg onClick={() => setTheme('light')} className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
      :
      <svg onClick={() => setTheme('dark')} className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    }
  </div>

}

export default DarkmodeToggle