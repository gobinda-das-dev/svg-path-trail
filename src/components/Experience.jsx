import { OrbitControls } from '@react-three/drei'
import React from 'react'
import Trail from './Trail'
import TrailExperiment from './TrailExperiment'

const Experience = () => {
  return (
    <>
      {/* <Trail /> */}
      <TrailExperiment />

      <OrbitControls />
    </>
  )
}

export default Experience
