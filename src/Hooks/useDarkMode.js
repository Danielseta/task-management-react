import React, {useState , useEffect } from 'react'

const useDarkMode = () => {
  const [theme, setTheme] = useState(locaStorage.theme)
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    localStorage.setItem('theme' , theme)
    
  }, [theme , colorthemel])

  return[colorTheme , setTheme]

}

export default useDarkMode
