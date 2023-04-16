import React from 'react'
// TODO: Import path should use '@/.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faMap, faPeopleRoof } from '@fortawesome/free-solid-svg-icons'
import defines from '../../src/utils/defines'
import ManageMap from './ManageMap'
import Badges from './Badges'
import Tours from './Leaders'
import PageInterface from '@/pages/PageInterface'

export default {
  [defines.Paths.MANAGE_MAP]: {
    link: '/manage-map',
    icon: <FontAwesomeIcon icon={faMap} />,
    component: <ManageMap.Component />,
    panels: ManageMap.Panels,
  },
  [defines.Paths.BADGES]: {
    link: '/badges',
    icon: <FontAwesomeIcon icon={faAward} />,
    component: <Badges.Component />,
  },
  [defines.Paths.LEADERS]: {
    link: '/leaders',
    icon: <FontAwesomeIcon icon={faPeopleRoof} />,
    component: <Tours.Component />,
  },
} as Record<string, PageInterface>
