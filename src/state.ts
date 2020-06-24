import { useState, useEffect } from 'react'
import { event } from './event'

function useStoreState(key: string, value: any) {
  let [curValue, set] = useState(value)

  // 不放 effect 里面是因为不同步，可能会造成
  // 其子组件调用 update 时，监听还没添加
  event.add(key, set)
  useEffect(() => {
    return () => {
      event.remove(key, set)
    }
  }, [])

  return curValue
}

export {
  useStoreState
}