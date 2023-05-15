import React, {
  ReactNode, createContext, useContext, useMemo,
} from 'react'
import { DependencyInterface } from './DependencyInterface'
import Backend from '../../services/backend'
import { Toast, Types } from '../../utils/Toast'

export class Dependencies {
  getApiService() {
    return new Backend()
  }

  getToastUtils() {
    const toast = new Toast()
    return {
      Toast: toast,
      types: Types.Type,
    }
  }
}

export const DependenciesContext = createContext<DependencyInterface>(new Dependencies())

type Props = {
  children: ReactNode
}

export const DependenciesProvider: React.FC<Props> = (props) => {
  const value = useMemo(() => new Dependencies(), [])

  return (
    <DependenciesContext.Provider
      value={value}
    >
      { props.children }
    </DependenciesContext.Provider>
  )
}

export const useDependencies = () => useContext(DependenciesContext)
