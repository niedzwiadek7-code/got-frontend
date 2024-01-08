import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Styles from './App.module.scss'
import Content from './pages'
import { DependenciesProvider } from './context/dependencies'
import { AuthProvider } from './context/auth'
import { ThemeProvider } from './context/theme'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <DependenciesProvider>
    <AuthProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </AuthProvider>
  </DependenciesProvider>
)

export default App
