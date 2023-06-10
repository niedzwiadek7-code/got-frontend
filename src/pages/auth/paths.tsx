import React from 'react'
// TODO: Import path should use '@/.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAward, faMap, faPeopleRoof, faPersonFalling,
} from '@fortawesome/free-solid-svg-icons'
import { PathLinkMap, PathNames } from '../../utils/defines'
import ManageMap from './ManageMap'
import Badges from './Badges'
import Leaders from './Leaders'
import PageInterface from '@/pages/auth/PageInterface'
import * as Trip from './Trip'
import { Roles } from '../../pages/auth/Roles'

export default {
  [PathNames.MANAGE_MAP]: {
    link: PathLinkMap.get(PathNames.MANAGE_MAP),
    icon: <FontAwesomeIcon icon={faMap} />,
    component: <ManageMap.Component />,
    panels: ManageMap.Panels,
    requireRole: Roles.ADMIN,
  },
  [PathNames.BADGES]: {
    link: PathLinkMap.get(PathNames.BADGES),
    icon: <FontAwesomeIcon icon={faAward} />,
    component: <Badges.Component />,
    requireRole: Roles.ADMIN,
  },
  [PathNames.LEADERS]: {
    link: PathLinkMap.get(PathNames.LEADERS),
    icon: <FontAwesomeIcon icon={faPeopleRoof} />,
    component: <Leaders.Component />,
    panels: Leaders.Panels,
    requireRole: Roles.ADMIN,
  },
  [PathNames.TRIPS]: {
    link: PathLinkMap.get(PathNames.TRIPS),
    icon: <FontAwesomeIcon icon={faPersonFalling} />,
    component: <Trip.Component />,
    panels: Trip.Panels,
    requireRole: Roles.USER,
  },
} as Record<string, PageInterface>
