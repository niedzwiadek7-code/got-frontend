/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK'
}

export type ThemeColors = {
  background: string,
  color: string,
}

export const Colors: Record<string, ThemeColors> = {
  [Theme.LIGHT]: {
    background: 'white',
    color: 'black',
  },
  [Theme.DARK]: {
    background: '#333',
    color: 'white',
  },
}
