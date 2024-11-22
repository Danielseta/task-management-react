import React from 'react'
import logo from ''

const Header = () => {
  return (
    <div className=' p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'>
         <header className='flex justify-between dark:text-white items-center'>
                {/* left side */}        

                <div>
                    <img src={logo} alt="logo"  className=' h-6 w-6'/>
                    <h3 className='hidden md:inline-block font-bold font-sans md:text-4xl'>
                        Task's
                    </h3>
                </div>
            </header>     
    </div>
  )
}

export default Header
