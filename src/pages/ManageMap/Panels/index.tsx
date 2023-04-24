import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMountainSun } from '@fortawesome/free-solid-svg-icons'
import TerrainPoint from './TerrainPoint'
import MountainGroup from './MountainGroup'
import MountainRange from './MountainRange'
import Section from './Section'
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
    component: <Section.Create.Component />,
  },
  [defines.Paths.EDIT_SECTION]: {
    link: '/section/edit/:id',
    component: <Section.Edit.Component />,
    hideInMenu: true,
  },
  [defines.Paths.DELETE_SECTION]: {
    link: '/section/delete/:id',
    component: <Section.Delete.Component />,
    hideInMenu: true,
  },
  [defines.Paths.MOUNTAIN_GROUP]: {
    link: '/mountain-group/list',
    icon: <FontAwesomeIcon icon={faMountainSun} />,
    component: <MountainGroup.List.Component />,
  },
  [defines.Paths.ADD_MOUNTAIN_GROUP]: {
    link: '/mountain-group/add',
    component: <MountainGroup.Add.Component />,
    hideInMenu: true,
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
  [defines.Paths.ADD_MOUNTAIN_RANGE]: {
    link: '/mountain-range/add/:id',
    component: <MountainRange.Create.Component />,
    hideInMenu: true,
  },
  [defines.Paths.EDIT_MOUNTAIN_RANGE]: {
    link: '/mountain-range/edit/:id',
    component: <MountainRange.Edit.Component />,
    hideInMenu: true,
  },
  [defines.Paths.DELETE_MOUNTAIN_RANGE]: {
    link: '/mountain-range/delete/:id',
    component: <MountainRange.Delete.Component />,
    hideInMenu: true,
  },
} as Record<string, PageInterface>
