import React, { useState } from 'react'
import Header from './componets/Header'
import Center from './componets/Center'

const App = () => {
   
  const [boardModalOpen, setBoardModalOpen] = useState(false)

  return (
    <div>
      
    {/* header */}

    <Header boardModalOpen = {boardModalOpen} setBoardModalOpen={setBoardModalOpen} />

    {/* Center */}

    <Center/> 


    </div>
  )
}

export default App
