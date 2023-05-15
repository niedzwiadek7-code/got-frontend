import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMountainSun } from '@fortawesome/free-solid-svg-icons'
import TerrainPoint from './TerrainPoint'
import MountainGroup from './MountainGroup'
import MountainRange from './MountainRange'
import Section from './Section'
import { PathLinkMap, PathNames } from '../../../../utils/defines'
import PageInterface from '@/pages/auth/PageInterface'

export default {
  [PathNames.TERRAIN_POINT_ADD]: {
    link: PathLinkMap.get(PathNames.TERRAIN_POINT_ADD),
    icon: <FontAwesomeIcon icon={faLocationDot} />,
    component: <TerrainPoint.Create.Component />,
  },
  [PathNames.TERRAIN_POINT_EDIT]: {
    link: PathLinkMap.get(PathNames.TERRAIN_POINT_EDIT),
    component: <TerrainPoint.Edit.Component />,
    hideInMenu: true,
  },
  [PathNames.TERRAIN_POINT_DELETE]: {
    link: PathLinkMap.get(PathNames.TERRAIN_POINT_DELETE),
    component: <TerrainPoint.Delete.Component />,
    hideInMenu: true,
  },
  [PathNames.SECTION]: {
    link: PathLinkMap.get(PathNames.SECTION),
    component: <Section.List.Component />,
    hideInMenu: true,
  },
  [PathNames.SECTION_ADD]: {
    link: PathLinkMap.get(PathNames.SECTION_ADD),
    component: <Section.Create.Component />,
  },
  [PathNames.SECTION_EDIT]: {
    link: PathLinkMap.get(PathNames.SECTION_EDIT),
    component: <Section.Edit.Component />,
    hideInMenu: true,
  },
  [PathNames.SECTION_DELETE]: {
    link: PathLinkMap.get(PathNames.SECTION_DELETE),
    component: <Section.Delete.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_GROUP]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_GROUP),
    icon: <FontAwesomeIcon icon={faMountainSun} />,
    component: <MountainGroup.List.Component />,
  },
  [PathNames.MOUNTAIN_GROUP_ADD]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_GROUP_ADD),
    component: <MountainGroup.Add.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_GROUP_EDIT]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_GROUP_EDIT),
    component: <MountainGroup.Edit.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_GROUP_DELETE]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_GROUP_DELETE),
    component: <MountainGroup.Delete.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_RANGE]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_RANGE),
    component: <MountainRange.List.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_RANGE_ADD]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_RANGE_ADD),
    component: <MountainRange.Create.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_RANGE_EDIT]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_RANGE_EDIT),
    component: <MountainRange.Edit.Component />,
    hideInMenu: true,
  },
  [PathNames.MOUNTAIN_RANGE_DELETE]: {
    link: PathLinkMap.get(PathNames.MOUNTAIN_RANGE_DELETE),
    component: <MountainRange.Delete.Component />,
    hideInMenu: true,
  },
} as Record<string, PageInterface>
