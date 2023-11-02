import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PageInterface from '@/pages/auth/PageInterface'
import { PathLinkMap, PathNames } from '../../../../utils/defines'
import * as Modify from './Modify'
import * as MapToGot from './MapToGot'
import { Roles } from '../../Roles'

export default {
  [PathNames.TRIP_ADD]: {
    link: PathLinkMap.get(PathNames.TRIP_ADD),
    icon: <FontAwesomeIcon icon={faPlus} />,
    component: <Modify.Component />,
    requireRole: Roles.USER,
  },
  [PathNames.TRIP_EDIT]: {
    link: PathLinkMap.get(PathNames.TRIP_EDIT),
    hideInMenu: true,
    component: <Modify.Component />,
    requireRole: Roles.USER,
  },
  [PathNames.TRIP_MAP_TO_GOT]: {
    link: PathLinkMap.get(PathNames.TRIP_MAP_TO_GOT),
    hideInMenu: true,
    component: <MapToGot.Component />,
    requireRole: Roles.USER,
  },
} as Record<string, PageInterface>
