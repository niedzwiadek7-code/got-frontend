import React from 'react'
import PageInterface from './PageInterface'
import { getPath, PathNames } from '../../utils/defines'
import Login from './Login'
import Register from './Register'

export default {
  [PathNames.LOGIN]: {
    link: getPath(PathNames.LOGIN),
    component: <Login.Component />,
  },
  [PathNames.REGISTER]: {
    link: getPath(PathNames.REGISTER),
    component: <Register.Component />,
  },
} as Record<string, PageInterface>
