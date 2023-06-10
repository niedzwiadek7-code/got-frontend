import React from 'react'
import { PathLinkMap, PathNames } from '../../../../utils/defines'
import * as Edit from './Edit'

export default {
  [PathNames.LEADER_EDIT]: {
    link: PathLinkMap.get(PathNames.LEADER_EDIT),
    hideInMenu: true,
    component: <Edit.Component />,
  },
}
