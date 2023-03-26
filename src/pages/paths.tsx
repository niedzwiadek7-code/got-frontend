import React from 'react'
import defines from '@/utils/defines'
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
    link: '/manage-map',
    component: <Badges.Component />,
  },
  [defines.Paths.TOURS]: {
    link: '/manage-map',
    component: <Tours.Component />,
  },
} as Record<string, PageInterface>
