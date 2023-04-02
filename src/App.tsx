import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Styles from './App.module.scss'
import Layout from './components/Layout'
import paths from './pages/paths'
import Content from './pages'

const App = () => (
  <BrowserRouter>
    <div className={Styles.App}>
      <Layout.Component
        paths={paths}
        Content={<Content />}
      />
    </div>
  </BrowserRouter>
)

export default App
