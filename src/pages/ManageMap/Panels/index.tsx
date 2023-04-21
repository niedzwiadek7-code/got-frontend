import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMountainSun } from '@fortawesome/free-solid-svg-icons'
import TerrainPoint from './TerrainPoint'
import MountainGroup from './MountainGroup'
import MountainRange from './MountainRange'
import Section from './Section/Create'
import defines from '../../../utils/defines'
import PageInterface from '@/pages/PageInterface'

export default {
  [defines.Paths.TERRAIN_POINT]: {
    link: '/terrain-points/add',
    icon: <FontAwesomeIcon icon={faLocationDot} />,
    component: <TerrainPoint.Create.Component />,
  },
  [defines.Paths.TERRAIN_POINT_EDIT]: {
    link: '/terrain-points/edit/:id',
    component: <TerrainPoint.Edit.Component />,
    hideInMenu: true,
  },
  [defines.Paths.SECTION]: {
    link: '/section/add',
    component: <Section.Component />,
  },
  [defines.Paths.MOUNTAIN_GROUP]: {
    link: '/mountain-group/list',
    icon: <FontAwesomeIcon icon={faMountainSun} />,
    component: <MountainGroup.List.Component />,
  },
  [defines.Paths.EDIT_MOUNTAIN_GROUP]: {
    link: '/mountain-group/edit/:id',
    component: <MountainGroup.Edit.Component />,
    hideInMenu: true,
  },
  [defines.Paths.DELETE_MOUNTAIN_GROUP]: {
    link: '/mountain-group/delete/:id',
    component: <MountainGroup.Delete.Component />,
    hideInMenu: true,
  },
  [defines.Paths.MOUNTAIN_RANGE]: {
    link: '/mountain-range/:id',
    component: <MountainRange.List.Component />,
    hideInMenu: true,
  },
} as Record<string, PageInterface>
