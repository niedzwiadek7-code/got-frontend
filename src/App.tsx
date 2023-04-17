import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Styles from './App.module.scss'
import Layout from './components/Layout'
import paths from './pages/paths'
import Content from './pages'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
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
)

export default App
