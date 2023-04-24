import React from 'react'
// TODO: Import path should use '@/.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faMap, faPeopleRoof } from '@fortawesome/free-solid-svg-icons'
import { PathLinkMap, PathNames } from '../../src/utils/defines'
import ManageMap from './ManageMap'
import Badges from './Badges'
import Tours from './Leaders'
import PageInterface from '@/pages/PageInterface'

export default {
  [PathNames.MANAGE_MAP]: {
    link: PathLinkMap.get(PathNames.MANAGE_MAP),
    icon: <FontAwesomeIcon icon={faMap} />,
    component: <ManageMap.Component />,
    panels: ManageMap.Panels,
  },
  [PathNames.BADGES]: {
    link: PathLinkMap.get(PathNames.BADGES),
    icon: <FontAwesomeIcon icon={faAward} />,
    component: <Badges.Component />,
  },
  [PathNames.LEADERS]: {
    link: PathLinkMap.get(PathNames.LEADERS),
    icon: <FontAwesomeIcon icon={faPeopleRoof} />,
    component: <Tours.Component />,
  },
} as Record<string, PageInterface>
