import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import TerrainPoint from './TerrainPoint'
import defines from '../../../utils/defines'
import PageInterface from '@/pages/PageInterface'

export default {
  [defines.Paths.TERRAIN_POINT]: {
    link: '/terrain-points',
    icon: <FontAwesomeIcon icon={faLocationDot} />,
    component: <TerrainPoint.Component />,
  },
} as Record<string, PageInterface>
