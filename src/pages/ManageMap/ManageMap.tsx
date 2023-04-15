import React, { useEffect, useState } from 'react'
import TerrainPoint from '@/models/TerrainPoint'
import TerrainPointService from '../../services/TerrainPointService'

const ManageMap = () => {
  const [terrainPoints, setTerrainPoints] = useState<TerrainPoint[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const terrainPointService = new TerrainPointService()
      const some = await terrainPointService.getTerrainPoints()
      console.log(some)
      setTerrainPoints(some)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Terrain Points:</h2>
      <ul>
        {terrainPoints.map((terrainPoint) => (
          // eslint-disable-next-line react/jsx-key
          <li>{terrainPoint.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ManageMap
