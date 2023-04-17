import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMountainSun } from '@fortawesome/free-solid-svg-icons'
import TerrainPoint from './TerrainPoint'
import MountainGroup from './MountainGroup'
import Section from './Section'
import defines from '../../../utils/defines'
import PageInterface from '@/pages/PageInterface'

export default {
  [defines.Paths.TERRAIN_POINT]: {
    link: '/terrain-points/add',
    icon: <FontAwesomeIcon icon={faLocationDot} />,
    component: <TerrainPoint.Component />,
  },
  [defines.Paths.SECTION]: {
    link: '/section/add',
    component: <Section.Component />,
  },
  [defines.Paths.MOUNTAIN_GROUP]: {
    link: '/mountain-group/list',
    icon: <FontAwesomeIcon icon={faMountainSun} />,
    component: <MountainGroup.Component />,
  },
} as Record<string, PageInterface>
