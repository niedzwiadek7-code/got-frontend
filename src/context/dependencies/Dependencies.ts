import { createContext } from 'react'
import { DependencyInterface } from './DependencyInterface'
import Backend from '../../services/backend'

export class DependenciesClass {
  getApiService() {
    return new Backend()
  }
}

export const Dependencies = createContext<DependencyInterface>(new DependenciesClass())
export const DependenciesProvider = Dependencies.Provider
