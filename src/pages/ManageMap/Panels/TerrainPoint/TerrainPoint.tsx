import React from 'react'
import Styles from './TerrainPont.module.scss'

interface Props {}

const TerrainPoint: React.FC<Props> = () => {
  console.log('TerrainPoint')
  return (
    <div className={Styles.container}>
      Terrain Point
    </div>

  )
}

export default TerrainPoint
