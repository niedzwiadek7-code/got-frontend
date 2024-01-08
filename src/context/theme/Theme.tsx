import React, {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react'
import { useCookies } from 'react-cookie'
import { Colors, Theme, ThemeColors } from './Colors'

class ThemeClass {
  theme: Theme

  changeTheme: () => void

  colors: ThemeColors

  constructor(
    theme: Theme = Theme.LIGHT,
    // eslint-disable-next-line no-shadow,no-unused-vars
    changeTheme: () => void = () => {},
    colors: ThemeColors = Colors[Theme.LIGHT],
  ) {
    this.theme = theme
    this.changeTheme = changeTheme
    this.colors = colors
  }
}

const ThemeContext = createContext<ThemeClass>(new ThemeClass())

type ProviderProps = {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ProviderProps> = (props) => {
  const [cookies, setCookie] = useCookies(['theme'])
  const [theme, setTheme] = useState<Theme>(cookies.theme || Theme.LIGHT)

  const changeTheme = () => {
    if (theme === Theme.LIGHT) {
      setTheme(Theme.DARK)
      setCookie('theme', Theme.DARK)
    } else {
      setTheme(Theme.LIGHT)
      setCookie('theme', Theme.LIGHT)
    }
  }

  const value = useMemo(
    () => new ThemeClass(theme, changeTheme, Colors[theme]),
    [theme],
  )

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeClass => useContext(ThemeContext)
