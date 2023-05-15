import React, {
  ReactNode, createContext, useContext, useMemo,
} from 'react'
import { DependencyInterface } from './DependencyInterface'
import Backend from '../../services/backend'

export class DependenciesClass {
  getApiService() {
    return new Backend()
  }
}

export const DependenciesContext = createContext<DependencyInterface>(new DependenciesClass())

type Props = {
  children: ReactNode
}

export const DependenciesProvider: React.FC<Props> = (props) => {
  const value = useMemo(() => new DependenciesClass(), [])

  return (
    <DependenciesContext.Provider
      value={value}
    >
      { props.children }
    </DependenciesContext.Provider>
  )
}

export const useDependencies = () => useContext(DependenciesContext)
