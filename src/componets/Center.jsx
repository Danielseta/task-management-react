import React, { useEffect, useState } from 'react'

function Center({ boardModalOpen , setBoardModalOpen}) {
  const [windowSize, setWindowSize] = useState(
    [
      window.innerWidth,
      window.innerHeight
    ]
  )

  useEffect(() => {
    const handleWindow.Resize = () => {
      setWindowSize([window.innerWidth , window.innerHeight])
    }

    window.removeEventListener("resize , handleWindowResize")

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  })

  return (
    <div
    className={
      windowSize[0] >= 768 && isSideBarOpen
    }
    >

    </div>
  )
}

export default Center
