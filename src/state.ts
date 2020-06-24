import { useState, useEffect } from 'react'
import { event } from './event'

function useStoreState(key: string, value: any) {
  let [curValue, set] = useState(value)

  useEffect(() => {
    event.add(key, set)
    return () => {
      event.remove(key, set)
    }
  }, [])

  return curValue
}

export {
  useStoreState
}