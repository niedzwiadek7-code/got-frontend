import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Styles from './App.module.scss'
import Layout from './components/Layout'
import paths from './pages/paths'
import Content from './pages'
import { DependenciesProvider, DependenciesClass } from './context/dependencies'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <DependenciesProvider
    value={new DependenciesClass()}
  >
    <BrowserRouter>
      <div className={Styles.App}>
        <Layout.Component
          paths={paths}
          Content={<Content />}
        />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  </DependenciesProvider>
)

export default App
