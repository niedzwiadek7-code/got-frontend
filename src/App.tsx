import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Styles from './App.module.scss'
import Content from './pages'
import { DependenciesProvider } from './context/dependencies'
import { AuthProvider } from './context/auth'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <DependenciesProvider>
    <AuthProvider>
      <BrowserRouter>
        <div className={Styles.App}>
          <Content />
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
    </AuthProvider>
  </DependenciesProvider>
)

export default App
