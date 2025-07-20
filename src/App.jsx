import React from 'react'
import Scene from './components/Scene'
import TrailSvg from './components/TrailSvg'

const App = () => {
  return (
    <div className='text-white h-screen w-full bg-[#0F101A]'>
      <h1 className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion invert-50'>Move your mouse to see the magic</h1>


      {/* <Scene /> */}
      <TrailSvg />
    </div>
  )
}

export default App
