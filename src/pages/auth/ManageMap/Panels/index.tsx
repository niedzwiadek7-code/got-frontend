import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMountainSun } from '@fortawesome/free-solid-svg-icons'
import * as TerrainPoint from './TerrainPoint'
import * as MountainGroup from './MountainGroup'
import * as MountainRange from './MountainRange'
import * as Section from './Section'
import { PathLinkMap, PathNames } from '../../../../utils/defines'
import PageInterface from '@/pages/auth/PageInterface'

export default {
  [PathNames.TERRAIN_POINT_ADD]: {
    link: PathLinkMap.get(PathNames.TERRAIN_POINT_ADD),
    icon: <FontAwesomeIcon icon={faLocationDot} />,
    component: <TerrainPoint.Form.Component />,
  },
  [PathNames.TERRAIN_POINT_EDIT]: {
    link: PathLinkMap.get(PathNames.TERRAIN_POINT_EDIT),
    component: <TerrainPoint.Form.Component />,
    hideInMenu: true,
  },
  [PathNames.SECTION]: {
    link: PathLinkMap.get(PathNames.SECTION),
    component: <Section.List.Component />,
    hideInMenu: true,
  },
  [PathNames.SECTION_ADD]: {
    link: PathLinkMap.get(PathNames.SECTION_ADD),
    component: <Section.Form.Component />,
  },
  [PathNames.SECTION_EDIT]: {
    link: PathLinkMap.get(PathNames.SECTION_EDIT),
    component: <Section.Form.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_GROUP]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_GROUP),
    icon: <FontAwesomeIcon icon={faMountainSun} />,
    component: <MountainGroup.List.Component />,
  },
  [PathNames.MOUNTAIN_GROUP_ADD]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_GROUP_ADD),
    component: <MountainGroup.Form.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_GROUP_EDIT]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_GROUP_EDIT),
    component: <MountainGroup.Form.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_RANGE]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_RANGE),
    component: <MountainRange.List.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_RANGE_ADD]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_RANGE_ADD),
    component: <MountainRange.Form.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_RANGE_EDIT]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_RANGE_EDIT),
    component: <MountainRange.Form.Component />,
    hideInMenu: true,
  },
} as Record<string, PageInterface>
