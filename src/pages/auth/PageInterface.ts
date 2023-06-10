import React from 'react'
import { Roles } from '@/pages/auth/Roles'

interface Page {
  link: string,
  component: React.ReactNode,
  icon?: React.ReactNode,
  panels?: Record<string, Page>,
  hideInMenu?: boolean,
  requireRole?: Roles
}

export default Page
