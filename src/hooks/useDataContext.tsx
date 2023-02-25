import { useContext } from 'react'
import { DataContext } from '../context'

export default function useDataContextContext() {
  return useContext(DataContext)
}
