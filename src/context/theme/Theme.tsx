import React, {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react'
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
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT)

  const changeTheme = () => {
    if (theme === Theme.LIGHT) {
      setTheme(Theme.DARK)
    } else {
      setTheme(Theme.LIGHT)
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
