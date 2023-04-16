import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Paths from './paths'

const App = () => (
  <div>
    <Routes>
      {
        Object.keys(Paths).map((key) => (
          <>
            <Route
              key={key}
              path={Paths[key].link}
              element={Paths[key].component}
            />

            {
              Object.entries(Paths[key]?.panels || {}).map(([panelKey, panel]) => (
                <Route
                  key={panelKey}
                  path={panel.link}
                  element={panel.component}
                />
              ))
            }
          </>
        ))
      }
    </Routes>
  </div>
)

export default App
