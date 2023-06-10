import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Paths from './paths'
import { useAuth } from '../../context/auth'

const App = () => {
  const auth = useAuth()

  return (
    <div>
      <Routes>
        {Object.keys(Paths).map((key) => {
          const { requireRole } = Paths[key]

          let hasRequiredRole: boolean | undefined
          if (requireRole) {
            hasRequiredRole = auth.roles?.includes(requireRole.toString())
          } else {
            hasRequiredRole = true
          }

          return (
            <>
              {hasRequiredRole && (
                <Route
                  key={key}
                  path={Paths[key].link}
                  element={Paths[key].component}
                />
              )}

              {Object.entries(Paths[key]?.panels || {}).map(([panelKey, panel]) => {
                const { requireRole: panelRequireRole } = panel

                // Check if the authenticated user has the required role for the panel
                let hasPanelRequiredRole: boolean | undefined
                if (panelRequireRole) {
                  hasPanelRequiredRole = auth.roles?.includes(panelRequireRole.toString())
                } else {
                  hasPanelRequiredRole = true
                }

                return (
                  hasPanelRequiredRole && (
                    <Route
                      key={panelKey}
                      path={panel.link}
                      element={panel.component}
                    />
                  )
                )
              })}
            </>
          )
        })}
      </Routes>
    </div>
  )
}
export default App
