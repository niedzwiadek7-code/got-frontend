import React from 'react'

interface Page {
  link: string,
  component: React.ReactNode,
  icon?: React.ReactNode,
  panels?: Record<string, Page>
}

export default Page
