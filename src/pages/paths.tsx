import React from 'react'
// TODO: Import path should use '@/.'
import defines from '../../src/utils/defines'
import ManageMap from './ManageMap'
import Badges from './Badges'
import Tours from './Tours'
import PageInterface from '@/pages/PageInterface'

export default {
  [defines.Paths.MANAGE_MAP]: {
    link: '/manage-map',
    component: <ManageMap.Component />,
  },
  [defines.Paths.BADGES]: {
    link: '/badges',
    component: <Badges.Component />,
  },
  [defines.Paths.TOURS]: {
    link: '/tours',
    component: <Tours.Component />,
  },
} as Record<string, PageInterface>
