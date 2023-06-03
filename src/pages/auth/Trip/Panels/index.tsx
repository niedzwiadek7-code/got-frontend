import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PageInterface from '@/pages/auth/PageInterface'
import { PathLinkMap, PathNames } from '../../../../utils/defines'
import * as Modify from './Modify'

export default {
  [PathNames.TRIP_ADD]: {
    link: PathLinkMap.get(PathNames.TRIP_ADD),
    icon: <FontAwesomeIcon icon={faPlus} />,
    component: <Modify.Component />,
  },
} as Record<string, PageInterface>
